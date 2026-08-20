import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Mail, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";
import { CtaButton } from "@/components/site/Cta";
import { FinalCta } from "@/components/site/FinalCta";
import { GlassCard, PageHero, Section } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
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
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

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
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      setSent(true);
                      toast.success("Message sent — we'll be in touch soon.");
                    }, 900);
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" name="name" placeholder="Your name" />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
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
                      <option>A customer needing help</option>
                      <option>A professional who wants to join</option>
                      <option>A partner or brand</option>
                      <option>Something else</option>
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
                      rows={5}
                      placeholder="Tell us about your problem or proposal..."
                      className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                    />
                  </div>
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
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
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
        placeholder={placeholder}
        className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
      />
    </div>
  );
}
