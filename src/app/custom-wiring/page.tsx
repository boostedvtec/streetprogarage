import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle, Info } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { UkOnlySection } from "@/components/region/uk-only-section";
import { HarnessBuilderForm } from "@/components/wiring/harness-builder-form";
import { WiringEnquiryForm } from "@/components/wiring/wiring-enquiry-form";
import { DynoLines } from "@/components/home/dyno-lines";
import {
  EcuHarnessDiagram,
  PowerDiagram,
  SensorDiagram,
  CanDiagram,
  HarnessBoardDiagram,
  PdmDiagram,
} from "@/components/wiring/wiring-diagrams";
import { pdmInstallSteps, pdmModels, pdmSpecsChecked } from "@/lib/pdm-models";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "ECU Installation & Custom Wiring | Street PRO Garage",
  description: "Standalone ECU installs, custom harnesses, PDM installation and engine-swap wiring for MaxxECU, Link, Haltech, AEM and EcuMaster. Discuss your project.",
  path: "/custom-wiring",
  image: "/og/wiring.jpg",
});

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Custom automotive wiring and standalone ECU installation",
  name: "Custom wiring harnesses and ECU installation",
  provider: { "@type": "AutoRepair", name: "Street PRO Garage", url: "https://www.streetprogarage.com" },
  areaServed: ["United Kingdom", "Pakistan"],
  description:
    "Custom wiring harnesses, standalone ECU installation, PDM (power distribution module) installation and setup, engine-swap wiring, sensor and gauge wiring, and wiring fault finding for JDM performance cars.",
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
    title: "PDM installation and setup",
    text: "Replace the fuse and relay box with a programmable PDM, wired, linked to your ECU over CAN and configured.",
    points: [
      "Haltech, PLEX, Hardwire, MoTeC, Link, MaxxECU, Ecumaster, AEM and AiM units",
      "Output wiring, fusing and the CAN link to your ECU",
      "Software set-up of outputs, current limits and fan control",
    ],
    href: "#pdm",
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

/**
 * A wiring diagram in a card. Diagrams carry small text, so on narrow screens
 * they keep a readable minimum width and scroll sideways instead of shrinking.
 */
