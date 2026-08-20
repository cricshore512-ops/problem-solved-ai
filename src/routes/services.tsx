import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Rocket, Wrench, Users } from "lucide-react";
import { CtaLink } from "@/components/site/Cta";
import { FinalCta } from "@/components/site/FinalCta";
import { GlassCard, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Service Ecosystem — Home, Growth & Professional Help | One Solve" },
      {
        name: "description",
        content:
          "One intelligent platform, multiple ways to get help: home services, personal growth experts and specialised professional help — launching with focused home services.",
      },
      { property: "og:title", content: "One Intelligent Platform. Multiple Ways to Get Help." },
      {
        property: "og:description",
        content:
          "Home services, personal growth and professional help — matched by AI to the right verified expert.",
      },
    ],
  }),
  component: ServicesPage,
});

const categories = [
  {
    icon: Wrench,
    title: "Home Services",
    status: "Live at launch",
    tone: "success" as const,
    items: [
      "Electricians",
      "Plumbers",
      "Carpenters",
      "AC services",
      "Appliance repair",
      "Installation",
      "Maintenance",
    ],
  },
  {
    icon: GraduationCap,
    title: "Personal Growth",
    status: "Phase 2",
    tone: "primary" as const,
    items: ["Tutors", "Teachers", "Career guidance", "Mentors", "Coaches"],
  },
  {
    icon: Users,
    title: "Professional Help",
    status: "Phase 2–3",
    tone: "gold" as const,
    items: [
      "Specialized experts",
      "Remote consultations",
      "Technical guidance",
      "Other verified professionals",
    ],
  },
];

const phases = [
  {
    phase: "Phase 1",
    title: "Core Home Services",
    items: ["Electricians", "Plumbers", "Appliance repair", "AC servicing", "Carpenters"],
    focus: ["AI problem detection", "Customer trust", "Professional network", "Smart matching"],
  },
  {
    phase: "Phase 2",
    title: "Remote Expert Network",
    items: [
      "Video consultations",
      "Technical experts",
      "Tutors",
      "Career guidance",
      "Professional consultations",
    ],
    focus: ["Remote-first resolution", "Expert supply growth", "Consultation quality"],
  },
  {
    phase: "Phase 3",
    title: "Intelligent Human Service Ecosystem",
    items: ["More verified categories, added carefully based on customer demand"],
    focus: ["Demand-driven expansion", "Deeper personalisation", "Ecosystem partnerships"],
  },
];

const toneClass = {
  success: "text-success border-success/40 bg-success/10",
  primary: "text-primary border-primary/40 bg-primary/10",
  gold: "text-gold border-gold/40 bg-gold/10",
};

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Service ecosystem"
        title={
          <>
            One Intelligent Platform.{" "}
            <span className="text-gradient">Multiple Ways to Get Help.</span>
          </>
        }
        subtitle="Launching with focused home services. Expanding into a wider expert ecosystem over time."
      >
        <CtaLink to="/ai-assistant" size="lg">
          Tell AI Your Problem
        </CtaLink>
      </PageHero>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 100}>
              <GlassCard className="h-full" glow={i === 0}>
                <div className="flex items-center justify-between gap-3">
                  <cat.icon className="size-6 text-primary" />
                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${toneClass[cat.tone]}`}
                  >
                    {cat.status}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold">{cat.title}</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10" delay={150}>
          <div className="rounded-3xl border border-gold/40 bg-gold/10 p-6 text-center">
            <p className="text-sm font-semibold text-gold">
              Not every category is available immediately.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              We launch with focused home services and expand into a wider expert ecosystem as
              demand and verified supply grow.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section className="border-t border-border bg-surface/30">
        <SectionHeading
          eyebrow="Launch & expansion"
          title="A deliberate growth journey."
          subtitle="Each phase deepens the intelligence of the platform before widening its scope."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {phases.map((p, i) => (
            <Reveal key={p.phase} delay={i * 120}>
              <GlassCard className="h-full" style={undefined}>
                <div
                  className="mb-4 h-1 rounded-full bg-[var(--gradient-brand)]"
                  style={{ width: `${35 + i * 30}%` }}
                />
                <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                  {p.phase}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {p.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Focus
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {p.focus.map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Rocket className="size-4 text-gold" />
          Expansion is demand-driven — new categories open only with verified supply.
        </Reveal>
      </Section>

      <FinalCta />
    </>
  );
}
