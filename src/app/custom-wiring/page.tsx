import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Info } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { UkOnlySection } from "@/components/region/uk-only-section";
import { HarnessBuilderForm } from "@/components/wiring/harness-builder-form";
import { WiringEnquiryForm } from "@/components/wiring/wiring-enquiry-form";
import { DynoLines } from "@/components/home/dyno-lines";
import { projects } from "@/lib/projects";
import { wiringShots } from "@/lib/wiring-showcase";

export const metadata: Metadata = {
  alternates: { canonical: "/custom-wiring" },
  title: "Standalone ECU Installation & Custom Wiring Harness | Street PRO Garage",
  description:
    "Standalone ECU installation and custom wiring harnesses for MaxxECU, Link, Haltech, AEM, EcuMaster and Megasquirt. Engine-swap wiring, gauge fitting, Honda P28 ECU socketing, and diagnostics for stuck or half-finished JDM builds. Discuss your wiring project.",
};

const services = [
  {
    title: "Standalone ECU wiring and custom harnesses",
    text: "Harnesses built for MaxxECU, Link, Haltech, AEM, EcuMaster and Megasquirt installs, loomed and labelled so they last beyond one dyno session.",
    points: [
      "Custom harness fabrication for standalone ECU installs",
      "Connector, pinout mapping and relay and fusing setup",
      "Clean, loomed and labelled harness work",
    ],
    project: "toyota-aristo-2jzge-turbo",
    projectLabel: "Aristo 2JZGE, EcuMaster DET3+",
  },
  {
    title: "Engine-swap wiring",
    text: "Finish the wiring and ECU install for a swap, or pick up one that stalled part-way.",
    points: [
      "Complete the wiring and ECU install on incomplete swaps",
      "At our Karachi workshop: the fitment, wiring, fuelling and cooling a swap needs",
    ],
    project: "mini-d14-swap",
    projectLabel: "Mini D14 swap, P28 ECU",
  },
  {
    title: "Piggyback ECU integration",
    text: "Add a piggyback solution alongside the factory ECU and integrate it with the existing harness.",
    points: ["Piggyback ECU integration with the factory harness"],
  },
  {
    title: "Sensors, ignition and injectors",
    text: "The circuits an engine needs to run and log correctly, wired to suit your parts.",
    points: ["Sensor wiring: IAT, CLT, TPS, MAP and wideband O2", "Ignition coil and injector wiring"],
  },
  {
    title: "Gauge installation",
    text: "Gauges wired in properly and mounted where they are usable, not just visible.",
    points: [
      "Boost, wideband AFR, oil pressure and temperature, EGT and fuel pressure",
      "Pod, pillar or dash-integrated mounting",
    ],
    project: "honda-ef-k24-awd-turbo",
    projectLabel: "EF K24 AWD turbo",
  },
  {
    title: "Wiring repair and fault finding",
    text: "Wiring faults from earlier installs, ours or another shop's, diagnosed before any rewiring is proposed.",
    points: [
      "Diagnose wiring faults from a previous install",
      "Work out why an ECU will not start, idle or log correctly",
      "Honest salvage-or-rewire assessment of a messy harness",
    ],
    project: "civic-ek-b18-turbo-rescue",
    projectLabel: "EK B18 turbo rescue",
    href: "#diagnostics",
  },
];

const steps = [
  {
    title: "Project details",
    text: "You tell us the vehicle, engine, ECU, modifications and how the car will be used.",
  },
  {
    title: "Scope and quote",
    text: "We review compatibility and what the job needs, then reply by email with pricing and lead time.",
  },
  {
    title: "Wiring and integration",
    text: "The agreed harness or installation work is carried out, loomed and labelled.",
  },
  {
    title: "Test and hand over",
    text: "The work is checked and we explain any setup that follows. Wiring is the work behind every tune, so tuning can follow when you need it.",
  },
];

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono-tech absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-background/95 via-background/60 to-transparent p-4 text-[11px] uppercase leading-snug tracking-[0.12em]">
      {children}
    </span>
  );
}

