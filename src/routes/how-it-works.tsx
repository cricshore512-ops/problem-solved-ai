import { createFileRoute } from "@tanstack/react-router";
import {
  Brain,
  CheckCircle2,
  Home,
  MessageSquare,
  MessagesSquare,
  Sparkles,
  Upload,
  Video,
} from "lucide-react";
import matchingImage from "@/assets/matching.jpg";
import { CtaLink } from "@/components/site/Cta";
import { FinalCta } from "@/components/site/FinalCta";
import { GlassCard, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — AI Problem Discovery | One Solve" },
      {
        name: "description",
        content:
          "Six steps from problem to resolution: describe it, AI analyses it, upload media, smart matching finds your expert, choose chat, video or a home visit.",
      },
      { property: "og:title", content: "How One Solve Works" },
      {
        property: "og:description",
        content:
          "Tell us the problem, AI analyses and matches you with the right verified professional.",
      },
    ],
  }),
  component: HowItWorksPage,
});

const steps = [
  {
    icon: MessagesSquare,
    title: "Tell Us the Problem",
    text: "Describe the issue naturally, in your own words.",
    detail: '"My refrigerator is not cooling."',
    bullets: ["No categories to browse", "Voice or text", "Any language of description"],
  },
  {
    icon: Brain,
    title: "AI Analysis",
    text: "The AI asks intelligent follow-up questions to understand the issue.",
    detail: "Smart diagnostic questioning",
    bullets: [
      "When did the problem start?",
      "Is the refrigerator light working?",
      "Do you hear any unusual sound?",
    ],
  },
  {
    icon: Upload,
    title: "Information Gathering",
    text: "Add photos, videos and extra details while the AI analyses them.",
    detail: "Media understanding",
    bullets: ["Photos", "Videos", "Additional details"],
  },
  {
    icon: Sparkles,
    title: "Smart Matching",
    text: "The AI identifies the required service and finds the most suitable verified professional.",
    detail: "Proximity · Skills · Capacity · Performance",
    bullets: ["Match score calculated", "Verified professionals only", "Best match recommended"],
  },
  {
    icon: MessageSquare,
    title: "Choose Your Solution",
    text: "Pick the path that fits the problem and your schedule.",
    detail: "Three ways to resolve",
    bullets: ["Chat with an Expert", "Video Consultation", "Book a Home Visit"],
  },
  {
    icon: CheckCircle2,
    title: "Problem Solved",
    text: "The expert arrives prepared, the issue is fixed and the resolution is tracked.",
    detail: "Resolution confirmed",
    bullets: ["Service tracking", "Transparent updates", "Rate your expert"],
  },
];

const factors = [
  { icon: "📍", title: "Proximity", text: "How close the professional is to the customer." },
  { icon: "🛠", title: "Skills", text: "Relevant expertise for the specific problem." },
  { icon: "📅", title: "Capacity", text: "Availability and current workload." },
  { icon: "⭐", title: "Performance", text: "Ratings, reliability and service history." },
];

const matches = [
  { name: "Professional A", score: 82 },
  { name: "Professional B", score: 96, best: true },
  { name: "Professional C", score: 74 },
];

function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="AI-powered problem discovery"
        title={
          <>
            AI Understands. The Right Expert Connects.{" "}
            <span className="text-gradient">The Problem Gets Solved.</span>
          </>
        }
        subtitle="A single guided flow replaces browsing dozens of service categories."
      >
        <CtaLink to="/ai-assistant" size="lg">
          Tell AI Your Problem
        </CtaLink>
      </PageHero>

      <Section>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 hidden w-px bg-gradient-to-b from-primary via-violet to-success md:block" />
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 80}>
                <div className="flex gap-5">
                  <div className="relative hidden shrink-0 md:block">
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-primary/40 bg-surface text-sm font-bold text-primary shadow-glow">
                      {i + 1}
                    </span>
                  </div>
                  <GlassCard className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <step.icon className="size-6 text-primary" />
                      <h2 className="text-xl font-semibold">
                        <span className="md:hidden">Step {i + 1} — </span>
                        {step.title}
                      </h2>
                      <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                        {step.detail}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{step.text}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                      {step.bullets.map((b) => (
                        <li
                          key={b}
                          className="rounded-xl border border-border bg-background/40 px-3 py-2 text-xs text-muted-foreground"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="border-y border-border bg-surface/30">
        <SectionHeading
          eyebrow="Smart matching"
          title="AI Finds the Right Professional."
          subtitle="A central matching engine weighs every relevant signal and recommends the strongest match."
        />
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {factors.map((f) => (
                <GlassCard key={f.title} className="h-full">
                  <span className="text-2xl">{f.icon}</span>
                  <h3 className="mt-3 text-base font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.text}</p>
                </GlassCard>
              ))}
            </div>
            <GlassCard className="mt-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Finding the best match...
              </p>
              <div className="mt-4 space-y-3">
                {matches.map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <span className="w-28 text-xs">{m.name}</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <span
                        className={`block h-full rounded-full ${m.best ? "bg-success" : "bg-primary/70"}`}
                        style={{ width: `${m.score}%` }}
                      />
                    </span>
                    <span
                      className={`w-16 text-right text-xs font-semibold ${m.best ? "text-success" : "text-muted-foreground"}`}
                    >
                      {m.score}% {m.best ? "✓" : ""}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={120} className="overflow-hidden rounded-3xl border border-border">
            <img
              src={matchingImage}
              alt="AI matching engine analysing proximity, skills, availability and performance to highlight the best professional"
              loading="lazy"
              width={1408}
              height={1008}
              className="w-full object-cover"
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Your expert arrives prepared"
          title="Every conversation becomes a professional brief."
          subtitle="The AI turns your chat and uploads into a structured summary the professional reads before contacting you."
        />
        <Reveal className="mt-12">
          <GlassCard glow className="p-0">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <p className="text-sm font-semibold">Job Brief · #OS-2481</p>
              <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                96% Match
              </span>
            </div>
            <div className="grid gap-6 p-6 md:grid-cols-3">
              <div>
                <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                  Customer issue
                </p>
                <p className="mt-2 text-lg font-semibold">Refrigerator Not Cooling</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Customer uploaded: 2 photos + 1 video
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                  AI summary
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  <li>Problem started: 2 days ago</li>
                  <li>Refrigerator light: Working</li>
                  <li>Unusual sound: Reported</li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl border border-gold/40 bg-gold/10 p-3">
                  <p className="text-xs font-semibold text-gold">Possible issue</p>
                  <p className="text-sm text-muted-foreground">
                    Cooling system or compressor-related problem.
                  </p>
                </div>
                <div className="rounded-2xl border border-success/40 bg-success/10 p-3">
                  <p className="text-xs font-semibold text-success">Recommended professional</p>
                  <p className="text-sm text-muted-foreground">Appliance Repair Technician</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: MessageSquare, title: "Chat with an Expert" },
            { icon: Video, title: "Video Consultation" },
            { icon: Home, title: "Book a Home Visit" },
          ].map((o, i) => (
            <Reveal key={o.title} delay={i * 90}>
              <GlassCard className="flex h-full items-center gap-3">
                <o.icon className="size-5 text-primary" />
                <span className="font-semibold">{o.title}</span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
