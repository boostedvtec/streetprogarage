import type { Metadata } from "next";
import {
  Broadcast,
  ChartLineUp,
  Info,
  Circuitry,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { supportedEcus, tuningAddOns, naTunePackages, ecuBrandLogos } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Remote ECU Tuning | Street PRO Garage",
  description:
    "Custom-built remote ECU tuning delivered worldwide — stock ECU reflash via HP Tuners or standalone ECU tuning, written from scratch for your exact build.",
};

const methods = [
  {
    icon: Broadcast,
    title: "Live Remote Session",
    description:
      "We connect to your laptop remotely while you're on the road or on a dyno, tuning live as data comes in — best suited to standalone ECUs and HP Tuners-compatible platforms with a stable connection.",
  },
  {
    icon: ChartLineUp,
    title: "Data-Log Based Tuning",
    description:
      "You record datalogs following our guided checklist, upload them, and we return an updated map. We repeat this over as many revisions as your build needs.",
  },
];

export default function RemoteTuningPage() {
  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Remote Tuning &middot; Worldwide</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Remote ECU Tuning
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            No Stage 1, 2 or 3 kits — every tune at Street PRO Garage is written
            from scratch around your engine, parts, fuel and goals, delivered
            anywhere in the world.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/quote" size="lg">
              Submit Your Build List
            </LinkButton>
            <LinkButton href="/pre-tune-checklist" size="lg" variant="secondary">
              View Pre-Tune Checklist
            </LinkButton>
          </div>
        </Container>
      </div>

      {/* How it works */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Two ways we tune remotely
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              Which method we use depends on your ECU platform and setup — we&rsquo;ll
              confirm the right approach once we&rsquo;ve reviewed your build list.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {methods.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-surface p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={26} weight="bold" aria-hidden />
                </div>
                <h3 className="font-display mt-6 text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* NA pricing */}
      <Section className="border-y border-border bg-surface/50">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Naturally Aspirated Pricing</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Confirmed NA pricing
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              For naturally aspirated builds, here&rsquo;s exactly what you&rsquo;ll pay —
              no ballpark ranges. Forced induction and standalone ECU builds
              are quoted individually via the build list form.
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
            <div className="rounded-xl border border-border bg-surface p-8">
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

      {/* Supported ECUs */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Platforms</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Supported ECUs
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {supportedEcus.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-border bg-surface p-8"
              >
                <div className="flex items-center gap-3">
                  <Circuitry size={24} className="text-accent" aria-hidden />
                  <h3 className="font-display text-xl">{group.category}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.ecus.map((ecu) => (
                    <li
                      key={ecu}
                      className="rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-xs font-medium text-foreground-muted"
                    >
                      {ecu}
                    </li>
                  ))}
                </ul>
                {group.note && (
                  <p className="mt-4 text-xs text-foreground-subtle">{group.note}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {ecuBrandLogos.map((logo) => (
              <BrandLogo key={logo.name} {...logo} />
            ))}
          </div>
        </Container>
      </Section>

      {/* HP Tuners credits */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-start">
            <div>
              <Eyebrow>Stock ECU Tuning</Eyebrow>
              <h2 className="font-display mt-4 text-4xl">
                HP Tuners credits, explained
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                Stock ECU tuning through HP Tuners requires the vehicle&rsquo;s ECU
                to be &ldquo;unlocked&rdquo; using credits before it can be read and
                written. This is separate from our tuning fee.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-8">
              <ul className="grid gap-4">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span className="text-sm text-foreground-muted">
                    Most standard vehicles need <strong className="text-foreground">2&ndash;4 credits</strong> to
                    unlock; higher-performance and newer platforms can require
                    up to <strong className="text-foreground">8&ndash;10 credits</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span className="text-sm text-foreground-muted">
                    Credits can be bought as a <strong className="text-foreground">single-vehicle license</strong>,
                    a <strong className="text-foreground">year/model license</strong> (unlimited vehicles of
                    one model/year), or an <strong className="text-foreground">unlimited vehicle group license</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span className="text-sm text-foreground-muted">
                    Credits are purchased directly through HP Tuners and require
                    a compatible MPVI interface — they are not resold by
                    Street PRO Garage.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span className="text-sm text-foreground-muted">
                    Not sure how many credits your car needs? Submit your build
                    list and we&rsquo;ll confirm the exact requirement for your
                    specific ECU before you buy.
                  </span>
                </li>
              </ul>
              <div className="mt-6 flex items-start gap-2 rounded-lg border border-border-strong bg-surface-2 p-4 text-xs text-foreground-subtle">
                <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>
                  Credit requirements vary by make, model and ECU generation.
                  Figures above are typical ranges — always confirm the exact
                  credit cost for your specific vehicle before purchasing.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Add-ons */}
      <Section className="border-t border-border bg-surface/50">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Optional Add-Ons</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Build your tune out further
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              Every base tune is quoted individually. These add-ons are quoted
              on top once we know your build — figures below are starting
              ballpark estimates.
            </p>
          </div>
          <div className="mt-12 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2">
                  <th className="px-6 py-4 font-display text-base tracking-wide">Add-On</th>
                  <th className="px-6 py-4 font-display text-base tracking-wide">Description</th>
                  <th className="px-6 py-4 font-display text-base tracking-wide">From</th>
                </tr>
              </thead>
              <tbody>
                {tuningAddOns.map((addOn) => (
                  <tr key={addOn.name} className="border-b border-border last:border-b-0 bg-surface">
                    <td className="px-6 py-4 font-semibold whitespace-nowrap">{addOn.name}</td>
                    <td className="px-6 py-4 text-foreground-muted">{addOn.description}</td>
                    <td className="px-6 py-4 font-semibold text-accent whitespace-nowrap">
                      &pound;{addOn.priceFrom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-foreground-subtle">
            Add-on pricing is a ballpark estimate and confirmed exactly based on
            your specific vehicle and ECU platform.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-accent/30 bg-accent-soft p-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl">
                Ready to get tuned?
              </h2>
              <p className="mt-2 text-foreground-muted">
                Submit your build list to get a ballpark quote for your remote tune.
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
