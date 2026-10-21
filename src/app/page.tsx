"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { BrandLogo } from "@/components/brand-logo";
import { buildPhotos } from "@/lib/builds";
import { projects } from "@/lib/projects";
import { paymentLinks } from "@/lib/payment-links";
import { tunedVehiclePlatforms, ecuBrandLogos } from "@/lib/site-config";
import { useRegion } from "@/components/region/region-context";
import { dynoServiceLabel, type RegionData } from "@/lib/region";
import { Hero } from "@/components/home/hero";
import { ServicePanels, type ServicePanel } from "@/components/home/services-panels";
import { Datalog } from "@/components/home/datalog";
import { FuelMap } from "@/components/home/fuel-map";
import { DynoVideo } from "@/components/home/dyno-video";
import { DynoGraph } from "@/components/home/dyno-graph";
import { DynoLines } from "@/components/home/dyno-lines";
import { PriceGrid } from "@/components/home/price-grid";

function getServices(data: RegionData, dynoLabel: string): ServicePanel[] {
  return [
    {
      id: "remote",
      title: "Remote ECU Tuning",
      kicker: "Worldwide",
      summary:
        "Custom calibration written for your exact engine, parts and fuel, built and refined through your own datalogs. No stage kits.",
      points: [
        "Maps written from scratch for your build",
        "Datalog review and revisions until it is right",
        "Hondata, Nistune, MaxxECU, Link, Haltech, AEM and more",
      ],
      cta: "Book remote tuning",
      href: "/quote",
      image: "/images/builds/honda-ef-k24-awd-turbo.jpg",
      alt: "Tuner working on a laptop in the driver's seat of a red Honda",
      focus: "50% 38%",
    },
    {
      id: "dyno",
      title: "Dyno Tuning",
      kicker: dynoLabel,
      summary: `Tuned live on our ${data.city} rolling road with wideband AFR, full datalogs and real-time map changes, then checked on the road.`,
      points: [
        "Remote pre-tune so dyno time is spent on results",
        "Live fuel, timing and boost optimisation",
        "Road check for cold start and drivability",
      ],
      cta: "Book a dyno session",
      href: "/tuning?type=rolling-road",
      image: "/images/builds/k24-turbo-before-after-dyno.jpg",
      alt: "Dyno software showing before and after power runs of a K24 turbo Honda",
      focus: "50% 50%",
    },
    {
      id: "wiring",
      title: "Custom Wiring Builds",
      kicker: "Standalone ECU & harness",
      summary:
        "Bespoke harnesses and standalone ECU installs: clean routing, proper connectors and ECU integration that works the first time.",
      points: [
        "MaxxECU, Link, Haltech, AEM, EcuMaster, Megasquirt",
        "Honda P28 ECU socketing and gauge fitting",
        "Engine-swap harnesses built around your parts",
      ],
      cta: "Enquire about wiring",
      href: "/custom-wiring",
      image: "/images/builds/2jzgte-single-turbo.jpg",
      alt: "Toyota 2JZ-GTE single turbo engine bay with a custom wiring harness",
      focus: "50% 45%",
    },
    {
      id: "diagnostics",
      title: "Diagnostics",
      kicker: "Fault finding",
      summary:
        "A half-finished swap, a build another shop could not get running, or a car that will not behave. We find the fault and pick it up from where it stands.",
      points: [
        "ECU and electrical fault finding",
        "Diagnose wiring faults from earlier installs",
        "Stuck and half-finished builds rescued",
      ],
      cta: "Arrange diagnostics",
      href: "/custom-wiring#diagnostics",
      image: "/images/builds/d16-sleeper-civic-eg.jpg",
      alt: "Honda Civic with its bonnet open for diagnostics",
      focus: "50% 55%",
    },
  ];
}

function getProcessSteps(city: string) {
  return [
    {
      title: "Submit your build",
      description:
        "Fill in the build list with your vehicle, engine, mods and goals. We review every detail before quoting.",
    },
    {
      title: "Get a ballpark quote",
      description:
        "Every tune is custom-written, so pricing depends on your ECU and build. You get an instant estimate, confirmed after review.",
    },
    {
      title: "Log & tune",
      description: `Remote sessions use live datalogging and remote access. Dyno sessions are tuned live in ${city}.`,
    },
    {
      title: "Revise & deliver",
      description:
        "We fine-tune from real-world driving or dyno results, with revisions available if you need further adjustment.",
    },
  ];
}

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">{title}</h2>
      {children && <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">{children}</p>}
    </div>
  );
}

