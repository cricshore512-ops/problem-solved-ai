import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart3, Briefcase, CheckCircle2, ShieldCheck, Users } from "lucide-react";
import matchingImage from "@/assets/matching.jpg";
import { CtaLink } from "@/components/site/Cta";
import { FinalCta } from "@/components/site/FinalCta";
import { GlassCard, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/for-professionals")({
  head: () => ({
    meta: [
      { title: "For Professionals — AI-Briefed Jobs & Smart Matching | One Solve" },
      {
        name: "description",
        content:
          "Join One Solve as a verified professional: receive AI-generated job summaries, manage availability, run video consultations and grow with smart matching.",
      },
      { property: "og:title", content: "Join One Solve as a Professional" },
      {
        property: "og:description",
        content:
          "AI-generated job briefs, smart matching, video consultations and transparent performance tracking.",
      },
    ],
  }),
  component: ForProfessionalsPage,
});

const tabs = [
  {
    id: "customer",
    label: "Customer",
    icon: Users,
    items: [
      "Explain problem",
      "Talk to AI",
      "Upload media",
      "Chat with experts",
      "Video consultation",
      "Book services",
      "Track service",
    ],
  },
  {
    id: "professional",
    label: "Professional",
    icon: Briefcase,
    items: [
      "Receive AI-generated job summaries",
      "Manage availability",
      "Accept jobs",
      "Chat with customers",
      "Video consultation",
      "View earnings",
      "Track performance",
    ],
  },
  {
    id: "admin",
    label: "Admin",
    icon: ShieldCheck,
    items: [
      "Monitor active services",
      "Manage professionals",
      "Review AI conversations",
      "Handle escalations",
      "Track performance",
      "Analyze customer satisfaction",
    ],
  },
];

const revenue = [
  {
    title: "Transaction Fees",
    text: "Commission or platform fee from completed services.",
  },
  { title: "Video Consultations", text: "Revenue from remote expert consultations." },
  { title: "Subscription", text: "Premium customer plans and professional tools." },
  {
    title: "Partnerships",
    text: "Future collaborations with brands, service providers and businesses.",
  },
];

function ForProfessionalsPage() {
  const [active, setActive] = useState<string>(tabs[1]!.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[1]!;

  return (
    <>
      <PageHero
        eyebrow="For professionals"
        title={
          <>
            Fewer wasted trips. <span className="text-gradient">Better matched jobs.</span>
          </>
        }
        subtitle="Every job arrives as a structured AI brief — problem, history, media and a likely diagnosis — so you show up prepared and finish faster."
      >
        <div className="flex flex-wrap gap-3">
          <CtaLink to="/contact" variant="gold" size="lg">
            Join as a Professional
          </CtaLink>
          <CtaLink to="/how-it-works" variant="ghost" size="lg">
            See how matching works
          </CtaLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Three-sided platform"
          title="One ecosystem, three experiences."
          subtitle="Customers, professionals and the operations team all work from the same intelligent layer."
        />
        <Reveal className="mt-10">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                  tab.id === active
                    ? "border-primary/60 bg-primary/15 text-primary shadow-glow"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                <tab.icon className="size-4" />
                {tab.label}
              </button>
            ))}
          </div>
          <GlassCard className="mt-6">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {current.items.map((item) => (
                <li
                  key={item}
                  className="flex animate-rise items-center gap-2 rounded-xl border border-border bg-background/40 px-4 py-3 text-sm"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </Section>

      <Section className="border-y border-border bg-surface/30">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Smart matching"
              title="Jobs that actually fit you."
              subtitle="The engine weighs proximity, skills, capacity and performance, so you receive work that matches your expertise and schedule."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Match score before you accept",
                "Availability you control",
                "Transparent earnings",
                "Performance and reliability tracking",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="overflow-hidden rounded-3xl border border-border">
            <img
              src={matchingImage}
              alt="Professional dashboard showing AI match analysis and job scores"
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
          eyebrow="Business model"
          title="Multiple Scalable Revenue Streams"
          subtitle="A sustainable model that aligns the platform, professionals and customers."
        />
        <div className="relative mt-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {revenue.map((r, i) => (
              <Reveal key={r.title} delay={i * 90}>
                <GlassCard className="h-full">
                  <BarChart3 className="size-5 text-gold" />
                  <h3 className="mt-3 text-base font-semibold">{r.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{r.text}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 flex justify-center" delay={200}>
            <div className="glass rounded-3xl px-8 py-5 text-center shadow-glow">
              <p className="text-xs tracking-[0.18em] text-primary uppercase">Central engine</p>
              <p className="mt-1 text-lg font-bold">The One Solve AI Platform</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
