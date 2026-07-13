import type { Metadata } from "next";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { faqItems } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ | Street PRO Garage",
  description:
    "Answers to common questions about ECU tuning platforms, rolling road dyno pricing, supported vehicles, revisions and more at Street PRO Garage.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Answers to the questions we hear most about tuning, platforms,
            pricing and process — pointed to specific pages for full details.
          </p>
        </Container>
      </div>

      <Section>
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-border bg-surface p-6 open:border-accent/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none">
                  {item.question}
                  <CaretDown
                    size={18}
                    className="shrink-0 text-accent transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start gap-6 rounded-2xl border border-accent/30 bg-accent-soft p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl">Still have a question?</h2>
              <p className="mt-2 text-foreground-muted">
                Submit your build list and we&rsquo;ll answer anything specific to your car.
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
