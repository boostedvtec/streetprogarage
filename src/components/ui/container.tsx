import clsx from "clsx";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={clsx("py-16 sm:py-20 lg:py-24", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
      {children}
    </span>
  );
}
