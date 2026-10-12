import { createFileRoute } from "@tanstack/react-router";
import { Brain, Network, Sparkles } from "lucide-react";
import futureImage from "@/assets/future.jpg";
import { CtaLink } from "@/components/site/Cta";
import { FinalCta } from "@/components/site/FinalCta";
import { GlassCard, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About One Solve — The Future of Human Services" },
      {
        name: "description",
        content:
          "One Solve is building an intelligent human service network where the right help is always just a conversation away — AI-first matching for verified experts.",
      },
      { property: "og:title", content: "About One Solve" },
      {
        property: "og:description",
        content: "A world where the right help is always just a conversation away.",
      },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    icon: Network,
    title: "Intelligent Network",
    text: "AI intelligently connects people and professionals.",
  },
  {
    icon: Sparkles,
    title: "Frictionless Search",
    text: "Users no longer need to manually search through endless categories.",
  },
  {
    icon: Brain,
    title: "Personalized Assistance",
    text: "The platform understands the individual problem and recommends the right path.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About One Solve"
        title={
          <>
            The Future of <span className="text-gradient">Human Services</span>
          </>
        }
        subtitle={
          <>
            A world where the right help is always just a conversation away. Founded and owned by
            Sanuj Pandey.
          </>
        }
      >
        <CtaLink to="/contact" variant="ghost" size="lg">
          Get in touch
        </CtaLink>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Our philosophy"
              title="Don't search for a service. Just tell us your problem."
              subtitle="Traditional marketplaces put the diagnostic burden on the customer. One Solve flips it: describe the problem in plain language and let intelligence do the categorising, questioning and matching."
            />
          </Reveal>
          <Reveal delay={120} className="overflow-hidden rounded-3xl border border-border">
            <img
              src={futureImage}
              alt="Intelligent human service network connecting people to verified experts"
              loading="lazy"
              width={1600}
              height={912}
              className="w-full object-cover"
            />
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <GlassCard className="h-full">
                <p.icon className="size-6 text-success" />
                <h2 className="mt-4 text-lg font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border bg-surface/30">
        <SectionHeading
          eyebrow="What we're building"
          title="An AI layer for real-world human help."
          subtitle="Focused at launch, ambitious in direction."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Problem-first", v: "No categories to browse before you get help." },
            { k: "Verified-only", v: "Every professional on the platform is vetted." },
            { k: "Remote-first", v: "Solve it on video when a visit isn't needed." },
            { k: "Context-rich", v: "Experts arrive already briefed by the AI." },
          ].map((item, i) => (
            <Reveal key={item.k} delay={i * 90}>
              <GlassCard className="h-full">
                <h3 className="text-base font-semibold text-gradient">{item.k}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.v}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
