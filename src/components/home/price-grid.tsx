"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { LinkButton } from "@/components/ui/button";
import { aftermarketEcuSurcharge, tunePriceMatrix } from "@/lib/site-config";
import { formatRegionPrice, resolveRegionPrice } from "@/lib/region";
import { useRegion } from "@/components/region/region-context";
import { useStill } from "./motion";

type Internals = "stock" | "built";

function Price({ amount, still }: { amount: number; still: boolean }) {
  const [shown, setShown] = useState(amount);
  const fromRef = useRef(amount);
  useEffect(() => {
    if (still || fromRef.current === amount) {
      fromRef.current = amount;
      setShown(amount);
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / 450);
      const e = 1 - Math.pow(1 - k, 3);
      setShown(Math.round(from + (amount - from) * e));
      if (k < 1) raf = requestAnimationFrame(step);
      else fromRef.current = amount;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [amount, still]);
  return <>£{shown}</>;
}

/** Estimated tune prices by build, with a stock / built internals switch. */
export function PriceGrid() {
  const { region } = useRegion();
  const [internals, setInternals] = useState<Internals>("stock");
  const still = useStill();

  if (region === "pk") {
    return (
      <div className="rounded-xl border border-border bg-surface p-8">
        <p className="text-foreground-muted leading-relaxed">
          Every tune in Pakistan is quoted directly once we have reviewed your build list, so you pay for exactly what your car needs.
        </p>
        <div className="mt-6">
          <LinkButton href="/quote" size="lg">
            Send your build list
            <ArrowRight size={20} weight="bold" aria-hidden />
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div role="group" aria-label="Engine internals" className="inline-flex border-2 border-foreground">
        {(
          [
            ["stock", "Stock internals"],
            ["built", "Built / forged"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={internals === key}
            onClick={() => setInternals(key)}
            className={clsx(
              "min-h-11 cursor-pointer px-5 font-display text-base tracking-wider focus-visible:outline-3 focus-visible:outline-offset-[-5px] focus-visible:outline-accent",
              internals === key ? "bg-foreground text-white" : "bg-white text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tunePriceMatrix.map((tune) => {
          const price = tune[internals];
          const amount = resolveRegionPrice(price, region);
          return (
            <div key={tune.aspiration} className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent">
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">{tune.label}</p>
              <p className="font-display mt-2 text-5xl tabular-nums text-accent">
                {amount === null ? formatRegionPrice(price, region) : <Price amount={amount} still={still} />}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">
                {internals === "stock" ? "Stock internals" : "Built / forged engine"}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-5 rounded-lg border border-dashed border-border-strong p-4 text-sm leading-relaxed text-foreground-muted">
        <strong className="text-foreground">Stock ECU</strong> platforms pay the price shown. An{" "}
        <strong className="text-foreground">aftermarket ECU</strong> adds £{aftermarketEcuSurcharge.min} to £
        {aftermarketEcuSurcharge.max} depending on the ECU and the features you need set up. Estimated prices, one price for your build across remote, road and dyno tuning. Dyno time is billed separately.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <LinkButton href="/quote" size="lg">
          Get your quote
          <ArrowRight size={20} weight="bold" aria-hidden />
        </LinkButton>
        <Link
          href="https://wa.me/447438483559"
          className="inline-flex min-h-11 items-center rounded-md border border-border-strong px-5 text-sm font-semibold hover:border-accent"
        >
          Ask on WhatsApp
        </Link>
      </div>
    </div>
  );
}
