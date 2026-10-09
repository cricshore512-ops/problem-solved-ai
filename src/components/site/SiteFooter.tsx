import { Link } from "@tanstack/react-router";
import { Container } from "./Primitives";

const groups = [
  {
    title: "Platform",
    links: [
      { to: "/how-it-works", label: "How It Works" },
      { to: "/ai-assistant", label: "AI Assistant" },
      { to: "/services", label: "Services" },
      { to: "/video-consultation", label: "Video Consultation" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/for-professionals", label: "For Professionals" },
      { to: "/contact", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-surface/40">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center overflow-hidden rounded-xl bg-white">
              <img src="/logo.png" alt="One Solve logo" className="size-8 object-contain" />
            </span>
            <span className="font-display text-lg font-bold">
              ONE <span className="text-gradient">SOLVE</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Don't search for a service. Just tell us your problem. AI understands, the right
            expert connects, the problem gets solved.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Founded & owned by{" "}
            <span className="font-semibold text-foreground">Anuj Pandey</span>
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              {group.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} One Solve. All rights reserved. Owned by Anuj Pandey.</p>
        <p>Launching with focused home services. Expanding into a wider expert ecosystem.</p>
      </Container>
    </footer>
  );
}
