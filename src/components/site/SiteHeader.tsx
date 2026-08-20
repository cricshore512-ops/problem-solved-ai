import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/one-solve-logo.png.asset.json";
import { CtaLink } from "./Cta";
import { Container } from "./Primitives";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/services", label: "Services" },
  { to: "/for-professionals", label: "For Professionals" },
  { to: "/video-consultation", label: "Video Consultation" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass border-b border-border" : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl bg-white">
            <img src={logoAsset.url} alt="One Solve logo" className="size-8 object-contain" />
            <span className="pointer-events-none absolute inset-0 rounded-xl bg-brand blur-md opacity-30 animate-pulse-glow" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            ONE <span className="text-gradient">SOLVE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-primary bg-surface/70" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink to="/ai-assistant" className="hidden sm:inline-flex">
            Tell AI Your Problem
          </CtaLink>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="glass flex size-10 items-center justify-center rounded-xl lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="glass border-t border-border lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground"
              >
                {link.label}
              </Link>
            ))}
            <CtaLink to="/ai-assistant" className="mt-2 w-full">
              Tell AI Your Problem
            </CtaLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