export default function Home() {
  const { data, region } = useRegion();
  const dynoLabel = dynoServiceLabel(region);
  const services = getServices(data, dynoLabel);
  const processSteps = getProcessSteps(data.city);

  const showcase = projects.filter((p) => p.media?.type === "image").slice(0, 3);
  const trustPoints = [
    "Every tune written from scratch. No generic stage maps.",
    "Specialists in Japanese performance cars: Honda, Toyota, Subaru, Nissan, Mitsubishi, Mazda.",
    "Stock ECU (HP Tuners, Hondata, Nistune) and standalone ECU platforms supported.",
    `${data.country}-based workshop, global remote reach.`,
    "Real dyno graphs and road-tune results on every project page.",
  ];

  return (
    <>
      <Hero />

      {/* Services */}
      <Section id="services">
        <Container>
          <Reveal>
            <SectionHead eyebrow="What we do" title="Four disciplines. One workshop.">
              From the first calibration to the last connector, the same hands do the work.
            </SectionHead>
          </Reveal>
          <Reveal className="mt-12" delay={80}>
            <ServicePanels services={services} />
          </Reveal>
        </Container>
      </Section>

      {/* Estimated prices */}
      <Section id="prices" className="border-y border-border bg-surface/40">
        <Container>
          <Reveal>
            <SectionHead eyebrow="Simple pricing" title="Estimated prices">
              One price for your build, the same for remote, road and dyno tuning. Confirmed exactly once we review
              your build list.
            </SectionHead>
          </Reveal>
          <Reveal className="mt-10">
            <PriceGrid />
          </Reveal>
        </Container>
      </Section>

      {/* Engineering: the fuel map */}
      <Section id="maps">
        <Container>
          <Reveal>
            <SectionHead eyebrow="Engineering" title="Every map written from scratch">
              Switch between the fuel (VE) table and the VVT cam-angle table. On the left is the table we edit. On the right is the same numbers as a 3D surface. Watch it fill one RPM point at a time, then follow the engine through it. Each cell is a decision about your engine, parts and fuel.
            </SectionHead>
          </Reveal>
          <Reveal className="mt-10">
            <FuelMap />
          </Reveal>
          <ul className="mt-12 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {[
              "Fuel and ignition tables built around your injectors, fuel and boost",
              "Boost control, cam timing and rev limits set for your goals",
              "Launch control and anti-lag where your ECU supports them",
              "Wideband and knock monitoring on every pull",
            ].map((point, i) => (
              <li key={point} className="flex items-start gap-4 border-t border-border-strong pt-4">
                <span className="font-mono-tech pt-0.5 text-xs tracking-[0.2em] text-accent">0{i + 1}</span>
                <span className="text-foreground-muted">{point}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Telemetry: datalog */}
      <Section id="datalog" className="relative overflow-hidden border-y border-border bg-surface/40">
        <DynoLines />
        <Container className="relative">
          <Reveal>
            <SectionHead eyebrow="Telemetry" title="What we watch on every pull">
              Boost, air-fuel, timing, per-cylinder knock, injector duty and fuel pressure, logged together. A generic
              file hides problems like these. A custom map is built around them.
            </SectionHead>
          </Reveal>
          <Reveal className="mt-10">
            <Datalog />
          </Reveal>
        </Container>
      </Section>

      {/* Dyno: real footage + before/after */}
      <Section id="dyno" className="relative overflow-hidden">
        <Container className="relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <Eyebrow>{dynoLabel}</Eyebrow>
            <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">Tuned live on a rolling road</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
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
          </Reveal>
          <Reveal delay={100}>
            <DynoVideo />
          </Reveal>
        </Container>
      </Section>

      <Section id="dyno-graph" className="border-y border-border bg-surface/40 pt-16">
        <Container>
          <Reveal>
            <SectionHead eyebrow="Before and after" title="What a proper tune does to the power curve">
              Same engine, same dyno. A generic file is rough, with flat spots and dips where fuel and timing are
              guessed. A custom map is smooth and strong all the way to the limiter.
            </SectionHead>
          </Reveal>
          <Reveal className="mt-10">
            <DynoGraph />
          </Reveal>
        </Container>
      </Section>

      {/* Process */}
      <Section id="process">
        <Container>
          <Reveal>
            <SectionHead eyebrow="The process" title="From build list to finished tune" />
          </Reveal>
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span aria-hidden className="absolute left-0 right-0 top-[1.1rem] hidden h-px bg-border-strong lg:block" />
            {processSteps.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal delay={i * 90}>
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center border border-accent bg-background font-mono-tech text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-6 text-3xl">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Platforms + ECUs */}
      <Section id="platforms" className="border-y border-border bg-surface/40">
        <Container>
          <Reveal>
            <SectionHead eyebrow="Platforms &amp; ECUs" title="Honda, Toyota, Subaru, Nissan & more">
              Japanese performance cars are what we do. Pick your platform to see the engines, ECUs and builds we
              handle.
            </SectionHead>
          </Reveal>

          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {tunedVehiclePlatforms.map((platform) => {
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-3xl">{platform.make}</h3>
                    {platform.slug && (
                      <ArrowUpRight
                        size={20}
                        className="mt-1 shrink-0 text-foreground-subtle transition-colors group-hover:text-accent"
                        aria-hidden
                      />
                    )}
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">{platform.models}</p>
                  {platform.engines.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {platform.engines.map((engine) => (
                        <li
                          key={engine}
                          className="font-mono-tech border border-border-strong px-2 py-0.5 text-[11px] text-foreground-muted"
                        >
                          {engine}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              );
              const cls = "group flex flex-col bg-background p-7 transition-colors hover:bg-surface";
              return platform.slug ? (
                <Link key={platform.make} href={`/tuning/${platform.slug}`} className={cls}>
                  {inner}
                </Link>
              ) : (
                <div key={platform.make} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-sm text-foreground-muted">
            Don&rsquo;t see your car? Most JDM swaps and engine platforms are fair game. If it has an ECU we can talk
            to, we can tune it.{" "}
            <Link href="/quote" className="font-semibold text-accent underline underline-offset-4">
              Send us your build list
            </Link>
            .
          </p>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {ecuBrandLogos.map((logo) => (
              <BrandLogo key={logo.name} {...logo} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Street PRO Garage */}
      <Section id="why">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Why Street PRO Garage</Eyebrow>
            <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">
              No stage kits. No shortcuts.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-foreground-muted sm:text-lg">
              We don&rsquo;t sell off-the-shelf Stage 1/2/3 maps. Every build gets a tune written specifically for its
              parts, fuel and goals.
            </p>
          </Reveal>
          <ul className="lg:col-span-7">
            {trustPoints.map((point, i) => (
              <li key={point}>
                <Reveal delay={i * 60} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-t border-border-strong py-5 last:border-b">
                  <span className="font-display text-4xl text-accent">0{i + 1}</span>
                  <span className="text-lg leading-snug text-foreground">{point}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Project showcase */}
      <Section id="projects" className="border-t border-border bg-surface/40">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Proof, not promises" title="Builds we have tuned" />
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-accent hover:text-accent-hover"
            >
              All projects
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
            {showcase.map((p, i) => {
              const media = p.media;
              if (!media || media.type !== "image") return null;
              const big = i === 0;
              return (
                <Reveal key={p.slug} delay={i * 80} className={big ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}>
                  <Link
                    href="/projects"
                    className={`group relative isolate flex h-full flex-col justify-end overflow-hidden border border-border bg-surface ${
                      big ? "min-h-[26rem] lg:min-h-[34rem]" : "min-h-[16rem]"
                    }`}
                  >
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes={big ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
                      className="-z-20 object-cover brightness-[0.7] saturate-[0.85] transition-all duration-700 group-hover:scale-[1.04] group-hover:brightness-[0.85] group-hover:saturate-100"
                    />
                    <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(9,9,11,0.95)_5%,rgba(9,9,11,0.2)_70%)]" />
                    <div className="flex items-end justify-between gap-4 p-6">
                      <div>
                        <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">{p.vehicle}</p>
                        <h3 className={`font-display mt-1 leading-none ${big ? "text-4xl sm:text-5xl" : "text-3xl"}`}>{p.title}</h3>
                      </div>
                      <div className="text-right">
                        <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">Result</p>
                        <p className="font-display text-3xl leading-none text-accent">{p.dyno.power}</p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* More from the workshop */}
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {buildPhotos.map((photo) => (
              <figure key={photo.src} className="group relative aspect-[4/3] overflow-hidden border border-border">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="object-cover brightness-[0.75] saturate-[0.85] transition-all duration-500 group-hover:scale-[1.05] group-hover:brightness-100 group-hover:saturate-100"
                />
                <figcaption className="font-mono-tech absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-[11px] uppercase tracking-[0.14em] text-foreground">
                  {photo.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* Conversion */}
      <section className="relative isolate overflow-hidden border-t border-border py-24 sm:py-32">
        <DynoLines flip />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,106,31,0.3),transparent_60%)]" />
        <Container className="relative text-center">
          <Reveal>
            <Eyebrow className="justify-center">Start your build</Eyebrow>
            <h2 className="font-display mx-auto mt-6 max-w-5xl text-[clamp(3rem,9vw,7.5rem)] leading-[0.88]">
              Your build. Your goals.
              <br />
              <span className="text-accent">Our calibration.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
              Tell us what you drive, what you are building, and what you want to achieve.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <LinkButton href="/quote" size="lg">
                Book a session
                <ArrowRight size={18} weight="bold" aria-hidden />
              </LinkButton>
              <LinkButton href="/contact" size="lg" variant="secondary">
                Discuss your project
              </LinkButton>
            </div>
            <p className="font-mono-tech mt-6 text-xs uppercase tracking-[0.16em] text-foreground-subtle">
              Already agreed a price?{" "}
              <a href={paymentLinks.tuning} className="text-accent underline underline-offset-4 hover:text-accent-hover">
                Pay online
              </a>
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
