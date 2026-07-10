"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Circle, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { preDynoTests } from "@/lib/site-config";
import { PriceTag } from "@/components/region/price-tag";

const CHECKLIST_ITEMS = [
  "Fresh engine oil & filter change",
  "No active engine warning lights or unresolved fault codes",
  "Fuel system clean, with a fresh fuel filter if applicable",
  "Wideband AFR gauge installed and calibrated (or flagged for install help)",
  "Spark plugs are the correct type and gapped for your fuel/boost level",
  "Catch can installed, if running one",
  "Intake, vacuum and boost lines checked for leaks or damage",
  "Battery and charging system in good health for stable logging",
  "Any tuning cables, interfaces or software ready to go for remote sessions",
  "Vehicle is roadworthy — brakes, tyres and suspension in safe condition",
];

export default function PreTuneChecklistPage() {
  const [checked, setChecked] = useState<boolean[]>(() => CHECKLIST_ITEMS.map(() => false));
  const completedCount = checked.filter(Boolean).length;

  const toggle = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Before You Book</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Pre-Tune Checklist
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            A quick self-check before your remote or rolling road session.
            Tick off what you&rsquo;ve already covered — anything left unchecked is
            worth sorting first, or flagging to us when you submit your build
            list.
          </p>
        </Container>
      </div>

      <Section>
        <Container className="max-w-3xl">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Readiness Checklist</h2>
            <span className="text-sm font-medium text-foreground-muted">
              {completedCount} / {CHECKLIST_ITEMS.length} complete
            </span>
          </div>

          <ul className="mt-6 flex flex-col gap-3">
            {CHECKLIST_ITEMS.map((item, i) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={checked[i]}
                  className={`flex w-full min-h-11 cursor-pointer items-center gap-3 rounded-xl border p-4 text-left text-sm transition-colors ${
                    checked[i]
                      ? "border-accent bg-accent-soft text-foreground"
                      : "border-border bg-surface text-foreground-muted hover:border-border-strong"
                  }`}
                >
                  {checked[i] ? (
                    <CheckCircle size={22} weight="fill" className="shrink-0 text-accent" aria-hidden />
                  ) : (
                    <Circle size={22} className="shrink-0 text-foreground-subtle" aria-hidden />
                  )}
                  {item}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <MagnifyingGlass size={24} className="text-accent" aria-hidden />
              <h2 className="font-display text-2xl">Not sure about engine health?</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              We offer pre-dyno engine health checks for an additional charge —
              useful if you&rsquo;re unsure about the mechanical condition of your
              engine before committing to a full tune.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {preDynoTests.map((test) => (
                <li
                  key={test.name}
                  className="rounded-md border border-border-strong bg-surface-2 px-4 py-2 text-sm text-foreground-muted"
                >
                  {test.name}{" "}
                  <span className="text-accent">from <PriceTag price={test.price} /></span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-sm text-foreground-muted">
            Please also read our{" "}
            <Link href="/declaration" className="text-accent underline">
              Declaration &amp; Liability
            </Link>{" "}
            terms before booking.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <LinkButton href="/quote" size="lg">
              Submit Your Build List
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
