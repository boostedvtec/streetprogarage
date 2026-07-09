import type { Metadata } from "next";
import { Clock, Warning, MapPin, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { preDynoTests, rollingRoad, naTunePackages } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Rolling Road Tuning in Manchester | Street PRO Garage",
  description:
    "Book a rolling road dyno tuning session in Manchester, UK. NA tune packages from £300, £100/hr dyno rate, pre-booking required, with optional pre-dyno engine health checks.",
};

export default function RollingRoadPage() {
  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Manchester, UK</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Rolling Road Tuning
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Tune live on our in-house rolling road dyno with full datalogging
            and real-time adjustment. Custom-built maps only — every session is
            tuned around your exact build, not a stage kit.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <span className="font-display text-4xl text-accent">
              {rollingRoad.currency}{rollingRoad.ratePerHour}
              <span className="ml-1 text-base text-foreground-muted font-body font-normal align-middle">/ hour</span>
            </span>
            <LinkButton href="/quote" size="lg">
              Book a Session
            </LinkButton>
          </div>
        </Container>
      </div>

      {/* NA tune packages */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Naturally Aspirated Pricing</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              NA Tune Packages
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              Confirmed flat rates for naturally aspirated builds — no
              guesswork. Forced induction and standalone ECU builds are
              quoted individually via the build list form.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-8">
              <h3 className="font-display text-2xl">{naTunePackages.roadTune.label}</h3>
              <p className="font-display mt-2 text-4xl text-accent">
                &pound;{naTunePackages.roadTune.price}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {naTunePackages.roadTune.description}
              </p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent-soft p-8">
              <h3 className="font-display text-2xl">{naTunePackages.rollingRoadTune.label}</h3>
              <p className="font-display mt-2 text-4xl text-accent">
                &pound;{naTunePackages.rollingRoadTune.price}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {naTunePackages.rollingRoadTune.description}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Booking policy */}
      <Section className="border-y border-border bg-surface/50">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-8">
              <div className="flex items-center gap-3">
                <MapPin size={24} className="text-accent" aria-hidden />
                <h2 className="font-display text-2xl">Location</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                Rolling road sessions are held at our Manchester, UK workshop.
                Full address is confirmed once your booking is secured.
              </p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent-soft p-8">
              <div className="flex items-center gap-3">
                <Warning size={24} weight="fill" className="text-accent" aria-hidden />
                <h2 className="font-display text-2xl">Booking Policy</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {rollingRoad.bookingPolicy}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pre-dyno tests */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Optional Add-Ons</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Pre-Dyno Engine Health Checks
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              Before committing full boost or timing to an engine, it&rsquo;s worth
              confirming its mechanical health. These checks are available for
              an additional charge ahead of your session.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {preDynoTests.map((test) => (
              <div
                key={test.name}
                className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface p-6"
              >
                <div className="flex items-start gap-3">
                  <MagnifyingGlass size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <h3 className="font-semibold">{test.name}</h3>
                    <p className="mt-1 text-sm text-foreground-muted">{test.description}</p>
                  </div>
                </div>
                <span className="shrink-0 font-display text-xl text-accent">
                  &pound;{test.priceFrom}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-foreground-subtle">
            Prices are ballpark starting figures — confirmed exactly when booking.
          </p>
        </Container>
      </Section>

      {/* What's included */}
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
              {[
                "Full datalogging throughout the session",
                "Live map adjustments based on real dyno data",
                "Wideband AFR monitoring",
                "Power & torque graph output for your records",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Clock size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
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
                Book your rolling road slot
              </h2>
              <p className="mt-2 text-foreground-muted">
                Submit your build list first so we can prepare for your session.
              </p>
            </div>
            <LinkButton href="/quote" size="lg" className="shrink-0">
              Get Started
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
