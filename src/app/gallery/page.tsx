import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { dynoResults } from "@/lib/builds";

export const metadata: Metadata = {
  title: "Dyno Results Gallery | Street PRO Garage",
  description:
    "Before and after dyno results from remote and rolling road tuning at Street PRO Garage.",
};

export default function GalleryPage() {
  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Results</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Dyno Results Gallery
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Before and after power graphs from real builds we&rsquo;ve tuned.
          </p>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {dynoResults.map((result) => (
              <figure
                key={result.src}
                className="overflow-hidden rounded-xl border border-border bg-surface"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={result.src}
                    alt={result.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-border px-4 py-3 text-sm font-medium">
                  {result.label}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-6 rounded-2xl border border-accent/30 bg-accent-soft p-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl">
                Want your build featured here?
              </h2>
              <p className="mt-2 text-foreground-muted">
                Submit your build list to get started on your custom tune.
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
