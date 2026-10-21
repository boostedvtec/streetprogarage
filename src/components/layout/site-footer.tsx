"use client";

import Link from "next/link";
import {
  EnvelopeSimple,
  WhatsappLogo,
  MapPin,
  InstagramLogo,
  FacebookLogo,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/logo";
import { navLinks, siteConfig } from "@/lib/site-config";
import { paymentLinks } from "@/lib/payment-links";
import { useRegion } from "@/components/region/region-context";

const legalLinks = [
  { href: "/declaration", label: "Declaration & Liability" },
  { href: "/finance-warranty", label: "Finance & Warranty" },
  { href: "/delivery-information", label: "Delivery Information", partsOnly: true },
  { href: "/returns-policy", label: "Returns Policy", partsOnly: true },
];

const colHeading = "font-mono-tech text-xs font-medium uppercase tracking-[0.2em] text-foreground-subtle";
const colLink = "text-sm text-foreground-muted transition-colors hover:text-accent";

export function SiteFooter() {
  const { region, data } = useRegion();
  const visibleLinks = navLinks.filter((link) => (link.regions as readonly string[]).includes(region));

  return (
    <footer className="carbon relative border-t border-border">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo imgClassName="h-20" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-foreground-muted">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={paymentLinks.tuning}
                className="inline-flex min-h-11 items-center gap-2 rounded-[3px] bg-accent px-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Book &amp; pay online
                <ArrowUpRight size={16} weight="bold" aria-hidden />
              </a>
              <Link
                href="/quote"
                className="inline-flex min-h-11 items-center rounded-[3px] border border-border-strong px-5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors hover:border-accent hover:text-accent"
              >
                Get a quote
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className={colHeading}>Navigate</h3>
            <ul className="mt-5 space-y-3">
              {visibleLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={colLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/pre-tune-checklist" className={colLink}>
                  Pre-Tune Checklist
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className={colHeading}>Get in touch</h3>
            <ul className="mt-5 space-y-4 text-sm text-foreground-muted">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <span>
                  {data.city}, {data.country}
                  <br />
                  <span className="text-xs text-foreground-subtle">{data.locationNote}</span>
                  {!data.locationNote.toLowerCase().includes("remote tuning") && (
                    <>
                      <br />
                      Remote tuning worldwide
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <WhatsappLogo size={18} className="shrink-0 text-accent" aria-hidden />
                <a href={data.phoneHref} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  {data.phone}
                </a>
              </li>
              {data.whatsapp && data.whatsappHref && (
                <li className="flex items-center gap-3">
                  <WhatsappLogo size={18} className="shrink-0 text-accent" aria-hidden />
                  <a href={data.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {data.whatsapp} (WhatsApp)
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <EnvelopeSimple size={18} className="shrink-0 text-accent" aria-hidden />
                <a href={`mailto:${data.email}`} className="hover:text-accent">
                  {data.email}
                </a>
              </li>
              {siteConfig.social.instagram && (
                <li className="flex items-center gap-3">
                  <InstagramLogo size={18} className="shrink-0 text-accent" aria-hidden />
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {siteConfig.social.instagramHandle}
                  </a>
                </li>
              )}
              {siteConfig.social.facebook && (
                <li className="flex items-center gap-3">
                  <FacebookLogo size={18} className="shrink-0 text-accent" aria-hidden />
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    Facebook
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start gap-4 border-t border-border pt-6 text-xs text-foreground-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks
              .filter((link) => !link.partsOnly || data.services.parts)
              .map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
