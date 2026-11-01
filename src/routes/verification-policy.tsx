import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const BASE_URL = "https://connect-an-expert.lovable.app";

export const Route = createFileRoute("/verification-policy")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Professional Verification Policy — One Solve" },
      {
        name: "description",
        content:
          "How One Solve verifies the professionals listed on the platform and what the verified badge means.",
      },
      { property: "og:title", content: "Professional Verification Policy — One Solve" },
      { property: "og:description", content: "What verified means on One Solve." },
      { property: "og:url", content: `${BASE_URL}/verification-policy` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/verification-policy` }],
  }),
  component: VerificationPolicyPage,
});

function VerificationPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Professional Verification Policy"
      subtitle="What the verified badge on a professional actually means."
      updated="October 2026"
      sections={[
        {
          heading: "Who can list on One Solve",
          body: (
            <p>
              Professionals are added to the platform by the One Solve team after review — they
              cannot self-register and appear publicly without approval. Each listing includes the
              professional's name, service category, the Mumbai areas they cover, and their years of
              experience.
            </p>
          ),
        },
        {
          heading: "What verified means",
          body: (
            <p>
              A professional marked as verified has had their identity and work experience checked
              by the One Solve team before being listed. Verification confirms who they are and
              their stated experience — it is not a guarantee of any specific job outcome.
            </p>
          ),
        },
        {
          heading: "What we never do",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>We never invent professionals, ratings, or reviews.</li>
              <li>We never show a professional's phone number publicly — contact happens only after you confirm a request.</li>
              <li>We never claim a professional is available at a specific time unless it has actually been confirmed.</li>
            </ul>
          ),
        },
        {
          heading: "Ongoing standards",
          body: (
            <p>
              Professionals who receive repeated genuine complaints, or who are found to have
              provided false information, are removed from the platform. If you have a concern about
              a professional, report it through the Contact page with your request reference.
            </p>
          ),
        },
        {
          heading: "For professionals",
          body: (
            <p>
              If you are a technician or service provider who wants to join, see the For
              Professionals page for how onboarding works, or write to us through the Contact page
              choosing "A professional who wants to join".
            </p>
          ),
        },
      ]}
    />
  );
}
