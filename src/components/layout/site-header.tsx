"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X, WhatsappLogo, ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/logo";
import { navLinks } from "@/lib/site-config";
import { useCart } from "@/components/cart/cart-context";
import { useRegion } from "@/components/region/region-context";
import { RegionSwitcher } from "@/components/region/region-switcher";

function CartLink() {
  const { itemCount } = useCart();
  return (
    <Link
      href="/cart"
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
      aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
    >
      <ShoppingCart size={22} aria-hidden />
      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
          {itemCount}
        </span>
      )}
    </Link>
  );
}

/** Interpolates between two hex colors at t (0-1). */
function mixHex(from: string, to: string, t: number): string {
  const parse = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const [r1, g1, b1] = parse(from);
  const [r2, g2, b2] = parse(to);
  const mix = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgb(${mix(r1, r2)}, ${mix(g1, g2)}, ${mix(b1, b2)})`;
}

/**
 * Signature detail: a tachometer sweep — thin gauge ticks that shift from
 * graphite (idle) to accent orange (redline) left-to-right, standing in for
 * the header's bottom border. A literal nod to the dyno/rev-counter world
 * this brand tunes in, rather than a generic gradient rule.
 */
const TICK_COUNT = 56;

function TachStrip() {
  return (
    <div className="flex h-[5px] w-full" aria-hidden>
      {Array.from({ length: TICK_COUNT }).map((_, i) => {
        const t = i / (TICK_COUNT - 1);
        const tall = i % 7 === 0;
        return (
          <span
            key={i}
            className="flex-1"
            style={{
              backgroundColor: mixHex("#262626", "#cf5f1c", t),
              height: tall ? "100%" : "60%",
              alignSelf: "flex-end",
              marginRight: i === TICK_COUNT - 1 ? 0 : "1px",
            }}
          />
        );
      })}
    </div>
  );
}

const navLinkClass =
  "font-body relative rounded-md px-3 py-2 text-base font-semibold tracking-normal text-foreground-muted transition-colors hover:text-foreground after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-[2px] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { region, data } = useRegion();
  const visibleLinks = navLinks.filter((link) => (link.regions as readonly string[]).includes(region));

  return (
    <>
      <div className="bg-graphite px-4 py-2 text-center text-xs text-white sm:text-sm">
        <p className="mx-auto max-w-7xl">
          <span className="italic">
            &ldquo;Performance isn&rsquo;t created by chance&mdash;it&rsquo;s engineered.&rdquo;
          </span>{" "}
          <span className="font-semibold text-accent">&mdash; Street PRO Garage</span>
        </p>
      </div>

      <header className="sticky top-0 z-50 max-h-[20vh] overflow-hidden bg-background/95 shadow-[0_1px_3px_rgba(23,20,15,0.08)] backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:min-h-20 lg:px-8">
        {/* Sized in vh (not fixed px) so the logo scales with viewport
            height while the header's max-h-[20vh] above guarantees it —
            plus padding and the tach strip below — never exceeds 20% of
            the screen, on any device. */}
        <Logo imgClassName="h-[clamp(64px,15vh,140px)] lg:h-[clamp(80px,16vh,160px)]" />

        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {visibleLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={data.phoneHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp us: ${data.phone}`}
            title={data.phone}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            <WhatsappLogo size={20} weight="fill" aria-hidden />
          </a>
          <RegionSwitcher />
          {data.services.parts && <CartLink />}
          <Link
            href="/quote"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-[0_4px_14px_rgba(207,95,28,0.35)] transition-colors hover:bg-accent-hover cursor-pointer"
          >
            Get a Quote
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <RegionSwitcher />
          {data.services.parts && <CartLink />}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground cursor-pointer"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <List size={26} />}
          </button>
        </div>
      </div>

      <TachStrip />

      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-border bg-background px-4 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col">
            {visibleLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-foreground-muted hover:bg-surface hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
            <a
              href={data.phoneHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-foreground-muted"
            >
              <WhatsappLogo size={18} weight="fill" aria-hidden />
              {data.phone}
            </a>
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="rounded-md bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground"
            >
              Get a Quote
            </Link>
          </div>
        </nav>
      )}
      </header>
    </>
  );
}
