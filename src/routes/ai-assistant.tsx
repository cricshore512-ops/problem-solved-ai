import { createFileRoute } from "@tanstack/react-router";
import { RealAiAssistant } from "@/components/site/RealAiAssistant";
import { Section } from "@/components/site/Primitives";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AiAssistantPage,
});

function AiAssistantPage() {
  return (
    <Section className="bg-hero-glow pt-8 sm:pt-12">
      <RealAiAssistant />
    </Section>
  );
}
