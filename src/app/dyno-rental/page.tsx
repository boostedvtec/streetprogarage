import type { Metadata } from "next";
import Link from "next/link";
import {
  ChartLineUp,
  Clock,
  Gauge,
  Info,
  Warning,
  CheckCircle,
  MagnifyingGlass,
  SlidersHorizontal,
  ArrowsClockwise,
  Wrench,
  Thermometer,
  FileText,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { PriceTag } from "@/components/region/price-tag";
import { dynoRental } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Dyno Rental | Street PRO Garage",
  description:
    "2WD rolling road dyno with an eddy current brake — power runs, live ECU tuning, diagnostics, load-hold testing and more. Rent it on its own, per run or per hour.",
};

const included = [
  "Full datalogging throughout your session",
  "Wideband AFR monitoring",
  "Power & torque graph output for your records",
  "Use of our in-house rolling road dyno and staff operator",
];

const capabilities = [
  {
    icon: ChartLineUp,
    title: "Power & Torque Runs",
    description:
      "Full pulls to measure peak power and torque, with a graph output for your records.",
  },
  {
    icon: SlidersHorizontal,
    title: "Live ECU Tuning",
    description:
      "Real-time map adjustments under load — the same dyno used for our Rolling Road Dyno Tuning service.",
  },
  {
    icon: MagnifyingGlass,
    title: "Diagnostics & Fault Finding",
    description:
      "Misfires, boost leaks, and fuelling or ignition issues that only show up under real load.",
  },
  {
    icon: Gauge,
    title: "Steady-State & Load-Hold Testing",
    description:
      "The eddy current brake holds a fixed RPM and load — something an inertia dyno can't do — ideal for part-throttle, cruise and closed-loop map tuning.",
  },
  {
    icon: ArrowsClockwise,
    title: "Before/After Comparison Runs",
    description:
      "Back-to-back pulls under the same conditions to validate a part fitment, tune revision or repair.",
  },
  {
    icon: Wrench,
    title: "Parts & Modification Verification",
    description:
      "Confirm real gains from a turbo, intercooler, exhaust, cam or any other mod — not just marketing claims.",
  },
  {
    icon: Thermometer,
    title: "Cooling & Reliability Stress Testing",
    description:
      "Sustained load runs to check cooling system performance and reliability under real strain.",
  },
  {
    icon: FileText,
    title: "Proof-of-Power Printouts",
    description:
      "A dated power & torque graph for insurance, record-keeping, or bragging rights.",
  },
];

export default function DynoRentalPage() {
  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Workshop Add-On</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Dyno Rental
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Our 2WD rolling road runs on an eddy current brake, not a simple
            inertia drum — good for a lot more than flat-out power runs.
            Already got a tune, or just want logged pulls without a full
            tuning session? Rent it on its own, per run or per hour.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/contact" size="lg">
              Book Dyno Time
            </LinkButton>
            <LinkButton href="/tuning?type=rolling-road" size="lg" variant="secondary">
              Looking for a Tune Instead?
            </LinkButton>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>The Equipment</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              2WD Dyno with Eddy Current Brake
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              An eddy current brake can hold a fixed load at any RPM, not
              just measure acceleration through a pull like a basic inertia
              dyno — which opens up a lot more than power runs.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={22} weight="bold" aria-hidden />
                </div>
                <h3 className="font-display mt-4 text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-surface/50">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Gauge size={26} weight="bold" aria-hidden />
              </div>
              <h2 className="font-display mt-6 text-2xl">2 Runs</h2>
              <p className="font-display mt-2 text-4xl text-accent">
                <PriceTag price={dynoRental.perTwoRuns} />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                Two pulls — ideal for a before/after check, or verifying a
                change you&rsquo;ve just made against a baseline run.
              </p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent-soft p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/60 text-accent">
                <ChartLineUp size={26} weight="bold" aria-hidden />
              </div>
              <h2 className="font-display mt-6 text-2xl">Per Hour</h2>
              <p className="font-display mt-2 text-4xl text-accent">
                <PriceTag price={dynoRental.perHour} />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                A block of dyno time for multiple runs — better value if
                you&rsquo;re logging several changes or self-tuning across a
                session.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border-strong bg-surface-2 p-6">
            <div className="flex items-center gap-3">
              <Info size={20} weight="fill" className="text-accent" aria-hidden />
              <h3 className="font-semibold">Dyno Time Only — No Tuning Included</h3>
            </div>
            <p className="mt-2 text-sm text-foreground-muted">
              This is rented dyno time, not a tuning service. If you need us
              to write or adjust the map, see{" "}
              <Link href="/tuning?type=rolling-road" className="text-accent underline">
                Rolling Road Dyno Tuning
              </Link>{" "}
              instead.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-border-strong bg-surface-2 p-6">
            <div className="flex items-center gap-3">
              <Warning size={20} weight="fill" className="text-accent" aria-hidden />
              <h3 className="font-semibold">Booking Policy</h3>
            </div>
            <p className="mt-2 text-sm text-foreground-muted">
              {dynoRental.bookingPolicy}
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>What&rsquo;s Included</Eyebrow>
              <h2 className="font-display mt-4 text-4xl">
                Every session includes
              </h2>
            </div>
            <ul className="grid gap-4">
              {included.map((item) => (
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

      <Section className="border-t border-border">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-accent/30 bg-accent-soft p-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl">
                Need the dyno for an hour, or just one run?
              </h2>
              <p className="mt-2 text-foreground-muted">
                Get in touch to check availability and book your session.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <LinkButton href="/contact" size="lg">
                <Clock size={20} weight="bold" aria-hidden />
                Book Now
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
