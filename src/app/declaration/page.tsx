import type { Metadata } from "next";
import { Warning, MagnifyingGlass, Scales } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { preDynoTests } from "@/lib/site-config";
import { PriceTag } from "@/components/region/price-tag";

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

          <div className="mt-8 rounded-xl border border-accent/30 bg-accent-soft p-8">
            <div className="flex items-center gap-3">
              <Scales size={26} weight="fill" className="shrink-0 text-accent" aria-hidden />
              <h2 className="font-display text-2xl">Track Use Only &amp; Road Legality</h2>
            </div>
            <p className="mt-4 leading-relaxed text-foreground">
              Certain tuning options and modifications we offer — including
              but not limited to <strong>anti-lag systems (ALS)</strong>,{" "}
              <strong>pops &amp; bangs / overrun tuning</strong>, de-cat
              downpipes, and race-fuel or extreme performance calibrations —
              are intended for <strong>closed-course, track, or private land
              use only</strong>. These modifications may not comply with road
              traffic law, noise regulations, or emissions standards.
            </p>
            <p className="mt-4 leading-relaxed text-foreground-muted">
              In the <strong className="text-foreground">UK</strong>, this
              includes (but is not limited to) the Road Vehicles
              (Construction and Use) Regulations 1986, MOT emissions and
              noise testing requirements, and the Road Traffic Act. Legal
              requirements vary significantly by country, state and region —
              it is the vehicle owner&rsquo;s sole responsibility to check and
              comply with local road-legality, emissions, and noise laws
              before using a vehicle with these modifications on public
              roads, whether in the UK or elsewhere.
            </p>
            <p className="mt-4 leading-relaxed text-foreground-muted">
              Street PRO Garage accepts no liability for fines, prosecution,
              MOT/inspection failure, insurance issues, or any other
              consequence arising from road use of track-only modifications.
              This information is provided for general guidance only and
              does not constitute legal advice — consult your local
              authority or a qualified professional if you are unsure
              whether a modification is road legal in your area.
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
                  <span className="text-accent">from <PriceTag amount={test.priceFrom} /></span>
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
