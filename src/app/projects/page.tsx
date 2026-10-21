import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "JDM Tuning Projects & Dyno Results — Honda, Toyota | Street PRO Garage",
  description:
    "Real JDM builds we've tuned: K24 turbo Civic 402 WHP, R18 turbo 233 WHP, 2ZZ-GE swap, B18 turbo rescue and more — build lists, dyno graphs, road-tune results and video.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const dynoProven = projects.filter((p) => p.method === "Dyno").length;
  const withGraph = projects.filter((p) => p.dyno.image).length;

  return (
    <>
      <PageHero image="/images/builds/civic-k24-turbo.jpeg" position="40% 55%">
        <Eyebrow>Projects</Eyebrow>
        <h1 className="font-display mt-5">Builds we&rsquo;ve tuned</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          Every project is a case study: the job, the work performed, and the result. Some are dyno-proven with a
          logged graph, others are road-tuned. Both get the same care. New builds are added as they are finished.
        </p>
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {[
            [String(projects.length), "Builds shown"],
            [String(dynoProven), "Dyno-proven"],
            [String(withGraph), "With real dyno graphs"],
          ].map(([n, l]) => (
            <div key={l}>
              <dd className="font-display text-5xl text-accent">{n}</dd>
              <dt className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">{l}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section className="pt-10 sm:pt-12 lg:pt-14">
        <Container>
          <ProjectsExplorer />
        </Container>
      </Section>

      <section className="border-t border-border bg-surface/40 py-16 sm:py-20">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl">Your build could be next</h2>
            <p className="mt-3 max-w-xl text-foreground-muted">
              Send us your build list and get a ballpark quote. Stuck on a half-finished project? We take those on too.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/quote" size="lg">
              Get a quote
            </LinkButton>
            <LinkButton href="/custom-wiring#diagnostics" size="lg" variant="secondary">
              Rescue a stuck build
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
