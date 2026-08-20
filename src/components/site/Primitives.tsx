import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
      <span className="size-1.5 rounded-full bg-primary animate-pulse-glow" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle ? (
        <p className="text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}

export function GlassCard({
  children,
  className,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass group relative overflow-hidden rounded-3xl p-6 transition-all duration-500",
        "hover:-translate-y-1 hover:border-primary/50",
        glow && "shadow-glow",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-[var(--gradient-brand)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-hero-glow">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <Container className="relative py-20 sm:py-28">
        <div className="flex max-w-3xl flex-col items-start gap-5 animate-rise">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-4xl leading-[1.05] font-bold sm:text-5xl md:text-6xl">{title}</h1>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
          {children}
        </div>
      </Container>
    </header>
  );
}
