import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";
import { CtaButton } from "@/components/site/Cta";
import { FinalCta } from "@/components/site/FinalCta";
import { GlassCard, PageHero, Section } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { sendContactMessage } from "@/lib/contact.functions";

const BASE_URL = "https://connect-an-expert.lovable.app";

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Contact One Solve — Talk to Our Team" },
      {
        name: "description",
        content:
          "Contact the One Solve team about customer support, joining as a verified professional, or partnership opportunities.",
      },
      { property: "og:title", content: "Contact One Solve" },
      {
        property: "og:description",
        content: "Questions, partnerships or joining as a professional — we'd love to hear from you.",
      },
      { property: "og:url", content: `${BASE_URL}/contact` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/contact` }],
  }),
  component: ContactPage,
});

const TOPICS = [
  { value: "customer", label: "A customer needing help" },
  { value: "professional", label: "A professional who wants to join" },
  { value: "partner", label: "A partner or brand" },
  { value: "other", label: "Something else" },
] as const;

function ContactPage() {
  const send = useServerFn(sendContactMessage);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setLoading(true);
    setError(null);
    try {
      await send({
        data: {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          topic: String(data.get("topic") ?? "other") as "customer" | "professional" | "partner" | "other",
          message: String(data.get("message") ?? ""),
          website: String(data.get("website") ?? ""),
        },
      });
      form.reset();
      setSent(true);
      toast.success("Message sent — we'll be in touch soon.");
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Your message could not be sent. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's <span className="text-gradient">talk</span>.
          </>
        }
        subtitle="Whether you need help, want to join as a verified professional, or want to partner with us — send a message and our team will get back to you."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <GlassCard glow>
              {sent ? (
                <div className="flex flex-col items-center gap-3 py-14 text-center">
                  <CheckCircle2 className="size-10 text-success" />
                  <h2 className="text-xl font-semibold">Message received</h2>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Thanks for reaching out. Our team will respond shortly.
                  </p>
                  <CtaButton variant="ghost" onClick={() => setSent(false)}>
                    Send another message
                  </CtaButton>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" name="name" placeholder="Your name" maxLength={100} />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      maxLength={255}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="topic"
                      className="mb-1.5 block text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                    >
                      I am
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
                    >
                      {TOPICS.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={5}
                      placeholder="Tell us about your problem or proposal..."
                      className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                    />
                  </div>
                  {/* Honeypot: hidden from real users, catches bots. */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  {error && (
                    <p role="alert" className="text-sm text-destructive">
                      {error}
                    </p>
                  )}
                  <CtaButton type="submit" size="lg" disabled={loading} className="w-full">
                    {loading ? "Sending..." : "Send message"}
                  </CtaButton>
                </form>
              )}
            </GlassCard>
          </Reveal>

          <div className="space-y-4">
            {[
              {
                icon: MessageSquare,
                title: "Start with the AI",
                text: "The fastest path to a solution is describing your problem to the assistant.",
              },
              { icon: Mail, title: "Email", text: "hello@onesolve.ai" },
              { icon: Phone, title: "Support hours", text: "Every day, 8:00 – 22:00" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <GlassCard>
                  <item.icon className="size-5 text-primary" />
                  <h2 className="mt-3 text-base font-semibold">{item.title}</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.text}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-semibold tracking-wide text-muted-foreground uppercase"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
      />
    </div>
  );
}
