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

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { region, data } = useRegion();
  const visibleLinks = navLinks.filter((link) => (link.regions as readonly string[]).includes(region));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex min-h-32 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <Logo imgClassName="h-28" />

        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {visibleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={data.phoneHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
          >
            <WhatsappLogo size={18} weight="fill" aria-hidden />
            {data.phone}
          </a>
          <RegionSwitcher />
          {data.services.parts && <CartLink />}
          <Link
            href="/quote"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover cursor-pointer"
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
  );
}
