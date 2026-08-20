import { createFileRoute } from "@tanstack/react-router";
import { Eye, Globe2, Timer, Wallet, Zap } from "lucide-react";
import videoImage from "@/assets/video-consult.jpg";
import { CtaLink } from "@/components/site/Cta";
import { FinalCta } from "@/components/site/FinalCta";
import { GlassCard, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/video-consultation")({
  head: () => ({
    meta: [
      { title: "Video Consultation with Verified Experts | One Solve" },
      {
        name: "description",
        content:
          "Sometimes you don't need a visit — you need the right expert. Show the problem live, get instant guidance and avoid unnecessary home visits.",
      },
      { property: "og:title", content: "Sometimes You Don't Need a Visit." },
      {
        property: "og:description",
        content:
          "Live video consultations with verified professionals: faster support, lower cost, real-time visual inspection.",
      },
    ],
  }),
  component: VideoConsultationPage,
});

const benefits = [
  { icon: Timer, title: "Faster Support", text: "Get immediate assistance." },
  { icon: Wallet, title: "Lower Cost", text: "Avoid unnecessary physical visits." },
  { icon: Eye, title: "Visual Inspection", text: "Show the expert the problem in real time." },
  { icon: Zap, title: "Instant Guidance", text: "Receive troubleshooting and advice immediately." },
  {
    icon: Globe2,
    title: "Global Reach",
    text: "Connect with the right expertise regardless of location, where applicable.",
  },
];

function VideoConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Remote expert consultation"
        title={
          <>
            Sometimes You Don't Need a Visit.
            <br />
            <span className="text-gradient">You Just Need the Right Expert.</span>
          </>
        }
        subtitle="Connect face-to-face with a verified professional, show the problem live and resolve it without waiting for a technician to arrive."
      >
        <CtaLink to="/ai-assistant" size="lg">
          Talk to an Expert
        </CtaLink>
      </PageHero>

      <Section>
        <Reveal className="overflow-hidden rounded-3xl border border-border shadow-glow">
          <img
            src={videoImage}
            alt="Customer on a video consultation with a verified appliance repair professional"
            loading="lazy"
            width={1408}
            height={1008}
            className="w-full object-cover"
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 90}>
              <GlassCard className="h-full">
                <b.icon className="size-6 text-primary" />
                <h2 className="mt-4 text-lg font-semibold">{b.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border bg-surface/30">
        <SectionHeading
          eyebrow="How a consultation runs"
          title="From problem to guidance in minutes."
          subtitle="The AI briefs the expert before the call starts, so no time is spent re-explaining."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {[
            { step: "01", title: "Describe", text: "Tell the AI what's wrong." },
            { step: "02", title: "Match", text: "A verified remote expert is selected." },
            { step: "03", title: "Call", text: "Show the issue on camera live." },
            { step: "04", title: "Resolve", text: "Fix it yourself or escalate to a visit." },
          ].map((s, i) => (
            <Reveal key={s.step} delay={i * 100}>
              <GlassCard className="h-full">
                <span className="text-sm font-bold text-gradient">{s.step}</span>
                <h3 className="mt-2 text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex justify-center" delay={200}>
          <CtaLink to="/ai-assistant" size="lg">
            Talk to an Expert
          </CtaLink>
        </Reveal>
      </Section>

      <FinalCta />
    </>
  );
}
