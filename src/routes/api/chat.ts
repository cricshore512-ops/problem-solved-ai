import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { convertToModelMessages, type UIMessage } from "ai";
import type { Database, Json } from "@/integrations/supabase/types";
import { createResponsesCall } from "@/lib/ai/responses";

type AssistantMode = "problem" | "study";

const instructions: Record<AssistantMode, string> = {
  problem: `You are ONE SOLVE, a focused problem-solving assistant. Only help users understand and solve the problem they describe. Do not provide unrelated trivia, entertainment, general browsing, or off-topic information.

For every substantive answer:
1. Briefly restate the goal.
2. Divide the problem into clear parts.
3. Give practical, ordered steps for each part.
4. Identify likely causes, checks, and what to do next.
5. Ask at most two targeted follow-up questions only when missing details materially change the solution.

Be direct and realistic. Never pretend to have inspected something you cannot inspect. For medical, legal, financial, electrical, gas, fire, violence, or other high-risk situations, clearly state immediate safety steps and when a qualified professional or emergency service is needed. Do not claim certainty where there is none.`,
  study: `You are ONE SOLVE in Study mode. Only help with learning, homework understanding, exam preparation, concepts, practice, and study planning. If asked for unrelated content, briefly ask the user to switch to Problem mode.

Teach rather than merely giving an answer. Break the topic into parts, explain each part in simple language, show a worked example when useful, and end with a short check-for-understanding or next study step. Adapt to the learner's level when known. Do not help with cheating in an active exam or impersonating the student's work.`,
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authorization = request.headers.get("authorization");
        const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : undefined;
        if (!token) return Response.json({ message: "Sign in to use and save the assistant." }, { status: 401 });

        const url = process.env["SUPABASE_URL"];
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!url || !key || !apiKey) {
          return Response.json({ message: "The assistant is not configured yet." }, { status: 500 });
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
          return Response.json({ message: "Your session expired. Please sign in again." }, { status: 401 });
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
          return Response.json({ message: "This conversation is too long. Please clear it and begin again." }, { status: 400 });
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
        if (!latestUser) return Response.json({ message: "A user message is required." }, { status: 400 });

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
              return error instanceof Error ? error.message : "The assistant could not complete this answer.";
            },
          });
          return call.wrapResponse(response);
        } catch (error) {
          console.error("AI request failed", error);
          return Response.json(
            { message: error instanceof Error ? error.message : "The assistant is temporarily unavailable." },
            { status: 500 },
          );
        }
      },
    },
  },
});