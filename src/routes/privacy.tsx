import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const BASE_URL = "https://connect-an-expert.lovable.app";

export const Route = createFileRoute("/privacy")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Privacy Policy — One Solve" },
      {
        name: "description",
        content:
          "How One Solve collects, uses, and protects your personal information, including chat messages, location, and contact details.",
      },
      { property: "og:title", content: "Privacy Policy — One Solve" },
      { property: "og:description", content: "How One Solve handles your personal information." },
      { property: "og:url", content: `${BASE_URL}/privacy` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="How One Solve collects, uses, and protects your information."
      updated="October 2026"
      sections={[
        {
          heading: "Who we are",
          body: (
            <p>
              One Solve is a service platform founded and owned by Sanuj Pandey. It connects
              customers in Mumbai with verified local professionals for home services such as
              plumbing, electrical work, appliance repair, AC service, cleaning, carpentry, pest
              control, and painting.
            </p>
          ),
        },
        {
          heading: "What we collect",
          body: (
            <>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Account details: your email address when you sign in.</li>
                <li>
                  Chat messages: questions you ask the AI assistant are sent to our AI provider to
                  generate an answer. Chats are not saved to your account and are cleared when you
                  leave the page.
                </li>
                <li>
                  Service requests: the problem description, location, urgency, preferred time, and
                  phone number you confirm when submitting a request.
                </li>
                <li>
                  Contact form messages: your name, email, topic, and message when you write to us.
                </li>
              </ul>
              <p>
                We collect only what is needed to understand your problem and connect you with a
                professional. We do not sell your personal information.
              </p>
            </>
          ),
        },
        {
          heading: "How AI processing works",
          body: (
            <p>
              Your chat messages are processed by an AI model through our secure server to
              understand your problem and suggest next steps. Please avoid sharing passwords,
              financial details, or other highly sensitive information in the chat. AI suggestions
              are guidance, not a professional diagnosis.
            </p>
          ),
        },
        {
          heading: "Who can see your information",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Professionals never see your phone number until you confirm a service request.</li>
              <li>Only you can see your own service requests.</li>
              <li>Contact form messages are visible only to the One Solve team.</li>
              <li>Professional phone numbers are never shown publicly on the site.</li>
            </ul>
          ),
        },
        {
          heading: "Retention and deletion",
          body: (
            <p>
              Chat history is not stored. Service requests and contact messages are kept while your
              request is active and for a reasonable period afterwards for support and record
              keeping. You can ask us to delete your account and associated data at any time by
              contacting us through the Contact page.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              You can request a copy of the personal information we hold about you, ask us to
              correct it, or ask us to delete it. Contact us through the Contact page and we will
              respond within a reasonable time.
            </p>
          ),
        },
        {
          heading: "Changes to this policy",
          body: (
            <p>
              If we change this policy, we will update the date above. Continued use of the site
              after a change means you accept the updated policy.
            </p>
          ),
        },
      ]}
      reviewNote="This policy was drafted for the current One Solve service model and should be reviewed by a legal professional before relying on it for compliance with applicable Indian law, including the Digital Personal Data Protection Act."
    />
  );
}
