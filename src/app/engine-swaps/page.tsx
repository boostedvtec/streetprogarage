import type { Metadata } from "next";
import Link from "next/link";
import {
  Engine,
  Wrench,
  PlugsConnected,
  ArrowsClockwise,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Engine Swaps, Build & Customization | Street PRO Garage Pakistan",
  description:
    "Complete engine swap, build and customization services at Street PRO Garage's Karachi, Pakistan workshop — donor engine fitment, custom mounts, wiring integration and full builds.",
};

const buildServices = [
  "Donor engine fitment and mounting — custom mounts and subframes where needed",
  "Wiring harness integration for the swapped engine and ECU",
  "Fuel system builds and upgrades to match the new engine",
  "Cooling system builds and upgrades for the swap",
  "Driveline and gearbox adaptation",
  "Full custom builds from the ground up, not just bolt-in swaps",
];

export default function EngineSwapsPage() {
  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Karachi, Pakistan Workshop</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Engine Swaps, Build &amp; Customization
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            From a straightforward donor engine swap to a full custom build,
            our Karachi workshop handles the fitment, wiring, fuelling and
            cooling work an engine swap actually needs — not just dropping it
            in and hoping.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/quote" size="lg">
              Get a Quote
            </LinkButton>
            <LinkButton href="/contact" size="lg" variant="secondary">
              Discuss Your Build
            </LinkButton>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Engine size={26} weight="bold" aria-hidden />
              </div>
              <h2 className="font-display mt-6 text-3xl sm:text-4xl">
                What&rsquo;s Included
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                Every engine swap is planned around your chassis, your goals
                and your budget — from a reliable daily-driver swap to a
                built engine for serious power.
              </p>
            </div>
            <ul className="grid gap-3">
              {buildServices.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span className="text-foreground-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-surface/50">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Wrench size={24} weight="bold" aria-hidden />
              </div>
              <h3 className="font-display mt-5 text-xl">Fitment &amp; Mounting</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                Custom mounts, subframes and clearance work so the swap sits
                right — not held in with whatever&rsquo;s lying around.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <PlugsConnected size={24} weight="bold" aria-hidden />
              </div>
              <h3 className="font-display mt-5 text-xl">Wiring &amp; ECU</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                Clean harness integration for the swapped engine and its ECU
                — see our{" "}
                <Link href="/custom-wiring" className="text-accent underline">
                  Custom Wiring
                </Link>{" "}
                page for the full wiring scope.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <ArrowsClockwise size={24} weight="bold" aria-hidden />
              </div>
              <h3 className="font-display mt-5 text-xl">Tuned &amp; Sorted</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                Once the swap is running, we tune it properly on our rolling
                road dyno before it goes back to you.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-xl border border-border-strong bg-surface-2 p-8">
            <h2 className="font-display text-2xl">Every Build Is Quoted Individually</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              Engine swaps vary hugely by donor engine, chassis and how much
              custom work is involved — there&rsquo;s no flat-rate price for
              this one. Submit your build list or get in touch with what
              you&rsquo;re planning and we&rsquo;ll confirm scope and pricing.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <LinkButton href="/quote" size="lg">
                Submit Your Build List
              </LinkButton>
              <LinkButton href="/contact" size="lg" variant="secondary">
                Contact Us
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
