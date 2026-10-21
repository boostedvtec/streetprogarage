import Link from "next/link";
import { ArrowRight, LockSimple } from "@phosphor-icons/react/dist/ssr";
import { paymentLinks } from "@/lib/payment-links";

/**
 * Site-wide online payment strip, rendered above the header on every page.
 * The destination is the Stripe Payment Link configured in
 * `src/lib/payment-links.ts` (`paymentLinks.tuning`). Visitors without a
 * price yet are pointed at the quote form first.
 */
export function PaymentStrip() {
  return (
    <aside
      aria-label="Online tuning session payment"
      className="strip-sweep relative overflow-hidden bg-accent text-accent-foreground"
    >
      {/* Directional chevrons, purely decorative */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-72 text-black/10 sm:block"
        viewBox="0 0 288 48"
        preserveAspectRatio="none"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${i * 48} 0 L${i * 48 + 24} 24 L${i * 48} 48 L${i * 48 + 12} 48 L${i * 48 + 36} 24 L${i * 48 + 12} 0 Z`} fill="currentColor" />
        ))}
      </svg>

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-x-4 gap-y-1.5 px-4 py-2 sm:px-6 lg:px-8">
        <p className="flex min-w-0 items-baseline gap-x-3 gap-y-0.5">
          <span className="font-display whitespace-nowrap text-lg leading-none tracking-wider sm:text-xl">
            Remote tuning<span className="hidden sm:inline"> sessions</span>
          </span>
          <span className="hidden text-sm font-medium md:inline">
            Agreed your price? Pay for your session securely online.
          </span>
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/quote"
            className="hidden min-h-11 items-center whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.08em] underline decoration-black/40 underline-offset-4 hover:decoration-black lg:inline-flex"
          >
            Get a quote first
          </Link>
          <a
            href={paymentLinks.tuning}
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-[3px] bg-background px-3 sm:px-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <LockSimple size={15} weight="bold" aria-hidden />
            <span className="sm:hidden">Pay online</span>
            <span className="hidden sm:inline">Book &amp; pay online</span>
            <ArrowRight size={16} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </aside>
  );
}
