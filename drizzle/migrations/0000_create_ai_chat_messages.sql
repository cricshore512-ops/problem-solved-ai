CREATE TABLE public.ai_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  message_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  parts JSONB NOT NULL DEFAULT '[]'::jsonb,
  mode TEXT NOT NULL CHECK (mode IN ('problem', 'study')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, message_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_chat_messages TO authenticated;
GRANT ALL ON public.ai_chat_messages TO service_role;

ALTER TABLE public.ai_chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own AI messages"
ON public.ai_chat_messages FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own AI messages"
ON public.ai_chat_messages FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI messages"
ON public.ai_chat_messages FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AI messages"
ON public.ai_chat_messages FOR DELETE TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX ai_chat_messages_user_created_idx
ON public.ai_chat_messages (user_id, created_at);