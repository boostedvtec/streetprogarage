import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Engine,
  Circuitry,
  Wrench,
  CaretDown,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { platformPages } from "@/lib/platform-pages";
import { siteUrl } from "@/lib/site-config";

export function generateStaticParams() {
  return platformPages.map((platform) => ({ platform: platform.slug }));
}

export async function generateMetadata(
  props: PageProps<"/tuning/[platform]">
): Promise<Metadata> {
  const { platform: slug } = await props.params;
  const platform = platformPages.find((p) => p.slug === slug);
  if (!platform) return {};

  const url = `${siteUrl}/tuning/${platform.slug}`;
  return {
    title: platform.metaTitle,
    description: platform.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: platform.metaTitle,
      description: platform.metaDescription,
      url,
      type: "website",
    },
  };
}

export default async function PlatformTuningPage(
  props: PageProps<"/tuning/[platform]">
) {
  const { platform: slug } = await props.params;
  const platform = platformPages.find((p) => p.slug === slug);
  if (!platform) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${platform.name} ECU Tuning`,
    name: platform.metaTitle,
    description: platform.metaDescription,
    provider: { "@type": "AutoRepair", name: "Street PRO Garage", url: siteUrl },
    areaServed: ["United Kingdom", "Pakistan", "Worldwide (remote tuning)"],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: platform.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Platform Tuning</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">{platform.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            {platform.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/quote" size="lg">
              Get a Quote
            </LinkButton>
            <LinkButton href="/tuning" size="lg" variant="secondary">
              All Tuning Methods
            </LinkButton>
          </div>
        </Container>
      </div>

      {/* Engines & ECU options */}
      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-8">
              <div className="flex items-center gap-3">
                <Engine size={24} className="text-accent" aria-hidden />
                <h2 className="font-display text-xl">Engines &amp; Models</h2>
              </div>
              <p className="mt-3 text-sm text-foreground-muted">{platform.models}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {platform.engines.map((engine) => (
                  <li
                    key={engine}
                    className="rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-xs font-medium text-foreground-muted"
                  >
                    {engine}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-surface p-8">
              <div className="flex items-center gap-3">
                <Circuitry size={24} className="text-accent" aria-hidden />
                <h2 className="font-display text-xl">ECU Options</h2>
              </div>
              <p className="mt-3 text-sm text-foreground-muted">
                Whichever fits your build and goals — from stock reflash to full standalone.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {platform.ecuOptions.map((ecu) => (
                  <li
                    key={ecu}
                    className="rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-xs font-medium text-foreground-muted"
                  >
                    {ecu}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* What we do */}
      <Section className="border-y border-border bg-surface/50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Wrench size={26} weight="bold" aria-hidden />
              </div>
              <h2 className="font-display mt-6 text-3xl sm:text-4xl">
                What We Do on {platform.name}
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                Remote tuning (live or road-logged), rolling road dyno tuning
                in Manchester, custom wiring, and diagnostics if a build has
                stalled — no generic Stage 1/2/3 kits, every map written from
                scratch for your actual setup.
              </p>
            </div>
            <ul className="grid gap-3">
              {platform.buildNotes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ArrowRight
                    size={18}
                    weight="bold"
                    className="mt-1 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span className="text-foreground-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Platform-specific FAQ */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              {platform.name} Questions
            </h2>
          </div>
          <div className="mt-10 grid gap-4">
            {platform.faqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-border bg-surface p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {item.question}
                  <CaretDown
                    size={18}
                    className="shrink-0 text-accent transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm text-foreground-muted">
            More questions? See the full{" "}
            <Link href="/faq" className="text-accent underline">
              FAQ
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-accent/30 bg-accent-soft p-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl">
                Ready to tune your {platform.name}?
              </h2>
              <p className="mt-2 text-foreground-muted">
                Submit your build list and we&rsquo;ll confirm the right
                tuning method and ECU setup for it.
              </p>
            </div>
            <LinkButton href="/quote" size="lg" className="shrink-0">
              Get a Quote
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
