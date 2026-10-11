import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { convertToModelMessages, type UIMessage } from "ai";
import type { Database, Json } from "@/integrations/supabase/types";
import { createResponsesCall } from "@/lib/ai/responses";

type AssistantMode = "problem" | "study";

const baseInstructions = `You are ONE SOLVE AI, a friendly, knowledgeable general-purpose assistant that works like ChatGPT. Answer any question the user asks — everyday questions, tech, coding, maths, science, writing, business, health, law, finance, careers, travel, history, recipes, home repairs, relationships, and casual chat. Always give a relevant, accurate, complete reply to exactly what was asked; never refuse just because a topic is "off-topic".

Style: reply in the same language the user writes in (including Hindi/Hinglish). Be clear and conversational. Use Markdown (headings, lists, tables, code blocks) when it helps. Keep simple questions short and complex ones thorough. Remember the earlier conversation and answer follow-ups in context. If a request is truly ambiguous, give your best answer and ask one short clarifying question.

Be honest: say when you are unsure and never invent facts, sources, or links. You cannot browse the web or inspect physical things. For medical, legal, financial, electrical, gas, fire, or other high-risk topics, give helpful information plus clear safety steps and when to see a qualified professional or emergency service. Decline only requests that would cause serious harm, and offer a safe alternative.`;

const instructions: Record<AssistantMode, string> = {
  problem: `${baseInstructions}

Mode: Problem. When the user describes a problem, restate the goal, divide it into clear parts, give practical ordered steps, list likely causes and checks, and say what to do next. For other questions, simply answer them directly.`,
  study: `${baseInstructions}

Mode: Study. Teach rather than only giving answers: explain in simple language step by step, show a worked example when useful, and end with a short check-for-understanding or next study step. Do not help cheat in an active exam. For non-study questions, still answer them directly.`,
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authorization = request.headers.get("authorization");
        const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : undefined;
        if (!token)
          return Response.json(
            { message: "Sign in to use and save the assistant." },
            { status: 401 },
          );

        const url = process.env["SUPABASE_URL"];
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!url || !key || !apiKey) {
          return Response.json(
            { message: "The assistant is not configured yet." },
            { status: 500 },
          );
        }

        const supabase = createClient<Database>(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
          global: {
            headers: { Authorization: `Bearer ${token}` },
            fetch: (input, init) => {
              const headers = new Headers(init?.headers);
              headers.set("apikey", key);
              headers.set("Authorization", `Bearer ${token}`);
              return fetch(input, { ...init, headers });
            },
          },
        });
        const { data: authData, error: authError } = await supabase.auth.getUser(token);
        if (authError || !authData.user) {
          return Response.json(
            { message: "Your session expired. Please sign in again." },
            { status: 401 },
          );
        }

        let payload: { messages?: UIMessage[]; mode?: AssistantMode };
        try {
          payload = (await request.json()) as typeof payload;
        } catch {
          return Response.json({ message: "Invalid chat request." }, { status: 400 });
        }
        if (!Array.isArray(payload.messages) || payload.messages.length === 0) {
          return Response.json({ message: "A message is required." }, { status: 400 });
        }
        if (payload.messages.length > 120) {
          return Response.json(
            { message: "This conversation is too long. Please clear it and begin again." },
            { status: 400 },
          );
        }

        const mode: AssistantMode = payload.mode === "study" ? "study" : "problem";
        const messages = payload.messages.filter(
          (message): message is UIMessage =>
            typeof message?.id === "string" &&
            (message.role === "user" || message.role === "assistant") &&
            Array.isArray(message.parts),
        );
        if (messages.length !== payload.messages.length) {
          return Response.json({ message: "One or more messages were invalid." }, { status: 400 });
        }

        const latestUser = [...messages].reverse().find((message) => message.role === "user");
        if (!latestUser)
          return Response.json({ message: "A user message is required." }, { status: 400 });

        const { error: userSaveError } = await supabase.from("ai_chat_messages").upsert(
          {
            user_id: authData.user.id,
            message_id: latestUser.id,
            role: "user",
            parts: latestUser.parts as Json,
            mode,
          },
          { onConflict: "user_id,message_id" },
        );
        if (userSaveError) {
          console.error("Failed to save user AI message", userSaveError);
          return Response.json({ message: "Your message could not be saved." }, { status: 500 });
        }

        try {
          const call = createResponsesCall(
            request,
            { apiKey, model: "openai/gpt-6-astra" },
            await convertToModelMessages(messages),
            instructions[mode],
          );
          const response = call.result.toUIMessageStreamResponse({
            originalMessages: messages,
            sendReasoning: true,
            onFinish: async ({ responseMessage, isAborted }) => {
              if (isAborted) return;
              const { error } = await supabase.from("ai_chat_messages").upsert(
                {
                  user_id: authData.user.id,
                  message_id: responseMessage.id,
                  role: "assistant",
                  parts: responseMessage.parts as Json,
                  mode,
                },
                { onConflict: "user_id,message_id" },
              );
              if (error) console.error("Failed to save assistant AI message", error);
            },
            onError: (error) => {
              console.error("AI stream error", error);
              return error instanceof Error
                ? error.message
                : "The assistant could not complete this answer.";
            },
          });
          return call.wrapResponse(response);
        } catch (error) {
          console.error("AI request failed", error);
          return Response.json(
            {
              message:
                error instanceof Error
                  ? error.message
                  : "The assistant is temporarily unavailable.",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
