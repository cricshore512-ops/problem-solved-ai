import { createFileRoute } from "@tanstack/react-router";
import { Camera, FileText, ShieldCheck } from "lucide-react";
import { AiAssistantDemo } from "@/components/site/AiAssistantDemo";
import { GlassCard, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { FinalCta } from "./index";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "Try the AI Service Assistant | One Solve" },
      {
        name: "description",
        content:
          "Describe your problem and watch the One Solve AI ask smart follow-up questions, analyse your media and match you with the right verified professional.",
      },
      { property: "og:title", content: "Try the AI Service Assistant | One Solve" },
      {
        property: "og:description",
        content:
          "Experience the AI-first service journey: describe, analyse, match, and choose chat, video or a home visit.",
      },
    ],
  }),
  component: AiAssistantPage,
});

const briefLines = [
  "Problem started: 2 days ago",
  "Refrigerator light: Working",
  "Unusual sound: Reported",
  "Customer uploaded: 2 photos + 1 video",
];

function AiAssistantPage() {
  return (
    <>
      <PageHero
        eyebrow="Interactive demo"
        title={
          <>
            Try the <span className="text-gradient">AI Service Assistant</span>
          </>
        }
        subtitle="Describe your problem in plain language. The assistant asks the right follow-up questions, forms a diagnosis and recommends how to solve it."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <AiAssistantDemo />
          <div className="space-y-5">
            <Reveal>
              <GlassCard glow>
                <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                  Customer issue
                </p>
                <h2 className="mt-2 text-2xl font-bold">Refrigerator Not Cooling</h2>
                <p className="mt-4 text-sm font-semibold">AI Summary</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {briefLines.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 rounded-full bg-primary" />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-2xl border border-gold/40 bg-gold/10 p-4">
                  <p className="text-sm font-semibold text-gold">Possible issue</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Cooling system or compressor-related problem.
                  </p>
                </div>
                <div className="mt-3 rounded-2xl border border-success/40 bg-success/10 p-4">
                  <p className="text-sm font-semibold text-success">Recommended professional</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Appliance Repair Technician
                  </p>
                </div>
              </GlassCard>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Camera,
                  title: "Media analysis",
                  text: "Photos and videos are analysed to enrich the diagnosis.",
                },
                {
                  icon: FileText,
                  title: "Structured brief",
                  text: "Every conversation becomes a clean professional brief.",
                },
                {
                  icon: ShieldCheck,
                  title: "Verified experts",
                  text: "Only vetted professionals receive your job.",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <GlassCard className="h-full">
                    <item.icon className="size-5 text-primary" />
                    <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{item.text}</p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border bg-surface/30">
        <SectionHeading
          eyebrow="What happens next"
          title="AI Understands. The Right Expert Connects. The Problem Gets Solved."
          subtitle="Once the analysis is complete you choose the path that fits: a quick chat, a live video consultation, or a fully briefed home visit."
        />
      </Section>

      <FinalCta />
    </>
  );
}
