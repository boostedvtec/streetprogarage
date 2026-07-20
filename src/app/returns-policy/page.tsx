import type { Metadata } from "next";
import { ArrowCounterClockwise, Prohibit, CreditCard, Clock } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Returns Policy | Street PRO Garage",
  description:
    "Returns, refunds and deposit terms for parts orders from Street PRO Garage.",
};

export default function ReturnsPolicyPage() {
  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Parts Orders</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Returns Policy
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Applies to parts ordered through our online shop. This doesn&rsquo;t
            affect your statutory rights.
          </p>
        </Container>
      </div>

      <Section>
        <Container className="max-w-3xl">
          <div className="rounded-xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <ArrowCounterClockwise size={26} className="shrink-0 text-accent" aria-hidden />
              <h2 className="font-display text-2xl">Returning an Item</h2>
            </div>
            <p className="mt-4 leading-relaxed text-foreground-muted">
              If a part turns out to be unsuitable, you can return it for a
              refund, credit or exchange within{" "}
              <strong className="text-foreground">14 days of receipt</strong>,
              provided:
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-foreground-muted">
              <li>• Return postage is paid by you.</li>
              <li>
                • The item is unused, in its original condition, and in a
                resalable state.
              </li>
              <li>
                • It&rsquo;s returned complete with all original packaging in
                good condition — a 50% charge applies if packaging is
                damaged.
              </li>
              <li>
                • Every return is sent with your name, address, order
                reference and reason for return.
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-foreground-muted">
              Returns made after the 14-day window may be subject to a
              restocking charge of at least 10% of the item&rsquo;s RRP.
              We&rsquo;re not responsible for return parcels lost in transit —
              keep your proof of postage in case you need to make a claim
              with the carrier.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <Prohibit size={26} className="shrink-0 text-accent" aria-hidden />
              <h2 className="font-display text-2xl">What Can&rsquo;t Be Returned</h2>
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-foreground-muted">
              <li>
                • Parts specially ordered or manufactured to your
                specification.
              </li>
              <li>• Software or device feature licenses.</li>
            </ul>
            <p className="mt-4 leading-relaxed text-foreground-muted">
              We&rsquo;re not responsible for labour charges incurred fitting or
              removing a part that&rsquo;s later found faulty or incorrectly
              supplied.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-accent/30 bg-accent-soft p-8">
            <div className="flex items-center gap-3">
              <CreditCard size={26} weight="fill" className="shrink-0 text-accent" aria-hidden />
              <h2 className="font-display text-2xl">Deposits on Special Orders</h2>
            </div>
            <p className="mt-4 leading-relaxed text-foreground">
              On any non-stock, special-order item, we reserve the right to
              charge a deposit of{" "}
              <strong>£100 or 50% of the order value</strong> (whichever
              applies) to your credit or debit card. This deposit is{" "}
              <strong>non-refundable if the order is cancelled</strong> — it
              covers goods ordered in on your behalf, on your instruction.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <Clock size={26} className="shrink-0 text-accent" aria-hidden />
              <h2 className="font-display text-2xl">Shortages &amp; Carrier Damage</h2>
            </div>
            <p className="mt-4 leading-relaxed text-foreground-muted">
              Please let us know about any shortage or carrier damage within{" "}
              <strong className="text-foreground">5 days of receipt</strong>{" "}
              — beyond that window we may not be able to process a claim.
            </p>
          </div>

          <div className="mt-10">
            <LinkButton href="/contact" size="lg">
              Start a Return
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
