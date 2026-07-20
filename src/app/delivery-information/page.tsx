import type { Metadata } from "next";
import { Truck, Globe, Package } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { deliveryOptions, type DeliveryOption } from "@/lib/delivery";

export const metadata: Metadata = {
  title: "Delivery Information | Street PRO Garage",
  description:
    "Delivery options and shipping rates for parts orders from Street PRO Garage.",
};

function TierTable({ tiers }: { tiers: DeliveryOption[] }) {
  return (
    <ul className="mt-4 divide-y divide-border">
      {tiers.map((tier) => (
        <li key={tier.id} className="flex items-center justify-between gap-4 py-3">
          <span className="text-foreground-muted">{tier.name}</span>
          <span className="font-display text-lg text-accent">£{tier.price.toFixed(2)}</span>
        </li>
      ))}
    </ul>
  );
}

export default function DeliveryInformationPage() {
  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Shipping</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Delivery Information
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Rates below apply to parts orders shipped from our UK workshop.
            Your delivery method is selected at checkout — the exact cost is
            added to your order total there.
          </p>
        </Container>
      </div>

      <Section>
        <Container className="max-w-3xl">
          <div className="rounded-xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <Truck size={26} className="shrink-0 text-accent" aria-hidden />
              <h2 className="font-display text-2xl">UK Delivery</h2>
            </div>
            <TierTable tiers={deliveryOptions.filter((o) => o.region === "UK")} />
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <Globe size={26} className="shrink-0 text-accent" aria-hidden />
              <h2 className="font-display text-2xl">Europe</h2>
            </div>
            <TierTable tiers={deliveryOptions.filter((o) => o.region === "Europe")} />
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <Package size={26} className="shrink-0 text-accent" aria-hidden />
              <h2 className="font-display text-2xl">Rest of the World</h2>
            </div>
            <TierTable tiers={deliveryOptions.filter((o) => o.region === "Rest of World")} />
          </div>

          <div className="mt-8 rounded-xl border border-border-strong bg-surface-2 p-6 text-sm leading-relaxed text-foreground-muted">
            Large or oversized items (turbos, intercoolers, full exhaust
            systems, etc.) may be quoted a bespoke courier rate outside the
            tiers above — we&rsquo;ll confirm before dispatch if that applies
            to your order. See our{" "}
            <a href="/returns-policy" className="text-accent underline">
              Returns Policy
            </a>{" "}
            for what happens if a delivery arrives damaged or short.
          </div>

          <div className="mt-10">
            <LinkButton href="/parts" size="lg">
              Browse Parts
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