export default function CustomWiringPage() {
  const wiringProjects = projects.filter((p) => p.services.includes("wiring"));
  const [lead, second, third, fourth] = wiringShots;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div aria-hidden className="absolute inset-0 -z-10">
          <DynoLines />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_20%,rgba(255,106,31,0.10),transparent_55%)]" />
        <Container className="grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-6">
            <Eyebrow>Custom automotive wiring &amp; ECU integration</Eyebrow>
            <h1 className="font-display mt-6 text-[clamp(3.4rem,10vw,7.5rem)] leading-[0.88]">
              Built right.
              <br />
              <span className="text-accent">Wired for performance.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground-muted">
              Wiring for engine swaps, standalone ECU installations, custom harnesses and stalled electrical projects on
              Japanese performance cars. The work behind every tune, done properly.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="#enquiry" size="lg">
                Discuss your wiring project
                <ArrowRight size={18} weight="bold" aria-hidden />
              </LinkButton>
              <LinkButton href="#work" size="lg" variant="secondary">
                View our work
              </LinkButton>
            </div>
          </div>

          <div className="relative mb-10 lg:col-span-6 lg:mb-0">
            <div className="brackets relative aspect-[5/4] w-full overflow-hidden border border-border-strong">
              <Image
                src={lead.src}
                alt={lead.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover saturate-[0.9]"
                style={{ objectPosition: lead.pos }}
              />
              <Caption>
                <span className="ml-auto text-right">
                  <span className="text-accent">01</span> &nbsp;{lead.caption}
                </span>
              </Caption>
            </div>
            <div className="absolute -bottom-10 left-4 w-[42%] max-w-[15rem] border border-border-strong bg-background p-1 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)] lg:-left-6">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={second.src}
                  alt={second.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 42vw"
                  className="object-cover"
                  style={{ objectPosition: second.pos }}
                />
              </div>
              <p className="font-mono-tech px-1 py-1.5 text-[10px] uppercase leading-snug tracking-[0.12em] text-foreground-muted">
                <span className="text-accent">02</span> &nbsp;{second.caption}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Technical showcase */}
      <Section id="work">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Installs &amp; engine bays</Eyebrow>
            <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">The craft is in the detail</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
              Real jobs from our workshop: engine-bay routing, ECU installs and finished swaps. Loomed, labelled and
              routed away from heat and moving parts.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <figure className="group relative aspect-[4/3] overflow-hidden border border-border lg:col-span-8 lg:aspect-auto lg:h-[26rem]">
              <Image
                src={third.src}
                alt={third.alt}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ objectPosition: third.pos }}
              />
              <Caption>{third.caption}</Caption>
            </figure>
            <figure className="group relative aspect-[4/5] overflow-hidden border border-border lg:col-span-4 lg:aspect-auto lg:h-[26rem]">
              <Image
                src={fourth.src}
                alt={fourth.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ objectPosition: fourth.pos }}
              />
              <Caption>
                <span>{fourth.caption}</span>
                {fourth.project && (
                  <Link href={`/projects#${fourth.project}`} className="shrink-0 text-accent hover:text-accent-hover">
                    Project
                  </Link>
                )}
              </Caption>
            </figure>

            {[lead, second].map((shot) => (
              <figure key={shot.src} className="group relative aspect-[4/3] overflow-hidden border border-border lg:col-span-4 lg:aspect-auto lg:h-[22rem]">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ objectPosition: shot.pos }}
                />
                <Caption>
                  <span>{shot.caption}</span>
                  {shot.project && (
                    <Link href={`/projects#${shot.project}`} className="shrink-0 text-accent hover:text-accent-hover">
                      Project
                    </Link>
                  )}
                </Caption>
              </figure>
            ))}

            <figure className="relative aspect-[4/3] overflow-hidden border border-border bg-surface lg:col-span-4 lg:aspect-auto lg:h-[22rem]">
              <video
                src="/videos/builds/civic-ek-b18-turbo-rescue.mp4"
                controls
                playsInline
                preload="metadata"
                aria-label="Civic EK B18 turbo rescue: rewired, with base triggers and sensors set up from scratch"
                className="h-full w-full object-cover"
              />
              <figcaption className="font-mono-tech pointer-events-none absolute left-0 top-0 bg-background/85 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em]">
                EK B18 turbo: rewired and set up from scratch
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section id="services" className="border-y border-border bg-surface/40">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What we wire</Eyebrow>
            <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">Six kinds of wiring work</h2>
          </div>
          <ol className="mt-12 border-t border-border-strong">
            {services.map((s, i) => (
              <li key={s.title} className="grid gap-6 border-b border-border-strong py-8 lg:grid-cols-12 lg:gap-8">
                <span className="font-mono-tech text-xs tracking-[0.2em] text-accent lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <div className="lg:col-span-5">
                  <h3 className="font-display text-3xl leading-none sm:text-4xl">{s.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-foreground-muted">{s.text}</p>
                </div>
                <ul className="grid content-start gap-2 text-sm text-foreground lg:col-span-4">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1 w-3 shrink-0 bg-accent" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col items-start gap-1 lg:col-span-2">
                  {s.project && (
                    <Link
                      href={`/projects#${s.project}`}
                      className="font-mono-tech inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.14em] text-foreground-muted hover:text-accent"
                    >
                      Example: {s.projectLabel}
                    </Link>
                  )}
                  <Link
                    href={s.href ?? "#enquiry"}
                    className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent hover:text-accent-hover"
                  >
                    {s.href ? "Learn more" : "Enquire"}
                    <ArrowRight size={14} weight="bold" aria-hidden />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Process */}
      <Section id="process">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>How a wiring project works</Eyebrow>
            <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">From first message to handover</h2>
          </div>
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span aria-hidden className="absolute left-0 right-0 top-[1.1rem] hidden h-px bg-border-strong lg:block" />
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="relative z-10 flex h-9 w-9 items-center justify-center border border-accent bg-background font-mono-tech text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-6 text-3xl">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Project evidence */}
      <Section id="projects" className="border-t border-border bg-surface/40">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <Eyebrow>Wiring in real projects</Eyebrow>
              <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">Jobs we have wired</h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-accent hover:text-accent-hover"
            >
              All projects <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
          </div>

          {wiringProjects.length === 0 ? (
            <p className="mt-10 border border-dashed border-border-strong p-8 text-foreground-muted">
              New wiring projects will appear here as they are completed. Tell us about yours below.
            </p>
          ) : (
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {wiringProjects.map((p) => (
                <li key={p.slug} className="flex flex-col border border-border bg-surface">
                  <div className="relative aspect-video w-full bg-surface-2">
                    {p.media?.type === "image" ? (
                      <Image src={p.media.src} alt={p.media.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    ) : p.media?.type === "video" ? (
                      <video
                        src={p.media.src}
                        controls
                        playsInline
                        preload="metadata"
                        aria-label={`${p.title} video`}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">
                      {[p.vehicle, p.engine, p.ecu].filter(Boolean).join(" · ")}
                    </p>
                    <h3 className="font-display mt-2 text-3xl leading-none">{p.title}</h3>
                    <ul className="mt-4 grid gap-1.5 text-sm text-foreground-muted">
                      {p.buildList.slice(0, 4).map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1 w-3 shrink-0 bg-accent" aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-x-6 pt-5">
                      <Link href={`/projects#${p.slug}`} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover">
                        Full project <ArrowRight size={14} weight="bold" aria-hidden />
                      </Link>
                      <Link href="#enquiry" className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground-muted hover:text-foreground">
                        Similar project? Enquire
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      {/* Honda OBD1 ECU services: UK only */}
      <UkOnlySection>
        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-start">
              <div>
                <Eyebrow>Honda OBD1</Eyebrow>
                <h2 className="font-display mt-5 text-4xl leading-[0.95] sm:text-5xl">Honda OBD1 ECU services</h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                  Classic Honda tuning mods, done properly and bench tested before they leave the workshop.
                </p>
              </div>
              <div className="grid gap-6">
                <div className="border border-border bg-surface p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <h3 className="font-display text-2xl">P28 ECU socketing &amp; bench testing</h3>
                    <span className="font-display shrink-0 text-3xl text-accent">&pound;100</span>
                  </div>
                  <p className="font-mono-tech mt-2 text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                    Service only. Send in or bring your own ECU
                  </p>
                  <ul className="mt-4 grid gap-3">
                    {[
                      <>
                        The P28 (and other OBD1 Honda ECUs) ships with its tuning chip{" "}
                        <strong className="text-foreground">soldered directly to the board</strong>. Socketing replaces
                        that solder joint with a socket, so the chip can be swapped in seconds instead of desoldering
                        and resoldering every revision.
                      </>,
                      <>
                        Essential for chip-based tuning workflows (Uberdata, Crome-style setups) where you are testing
                        multiple maps or need a quick base map swap.
                      </>,
                      <>
                        Other OBD1 Honda ECUs (P72, P75, PR3, PW0, etc.) can be assessed for socketing too. Send your
                        ECU code through the enquiry form and we will confirm.
                      </>,
                    ].map((t, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                        <span className="text-sm text-foreground-muted">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-border bg-surface p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <h3 className="font-display text-2xl">Hondata / Snake EMU / Cobra RTP installation</h3>
                    <span className="font-display shrink-0 text-3xl text-accent">&pound;100</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    Installation and setup of Hondata, Snake EMU or Cobra RTP tuning hardware onto your Honda OBD1/OBD2
                    ECU.
                  </p>
                </div>

                <div className="flex items-start gap-2 border border-border-strong bg-surface-2 p-4 text-xs text-foreground-subtle">
                  <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
                  <span>
                    Both are board-level services. Send your ECU in, or bring it with you to a rolling road session.
                    Additional repair or non-standard work beyond the standard service is quoted separately once we have
                    seen the ECU.
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </UkOnlySection>

      {/* Stuck mid-build / diagnostics */}
      <Section id="diagnostics" className="border-t border-border bg-surface/40">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <Eyebrow>Diagnostics &amp; rescue</Eyebrow>
              <h2 className="font-display mt-5 text-4xl leading-[0.95] sm:text-5xl">Stuck mid-build or not sure what&rsquo;s wrong?</h2>
              <p className="mt-4 leading-relaxed text-foreground-muted">
                One of the most common jobs we take on: a stalled project, a half-finished swap, or wiring done
                elsewhere that won&rsquo;t start, idle, or log right. We diagnose where the build actually stands and
                pick it up from there, rather than insisting on a rewire from scratch.
              </p>
            </div>
            <ul className="grid gap-3">
              {[
                "Diagnose wiring faults from a previous install, ours or another shop's",
                "Pick up incomplete engine swaps and finish the wiring and ECU install",
                "Work out why a standalone or piggyback ECU won't start, idle or log correctly",
                "Honest assessment of salvage versus rewire on a messy or damaged harness",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span className="text-foreground-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 grid gap-8 border border-border bg-background p-6 sm:p-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h3 className="font-display text-3xl">What to send us</h3>
              <p className="mt-2 text-sm text-foreground-muted">The more we know up front, the faster we can tell you where the build stands.</p>
              <ul className="mt-5 grid gap-2 text-sm text-foreground sm:grid-cols-2">
                {[
                  "Symptoms: what it does, and when",
                  "Vehicle, engine and gearbox",
                  "ECU type and software version",
                  "Modifications and what was done before",
                  "Fault codes, if you have them",
                  "Datalogs, photos or video of the install",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1 w-3 shrink-0 bg-accent" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between gap-5 lg:col-span-2">
              <p className="text-sm leading-relaxed text-foreground-muted">
                We assess first. We will not promise a fix or an outcome until we have seen the details and know what we
                are dealing with.
              </p>
              <LinkButton href="#enquiry" size="lg" className="self-start">
                Send us the details
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      {/* Enquiry */}
      <section id="enquiry" className="relative isolate overflow-hidden border-t border-border py-20 sm:py-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,rgba(255,106,31,0.14),transparent_55%)]" />
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Start a wiring project</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(3rem,8vw,6rem)] leading-[0.9]">
              Tell us about <span className="text-accent">your build.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-foreground-muted sm:text-lg">
              Share your vehicle, engine, ECU and wiring requirements so we can understand the project and discuss the
              next steps.
            </p>
            <ul className="mt-8 grid gap-2 text-sm text-foreground">
              {["Vehicle and year", "Engine and configuration", "ECU make and model, if chosen", "The wiring work you need", "Where the project is up to"].map((x) => (
                <li key={x} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1 w-3 shrink-0 bg-accent" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-foreground-muted">
              Prefer email? Write to{" "}
              <a href="mailto:info@streetprogarage.com" className="text-accent underline underline-offset-4">
                info@streetprogarage.com
              </a>{" "}
              and attach photos of the car or existing wiring.
            </p>
          </div>

          <div className="lg:col-span-7">
            <WiringEnquiryForm />

            <details className="group mt-6 border border-border bg-surface">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 p-5 marker:hidden">
                <span>
                  <span className="font-display block text-2xl">Need a full custom harness specified?</span>
                  <span className="text-sm text-foreground-muted">Use the harness builder to give us the complete ECU, trigger, coil and sensor spec.</span>
                </span>
                <span aria-hidden className="font-display text-3xl text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="border-t border-border p-5 sm:p-8">
                <HarnessBuilderForm />
              </div>
            </details>
          </div>
        </Container>
      </section>
    </>
  );
}
