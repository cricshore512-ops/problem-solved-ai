import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { BookOpen, BrainCircuit, LogOut, ShieldCheck, Trash2, Wrench } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import type { Json } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";

type AssistantMode = "problem" | "study";

export function RealAiAssistant() {
  const [sessionReady, setSessionReady] = useState(false);
  const [userId, setUserId] = useState<string>();
  const [initialMessages, setInitialMessages] = useState<UIMessage[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    let active = true;
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setUserId(data.session?.user.id);
      setSessionReady(true);
    };
    void loadSession();
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        // Only react when the account actually changes; token refreshes and tab
        // focus also fire SIGNED_IN and must not reset an in-progress answer.
        setUserId((previous) => {
          const next = session?.user.id;
          if (previous !== next) setInitialMessages([]);
          return next;
        });
      }
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    setLoadingHistory(true);
    void supabase
      .from("ai_chat_messages")
      .select("message_id, role, parts")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) toast.error("Saved conversation could not be loaded.");
        setInitialMessages(
          (data ?? []).map((row) => ({
            id: row.message_id,
            role: row.role as UIMessage["role"],
            parts: row.parts as UIMessage["parts"],
          })),
        );
        setLoadingHistory(false);
      });
    return () => {
      active = false;
    };
  }, [userId]);

  if (!sessionReady) return <AssistantSkeleton />;
  if (!userId) return <SignInPanel />;
  if (loadingHistory) return <AssistantSkeleton />;
  return (
    <ChatExperience
      key={userId}
      userId={userId}
      initialMessages={initialMessages}
    />
  );
}

function ChatExperience({
  userId,
  initialMessages,
}: {
  userId: string;
  initialMessages: UIMessage[];
}) {
  const [mode, setMode] = useState<AssistantMode>("problem");
  const [draft, setDraft] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const modeRef = useRef<AssistantMode>(mode);
  modeRef.current = mode;

  const transport = useMemo(
    () =>
      new DefaultChatTransport<UIMessage>({
        api: "/api/chat",
        headers: async () => {
          const { data } = await supabase.auth.getSession();
          return data.session ? { Authorization: `Bearer ${data.session.access_token}` } : {};
        },
        prepareSendMessagesRequest: ({ messages, headers, api, credentials }) => ({
          api,
          ...(credentials !== undefined ? { credentials } : {}),
          ...(headers !== undefined ? { headers } : {}),
          body: { messages, mode: modeRef.current },
        }),
      }),
    [],
  );

  const { messages, sendMessage, status, stop, error, setMessages, clearError } = useChat({
    id: "one-solve-conversation",
    messages: initialMessages,
    transport,
    onError: (chatError) => toast.error(chatError.message || "The assistant could not respond."),
    onFinish: () => textareaRef.current?.focus(),
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    textareaRef.current?.focus();
  }, [mode]);

  const clearConversation = useCallback(async () => {
    if (busy) stop();
    const { error: clearErrorResult } = await supabase
      .from("ai_chat_messages")
      .delete()
      .eq("user_id", userId);
    if (clearErrorResult) {
      toast.error("Conversation could not be cleared.");
      return;
    }
    setMessages([]);
    clearError();
    setDraft("");
    textareaRef.current?.focus();
  }, [busy, clearError, setMessages, stop, userId]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 shadow-glow">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/50 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-primary-foreground">
            <img src="/logo.png" alt="One Solve" className="size-9 object-contain" />
          </span>
          <div>
            <h1 className="text-base font-semibold">ONE SOLVE AI</h1>
            <p className="flex items-center gap-1.5 text-xs text-success">
              <span className="size-1.5 rounded-full bg-success" /> Ready to solve
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => void clearConversation()}
            aria-label="Clear conversation"
            title="Clear conversation"
          >
            <Trash2 className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => void supabase.auth.signOut()}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>

      <div className="border-b border-border px-4 py-3 sm:px-6">
        <div
          className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1"
          role="tablist"
          aria-label="Assistant mode"
        >
          <ModeButton
            active={mode === "problem"}
            onClick={() => setMode("problem")}
            icon={<Wrench className="size-4" />}
            label="Problem mode"
          />
          <ModeButton
            active={mode === "study"}
            onClick={() => setMode("study")}
            icon={<BookOpen className="size-4" />}
            label="Study mode"
          />
        </div>
      </div>

      <Conversation className="min-h-[26rem]">
        <ConversationContent className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<BrainCircuit className="size-10 text-primary" />}
              title={mode === "problem" ? "Ask me anything" : "What are you studying?"}
              description={
                mode === "problem"
                  ? "Any question or problem — I’ll give you a clear, relevant answer."
                  : "I’ll explain it step by step, and I can answer any other question too."
              }
            />
          ) : (
            messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  {message.parts.map((part, index) =>
                    part.type === "text" ? (
                      <MessageResponse key={`${message.id}-${index}`}>{part.text}</MessageResponse>
                    ) : null,
                  )}
                </MessageContent>
              </Message>
            ))
          )}
          {status === "submitted" ? (
            <Shimmer className="text-sm">Thinking through the problem…</Shimmer>
          ) : null}
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ) : null}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border bg-background/60 p-3 sm:p-5">
        <PromptInput
          className="mx-auto max-w-3xl bg-surface"
          onSubmit={({ text }) => {
            const value = text.trim();
            if (!value || busy) return;
            clearError();
            setDraft("");
            void sendMessage({ text: value });
          }}
        >
          <PromptInputTextarea
            ref={textareaRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={
              mode === "problem" ? "Describe your problem in detail…" : "Ask a study question…"
            }
            className="min-h-24"
            autoFocus
          />
          <PromptInputFooter>
            <PromptInputTools>
              <span className="flex items-center gap-1.5 px-1 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5" /> Saved securely
              </span>
            </PromptInputTools>
            <PromptInputSubmit status={status} onStop={stop} disabled={!draft.trim() && !busy} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      type="button"
      role="tab"
      aria-selected={active}
      variant="ghost"
      onClick={onClick}
      className={cn("h-10", active && "bg-background text-foreground shadow-sm")}
    >
      {icon}
      {label}
    </Button>
  );
}

function SignInPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleEmail = async () => {
    if (!email || !password) return;
    setBusy(true);
    const result = signUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (result.error) toast.error(result.error.message);
    else if (signUp && !result.data.session)
      toast.success("Check your email to confirm your account.");
  };

  const handleGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) toast.error(result.error.message);
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface/60 p-6 shadow-glow sm:p-8">
      <div className="text-center">
        <img
          src="/logo.png"
          alt="One Solve"
          className="mx-auto size-14 rounded-xl bg-primary-foreground object-contain p-1"
        />
        <h1 className="mt-4 text-2xl font-bold">Sign in to ONE SOLVE AI</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your single conversation is saved securely and available when you return.
        </p>
      </div>
      <div className="mt-6 space-y-4">
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full gap-3"
          onClick={() => void handleGoogle()}
        >
          <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.6 17.7 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
            <path fill="#FBBC05" d="M10.4 28.7A14.500 14.500 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.600 10.800l7.800-6.100z" />
            <path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.500-5.800c-2.100 1.400-4.800 2.300-8.400 2.300-6.300 0-11.700-4.100-13.600-9.800l-7.800 6.100C6.500 42.600 14.600 48 24 48z" />
          </svg>
          Continue with Google
        </Button>
        <div className="relative text-center text-xs text-muted-foreground before:absolute before:top-1/2 before:left-0 before:h-px before:w-[44%] before:bg-border after:absolute after:top-1/2 after:right-0 after:h-px after:w-[44%] after:bg-border">
          or
        </div>
        <div className="space-y-2">
          <Label htmlFor="ai-email">Email</Label>
          <Input
            id="ai-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ai-password">Password</Label>
          <Input
            id="ai-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={signUp ? "new-password" : "current-password"}
          />
        </div>
        <Button
          className="w-full"
          disabled={busy || !email || !password}
          onClick={() => void handleEmail()}
        >
          {busy ? "Please wait…" : signUp ? "Create account" : "Sign in"}
        </Button>
        <Button variant="link" className="w-full" onClick={() => setSignUp((value) => !value)}>
          {signUp ? "Already have an account? Sign in" : "New here? Create an account"}
        </Button>
      </div>
    </div>
  );
}

function AssistantSkeleton() {
  return (
    <div className="mx-auto min-h-[70vh] max-w-5xl animate-pulse rounded-2xl border border-border bg-surface/50" />
  );
}
