import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Clock,
  Compass,
  Home as HomeIcon,
  MessageSquare,
  Network,
  Sparkles,
  UserSearch,
  Video,
} from "lucide-react";
import heroImage from "@/assets/hero-ai.jpg";
import futureImage from "@/assets/future.jpg";
import { AiAssistantDemo } from "@/components/site/AiAssistantDemo";
import { CtaLink } from "@/components/site/Cta";
import { Container, GlassCard, Section, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One Solve — Don't Search for a Service. Just Tell Us Your Problem." },
      {
        name: "description",
        content:
          "An AI-first service platform. Describe your problem, our AI gathers the details and connects you with the right verified expert through chat, video, or an in-person visit.",
      },
      { property: "og:title", content: "One Solve — AI-Powered Service Platform" },
      {
        property: "og:description",
        content:
          "AI Understands. The Right Expert Connects. The Problem Gets Solved.",
      },
    ],
  }),
  component: HomePage,
});

const frictions = [
  {
    icon: Clock,
    title: "Inefficiency",
    text: "Physical visits are sometimes required even for small problems.",
  },
  {
    icon: Brain,
    title: "Information Gap",
    text: "Professionals often arrive without a complete understanding of the issue.",
  },
  {
    icon: UserSearch,
    title: "Time Drain",
    text: "Customers waste time searching for the right professional.",
  },
  {
    icon: Compass,
    title: "Category Confusion",
    text: "You may not know if you need an electrician, technician, plumber, or another expert.",
  },
];

const visionCards = [
  {
    icon: Network,
    title: "Intelligent Network",
    text: "AI intelligently connects people and professionals across the whole ecosystem.",
  },
  {
    icon: Sparkles,
    title: "Frictionless Search",
    text: "Users no longer need to manually search through endless service categories.",
  },
  {
    icon: Brain,
    title: "Personalized Assistance",
    text: "The platform understands the individual problem and recommends the right path.",
  },
];

function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-glow">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-rise space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              <span className="size-1.5 rounded-full bg-success animate-pulse-glow" />
              AI-first service platform
            </span>
            <h1 className="text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
              Don't Search for a Service.
              <br />
              <span className="text-gradient">Just Tell Us Your Problem.</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Our AI understands your problem, gathers the right information, and connects you
              with the right verified expert — through chat, video, or in-person service.
            </p>
            <div className="flex flex-wrap gap-3">
              <CtaLink to="/ai-assistant" size="lg">
                Tell AI Your Problem <ArrowRight className="size-4" />
              </CtaLink>
              <CtaLink to="/how-it-works" variant="ghost" size="lg">
                How It Works
              </CtaLink>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={heroImage}
                alt="Customer talking to the One Solve AI assistant, which connects to verified electricians, plumbers, technicians and remote experts"
                width={1600}
                height={1104}
                className="w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <AiAssistantDemo compact />
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeading
          eyebrow="The friction today"
          title="Getting Help Shouldn't Be This Difficult."
          subtitle="Traditional directories force you to diagnose your own problem before you can even start."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {frictions.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <GlassCard className="h-full">
                <item.icon className="size-6 text-gold" />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center" delay={200}>
          <p className="text-2xl font-bold sm:text-3xl">
            We Remove the Friction With <span className="text-gradient">AI</span>.
          </p>
        </Reveal>
      </Section>

      <Section className="border-y border-border bg-surface/30">
        <SectionHeading
          eyebrow="Your journey"
          title="One conversation replaces the entire search."
          subtitle="From the first sentence you type to a solved problem — the AI carries the context the whole way."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: MessageSquare,
              title: "Chat with an Expert",
              text: "Quick questions answered in minutes by a verified professional.",
            },
            {
              icon: Video,
              title: "Video Consultation",
              text: "Show the problem live and get guided troubleshooting instantly.",
            },
            {
              icon: HomeIcon,
              title: "Book a Home Visit",
              text: "When hands-on work is needed, the expert arrives already briefed.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <GlassCard className="h-full" glow={i === 1}>
                <item.icon className="size-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex justify-center" delay={220}>
          <CtaLink to="/how-it-works" variant="ghost" size="lg">
            See the full 6-step flow <ArrowRight className="size-4" />
          </CtaLink>
        </Reveal>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Future vision"
          title="The Future of Human Services"
          subtitle="A world where the right help is always just a conversation away."
        />
        <Reveal className="mt-12 overflow-hidden rounded-3xl border border-border">
          <img
            src={futureImage}
            alt="Visualization of an intelligent human service network connecting people to verified experts"
            loading="lazy"
            width={1600}
            height={912}
            className="w-full object-cover"
          />
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {visionCards.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <GlassCard className="h-full">
                <item.icon className="size-6 text-success" />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-hero-glow">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
      <Container className="relative py-24 text-center">
        <Reveal className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-3xl leading-tight font-bold sm:text-5xl">
            Don't Search for a Service.
            <br />
            <span className="text-gradient">Just Tell Us Your Problem.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            AI Understands. The Right Expert Connects. The Problem Gets Solved.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CtaLink to="/ai-assistant" size="lg">
              Try the AI Assistant <ArrowRight className="size-4" />
            </CtaLink>
            <CtaLink to="/for-professionals" variant="gold" size="lg">
              Join as a Professional
            </CtaLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
