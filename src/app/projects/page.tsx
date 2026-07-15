import type { Metadata } from "next";
import { Wrench } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Our Projects | Street PRO Garage",
  description:
    "Completed builds from Street PRO Garage — build list, dyno results and photos/video for every tune.",
};

export default function ProjectsPage() {
  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Our Projects</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">Builds We&rsquo;ve Tuned</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Every project here follows the same format — the build list, the
            dyno result, and a photo or video from the session. We add new
            ones as builds are finished.
          </p>
        </Container>
      </div>

      <Section>
        <Container>
          {projects.length === 0 ? (
            <div className="mx-auto flex max-w-lg flex-col items-center rounded-xl border border-dashed border-border-strong bg-surface p-10 text-center">
              <Wrench size={28} className="text-accent" aria-hidden />
              <h2 className="font-display mt-4 text-2xl">New Builds Landing Soon</h2>
              <p className="mt-2 text-sm text-foreground-muted">
                We&rsquo;re adding completed projects here as they come off the
                dyno. In the meantime, submit your build list and yours could
                be one of the first featured.
              </p>
              <LinkButton href="/quote" size="lg" className="mt-6">
                Get a Quote
              </LinkButton>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
