import type { Metadata } from "next";
import { ShieldCheck, HandCoins, Info } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Finance & Warranty | Street PRO Garage",
  description:
    "Finance options and warranty terms for tuning and parts at Street PRO Garage.",
};

export default function FinanceWarrantyPage() {
  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Finance &amp; Warranty</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Finance &amp; Warranty
          </h1>
        </Container>
      </div>

      <Section>
        <Container className="max-w-3xl">
          <div className="rounded-xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck size={26} className="shrink-0 text-accent" aria-hidden />
              <h2 className="font-display text-2xl">Tuning Workmanship Warranty</h2>
            </div>
            <p className="mt-4 leading-relaxed text-foreground-muted">
              We stand behind the tuning work we deliver. If a completed tune
              needs revising due to an error on our part, we&rsquo;ll correct it at
              no extra charge within the revision window agreed at the time of
              booking. This warranty covers our workmanship only — it does not
              cover pre-existing mechanical issues, parts failure, or damage
              resulting from inaccurate build information (see our{" "}
              <a href="/declaration" className="text-accent underline">
                Declaration &amp; Liability
              </a>{" "}
              terms).
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <HandCoins size={26} className="shrink-0 text-accent" aria-hidden />
              <h2 className="font-display text-2xl">Finance Options</h2>
            </div>
            <p className="mt-4 leading-relaxed text-foreground-muted">
              We&rsquo;re happy to discuss instalment arrangements for larger
              tuning packages, parts orders or combined builds — get in touch
              and we&rsquo;ll work out a plan that suits your budget.
            </p>
          </div>

          <div className="mt-8 flex items-start gap-2 rounded-lg border border-border-strong bg-surface-2 p-4 text-xs text-foreground-subtle">
            <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
            <span>
              Warranty and finance terms are outline placeholders — confirm
              exact terms, durations and any finance partner details before
              this page goes live.
            </span>
          </div>

          <div className="mt-8">
            <LinkButton href="/contact" size="lg">
              Talk To Us
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
