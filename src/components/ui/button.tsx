import Link from "next/link";
import clsx from "clsx";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary:
    "bg-surface-2 text-foreground border border-border-strong hover:bg-surface hover:border-accent",
  ghost: "text-foreground hover:bg-surface",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm min-h-11",
  lg: "px-6 py-3.5 text-base min-h-12",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={clsx(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}
