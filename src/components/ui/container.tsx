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
    <section id={id} className={clsx("py-16 sm:py-20 lg:py-28", className)}>
      {children}
    </section>
  );
}

/** Small technical label: an orange tick, then mono caps. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "font-mono-tech inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-accent",
        className
      )}
    >
      <span aria-hidden className="h-px w-8 bg-accent" />
      {children}
    </span>
  );
}
