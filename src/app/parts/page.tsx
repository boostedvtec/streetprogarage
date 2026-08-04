"use client";

import { Wrench, Clock } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { categories } from "@/lib/products";
import { useRegion } from "@/components/region/region-context";

export default function PartsPage() {
  const { data } = useRegion();

  if (!data.services.parts) {
    return (
      <Section>
        <Container className="max-w-2xl text-center">
          <Wrench size={48} className="mx-auto text-foreground-subtle" aria-hidden />
          <h1 className="font-display mt-6 text-4xl">Parts Shop Not Available Here</h1>
          <p className="mt-4 text-foreground-muted">
            Our parts shop currently serves UK customers only. In{" "}
            {data.country}, we offer remote tuning, dyno tuning, custom
            wiring and ECU installation, and engine swaps/builds at our{" "}
            {data.city} workshop.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LinkButton href="/tuning" size="lg">
              Explore Tuning
            </LinkButton>
            <LinkButton href="/engine-swaps" size="lg" variant="secondary">
              Engine Swaps
            </LinkButton>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Shop</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Performance Parts
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            We&rsquo;re rebuilding our online parts shop — browse the
            categories below, and in the meantime submit your build list and
            we&rsquo;ll recommend and source the right parts for your goals.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/quote" size="lg">
              Submit Your Build List
            </LinkButton>
            <LinkButton href="/contact" size="lg" variant="secondary">
              Ask About a Part
            </LinkButton>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <div
                key={cat}
                className="flex flex-col items-start gap-4 rounded-xl border border-border bg-surface p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Wrench size={24} weight="bold" aria-hidden />
                </div>
                <h2 className="font-display text-2xl">{cat}</h2>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
                  <Clock size={14} aria-hidden />
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
