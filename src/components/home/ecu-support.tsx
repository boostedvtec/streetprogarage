import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow } from "@/components/ui/container";
import { BrandLogo } from "@/components/brand-logo";
import { ecuBrandLogos } from "@/lib/site-config";

/** What each logo means for the customer, taken from the supported-ECU list on /tuning and the FAQ. */
const kind: Record<string, string> = {
  "HP Tuners": "Stock ECU reflash",
  Hondata: "Honda ECU platforms",
  MaxxECU: "Standalone",
  "Link ECU": "Standalone",
  Haltech: "Standalone",
  "AEM Infinity": "Standalone",
  EcuMaster: "Standalone",
  "ME (Motorsport Electronics)": "Standalone",
  Speeduino: "Open source, TunerStudio",
  Megasquirt: "Open source, TunerStudio",
};

/**
 * Shown straight under the hero so a visitor sees immediately which ECUs we
 * tune: the logo wall, what type each is, and the names without a logo.
 */
export function EcuSupport() {
  return (
    <section aria-labelledby="ecu-support-title" className="border-b border-border bg-surface/40 py-14 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>ECU platforms we tune</Eyebrow>
            <h2 id="ecu-support-title" className="font-display mt-4 text-4xl leading-[0.95] sm:text-5xl">
              Stock ECU or standalone, we tune it
            </h2>
            <p className="mt-3 text-foreground-muted">
              Haltech, MaxxECU, Link, AEM, HP Tuners, Hondata, EcuMaster, Megasquirt, Speeduino and more. Tuned remotely,
              from your own datalogs, or on the dyno.
            </p>
          </div>
          <Link
            href="/tuning#supported-ecus"
            className="inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-accent hover:text-accent-hover"
          >
            Full supported ECU list
            <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ecuBrandLogos.map((logo) => (
            <li key={logo.name}>
              <BrandLogo {...logo} />
              <p className="font-mono-tech mt-2 text-center text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                {kind[logo.name] ?? ""}
              </p>
            </li>
          ))}
        </ul>

        <p className="font-mono-tech mt-6 text-xs uppercase leading-relaxed tracking-[0.14em] text-foreground-muted">
          Also: Nistune &middot; Ktuner &middot; Hondata FlashPro, KPro, S300 &middot; P28 chipped ECUs &middot; Hondavert &middot; HTS &middot; Neptune RTP
        </p>
      </Container>
    </section>
  );
}
