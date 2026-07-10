"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  Gauge,
  ShoppingCart,
  ArrowRight,
  CheckCircle,
  ChartLineUp,
  Quotes,
  PlugsConnected,
  Engine,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { buildPhotos, dynoResults } from "@/lib/builds";
import { useRegion } from "@/components/region/region-context";
import { dynoServiceLabel, type RegionData } from "@/lib/region";

function getHeroFeatures(region: RegionData["value"], services: RegionData["services"]) {
  return [
    { icon: Gauge, label: "ECU Tuning" },
    { icon: ChartLineUp, label: dynoServiceLabel(region) },
    services.parts
      ? { icon: Wrench, label: "Parts & Fitting" }
      : { icon: Engine, label: "Engine Swaps" },
  ];
}

function getServices(regionData: RegionData) {
  const items = [
    {
      icon: Gauge,
      title: "ECU Tuning",
      description: `Custom-built tunes from scratch — remote, road-logged, or live on our ${regionData.city} dyno. No cookie-cutter stage kits, ever.`,
      href: "/tuning",
      cta: "Explore Tuning",
    },
    {
      icon: PlugsConnected,
      title: "Custom Wiring",
      description:
        "Standalone and piggyback ECU wiring, gauge installation, and Honda P28 ECU socketing service.",
      href: "/custom-wiring",
      cta: "View Wiring Services",
    },
  ];
  if (regionData.services.parts) {
    items.splice(1, 0, {
      icon: Wrench,
      title: "Parts, Fitting & Diagnostics",
      description:
        "Performance parts sales with professional fitting and full diagnostics — from bolt-ons to complete built engines.",
      href: "/parts",
      cta: "Shop Parts",
    });
  }
  if (regionData.services.engineSwaps) {
    items.splice(1, 0, {
      icon: Engine,
      title: "Engine Swaps & Builds",
      description:
        "Full engine swaps and custom builds — fitment, wiring, fuelling and cooling done properly, then tuned on the dyno.",
      href: "/engine-swaps",
      cta: "View Engine Swaps",
    });
  }
  return items;
}

function getProcessSteps(city: string) {
  return [
    {
      title: "Submit Your Build",
      description:
        "Fill in the Build List form with your vehicle, engine, mods and goals — we review every detail before quoting.",
    },
    {
      title: "Get a Ballpark Quote",
      description:
        "Because every tune is custom-written, pricing depends on your ECU and build. You'll get an instant estimate, confirmed exactly after review.",
    },
    {
      title: "Log & Tune",
      description: `Remote sessions use live datalogging and remote access; dyno sessions are tuned live in ${city}.`,
    },
    {
      title: "Revise & Deliver",
      description:
        "We fine-tune based on real-world driving or dyno results, with revisions available as an add-on if you need further adjustment.",
    },
  ];
}

export default function Home() {
  const { data, region } = useRegion();
  const heroFeatures = getHeroFeatures(region, data.services);
  const services = getServices(data);
  const processSteps = getProcessSteps(data.city);
  const trustPoints = [
    "Every tune written from scratch — no generic stage maps",
    "Stock ECU (HP Tuners) and standalone ECU platforms supported",
    `${data.country}-based workshop, global remote reach`,
    "Pre-tune safety checks available before every session",
  ];

  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-surface/50">
        <Container className="py-14 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-14">
            {/* Headline column */}
            <div>
              <Eyebrow>{data.city}, {data.country} &middot; Remote Worldwide</Eyebrow>
              <h1 className="font-display mt-6 text-5xl leading-[0.95] sm:text-6xl lg:text-6xl">
                Custom built.
                <br />
                <span className="text-accent">Precision tuned.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground-muted">
                Every tune written from scratch — remote ECU tuning delivered
                globally, dyno sessions in {data.city}, and{" "}
                {data.services.parts
                  ? "performance parts sales, fitting & diagnostics."
                  : "custom wiring, ECU installation & engine build services."}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <LinkButton href="/quote" size="lg">
                  Get a Quote
                  <ArrowRight size={20} weight="bold" aria-hidden />
                </LinkButton>
                <LinkButton href="/tuning?type=rolling-road" size="lg" variant="secondary">
                  Book {dynoServiceLabel(region)}
                </LinkButton>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6">
                {heroFeatures.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-sm font-medium text-foreground-muted"
                  >
                    <Icon size={18} className="text-accent" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo mosaic — real builds */}
            <div className="grid gap-3">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border">
                <Image
                  src={buildPhotos[0].src}
                  alt={buildPhotos[0].alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {buildPhotos.slice(1).map((photo) => (
                  <div
                    key={photo.src}
                    className="relative aspect-square overflow-hidden rounded-xl border border-border"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 20vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Services */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>What We Do</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Everything it takes to get you more power
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map(({ icon: Icon, title, description, href, cta }) => (
              <div
                key={title}
                className="group flex flex-col rounded-xl border border-border bg-surface p-8 transition-colors hover:border-accent"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={26} weight="bold" aria-hidden />
                </div>
                <h3 className="font-display mt-6 text-2xl">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
                  {description}
                </p>
                <Link
                  href={href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all"
                >
                  {cta}
                  <ArrowRight size={16} weight="bold" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section className="border-y border-border bg-surface/50">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>The Process</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              From build list to finished tune
            </h2>
          </div>

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="font-display text-6xl text-border-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-2 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Trust points */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Why Street PRO Garage</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              No stage kits. No shortcuts.
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              We don&rsquo;t sell off-the-shelf Stage 1/2/3 maps. Every build gets a
              tune written specifically for its parts, fuel, and goals.
            </p>
          </div>
          <ul className="grid gap-4">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle
                  size={22}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden
                />
                <span className="text-foreground-muted">{point}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Dyno gallery preview */}
      <Section className="border-y border-border bg-surface/50">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <Eyebrow>Results</Eyebrow>
              <h2 className="font-display mt-4 text-4xl sm:text-5xl">
                Before &amp; after dyno results
              </h2>
            </div>
            <Link
              href="/quote"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
            >
              Get your own tune
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dynoResults.slice(0, 3).map((result) => (
              <Link
                key={result.src}
                href="/quote"
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface"
              >
                <Image
                  src={result.src}
                  alt={result.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-xs font-medium text-white">
                  {result.label}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonials preview */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Customer Reviews</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              What builders are saying
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                quote:
                  "Sample review — replace with a real customer quote once your first tunes are delivered.",
                name: "Sample Customer",
                vehicle: "Placeholder build",
              },
              {
                quote:
                  "Sample review — replace with a real customer quote once your first tunes are delivered.",
                name: "Sample Customer",
                vehicle: "Placeholder build",
              },
              {
                quote:
                  "Sample review — replace with a real customer quote once your first tunes are delivered.",
                name: "Sample Customer",
                vehicle: "Placeholder build",
              },
            ].map((t, i) => (
              <figure
                key={i}
                className="flex flex-col rounded-xl border border-border bg-surface p-8"
              >
                <Quotes size={28} weight="fill" className="text-accent" aria-hidden />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground-muted italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold">
                  {t.name}
                  <span className="block font-normal text-foreground-subtle">
                    {t.vehicle}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA banner */}
      <Section className="border-t border-border">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-accent/30 bg-accent-soft p-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl">
                Ready to build your custom tune?
              </h2>
              <p className="mt-2 text-foreground-muted">
                Submit your build list and get a ballpark quote today.
              </p>
            </div>
            <LinkButton href="/quote" size="lg" className="shrink-0">
              <ShoppingCart size={20} weight="bold" aria-hidden />
              Start Your Build
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
