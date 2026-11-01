import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const BASE_URL = "https://connect-an-expert.lovable.app";

export const Route = createFileRoute("/cancellation-refund")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Cancellation & Refund Policy — One Solve" },
      {
        name: "description",
        content:
          "How to cancel a One Solve service request and how refunds are handled.",
      },
      { property: "og:title", content: "Cancellation & Refund Policy — One Solve" },
      { property: "og:description", content: "How cancellations and refunds work on One Solve." },
      { property: "og:url", content: `${BASE_URL}/cancellation-refund` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/cancellation-refund` }],
  }),
  component: CancellationRefundPage,
});

function CancellationRefundPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cancellation & Refund Policy"
      subtitle="What happens if you need to cancel a service or something goes wrong."
      updated="October 2026"
      sections={[
        {
          heading: "Cancelling a request",
          body: (
            <p>
              You can cancel a service request before a professional has been assigned or started
              the job by contacting us through the Contact page with your request reference number
              (it looks like OS-XXXXXXXX). The earlier you cancel, the easier it is for everyone.
            </p>
          ),
        },
        {
          heading: "After a professional is assigned",
          body: (
            <p>
              If a professional has already been assigned or is on the way, please contact support
              immediately. We will do our best to cancel without charge, but a visit fee may apply
              if the professional has already travelled to your location.
            </p>
          ),
        },
        {
          heading: "Refunds",
          body: (
            <p>
              If you paid for a service that was not delivered, or was delivered incorrectly,
              contact us with your request reference and a description of the problem. Genuine
              refund requests are reviewed case by case and approved refunds are returned to the
              original payment method.
            </p>
          ),
        },
        {
          heading: "If a professional cancels",
          body: (
            <p>
              If a professional cannot attend, we will try to match you with another professional
              or help you reschedule. If neither works for you, any amount paid for the undelivered
              service is refunded.
            </p>
          ),
        },
        {
          heading: "Disputes",
          body: (
            <p>
              If you are unhappy with a completed job, tell us within 48 hours through the Contact
              page. We will review the job details with you and the professional and work towards a
              fair resolution.
            </p>
          ),
        },
      ]}
      reviewNote="Specific cancellation windows, visit-fee amounts, and refund timelines are business decisions the owner should confirm; this page describes the current intent and should be updated once final terms are set."
    />
  );
}
