import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-primary-foreground shadow-glow hover:scale-[1.03] hover:brightness-110 active:scale-100",
        gold: "bg-gold text-background hover:scale-[1.03] hover:brightness-110",
        ghost:
          "glass text-foreground hover:border-primary/60 hover:text-primary hover:-translate-y-0.5",
        success: "bg-success text-primary-foreground hover:scale-[1.03] hover:brightness-110",
      },
      size: {
        md: "px-5 py-2.5 text-sm",
        lg: "px-7 py-3.5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CtaProps = VariantProps<typeof ctaVariants> & {
  to: string;
  children: ReactNode;
  className?: string;
};

export function CtaLink({ to, children, variant, size, className }: CtaProps) {
  return (
    <Link to={to} className={cn(ctaVariants({ variant, size }), className)}>
      {children}
    </Link>
  );
}

export function CtaButton({
  children,
  variant,
  size,
  className,
  onClick,
  type = "button",
  disabled,
}: VariantProps<typeof ctaVariants> & {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(ctaVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
}
