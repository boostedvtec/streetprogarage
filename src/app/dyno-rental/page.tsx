import type { Metadata } from "next";
import Link from "next/link";
import { ChartLineUp, Clock, Gauge, Info, Warning, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { PriceTag } from "@/components/region/price-tag";
import { dynoRental } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Dyno Rental | Street PRO Garage",
  description:
    "Rent our rolling road dyno on its own — no tuning included. Per run or per hour, for logging, verifying your own tune, or before/after pulls.",
};

const included = [
  "Full datalogging throughout your session",
  "Wideband AFR monitoring",
  "Power & torque graph output for your records",
  "Use of our in-house rolling road dyno and staff operator",
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
            Already got a tune, or just want logged pulls without a full
            tuning session? Rent our rolling road dyno on its own — per run
            or per hour, whichever suits what you need it for.
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

      <Section className="border-y border-border bg-surface/50">
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

      <Section>
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
