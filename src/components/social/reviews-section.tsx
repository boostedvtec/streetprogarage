import { ArrowUpRight, Quotes } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { reviews, reviewsConfig } from "@/lib/social-proof";

/**
 * Customer reviews. Renders nothing until real reviews are added in
 * lib/social-proof.ts, so the site never shows made-up feedback.
 */
export function ReviewsSection({ className }: { className?: string }) {
  if (reviews.length === 0) return null;
  const { googleReviewsUrl, googleWriteReviewUrl } = reviewsConfig;

  return (
    <Section className={className}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>Customer feedback</Eyebrow>
            <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl">What customers say</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {googleReviewsUrl && (
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 border border-border-strong px-4 text-[13px] font-semibold uppercase tracking-[0.08em] hover:border-accent hover:text-accent"
              >
                Read all reviews on Google <ArrowUpRight size={16} weight="bold" aria-hidden />
              </a>
            )}
            {googleWriteReviewUrl && (
              <a
                href={googleWriteReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 bg-accent px-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-foreground hover:bg-accent-hover"
              >
                Leave a review <ArrowUpRight size={16} weight="bold" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <li key={`${r.author}-${r.text.slice(0, 20)}`} className="brushed flex flex-col border border-border bg-surface p-6">
              <Quotes size={26} weight="fill" className="text-accent" aria-hidden />
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground">{r.text}</blockquote>
              <p className="mt-5 text-sm font-semibold">{r.author}</p>
              <p className="font-mono-tech mt-1 text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                {[r.vehicle, r.source, r.date].filter(Boolean).join(" · ")}
              </p>
              {r.url && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
                >
                  Read the original <ArrowUpRight size={14} weight="bold" aria-hidden />
                </a>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
