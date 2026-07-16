import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Story | Street PRO Garage",
  description:
    "How Street PRO Garage's ECU calibration service came to be — engineered performance, not guesswork.",
};

export default function OurStoryPage() {
  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Story</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">Our Story</h1>
          <p className="font-display mt-6 max-w-2xl text-2xl leading-tight text-accent sm:text-3xl">
            Performance isn&rsquo;t created by chance&mdash;it&rsquo;s engineered.
          </p>
        </Container>
      </div>

      <Section>
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-foreground-muted">
            <p>
              Our passion for motorsport and engine management began with one
              simple goal: understanding how to make an engine perform at its
              absolute best. Not through generic files or inflated dyno
              numbers, but through careful analysis, sound engineering
              principles, and precise ECU calibration.
            </p>
            <p>
              Over the years, that passion has evolved into a specialist
              calibration service built around technical knowledge,
              data-driven decision making, and a commitment to delivering
              reliable, repeatable performance.
            </p>
            <p>
              We work across both OEM and standalone engine management
              platforms, providing bespoke calibration solutions for
              everything from classic Honda projects and fast road cars to
              high-performance track and competition vehicles. Whether
              we&rsquo;re recalibrating a factory ECU or configuring a
              complete standalone engine management system from scratch, our
              approach remains the same&mdash;every calibration is tailored
              to the individual vehicle, its hardware, fuel, and intended
              application.
            </p>
            <p>
              Our expertise includes Honda OBD1 D, B, H and F Series ECUs,
              Honda factory ECU remapping, Subaru OEM ECU calibration,
              Mitsubishi Lancer Evolution ECU remapping, and a wide range of
              standalone and piggyback engine management systems.
            </p>
            <p>
              We regularly develop calibrations for industry-leading
              platforms including MaxxECU, Link ECU, Haltech, AEM, ME ECU,
              Megasquirt, Speeduino, and EcuMaster standalone and piggyback
              systems. From initial ECU setup and sensor configuration to
              complete fuel, ignition, boost, and motorsport strategy
              calibration, every project is approached with the same level of
              technical precision.
            </p>
            <p>
              Our process is built around understanding, not assumptions. We
              use data logging, calibration validation, and systematic
              testing to optimise drivability, power delivery, reliability,
              and engine protection. Every adjustment has a purpose, and
              every calibration is developed with long-term performance in
              mind.
            </p>
            <p>
              Whether you&rsquo;re restoring a classic Honda, building a
              competitive time attack car, refining a rally setup, or
              integrating a modern standalone ECU into a custom project, we
              aim to provide the same thing: a calibration that&rsquo;s
              engineered, not guessed.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-accent/30 bg-accent-soft p-8">
            <p className="font-display text-xl leading-snug sm:text-2xl">
              Because great tuning isn&rsquo;t measured by a single dyno run.
            </p>
            <p className="font-display mt-2 text-xl leading-snug text-accent sm:text-2xl">
              It&rsquo;s measured by how the engine performs every time you
              start it, every lap you complete, and every mile you drive.
            </p>
          </div>

          <div className="mt-10">
            <LinkButton href="/quote" size="lg">
              Get a Quote
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
