import type { Metadata } from "next";
import { Warning, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { preDynoTests } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Declaration & Liability | Street PRO Garage",
  description:
    "Declaration and liability terms for tuning services at Street PRO Garage.",
};

export default function DeclarationPage() {
  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Please Read Before Booking</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Declaration &amp; Liability
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            This declaration applies to all remote tuning and rolling road
            tuning services booked with Street PRO Garage. You&rsquo;ll be asked to
            confirm you&rsquo;ve read this before submitting your build list.
          </p>
        </Container>
      </div>

      <Section>
        <Container className="max-w-3xl">
          <div className="rounded-xl border border-accent/30 bg-accent-soft p-8">
            <div className="flex items-center gap-3">
              <Warning size={26} weight="fill" className="shrink-0 text-accent" aria-hidden />
              <h2 className="font-display text-2xl">Pre-Existing Conditions</h2>
            </div>
            <p className="mt-4 leading-relaxed text-foreground">
              Tuning is carried out based entirely on the information provided
              by the vehicle&rsquo;s owner or driver — including the build list,
              modification history, and any details given ahead of or during a
              session. Street PRO Garage is <strong>not responsible for any
              pre-existing issues</strong> with the car or engine, whether
              disclosed or not, and cannot be held liable for damage or failure
              resulting from undisclosed faults, inaccurate build information,
              or the mechanical condition of components not inspected by us
              directly.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface p-8">
            <h2 className="font-display text-2xl">Why This Matters</h2>
            <p className="mt-4 leading-relaxed text-foreground-muted">
              A tune is only as safe as the engine it&rsquo;s built for. If a build
              list is inaccurate, or an engine has an undiagnosed mechanical
              issue (worn rings, a weak head gasket, tired injectors, etc.),
              even a well-written tune can expose that weakness. That&rsquo;s why we
              strongly recommend the pre-dyno engine health checks below before
              committing to full boost or timing.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <MagnifyingGlass size={24} className="text-accent" aria-hidden />
              <h2 className="font-display text-2xl">
                Pre-Dyno Engine Health Checks
              </h2>
            </div>
            <p className="mt-3 text-sm text-foreground-muted">
              Available for an additional charge ahead of your rolling road
              session:
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {preDynoTests.map((test) => (
                <li
                  key={test.name}
                  className="rounded-md border border-border-strong bg-surface-2 px-4 py-2 text-sm text-foreground-muted"
                >
                  {test.name}{" "}
                  <span className="text-accent">from &pound;{test.priceFrom}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface p-8">
            <h2 className="font-display text-2xl">Acknowledgment</h2>
            <p className="mt-4 leading-relaxed text-foreground-muted">
              By submitting a build list or booking a tuning session, you
              confirm that all information provided is accurate to the best of
              your knowledge, and that you accept the terms outlined above.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="/quote" size="lg">
              Submit Your Build List
            </LinkButton>
            <LinkButton href="/pre-tune-checklist" size="lg" variant="secondary">
              View Pre-Tune Checklist
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
