import Link from "next/link";
import clsx from "clsx";

type LogoProps = {
  className?: string;
  markOnly?: boolean;
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Street PRO Garage badge — turbo housing feeding a datalog trace"
    >
      {/* Volute "snail" turbo housing */}
      <path
        d="M64,52 C64,68 50,80 34,80 C16,80 4,66 4,48 C4,30 18,16 36,13 C50,11 60,17 64,28"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle
        cx="34"
        cy="48"
        r="6"
        fill="none"
        stroke="var(--color-foreground)"
        strokeWidth="2.5"
      />
      {/* Datalog trace streaming out of the housing */}
      <path
        d="M60,30 L72,30 L80,16 L88,34 L98,16"
        fill="none"
        stroke="var(--color-foreground)"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={clsx("flex items-center gap-3 group", className)}
      aria-label="Street PRO Garage home"
    >
      <LogoMark className="h-10 w-10 shrink-0 transition-transform group-hover:scale-105" />
      {!markOnly && (
        <span className="font-display text-2xl leading-none tracking-wide whitespace-nowrap">
          <span className="text-foreground">Street Pro</span>{" "}
          <span className="text-accent">Garage</span>
        </span>
      )}
    </Link>
  );
}
