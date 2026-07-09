import type { Metadata } from "next";
import { ChartLineUp } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dyno Results Gallery | Street PRO Garage",
  description:
    "Before and after dyno results from remote and rolling road tuning at Street PRO Garage.",
};

const placeholderSlots = [
  "Honda D16 Turbo — 207WHP",
  "Subaru WRX — 329Hp",
  "Honda B18 Turbo",
  "Honda R18 Turbo — 233WHP",
  "K24 Turbo Build",
  "Rolling Road Session",
];

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
            Before and after power graphs from real builds. This gallery is
            ready to populate with your first tuning results.
          </p>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {placeholderSlots.map((label) => (
              <div
                key={label}
                className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-strong bg-surface text-foreground-subtle"
              >
                <ChartLineUp size={36} aria-hidden />
                <span className="text-xs">{label}</span>
              </div>
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
