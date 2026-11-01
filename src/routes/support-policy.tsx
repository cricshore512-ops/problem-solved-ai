import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const BASE_URL = "https://connect-an-expert.lovable.app";

export const Route = createFileRoute("/support-policy")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Customer Support & Complaints — One Solve" },
      {
        name: "description",
        content:
          "How to reach One Solve support, what to expect, and how complaints are handled.",
      },
      { property: "og:title", content: "Customer Support & Complaints — One Solve" },
      { property: "og:description", content: "How One Solve handles support and complaints." },
      { property: "og:url", content: `${BASE_URL}/support-policy` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/support-policy` }],
  }),
  component: SupportPolicyPage,
});

function SupportPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Customer Support & Complaints"
      subtitle="How to reach us and how we handle problems."
      updated="October 2026"
      sections={[
        {
          heading: "How to reach support",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Fastest: describe your problem to the AI assistant — it solves most questions instantly.</li>
              <li>Contact form: use the Contact page for account, billing, or complaint topics.</li>
              <li>Email: hello@onesolve.ai</li>
              <li>Support hours: every day, 8:00 – 22:00 (IST).</li>
            </ul>
          ),
        },
        {
          heading: "What to include",
          body: (
            <p>
              For anything about a specific job, include your request reference number (OS-XXXXXXXX),
              the date, and a short description of what happened. This lets us find your request
              quickly and avoids back-and-forth.
            </p>
          ),
        },
        {
          heading: "How complaints are handled",
          body: (
            <ol className="list-decimal space-y-1.5 pl-5">
              <li>We acknowledge your complaint and log it against your request.</li>
              <li>We review the job details, chat summary, and any photos you share.</li>
              <li>We contact the professional for their side where relevant.</li>
              <li>We come back to you with a resolution: a fix, a re-visit, a refund review, or a clear explanation.</li>
            </ol>
          ),
        },
        {
          heading: "Response times",
          body: (
            <p>
              We aim to acknowledge every message within one working day and resolve most issues
              within a few working days. Urgent safety issues are prioritised.
            </p>
          ),
        },
        {
          heading: "Escalation",
          body: (
            <p>
              If you are not satisfied with the first response, reply and ask for your complaint to
              be escalated — it will be reviewed directly by the founder's office.
            </p>
          ),
        },
      ]}
    />
  );
}
