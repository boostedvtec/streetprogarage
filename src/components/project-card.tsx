import Image from "next/image";
import { Wrench, ChartLineUp } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="relative aspect-video w-full bg-surface-2">
        {project.media.type === "image" ? (
          <Image
            src={project.media.src}
            alt={project.media.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <video
            src={project.media.src}
            poster={project.media.poster}
            controls
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="p-6 sm:p-8">
        <span className="inline-flex items-center rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-xs font-medium uppercase tracking-wide text-foreground-subtle">
          {project.region === "pk" ? "Karachi" : "Manchester"}
        </span>
        <h3 className="font-display mt-3 text-2xl">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-foreground-muted">{project.vehicle}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{project.summary}</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <Wrench size={18} className="text-accent" aria-hidden />
              <h4 className="font-semibold">Build List</h4>
            </div>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm text-foreground-muted">
              {project.buildList.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground-subtle" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <ChartLineUp size={18} className="text-accent" aria-hidden />
              <h4 className="font-semibold">Dyno Result</h4>
            </div>
            <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-lg border border-border-strong bg-surface-2">
              <Image
                src={project.dyno.image}
                alt={project.dyno.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 font-display text-2xl text-accent">
              {project.dyno.power}
              {project.dyno.torque && (
                <span className="ml-2 text-sm font-body font-normal text-foreground-muted">
                  / {project.dyno.torque}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
