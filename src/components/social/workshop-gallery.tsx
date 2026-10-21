import Image from "next/image";
import { ArrowUpRight, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { instagramProfile, workshopPosts } from "@/lib/social-proof";

/**
 * Editorial workshop gallery. Static, optimised images from our own media,
 * each opening the verified Instagram profile (or the original post when a
 * post URL is set). No live feed: it needs API credentials and would slow
 * the page down.
 */
export function WorkshopGallery({ className }: { className?: string }) {
  if (!instagramProfile.url) return null;
  return (
    <Section className={className}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>From the workshop</Eyebrow>
            <h2 className="font-display mt-5 text-5xl leading-[0.92] sm:text-6xl">Follow the work</h2>
            <p className="mt-4 text-foreground-muted">
              Builds, wiring, ECU installs and dyno sessions as they happen on {instagramProfile.handle}.
            </p>
          </div>
          <a
            href={instagramProfile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-[3px] bg-accent px-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-foreground hover:bg-accent-hover"
          >
            <InstagramLogo size={18} weight="bold" aria-hidden />
            Follow {instagramProfile.handle}
          </a>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {workshopPosts.map((post, i) => (
            <li key={post.image} className={i === 0 ? "col-span-2 row-span-2" : ""}>
              <a
                href={post.url ?? instagramProfile.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square h-full w-full overflow-hidden border border-border"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 1024px) 17vw, 50vw"}
                  className="object-cover brightness-[0.8] saturate-[0.85] transition-all duration-500 group-hover:scale-[1.05] group-hover:brightness-100 group-hover:saturate-100"
                />
                <span className="font-mono-tech absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-background/95 to-transparent p-3 text-[11px] uppercase tracking-[0.12em]">
                  {post.caption}
                  <ArrowUpRight size={14} aria-hidden className="shrink-0 text-accent" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
