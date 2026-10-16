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
import { Hero } from "@/components/home/hero";
import { FuelMap } from "@/components/home/fuel-map";
import { DynoVideo } from "@/components/home/dyno-video";
import { PriceGrid } from "@/components/home/price-grid";

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
      {/* Hero: headline + live datalog */}
      <Hero />

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

      {/* Fuel map: the table we edit, and the same map as a surface */}
      <Section id="maps">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>The Tune Itself</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">Every map written from scratch</h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              The same fuel map, two ways. On the left is the table we edit. On the right is the same numbers as a 3D
              surface. Watch it fill one RPM point at a time, then follow the engine through it. Each cell is a
              decision about your engine, parts and fuel.
            </p>
          </div>
          <div className="mt-10">
            <FuelMap />
          </div>
          <ul className="mt-12 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {[
              "Fuel and ignition tables built around your injectors, fuel and boost",
              "Boost control, cam timing and rev limits set for your goals",
              "Launch control and anti-lag where your ECU supports them",
              "Wideband and knock monitoring on every pull",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 border-t border-border-strong pt-4">
                <CheckCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <span className="text-foreground-muted">{point}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Dyno: real footage */}
      <Section id="dyno" className="border-y border-border bg-surface/50">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <Eyebrow>{dynoServiceLabel(region)}</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">Tuned live on a rolling road</h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              Our in-house 2WD dyno with an eddy current brake in {data.city} gives full datalogging and real-time map
              changes.
            </p>
            <ol className="mt-8 grid gap-5">
              {[
                ["Remote pre-tune", "The car is set up and safe before it ever touches the rollers, which saves dyno time."],
                ["Live on the dyno", "Wideband AFR, full datalogs and map changes in real time."],
                ["Road check", "Final datalogs on the road to confirm cold start and drivability."],
              ].map(([title, text], i) => (
                <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-border-strong pt-4">
                  <span className="font-display text-3xl text-accent">{i + 1}</span>
                  <span>
                    <span className="font-display block text-xl">{title}</span>
                    <span className="text-sm text-foreground-muted">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <DynoVideo />
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

      {/* From the workshop: the real build photos */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>From The Workshop</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">Real cars, real builds</h2>
          </div>
          <div className="mt-10 grid gap-3">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border">
              <Image
                src={buildPhotos[0].src}
                alt={buildPhotos[0].alt}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {buildPhotos.slice(1).map((photo) => (
                <div key={photo.src} className="relative aspect-square overflow-hidden rounded-xl border border-border">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 26vw, 33vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Estimated prices */}
      <Section id="prices" className="border-y border-border bg-surface/50">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Simple Pricing</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">Estimated prices</h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              One price for your build, the same for remote, road and dyno tuning. Confirmed exactly once we review your
              build list.
            </p>
          </div>
          <div className="mt-10">
            <PriceGrid />
          </div>
        </Container>
      </Section>

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
