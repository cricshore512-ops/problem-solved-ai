import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const BASE_URL = "https://connect-an-expert.lovable.app";

export const Route = createFileRoute("/terms")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Terms of Service — One Solve" },
      {
        name: "description",
        content:
          "The terms that govern your use of the One Solve platform, including AI guidance, service requests, and professional matching.",
      },
      { property: "og:title", content: "Terms of Service — One Solve" },
      { property: "og:description", content: "The terms for using the One Solve platform." },
      { property: "og:url", content: `${BASE_URL}/terms` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      subtitle="The rules for using One Solve, in plain language."
      updated="October 2026"
      sections={[
        {
          heading: "The service",
          body: (
            <p>
              One Solve helps you describe a home-service problem, understand it with AI guidance,
              and request a verified local professional in Mumbai. One Solve connects customers and
              professionals; the actual service is performed by the independent professional.
            </p>
          ),
        },
        {
          heading: "AI guidance is not a professional diagnosis",
          body: (
            <p>
              The AI assistant provides general guidance, safety tips, and helps prepare your
              service request. It is not a licensed technician and its suggestions are not a
              confirmed diagnosis or quote. For gas leaks, sparking, fire, or flooding, follow the
              safety steps shown and contact emergency services first.
            </p>
          ),
        },
        {
          heading: "Prices and requests",
          body: (
            <p>
              Prices shown by the assistant come from the One Solve fixed price list per job. A
              service request becomes active only after you review and confirm it in the app. The
              AI can prepare a draft, but it cannot submit, book, or take payment on your behalf.
            </p>
          ),
        },
        {
          heading: "Your responsibilities",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Provide accurate information about your problem and location.</li>
              <li>Do not misuse the platform, spam, or attempt to access other people's data.</li>
              <li>Do not attempt dangerous repairs yourself based on AI guidance.</li>
            </ul>
          ),
        },
        {
          heading: "Accounts",
          body: (
            <p>
              You can chat with the AI without an account. Signing in is required to submit a
              service request so we can link it to you and keep it secure. You are responsible for
              keeping your sign-in credentials safe.
            </p>
          ),
        },
        {
          heading: "Availability",
          body: (
            <p>
              One Solve currently serves Mumbai. We work to keep the platform available and the
              information accurate, but we do not guarantee uninterrupted service or that a
              professional will always be available in your area.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms can be sent through the Contact page. One Solve is
              founded and owned by Sanuj Pandey.
            </p>
          ),
        },
      ]}
      reviewNote="These terms were drafted for the current One Solve service model and should be reviewed by a legal professional before launch at scale."
    />
  );
}
