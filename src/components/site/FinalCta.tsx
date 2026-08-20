import { ArrowRight } from "lucide-react";
import { CtaLink } from "./Cta";
import { Container } from "./Primitives";
import { Reveal } from "./Reveal";

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
