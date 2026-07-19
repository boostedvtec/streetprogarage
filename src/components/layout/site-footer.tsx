"use client";

import Link from "next/link";
import { EnvelopeSimple, WhatsappLogo, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/logo";
import { navLinks, siteConfig } from "@/lib/site-config";
import { useRegion } from "@/components/region/region-context";

const legalLinks = [
  { href: "/declaration", label: "Declaration & Liability" },
  { href: "/finance-warranty", label: "Finance & Warranty" },
];

export function SiteFooter() {
  const { region, data } = useRegion();
  const visibleLinks = navLinks.filter((link) => (link.regions as readonly string[]).includes(region));

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo imgClassName="h-60" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground-muted">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-wider text-foreground-muted">
            Navigate
          </h3>
          <ul className="mt-4 space-y-2">
            {visibleLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-wider text-foreground-muted">
            Get In Touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
            <li className="flex items-start gap-2">
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
            <li className="flex items-center gap-2">
              <WhatsappLogo size={18} className="shrink-0 text-accent" aria-hidden />
              <a href={data.phoneHref} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                {data.phone}
              </a>
            </li>
            {data.whatsapp && data.whatsappHref && (
              <li className="flex items-center gap-2">
                <WhatsappLogo size={18} className="shrink-0 text-accent" aria-hidden />
                <a href={data.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  {data.whatsapp} (WhatsApp)
                </a>
              </li>
            )}
            <li className="flex items-center gap-2">
              <EnvelopeSimple size={18} className="shrink-0 text-accent" aria-hidden />
              <a href={`mailto:${data.email}`} className="hover:text-foreground">
                {data.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-4 px-4 py-6 text-xs text-foreground-subtle sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground-muted">
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
