import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { DynoLines } from "@/components/home/dyno-lines";
import { TcuSetupCards } from "@/components/transmission/tcu-tuning";
import { TcuDiagram } from "@/components/transmission/tcu-diagram";
import { tcuFaq, tcuSpecsChecked, tcuSteps } from "@/lib/tcu-tuning";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "TCU Tuning: Haltech A340E & ZF 8HP | Street PRO Garage",
  description:
    "Transmission tuning for Haltech-controlled Toyota A340E and ZF 8HP automatics: shift points, line pressure, kickdown and launch. Get a quote.",
  path: "/tcu-tuning",
  image: "/og/tuning.jpg",
});

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Automatic transmission (TCU) tuning",
    name: "TCU tuning: Haltech A340E and ZF 8HP",
    provider: { "@type": "AutoRepair", name: "Street PRO Garage", url: "https://www.streetprogarage.com" },
    areaServed: ["United Kingdom", "Pakistan"],
    description:
      "Transmission tuning for Haltech-controlled Toyota A340E automatics and ZF 8HP automatics: shift points, line pressure, torque handling, kickdown and launch behaviour.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tcuFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function TcuTuningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div aria-hidden className="absolute inset-0 -z-10">
          <DynoLines />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_20%,rgba(255,106,31,0.10),transparent_55%)]" />
        <Container className="grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-6">
            <Eyebrow>Transmission tuning</Eyebrow>
            <h1 className="font-display mt-6 text-[clamp(3.4rem,10vw,7.5rem)] leading-[0.88]">
              TCU tuning.
              <br />
              <span className="text-accent">Shifts that match the tune.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground-muted">
              Shift points, shift feel and torque handling for the Toyota A340E on a Haltech ECU and the ZF 8HP
              eight-speed automatic. Calibrated for your engine, not left on defaults.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="/quote" size="lg">
                Get a quote
                <ArrowRight size={18} weight="bold" aria-hidden />
              </LinkButton>
              <LinkButton href="#setups" size="lg" variant="secondary">
                See what we tune
              </LinkButton>
            </div>
          </div>

          <div className="lg:col-span-6">
            <figure className="brackets relative border border-border-strong bg-surface/60 p-4 sm:p-6">
              <TcuDiagram />
              <figcaption className="font-mono-tech mt-4 border-t border-border pt-3 text-[11px] uppercase leading-snug tracking-[0.12em] text-foreground-subtle">
                <span className="text-accent">Generic illustration</span> &nbsp;What a transmission controller reads and
                drives. Not a specific gearbox.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* Why */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Why it matters</Eyebrow>
              <h2 className="font-display mt-5 text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
                An automatic is part of the tune
              </h2>
            </div>
            <div className="grid gap-5 text-[15px] leading-relaxed text-foreground-muted sm:text-base lg:col-span-7">
              <p>
                When the ECU or a TCU controls the gearbox, when it shifts, how firmly it shifts and how it handles
                torque are all maps, the same as fuel and ignition. Left on defaults, a gearbox behind a modified engine
                can shift at the wrong point, shift harshly or hold the wrong gear.
              </p>
              <p>
                We tune the transmission alongside the engine, so the two work together. Below are the two setups we
                tune.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Setups */}
      <Section id="setups" className="border-y border-border bg-surface/40">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Two setups</Eyebrow>
            <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">What we tune</h2>
          </div>
          <div className="mt-12">
            <TcuSetupCards />
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-foreground-subtle">
            Transmission details are summarised from the manufacturers&rsquo; own documentation (checked {tcuSpecsChecked})
            and change between software versions. Another gearbox or controller? Ask, we can look at it.
          </p>
        </Container>
      </Section>

      {/* Process */}
      <Section id="process">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">From first message to handover</h2>
          </div>
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span aria-hidden className="absolute left-0 right-0 top-[1.1rem] hidden h-px bg-border-strong lg:block" />
            {tcuSteps.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="relative z-10 flex h-9 w-9 items-center justify-center border border-accent bg-background font-mono-tech text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-6 text-3xl">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="border-t border-border bg-surface/40">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Questions</Eyebrow>
              <h2 className="font-display mt-5 text-4xl leading-[0.95] sm:text-5xl">TCU tuning FAQ</h2>
            </div>
            <div className="grid gap-4 lg:col-span-8">
              {tcuFaq.map((f) => (
                <details key={f.q} className="group border border-border bg-surface">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 p-5 marker:hidden">
                    <span className="font-display text-2xl leading-tight">{f.q}</span>
                    <span aria-hidden className="font-display text-3xl text-accent transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="border-t border-border p-5 text-[15px] leading-relaxed text-foreground-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden border-t border-border py-20 sm:py-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,rgba(255,106,31,0.14),transparent_55%)]" />
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Start a TCU tune</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(3rem,8vw,6rem)] leading-[0.9]">
              Tell us about <span className="text-accent">your gearbox.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
              Send your gearbox and part number, your ECU or TCU, the engine and how the car is used, with your build
              list.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <LinkButton href="/quote" size="lg">
              Get a quote
              <ArrowRight size={18} weight="bold" aria-hidden />
            </LinkButton>
            <LinkButton href="/contact" size="lg" variant="secondary">
              Contact us
            </LinkButton>
          </div>
          <p className="text-sm text-foreground-muted lg:col-span-12">
            Need the transmission wired in first? See{" "}
            <Link href="/custom-wiring" className="text-accent underline underline-offset-4">
              custom wiring
            </Link>
            , or the main{" "}
            <Link href="/tuning" className="text-accent underline underline-offset-4">
              ECU tuning page
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
