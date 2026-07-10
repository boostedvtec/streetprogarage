"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Broadcast,
  RoadHorizon,
  ChartLineUp,
  Info,
  Circuitry,
  CheckCircle,
  Clock,
  Warning,
  MapPin,
  MagnifyingGlass,
  BookOpen,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton, Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { Modal } from "@/components/ui/modal";
import {
  supportedEcus,
  tuningAddOns,
  naTunePackages,
  forcedInductionUplifts,
  ecuBrandLogos,
  preDynoTests,
  rollingRoad,
  variablePriceNote,
} from "@/lib/site-config";
import { useRegion } from "@/components/region/region-context";
import { PriceTag } from "@/components/region/price-tag";
import { resolveRegionPrice, dynoServiceLabel, type Region } from "@/lib/region";

type TuningType = "remote" | "road" | "rolling-road";

function getTabs(region: Region): { value: TuningType; label: string; icon: typeof Broadcast }[] {
  return [
    { value: "remote", label: "Remote Tuning", icon: Broadcast },
    { value: "road", label: "Road Tuning", icon: RoadHorizon },
    { value: "rolling-road", label: dynoServiceLabel(region), icon: ChartLineUp },
  ];
}

function TuningPageContent() {
  const { data, region } = useRegion();
  const tabs = getTabs(region);
  const searchParams = useSearchParams();
  const initial = searchParams.get("type");
  const initialTab: TuningType =
    initial === "road" || initial === "rolling-road" ? initial : "remote";

  const [active, setActive] = useState<TuningType>(initialTab);
  // Guide opens on the very first time "remote" is the active tab — whether
  // that's the default on load, or a later click — so seed both from the
  // same initial value instead of reacting to it in an effect.
  const [guideOpen, setGuideOpen] = useState(initialTab === "remote");
  const [hasSeenRemoteGuide, setHasSeenRemoteGuide] = useState(initialTab === "remote");

  function selectTab(value: TuningType) {
    setActive(value);
    if (value === "remote" && !hasSeenRemoteGuide) {
      setGuideOpen(true);
      setHasSeenRemoteGuide(true);
    }
  }

  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>{data.city}, {data.country} &middot; Remote Worldwide</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Tuning Services
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            No Stage 1, 2 or 3 kits — every tune at Street PRO Garage is written
            from scratch around your engine, parts, fuel and goals. Pick how
            you&rsquo;d like it done.
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

      {/* Selector */}
      <Section className="pb-0">
        <Container>
          <div
            role="tablist"
            aria-label="Tuning type"
            className="flex flex-wrap gap-3"
          >
            {tabs.map(({ value, label, icon: Icon }) => {
              const isActive = active === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectTab(value)}
                  className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-border-strong bg-surface text-foreground-muted hover:text-foreground"
                  }`}
                >
                  <Icon size={18} weight="bold" aria-hidden />
                  {label}
                </button>
              );
            })}
            {(active === "remote" || active === "road") && (
              <button
                type="button"
                onClick={() => setGuideOpen(true)}
                className="ml-auto flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-foreground-muted hover:text-foreground"
              >
                <BookOpen size={18} aria-hidden />
                View Process Guide
              </button>
            )}
          </div>
        </Container>
      </Section>

      {/* Remote Tuning content */}
      {active === "remote" && (
        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Broadcast size={26} weight="bold" aria-hidden />
                </div>
                <h2 className="font-display mt-6 text-3xl">Live Remote Session</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  We connect to your laptop remotely while you&rsquo;re on the road
                  or on a dyno, tuning live as data comes in — best suited to
                  standalone ECUs and HP Tuners-compatible platforms with a
                  stable connection.
                </p>
              </div>
              <div className="rounded-xl border border-accent/30 bg-accent-soft p-8">
                <h2 className="font-display text-2xl">
                  {naTunePackages.remoteTune.label}
                </h2>
                <p className="font-display mt-2 text-4xl text-accent">
                  <PriceTag price={naTunePackages.remoteTune.price} />
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {naTunePackages.remoteTune.description} Confirmed flat rate
                  for naturally aspirated builds — forced induction builds add
                  the power adder uplift below.
                </p>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Road Tuning content */}
      {active === "road" && (
        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <RoadHorizon size={26} weight="bold" aria-hidden />
                </div>
                <h2 className="font-display mt-6 text-3xl">Data-Log Based Tuning</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  You record datalogs following our guided checklist, upload
                  them, and we return an updated map. We repeat this over as
                  many revisions as your build needs — no live connection
                  required.
                </p>
              </div>
              <div className="rounded-xl border border-accent/30 bg-accent-soft p-8">
                <h2 className="font-display text-2xl">
                  {naTunePackages.roadTune.label}
                </h2>
                <p className="font-display mt-2 text-4xl text-accent">
                  <PriceTag price={naTunePackages.roadTune.price} />
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {naTunePackages.roadTune.description} Confirmed flat rate for
                  naturally aspirated builds — forced induction and standalone
                  ECU builds are quoted individually.
                </p>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Rolling Road content */}
      {active === "rolling-road" && (
        <>
          <Section>
            <Container>
              <div className="flex flex-wrap items-center gap-6 rounded-xl border border-border bg-surface p-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <ChartLineUp size={26} weight="bold" aria-hidden />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-3xl">{dynoServiceLabel(region)}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    Tune live on our in-house dyno in {data.city} with full
                    datalogging and real-time adjustment.
                  </p>
                </div>
                <span className="font-display text-3xl text-accent">
                  <PriceTag price={rollingRoad.ratePerHour} />
                  {resolveRegionPrice(rollingRoad.ratePerHour, region) !== null && (
                    <span className="ml-1 text-sm text-foreground-muted font-body font-normal align-middle">
                      /hour
                    </span>
                  )}
                </span>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-accent/30 bg-accent-soft p-8">
                  <h3 className="font-display text-2xl">
                    {dynoServiceLabel(region)} (NA)
                  </h3>
                  <p className="font-display mt-2 text-4xl text-accent">
                    <PriceTag price={naTunePackages.dynoTune.price} />
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {naTunePackages.dynoTune.description}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-8">
                  <div className="flex items-center gap-3">
                    <MapPin size={22} className="text-accent" aria-hidden />
                    <h3 className="font-display text-xl">Location</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    Sessions are held at our {data.city}, {data.country} workshop. Full
                    address confirmed once your booking is secured.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-border-strong bg-surface-2 p-6">
                <div className="flex items-center gap-3">
                  <Warning size={20} weight="fill" className="text-accent" aria-hidden />
                  <h3 className="font-semibold">Booking Policy</h3>
                </div>
                <p className="mt-2 text-sm text-foreground-muted">
                  {rollingRoad.bookingPolicy}
                </p>
              </div>
            </Container>
          </Section>

          <Section className="border-y border-border bg-surface/50">
            <Container>
              <div className="max-w-2xl">
                <Eyebrow>Optional Add-Ons</Eyebrow>
                <h2 className="font-display mt-4 text-4xl">
                  Pre-Dyno Engine Health Checks
                </h2>
                <p className="mt-4 text-foreground-muted leading-relaxed">
                  Before committing full boost or timing to an engine, it&rsquo;s
                  worth confirming its mechanical health.
                </p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
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
                      <PriceTag price={test.price} />
                    </span>
                  </div>
                ))}
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
        </>
      )}

      {/* Shared: Forced induction pricing */}
      <Section className="border-t border-border">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Power Adder Builds</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Turbo, Supercharged &amp; Nitrous Pricing
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              Added on top of the <PriceTag price={naTunePackages.remoteTune.price} /> basic tune
              price above — applies the same way across remote, road and{" "}
              {region === "pk" ? "dyno" : "rolling road dyno"} tuning.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {forcedInductionUplifts.map((uplift) => (
              <div
                key={uplift.key}
                className="rounded-xl border border-border bg-surface p-8"
              >
                <h3 className="font-display text-xl">{uplift.label}</h3>
                <p className="font-display mt-2 text-3xl text-accent">
                  +<PriceTag price={uplift.amount} />
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {uplift.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Shared: Supported ECUs */}
      <Section className="border-y border-border bg-surface/50">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Platforms</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Supported ECUs
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              Applies across all three tuning methods above.
            </p>
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

      {/* Shared: HP Tuners credits */}
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
                    a <strong className="text-foreground">year/model license</strong>, or an{" "}
                    <strong className="text-foreground">unlimited vehicle group license</strong>.
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
                    list and we&rsquo;ll confirm the exact requirement before you buy.
                  </span>
                </li>
              </ul>
              <div className="mt-6 flex items-start gap-2 rounded-lg border border-border-strong bg-surface-2 p-4 text-xs text-foreground-subtle">
                <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>
                  Credit requirements vary by make, model and ECU generation.
                  Always confirm the exact credit cost for your specific
                  vehicle before purchasing.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Shared: Add-ons */}
      <Section className="border-t border-border bg-surface/50">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Optional Add-Ons</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Build your tune out further
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              Every base tune is quoted individually. These add-ons are quoted
              on top once we know your build.
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
                      <PriceTag price={addOn.price} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-foreground-subtle">
            Add-on pricing is a ballpark estimate and confirmed exactly based on
            your specific vehicle and ECU platform. {variablePriceNote}
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
                Submit your build list to get a ballpark quote.
              </p>
            </div>
            <LinkButton href="/quote" size="lg" className="shrink-0">
              Get a Quote
            </LinkButton>
          </div>
        </Container>
      </Section>

      <Modal
        open={guideOpen}
        onClose={() => setGuideOpen(false)}
        title="What to Expect: Remote Tuning"
      >
        <p className="text-sm leading-relaxed text-foreground-muted">
          Here&rsquo;s how remote and road tuning works from start to finish.
        </p>
        <ol className="mt-5 flex flex-col gap-4">
          {[
            {
              title: "Submit your build list",
              body: "Give us the full picture — engine, mods, ECU, fuel and your goals for the tune.",
            },
            {
              title: "We confirm your method",
              body: "Live remote session or road-logged tuning, based on your ECU platform and setup.",
            },
            {
              title: "Get set up",
              body: "You'll need a laptop that can run the tuning software, the correct ECU/USB interface cable, a stable connection, and — for live sessions — a safe, legal place to drive.",
            },
            {
              title: "Datalog it",
              body: "Follow our pre-tune checklist so we capture the right data on every run.",
            },
            {
              title: "Revise until it's right",
              body: "We review your logs and send updated maps, repeating as many revisions as the build needs.",
            },
            {
              title: "Accept the declaration",
              body: "Tuning is based on the information you provide — read and accept our declaration & liability terms before we start.",
            },
          ].map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm text-accent">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-foreground-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
          <Link
            href="/pre-tune-checklist"
            className="text-sm font-semibold text-accent underline"
            onClick={() => setGuideOpen(false)}
          >
            Pre-Tune Checklist
          </Link>
          <Link
            href="/declaration"
            className="text-sm font-semibold text-accent underline"
            onClick={() => setGuideOpen(false)}
          >
            Declaration &amp; Liability
          </Link>
        </div>
        <Button className="mt-6 w-full" onClick={() => setGuideOpen(false)}>
          Got It
        </Button>
      </Modal>
    </>
  );
}

export default function TuningPage() {
  return <TuningPageContent />;
}
