import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, EnvelopeSimple, MapPin, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { reviewsConfig } from "@/lib/social-proof";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { regionData, type Region } from "@/lib/region";
import { projects } from "@/lib/projects";
import { siteConfig, siteUrl } from "@/lib/site-config";

type Service = { title: string; text: string; href: string };

/**
 * One page per workshop, rendered from the same region data the rest of the
 * site uses, so facts (address note, phone, services) never drift. These are
 * real URLs for each location, which the cookie-based region switch can't be.
 */
export function LocationPage({
  region,
  heroImage,
  heroPosition,
  h1,
  intro,
  services,
}: {
  region: Region;
  heroImage: string;
  heroPosition?: string;
  h1: string;
  intro: string;
  services: Service[];
}) {
  const data = regionData[region];
  const local = projects.filter((p) => p.region === region);
  const path = region === "pk" ? "/karachi" : "/manchester";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: `Street PRO Garage, ${data.city}`,
    url: `${siteUrl}${path}`,
    image: `${siteUrl}/images/Logo.png`,
    telephone: data.phone,
    email: data.email,
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook].filter(Boolean),
    address:
      region === "pk"
        ? {
            "@type": "PostalAddress",
            streetAddress: "Shamim Street, Gulberg Town",
            addressLocality: "Karachi",
            addressCountry: "PK",
          }
        : { "@type": "PostalAddress", addressLocality: "Manchester", addressCountry: "GB" },
    ...(region === "pk" ? { geo: { "@type": "GeoCoordinates", latitude: 24.9290278, longitude: 67.0648889 } } : {}),
    areaServed: [data.country, "Worldwide (remote tuning)"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero image={heroImage} position={heroPosition}>
        <Eyebrow>
          {data.city}, {data.country}
        </Eyebrow>
        <h1 className="font-display mt-5">{h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">{intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/quote" size="lg">
            Get a quote
            <ArrowRight size={18} weight="bold" aria-hidden />
          </LinkButton>
          <LinkButton href="/contact" size="lg" variant="secondary">
            Contact the workshop
          </LinkButton>
        </div>
      </PageHero>

      <Section>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Services in {data.city}</Eyebrow>
            <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl">What we do here</h2>
          </div>
          <ul className="mt-10 border-t border-border-strong">
            {services.map((s) => (
              <li key={s.title} className="grid gap-3 border-b border-border-strong py-6 lg:grid-cols-12 lg:gap-8">
                <h3 className="font-display text-3xl leading-none lg:col-span-4">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-foreground-muted lg:col-span-6">{s.text}</p>
                <Link
                  href={s.href}
                  className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent hover:text-accent-hover lg:col-span-2"
                >
                  Learn more <ArrowRight size={14} weight="bold" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-foreground-muted">
            Remote ECU tuning is available worldwide from both workshops. Not sure what your car needs? Start with the{" "}
            <Link href="/quote" className="text-accent underline underline-offset-4">
              build list
            </Link>
            , or read how{" "}
            <Link href="/guides/remote-ecu-tuning" className="text-accent underline underline-offset-4">
              remote tuning works
            </Link>
            .
          </p>
        </Container>
      </Section>

      {local.length > 0 && (
        <Section className="border-y border-border bg-surface/40">
          <Container>
            <div className="max-w-3xl">
              <Eyebrow>From this workshop</Eyebrow>
              <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl">Recent {data.city} builds</h2>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {local.slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects#${p.slug}`} className="group block border border-border bg-surface">
                    <div className="relative aspect-[4/3] bg-surface-2">
                      {p.media?.type === "image" && (
                        <Image
                          src={p.media.src}
                          alt={p.media.alt}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover brightness-90 transition-all duration-500 group-hover:scale-[1.04] group-hover:brightness-100"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-2xl leading-none">{p.title}</h3>
                      <p className="font-mono-tech mt-2 text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                        {p.engine} · {p.method}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section>
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Find us</Eyebrow>
            <h2 className="font-display mt-5 text-4xl leading-[0.95] sm:text-5xl">Visit or get in touch</h2>
            <ul className="mt-6 grid gap-4 text-sm text-foreground-muted">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <span>{data.locationNote}</span>
              </li>
              <li className="flex items-start gap-3">
                <WhatsappLogo size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <span>
                  <a href={data.phoneHref} className="hover:text-foreground">
                    {data.phone}
                  </a>
                  {data.whatsapp && data.whatsappHref && (
                    <>
                      {" "}
                      /{" "}
                      <a href={data.whatsappHref} className="hover:text-foreground">
                        {data.whatsapp}
                      </a>
                    </>
                  )}{" "}
                  (WhatsApp)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <EnvelopeSimple size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a href={`mailto:${data.email}`} className="hover:text-foreground">
                  {data.email}
                </a>
              </li>
            </ul>
            {region === "pk" && (
              <p className="mt-6 text-sm leading-relaxed text-foreground-muted">
                Every tune in Pakistan is quoted directly once we have reviewed your build list, so you pay for exactly what your car needs.
              </p>
            )}
            {region === "uk" && (reviewsConfig.googleReviewsUrl || reviewsConfig.googleWriteReviewUrl) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {reviewsConfig.googleReviewsUrl && (
                  <a
                    href={reviewsConfig.googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 border border-border-strong px-4 text-[13px] font-semibold uppercase tracking-[0.08em] hover:border-accent hover:text-accent"
                  >
                    Find us on Google <ArrowUpRight size={16} weight="bold" aria-hidden />
                  </a>
                )}
                {reviewsConfig.googleWriteReviewUrl && (
                  <a
                    href={reviewsConfig.googleWriteReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 border border-border-strong px-4 text-[13px] font-semibold uppercase tracking-[0.08em] hover:border-accent hover:text-accent"
                  >
                    Leave a review <ArrowUpRight size={16} weight="bold" aria-hidden />
                  </a>
                )}
              </div>
            )}
          </div>
          <iframe
            title={`${data.city} workshop map`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(data.mapQuery)}&output=embed`}
            className="h-72 w-full border border-border-strong"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Container>
      </Section>
    </>
  );
}
