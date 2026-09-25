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
  PlugsConnected,
  Engine,
  Car,
  Circuitry,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { buildPhotos } from "@/lib/builds";
import { projects } from "@/lib/projects";
import { tunedVehiclePlatforms, ecuBrandLogos } from "@/lib/site-config";
import { useRegion } from "@/components/region/region-context";
import { dynoServiceLabel, type RegionData } from "@/lib/region";

const heroBrands = ["Honda", "Toyota", "Subaru", "Nissan", "Mitsubishi", "Mazda"];

function getServices(regionData: RegionData) {
  const items = [
    {
      icon: Gauge,
      title: "ECU Tuning",
      description: `Custom-written tunes for your exact engine, parts and fuel — remote, road-logged, or live on our ${regionData.city} dyno. No cookie-cutter stage kits, ever.`,
      href: "/tuning",
      cta: "Explore Tuning",
    },
    {
      icon: PlugsConnected,
      title: "Standalone ECU & Wiring",
      description:
        "MaxxECU, Link, Haltech, AEM, EcuMaster, Hondata and more — supplied, wired and installed properly, plus gauges and Honda P28 ECU socketing.",
      href: "/custom-wiring",
      cta: "View Wiring Services",
    },
  ];
  if (regionData.services.parts) {
    items.push({
      icon: Wrench,
      title: "Parts, Fitting & Diagnostics",
      description:
        "Performance parts sales with professional fitting and full diagnostics — from bolt-ons to complete built engines.",
      href: "/parts",
      cta: "Shop Parts",
    });
  }
  if (regionData.services.engineSwaps) {
    items.push({
      icon: Engine,
      title: "JDM Engine Swaps & Builds",
      description:
        "Full engine swaps and custom builds — fitment, wiring, fuelling and cooling done properly, then tuned on the dyno.",
      href: "/engine-swaps",
      cta: "View Engine Swaps",
    });
  }
  items.push({
    icon: MagnifyingGlass,
    title: "Stuck Projects Rescued",
    description:
      "Half-finished swap, a build another shop couldn't get running, or a car that just won't behave? We diagnose it and pick it up from where it stands.",
    href: "/custom-wiring",
    cta: "Get It Unstuck",
  });
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
  const services = getServices(data);
  const processSteps = getProcessSteps(data.city);
  const featuredProjects = projects.slice(0, 3);
  const trustPoints = [
    "Every tune written from scratch — no generic stage maps",
    "Specialists in Japanese performance cars — Honda, Toyota, Subaru, Nissan, Mitsubishi, Mazda",
    "Stock ECU (HP Tuners, Hondata, Nistune) and standalone ECU platforms supported",
    `${data.country}-based workshop, global remote reach`,
    "Real dyno graphs and road-tune results on every project page",
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
                JDM ECU tuning.
                <br />
                <span className="text-accent">Done properly.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground-muted">
                We tune, wire and build Japanese performance cars — custom
                ECU tunes written from scratch, standalone ECU installs and
                engine swaps. Remote tuning worldwide, dyno sessions in{" "}
                {data.city}.
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

      {/* What we do — at a glance */}
      <div className="border-b border-border bg-graphite text-graphite-foreground">
        <Container className="py-6">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Gauge, label: "Custom ECU tuning", sub: "Remote, road & dyno" },
              { icon: Circuitry, label: "Standalone ECU installs", sub: "MaxxECU, Link, Haltech, AEM…" },
              { icon: Engine, label: "JDM engine swaps", sub: "K, B, D, H, 2JZ, SR20, 4G63…" },
              { icon: MagnifyingGlass, label: "Diagnostics & rescues", sub: "Stuck or half-finished builds" },
            ].map(({ icon: Icon, label, sub }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon size={26} weight="bold" className="shrink-0 text-accent" aria-hidden />
                <span>
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block text-xs text-white/60">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Platforms we tune */}
      <Section id="platforms">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Cars We Work On</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Honda, Toyota, Subaru, Nissan &amp; more
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              Japanese performance cars are what we do. Pick your platform to
              see the engines, ECUs and builds we handle.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tunedVehiclePlatforms.map((platform) => {
              const cardClassName =
                "group flex flex-col rounded-xl border border-border bg-surface p-8 transition-colors hover:border-accent";
              const content = (
                <>
                  <div className="flex items-center gap-3">
                    <Car size={26} className="text-accent" aria-hidden />
                    <h3 className="font-display text-2xl">{platform.make}</h3>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
                    {platform.models}
                  </p>
                  {platform.engines.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {platform.engines.map((engine) => (
                        <li
                          key={engine}
                          className="rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-xs font-medium text-foreground-muted"
                        >
                          {engine}
                        </li>
                      ))}
                    </ul>
                  )}
                  {platform.slug && (
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all group-hover:gap-2.5">
                      View {platform.make} tuning
                      <ArrowRight size={16} weight="bold" aria-hidden />
                    </span>
                  )}
                </>
              );

              return platform.slug ? (
                <Link key={platform.make} href={`/tuning/${platform.slug}`} className={cardClassName}>
                  {content}
                </Link>
              ) : (
                <div key={platform.make} className={cardClassName}>
                  {content}
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-foreground-muted">
            Don&rsquo;t see your car? Most JDM swaps and engine platforms are
            fair game — if it has an ECU we can talk to, we can tune it.{" "}
            <Link href="/quote" className="font-semibold text-accent underline">
              Send us your build list
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* ECUs */}
      <Section className="border-y border-border bg-surface/50">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>ECUs &amp; Software</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Every major ECU platform
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              Stock ECU reflash or full standalone — we work with the brands
              below, supply and install them, and tune them to your build.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {ecuBrandLogos.map((logo) => (
              <BrandLogo key={logo.name} {...logo} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>What We Do</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Everything it takes to get you more power
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Recent builds */}
      {featuredProjects.length > 0 && (
        <Section className="border-y border-border bg-surface/50">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <Eyebrow>Proof, Not Promises</Eyebrow>
                <h2 className="font-display mt-4 text-4xl sm:text-5xl">
                  Recent builds we&rsquo;ve tuned
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
              >
                See all projects
                <ArrowRight size={16} weight="bold" aria-hidden />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {featuredProjects.map((project) => (
                <Link
                  key={project.slug}
                  href="/projects"
                  className="group flex flex-col rounded-xl border border-border bg-surface p-8 transition-colors hover:border-accent"
                >
                  <ChartLineUp size={26} className="text-accent" aria-hidden />
                  <h3 className="font-display mt-4 text-2xl">{project.title}</h3>
                  <p className="mt-1 text-sm font-medium text-foreground-muted">{project.vehicle}</p>
                  <p className="mt-4 font-display text-3xl text-accent">{project.dyno.power}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all group-hover:gap-2.5">
                    View build
                    <ArrowRight size={16} weight="bold" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Process */}
      <Section>
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
      <Section className="border-t border-border bg-surface/50">
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

      {/* CTA banner */}
      <Section className="border-t border-border">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-accent/30 bg-accent-soft p-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl">
                Ready to tune your JDM build?
              </h2>
              <p className="mt-2 text-foreground-muted">
                Submit your build list and get a ballpark quote today.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <LinkButton href="/quote" size="lg">
                <ShoppingCart size={20} weight="bold" aria-hidden />
                Start Your Build
              </LinkButton>
              <LinkButton href="/tuning?type=rolling-road" size="lg" variant="secondary">
                Book {dynoServiceLabel(region)}
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
