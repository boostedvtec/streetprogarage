"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";

export type ServicePanel = {
  id: string;
  title: string;
  kicker: string;
  summary: string;
  points: string[];
  cta: string;
  href: string;
  image: string;
  alt: string;
  /** CSS object-position for the photo crop. */
  focus?: string;
};

/**
 * Editorial service panels. On large screens they sit side by side and the
 * active one opens up (hover, focus or click); on smaller screens they stack,
 * fully open. Photographs are real builds, graded to match the dark theme.
 */
export function ServicePanels({ services }: { services: ServicePanel[] }) {
  const [active, setActive] = useState(0);

  return (
    <ol className="flex flex-col gap-3 lg:h-[36rem] lg:flex-row" aria-label="Services">
      {services.map((s, i) => {
        const isActive = i === active;
        return (
          <li
            key={s.id}
            data-active={isActive}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={clsx(
              "group relative isolate flex min-h-[27rem] flex-col justify-end overflow-hidden border border-border bg-surface transition-[flex,border-color] duration-500 ease-out lg:min-h-0",
              "lg:flex-[1_1_0%] lg:data-[active=true]:flex-[3.2_1_0%]",
              isActive ? "lg:border-accent/60" : "hover:border-border-strong"
            )}
          >
            <Image
              src={s.image}
              alt={s.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={clsx(
                "-z-20 object-cover brightness-[0.62] contrast-[1.05] saturate-[0.8] transition-all duration-700",
                "lg:group-data-[active=true]:brightness-[0.78] lg:group-data-[active=true]:saturate-100 lg:group-data-[active=true]:scale-[1.04]"
              )}
              style={{ objectPosition: s.focus ?? "center" }}
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(9,9,11,0.96)_8%,rgba(9,9,11,0.55)_48%,rgba(9,9,11,0.1)_100%)]" />

            {/* Collapsed rail (desktop only): number + vertical title */}
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-expanded={isActive}
              aria-controls={`service-${s.id}`}
              className="absolute inset-0 z-10 hidden cursor-pointer lg:group-data-[active=false]:flex lg:items-end lg:p-6 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
            >
              <span className="flex flex-col items-start gap-4">
                <span className="font-mono-tech text-xs tracking-[0.2em] text-accent">0{i + 1}</span>
                <span className="font-display text-3xl tracking-wider [writing-mode:vertical-rl] rotate-180">{s.title}</span>
              </span>
            </button>

            <div id={`service-${s.id}`} className="relative p-6 sm:p-8 lg:w-[28rem] lg:group-data-[active=false]:hidden">
              <span className="font-mono-tech text-xs tracking-[0.2em] text-accent">
                0{i + 1} &middot; {s.kicker}
              </span>
              <h3 className="font-display mt-3 text-4xl leading-none sm:text-5xl">{s.title}</h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-foreground-muted">{s.summary}</p>
              <ul className="mt-5 grid gap-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={s.href}
                className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-[3px] bg-accent px-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {s.cta}
                <ArrowRight size={16} weight="bold" aria-hidden />
              </Link>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
