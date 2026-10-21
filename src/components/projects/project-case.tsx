import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, ChartLineUp, Wrench } from "@phosphor-icons/react/dist/ssr";
import type { Project, ProjectService } from "@/lib/projects";

export const serviceInfo: Record<ProjectService, { label: string; href: string }> = {
  tuning: { label: "ECU tuning", href: "/tuning" },
  wiring: { label: "Wiring & ECU install", href: "/custom-wiring" },
  diagnostics: { label: "Diagnostics & rescue", href: "/custom-wiring#diagnostics" },
  swap: { label: "Engine swaps", href: "/engine-swaps" },
};

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-border-strong pl-3">
      <dt className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}

/**
 * One project as a mini case study: hero media, spec facts, the job, the work
 * performed, the result (with the real dyno graph where one exists), related
 * services and a call to action. Everything shown comes from lib/projects.ts.
 */
export function ProjectCase({ project, flip, index }: { project: Project; flip: boolean; index: number }) {
  const hasGraph = Boolean(project.dyno.image);
  return (
    <article id={project.slug} className="scroll-mt-28 border-t border-border-strong py-14 first:border-t-0 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className={clsx("lg:col-span-7", flip && "lg:order-2")}>
          {project.media && (
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-surface-2 sm:aspect-video">
              {project.media.type === "image" ? (
                <Image
                  src={project.media.src}
                  alt={project.media.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <video
                  src={project.media.src}
                  poster={project.media.poster}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={`${project.title} video`}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          )}
          {hasGraph && (
            <figure className="relative mt-4 border border-border bg-surface">
              <figcaption className="font-mono-tech flex items-center gap-2 border-b border-border px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">
                <ChartLineUp size={14} className="text-accent" aria-hidden />
                Dyno graph &middot; real session
              </figcaption>
              <div className="relative aspect-[16/9] w-full bg-white">
                <Image
                  src={project.dyno.image!}
                  alt={project.dyno.alt ?? ""}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-contain"
                />
              </div>
            </figure>
          )}
          {!project.media && !hasGraph && (
            <div className="flex aspect-video items-center justify-center border border-dashed border-border-strong text-sm text-foreground-subtle">
              Photos coming soon
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-accent">
            Case {String(index + 1).padStart(2, "0")} &middot; {project.method === "Dyno" ? "Dyno-proven" : project.method === "Road" ? "Road-tuned" : "Live-tuned"}
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[0.95] sm:text-5xl">{project.title}</h2>
          <p className="mt-2 text-sm font-medium text-foreground-muted">{project.vehicle}</p>

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
            <Fact label="Engine" value={project.engine} />
            <Fact label="Tuning method" value={project.method} />
            {project.ecu && <Fact label="ECU" value={project.ecu} />}
            <Fact label="Result" value={project.dyno.torque ? `${project.dyno.power} / ${project.dyno.torque}` : project.dyno.power} />
          </dl>

          <h3 className="font-mono-tech mt-8 text-xs uppercase tracking-[0.2em] text-foreground-subtle">The job</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{project.summary}</p>

          <h3 className="font-mono-tech mt-7 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground-subtle">
            <Wrench size={14} aria-hidden /> Work performed
          </h3>
          <ul className="mt-3 grid gap-1.5 text-sm text-foreground">
            {project.buildList.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 h-1 w-3 shrink-0 bg-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2" aria-label="Related services">
            {project.services.map((s) => (
              <Link
                key={s}
                href={serviceInfo[s].href}
                className="font-mono-tech inline-flex min-h-11 items-center border border-border-strong px-3 text-[11px] uppercase tracking-[0.14em] text-foreground-muted transition-colors hover:border-accent hover:text-accent"
              >
                {serviceInfo[s].label}
              </Link>
            ))}
          </div>

          <Link
            href="/quote"
            className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-[3px] bg-accent px-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            Got a similar build? Get a quote
            <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
