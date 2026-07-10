import type { Metadata } from "next";
import {
  PlugsConnected,
  Gauge,
  Cpu,
  CheckCircle,
  Info,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Custom Wiring & ECU Installation | Street PRO Garage",
  description:
    "Custom wiring for standalone and piggyback ECUs, gauge installation, and Honda P28 ECU socketing service at Street PRO Garage.",
};

const wiringServices = [
  "Custom harness fabrication for standalone ECU installs",
  "Piggyback ECU integration with the factory harness",
  "Connector, pinout mapping and relay/fusing setup",
  "Sensor wiring — IAT, CLT, TPS, MAP, wideband O2",
  "Ignition coil and injector wiring",
  "Clean, loomed and labelled harness work — not a rat's nest",
];

const gaugeServices = [
  "Boost gauge wiring and mounting",
  "Wideband AFR gauge installation and ECU integration",
  "Oil pressure and oil temperature gauges",
  "EGT (exhaust gas temperature) gauges",
  "Fuel pressure gauges",
  "Pod, pillar or dash-integrated mounting options",
];

export default function CustomWiringPage() {
  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Wiring &amp; Installation</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Custom Wiring
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            From standalone ECU harnesses to gauge installs and Honda ECU
            socketing — the wiring work behind every tune, done properly.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/quote" size="lg">
              Get a Quote
            </LinkButton>
            <LinkButton href="/tuning" size="lg" variant="secondary">
              See Supported ECUs
            </LinkButton>
          </div>
        </Container>
      </div>

      {/* Standalone & piggyback wiring */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <PlugsConnected size={26} weight="bold" aria-hidden />
              </div>
              <h2 className="font-display mt-6 text-3xl sm:text-4xl">
                Standalone &amp; Piggyback ECU Wiring
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                Whether you&rsquo;re fitting a MaxxECU, Link, Haltech, AEM,
                EcuMaster or Megasquirt, or running a piggyback solution
                alongside your factory ECU, we handle the wiring end-to-end —
                built to last, not just to run once on the dyno.
              </p>
            </div>
            <ul className="grid gap-3">
              {wiringServices.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span className="text-foreground-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Gauge installation */}
      <Section className="border-y border-border bg-surface/50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Gauge size={26} weight="bold" aria-hidden />
              </div>
              <h2 className="font-display mt-6 text-3xl sm:text-4xl">
                Gauge Installation
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                Boost, AFR, oil, EGT — whatever you need to keep an eye on,
                we&rsquo;ll wire it in properly and mount it where it&rsquo;s
                actually usable, not just visible.
              </p>
            </div>
            <ul className="grid gap-3">
              {gaugeServices.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span className="text-foreground-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Honda P28 socketing */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-start">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Cpu size={26} weight="bold" aria-hidden />
              </div>
              <h2 className="font-display mt-6 text-3xl sm:text-4xl">
                Honda P28 ECU Socketing
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                A classic Honda tuning mod, done properly and tested before
                it leaves the workshop.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-8">
              <ul className="grid gap-4">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span className="text-sm text-foreground-muted">
                    The P28 (and other OBD1 Honda ECUs) ships with its tuning
                    chip <strong className="text-foreground">soldered directly to the board</strong>.
                    Socketing replaces that solder joint with a socket, so
                    the chip can be swapped in seconds instead of desoldering
                    and resoldering every revision.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span className="text-sm text-foreground-muted">
                    Essential for chip-based tuning workflows (Uberdata,
                    Crome-style setups) where you&rsquo;re testing multiple
                    maps or need a quick base map swap.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span className="text-sm text-foreground-muted">
                    Other OBD1 Honda ECUs (P72, P75, PR3, PW0, etc.) can be
                    assessed for socketing too — send your ECU code through
                    the build list form and we&rsquo;ll confirm.
                  </span>
                </li>
              </ul>
              <div className="mt-6 flex items-start gap-2 rounded-lg border border-border-strong bg-surface-2 p-4 text-xs text-foreground-subtle">
                <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>
                  Socketing is a board-level modification — send your ECU in,
                  or bring it with you to a rolling road session. Turnaround
                  and pricing confirmed once we&rsquo;ve seen the ECU.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-accent/30 bg-accent-soft p-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl">
                Need wiring done right?
              </h2>
              <p className="mt-2 text-foreground-muted">
                Tell us what you&rsquo;re running and we&rsquo;ll quote the wiring,
                gauges or socketing work you need.
              </p>
            </div>
            <LinkButton href="/quote" size="lg" className="shrink-0">
              Get a Quote
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
