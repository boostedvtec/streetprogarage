"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { useRegion } from "@/components/region/region-context";
import { Datalog } from "./datalog";

const heroBrands = ["Honda", "Toyota", "Subaru", "Nissan", "Mitsubishi", "Mazda"];

/** Homepage hero: headline on the left, a compact live datalog on the right (expandable). */
export function Hero() {
  const { data } = useRegion();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-border bg-surface/50">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className={clsx("grid gap-10 lg:items-center lg:gap-12", expanded ? "lg:grid-cols-1" : "lg:grid-cols-2")}>
          <div className={clsx(expanded && "lg:max-w-3xl")}>
            <Eyebrow>
              {data.city}, {data.country} &middot; Remote Worldwide
            </Eyebrow>
            <h1 className="font-display mt-6 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              JDM ECU tuning.
              <br />
              <span className="text-accent">Done properly.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground-muted">
              We tune, wire and build Japanese performance cars: custom ECU tunes written from scratch, standalone ECU
              installs and engine swaps. Remote tuning worldwide, dyno sessions in {data.city}.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Brands we tune">
              {heroBrands.map((brand) => (
                <li
                  key={brand}
                  className="rounded-full border border-border-strong bg-surface px-3.5 py-1.5 text-sm font-semibold text-foreground"
                >
                  {brand}
                </li>
              ))}
              <li className="rounded-full border border-dashed border-border-strong px-3.5 py-1.5 text-sm font-medium text-foreground-muted">
                + other JDM
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <LinkButton href="/quote" size="lg">
                Get a Quote
                <ArrowRight size={20} weight="bold" aria-hidden />
              </LinkButton>
              <LinkButton href="#platforms" size="lg" variant="secondary">
                Find Your Car
              </LinkButton>
            </div>

            <a
              href={data.phoneHref}
              className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-foreground underline underline-offset-4 hover:text-accent"
            >
              Prefer WhatsApp? {data.phone}
            </a>
          </div>

          <div className="min-w-0">
            <Datalog expanded={expanded} onToggleExpand={() => setExpanded((v) => !v)} />
          </div>
        </div>
      </Container>
    </div>
  );
}