function DiagramCard({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <figure className="grid border border-border bg-surface lg:grid-cols-12">
      <div
        className="overflow-x-auto p-4 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent sm:p-6 lg:col-span-8"
        tabIndex={0}
        role="region"
        aria-label={`${title} diagram (scrolls sideways on small screens)`}
      >
        <div className="min-w-[600px] sm:min-w-0">{children}</div>
      </div>
      <figcaption className="flex flex-col justify-center border-t border-border p-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-8">
        <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-accent">Generic illustration</p>
        <h3 className="font-display mt-2 text-3xl leading-none sm:text-4xl">{title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">{text}</p>
      </figcaption>
    </figure>
  );
}

export default function CustomWiringPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
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
                See how we wire
              </LinkButton>
            </div>
          </div>

          <div className="lg:col-span-6">
            <figure className="brackets relative border border-border-strong bg-surface/60 p-4 sm:p-6">
              <EcuHarnessDiagram />
              <figcaption className="font-mono-tech mt-4 border-t border-border pt-3 text-[11px] uppercase leading-snug tracking-[0.12em] text-foreground-subtle">
                <span className="text-accent">Generic illustration</span> &nbsp;Standalone ECU harness groups. Not a
                specific vehicle.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* Wiring diagrams */}
      <Section id="work">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Wiring, drawn out</Eyebrow>
            <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">How a harness is laid out</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
              Four generic diagrams of the practice behind every install: clean power, correct sensor references, a
              properly terminated CAN bus and a harness built flat, loomed and labelled before it goes in the car.
            </p>
          </div>

          <div className="mt-12 grid gap-6">
            <DiagramCard
              title="Power, fusing and earths"
              text="Battery, fusing, relays and earths laid out so every circuit is protected and every ground returns cleanly. Relay and fuse setup is part of every ECU install."
            >
              <PowerDiagram />
            </DiagramCard>
            <DiagramCard
              title="Sensor wiring"
              text="Each sensor gets the right 5 V reference, signal and sensor ground, with trigger wiring shielded and routed away from ignition and injector leads, so the readings you log and tune from are clean."
            >
              <SensorDiagram />
            </DiagramCard>
            <DiagramCard
              title="CAN bus layout"
              text="If your build uses CAN devices such as a dash, wideband or keypad, the bus should look like this: a twisted pair, short stubs and a terminator at each end."
            >
              <CanDiagram />
            </DiagramCard>
            <DiagramCard
              title="Harness build board"
              text="Built flat on a board before it goes in the car: convoluted tube on the trunk, heat-shrink at each breakout, every branch labelled and every connector matched to the ECU pinout."
            >
              <HarnessBoardDiagram />
            </DiagramCard>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-foreground-subtle">
            These are generic illustrations of common practice, not a specific vehicle, ECU or pinout. Wire colours and
            connector layouts vary by manufacturer, so every job is wired from your ECU maker&rsquo;s own documentation.
          </p>

          <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Eyebrow>From the workshop</Eyebrow>
              <h3 className="font-display mt-4 text-4xl leading-[0.95] sm:text-5xl">Rewired and set up from scratch</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground-muted">
                A Civic EK B18 turbo rescue: rewired, with base triggers and sensors set up from scratch.
              </p>
              <Link
                href="/projects#civic-ek-b18-turbo-rescue"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent hover:text-accent-hover"
              >
                Full project <ArrowRight size={14} weight="bold" aria-hidden />
              </Link>
            </div>
            <figure className="relative aspect-video overflow-hidden border border-border bg-surface lg:col-span-7">
              <video
                src="/videos/builds/civic-ek-b18-turbo-rescue.mp4"
                controls
                playsInline
                preload="metadata"
                aria-label="Civic EK B18 turbo rescue: rewired, with base triggers and sensors set up from scratch"
                className="h-full w-full object-cover"
              />
            </figure>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section id="services" className="border-y border-border bg-surface/40">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What we wire</Eyebrow>
            <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">Seven kinds of wiring work</h2>
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

      {/* PDM installation */}
      <Section id="pdm" className="border-t border-border">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Power distribution</Eyebrow>
            <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">PDM installation</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
              A PDM replaces the fuse box and relays with electronically switched outputs you configure in software.
              Each output is protected and measured, and the whole thing talks to your ECU and dash over CAN. We fit
              and set up the units below, and others on request.
            </p>
          </div>

          <div className="mt-12 grid gap-6">
            <DiagramCard
              title="PDM layout"
              text="One fused feed in, an ignition-switched wake-up, CAN to the ECU and keypad, and outputs split into high-current loads such as pumps and fans and low-current loads such as lights."
            >
              <PdmDiagram />
            </DiagramCard>
          </div>

          <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-4xl leading-none sm:text-5xl">PDMs we install</h3>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
              {pdmModels.length} makes and models
            </p>
          </div>
          <ul className="mt-8 grid gap-4 lg:grid-cols-2">
            {pdmModels.map((m) => (
              <li key={`${m.brand}-${m.model}`} className="flex flex-col border border-border bg-surface p-6">
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-accent">{m.brand}</p>
                <h4 className="font-display mt-2 text-3xl leading-none sm:text-4xl">{m.model}</h4>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">{m.summary}</p>
                <ul className="mt-4 grid gap-2 text-sm text-foreground">
                  {m.specs.map((s) => (
                    <li key={s} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1 w-3 shrink-0 bg-accent" aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                  <span className="font-mono-tech block text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                    Works with
                  </span>
                  {m.pairsWith}
                </p>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent hover:text-accent-hover"
                >
                  Manufacturer page <ArrowUpRight size={14} weight="bold" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-foreground-subtle">
            Specifications are summarised from each manufacturer&rsquo;s published pages (checked {pdmSpecsChecked}) and
            change between revisions. We confirm the exact model and ECU pairing before quoting. Not listed? Ask, we
            can look at other units.
          </p>

          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>What an install covers</Eyebrow>
              <h3 className="font-display mt-4 text-4xl leading-[0.95] sm:text-5xl">From load list to live test</h3>
              <LinkButton href="#enquiry" size="lg" className="mt-8">
                Enquire about a PDM install
                <ArrowRight size={18} weight="bold" aria-hidden />
              </LinkButton>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {pdmInstallSteps.map((s, i) => (
                <li key={s.title} className="border border-border bg-surface p-5 sm:p-6">
                  <span className="font-mono-tech text-xs tracking-[0.2em] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="font-display mt-2 text-2xl leading-none">{s.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section id="process" className="border-t border-border">
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

      {/* Honda OBD1 ECU services: UK only */}
      <UkOnlySection>
        <Section className="border-t border-border">
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
