"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { List, X, WhatsappLogo, ShoppingCart, CaretDown } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/logo";
import { navLinks } from "@/lib/site-config";
import { paymentLinks } from "@/lib/payment-links";
import { categories } from "@/lib/products";
import { useCart } from "@/components/cart/cart-context";
import { useRegion } from "@/components/region/region-context";
import { RegionSwitcher } from "@/components/region/region-switcher";

/** Links shown in the desktop bar; the rest live in the mobile menu and footer. */
const PRIMARY_HREFS = new Set(["/tuning", "/custom-wiring", "/dyno-rental", "/parts", "/engine-swaps", "/projects", "/contact"]);

function CartLink() {
  const { itemCount } = useCart();
  return (
    <Link
      href="/cart"
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-[3px] text-foreground-muted transition-colors hover:bg-surface-2 hover:text-foreground"
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
 * Signature detail: a tachometer sweep. Gauge ticks shift from graphite
 * (idle) to accent orange (redline) left to right, standing in for the
 * header's bottom border.
 */
const TICK_COUNT = 64;

function TachStrip() {
  return (
    <div className="flex h-[4px] w-full" aria-hidden>
      {Array.from({ length: TICK_COUNT }).map((_, i) => {
        const t = i / (TICK_COUNT - 1);
        const tall = i % 8 === 0;
        return (
          <span
            key={i}
            className="flex-1"
            style={{
              backgroundColor: mixHex("#26262c", "#ff6a1f", t * t),
              height: tall ? "100%" : "55%",
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
  "relative whitespace-nowrap px-2.5 py-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-foreground-muted transition-colors hover:text-foreground after:absolute after:bottom-0.5 after:left-2.5 after:right-2.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [categoryMenuTop, setCategoryMenuTop] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { region, data } = useRegion();
  const visibleLinks = navLinks.filter((link) => (link.regions as readonly string[]).includes(region));
  const primaryLinks = visibleLinks.filter((link) => PRIMARY_HREFS.has(link.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  function openCategoryMenu() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (headerRef.current) {
      setCategoryMenuTop(headerRef.current.getBoundingClientRect().bottom);
    }
    setCategoryMenuOpen(true);
  }

  /** Delayed close so quickly moving the cursor from the nav link down to
      the panel doesn't close the menu before it gets there. */
  function scheduleCloseCategoryMenu() {
    closeTimerRef.current = setTimeout(() => setCategoryMenuOpen(false), 250);
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-[3px] bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        className={clsx(
          "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-b border-border bg-background/85 backdrop-blur-xl"
            : "border-b border-transparent bg-background/40 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 xl:min-h-[4.5rem] lg:px-8">
          <Logo imgClassName="h-12 sm:h-14 lg:h-14" />

          <nav aria-label="Main" className="hidden xl:flex xl:items-center">
            {primaryLinks.map((link) =>
              link.href === "/parts" ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openCategoryMenu}
                  onMouseLeave={scheduleCloseCategoryMenu}
                >
                  <Link href={link.href} className={navLinkClass}>
                    {link.label}
                    <CaretDown size={11} className="ml-1 inline" aria-hidden />
                  </Link>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <a
              href={data.phoneHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp us: ${data.phone}`}
              title={data.phone}
              className="hidden h-11 w-11 items-center justify-center rounded-[3px] text-foreground-muted transition-colors hover:bg-surface-2 hover:text-foreground 2xl:inline-flex"
            >
              <WhatsappLogo size={20} weight="fill" aria-hidden />
            </a>
            <RegionSwitcher />
            {data.services.parts && <CartLink />}
            <a
              href={paymentLinks.tuning}
              className="inline-flex min-h-11 items-center rounded-[3px] bg-accent px-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-foreground transition-all hover:bg-accent-hover hover:shadow-[0_10px_30px_-10px_rgba(255,106,31,0.7)]"
            >
              Book &amp; Pay
            </a>
          </div>

          <div className="flex items-center gap-1 xl:hidden">
            <RegionSwitcher />
            {data.services.parts && <CartLink />}
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] text-foreground cursor-pointer"
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
            aria-label="Mobile"
            className="max-h-[calc(100svh-7rem)] overflow-y-auto border-t border-border bg-background px-4 pb-6 pt-2 xl:hidden"
          >
            <ul className="flex flex-col">
              {visibleLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border px-1 py-3.5 font-display text-2xl tracking-wide text-foreground hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 grid gap-3">
              <a
                href={paymentLinks.tuning}
                className="rounded-[3px] bg-accent px-4 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.08em] text-accent-foreground"
              >
                Book &amp; pay online
              </a>
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="rounded-[3px] border border-border-strong px-4 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.08em]"
              >
                Get a quote
              </Link>
              <a
                href={data.phoneHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-foreground-muted"
              >
                <WhatsappLogo size={18} weight="fill" aria-hidden />
                {data.phone}
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* Rendered outside <header> deliberately — the header's backdrop-blur
          makes it a containing block for position:fixed descendants, which
          would offset this panel by the header's own viewport position. */}
      {data.services.parts && categoryMenuOpen && (
        <div
          style={{ top: categoryMenuTop }}
          className="fixed left-0 right-0 z-40 hidden border-b border-border bg-surface/95 backdrop-blur-xl xl:block"
          onMouseEnter={openCategoryMenu}
          onMouseLeave={scheduleCloseCategoryMenu}
        >
          <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/parts"
              onClick={() => setCategoryMenuOpen(false)}
              className="rounded-[3px] border border-accent bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent"
            >
              All Parts
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/parts?category=${encodeURIComponent(cat)}`}
                onClick={() => setCategoryMenuOpen(false)}
                className="rounded-[3px] border border-border-strong px-3 py-1.5 text-sm font-medium text-foreground-muted transition-colors hover:border-accent hover:text-foreground"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
