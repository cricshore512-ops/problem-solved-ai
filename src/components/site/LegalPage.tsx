import type { ReactNode } from "react";
import { Container, PageHero } from "./Primitives";

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

export function LegalPage({
  eyebrow,
  title,
  subtitle,
  updated,
  sections,
  reviewNote,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  updated: string;
  sections: LegalSection[];
  reviewNote?: string;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <Container className="max-w-3xl py-14 sm:py-20">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          Last updated: {updated}
        </p>
        <div className="mt-8 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </div>
            </section>
          ))}
        </div>
        {reviewNote ? (
          <p className="mt-12 rounded-2xl border border-border bg-surface/60 p-4 text-xs text-muted-foreground">
            {reviewNote}
          </p>
        ) : null}
      </Container>
    </>
  );
}
