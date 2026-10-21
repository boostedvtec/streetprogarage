"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Pause, Play } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { useRegion } from "@/components/region/region-context";
import { DynoLines } from "./dyno-lines";
import { HeroDash } from "./hero-dash";
import { toggleMotionPaused, useMotionPaused, useStill } from "./motion";

const heroBrands = ["Honda", "Toyota", "Subaru", "Nissan", "Mitsubishi", "Mazda"];

/**
 * Homepage hero: a real night-meet build photo graded dark, layered with a
 * hairline dyno grid and a floating calibration readout. The layers drift
 * a few pixels against the pointer for depth (fine pointers only, off when
 * motion is paused or reduced).
 */
export function Hero() {
  const { data } = useRegion();
  const rootRef = useRef<HTMLElement>(null);
  const still = useStill();
  const paused = useMotionPaused();
  const stillRef = useRef(false);

  useEffect(() => {
    stillRef.current = still;
    if (still) {
      rootRef.current?.style.setProperty("--px", "0");
      rootRef.current?.style.setProperty("--py", "0");
    }
  }, [still]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (stillRef.current) return;
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      root.style.setProperty("--px", cx.toFixed(3));
      root.style.setProperty("--py", cy.toFixed(3));
    };
    root.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-border"
      style={{ ["--px" as string]: 0, ["--py" as string]: 0 }}
    >
      {/* Layer 1: photograph, slowest drift */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-30 will-change-transform lg:left-[24%]"
        style={{ transform: "translate3d(calc(var(--px) * -14px), calc(var(--py) * -10px), 0) scale(1.04)" }}
      >
        <Image
          src="/images/builds/civic-k24-turbo.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[28%_58%] opacity-80 saturate-[0.85] contrast-[1.08] brightness-[0.85]"
        />
      </div>

      {/* Grade: left-to-right shade, floor fade, vignette, heat glow */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#09090b_0%,rgba(9,9,11,0.92)_32%,rgba(9,9,11,0.35)_66%,rgba(9,9,11,0.7)_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-[linear-gradient(0deg,#09090b_0%,rgba(9,9,11,0)_38%)]" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_85%_95%,rgba(255,106,31,0.22),transparent_55%)]" />

      {/* Layer 2: hairline grid, mid drift */}
      <div
        aria-hidden
        className="absolute -inset-4 -z-10"
        style={{ transform: "translate3d(calc(var(--px) * -6px), calc(var(--py) * -4px), 0)" }}
      >
        <DynoLines />
      </div>

      <Container className="relative flex min-h-[calc(100svh-11rem)] flex-col justify-center py-12 sm:py-16 lg:min-h-[40rem]">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="max-w-full flex-wrap !tracking-[0.14em] sm:!tracking-[0.2em]">
              Automotive performance &bull; ECU calibration &bull; Engineering
            </Eyebrow>
            <h1
              id="hero-title"
              className="font-display mt-6 text-[clamp(3.4rem,11.5vw,8.25rem)] leading-[0.86] tracking-[0.005em]"
            >
              Engineered for
              <br />
              <span className="text-accent">performance.</span>
            </h1>
            <p className="font-display mt-6 text-xl tracking-[0.14em] text-foreground sm:text-2xl">
              ECU Tuning<span className="text-accent">.</span> Custom Wiring<span className="text-accent">.</span>{" "}
              Precision Diagnostics<span className="text-accent">.</span>
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
              Performance-focused automotive solutions, from remote ECU calibration and dyno sessions to bespoke
              wiring builds and advanced fault finding.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="/quote" size="lg">
                Book a tuning session
                <ArrowRight size={18} weight="bold" aria-hidden />
              </LinkButton>
              <LinkButton href="#services" size="lg" variant="secondary">
                Explore our services
              </LinkButton>
            </div>

            <p className="font-mono-tech mt-6 text-xs uppercase tracking-[0.18em] text-foreground-subtle">
              {data.city}, {data.country} &middot; Remote worldwide
            </p>
          </div>

          {/* Layer 3: race dash, strongest drift */}
          <div
            className="hidden lg:col-span-5 lg:block"
            style={{ transform: "translate3d(calc(var(--px) * 12px), calc(var(--py) * 8px), 0)" }}
          >
            <HeroDash />
          </div>
        </div>
      </Container>

      <div className="relative border-t border-border bg-background/70 backdrop-blur-sm">
        <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3">
          <ul className="font-display flex flex-wrap items-center gap-x-6 gap-y-1 text-lg tracking-[0.12em] text-foreground-muted" aria-label="Brands we tune">
            {heroBrands.map((brand) => (
              <li key={brand}>{brand}</li>
            ))}
            <li className="text-foreground-subtle">+ other JDM</li>
          </ul>
          <button
            type="button"
            onClick={toggleMotionPaused}
            aria-pressed={paused}
            className="font-mono-tech inline-flex min-h-11 cursor-pointer items-center gap-2 px-1 text-xs uppercase tracking-[0.16em] text-foreground-subtle transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {paused ? <Play size={14} weight="fill" aria-hidden /> : <Pause size={14} weight="fill" aria-hidden />}
            {paused ? "Resume motion" : "Pause motion"}
          </button>
        </Container>
      </div>
    </section>
  );
}
