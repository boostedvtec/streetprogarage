"use client";

import { useEffect, useRef } from "react";
import { clamp, watchVisible } from "./canvas-utils";
import { useStill } from "./motion";

/**
 * Small live-calibration readout for the hero: RPM with shift lights, boost,
 * AFR, ignition and knock. Values are simulated (a repeating pull) and the
 * card says so. Updates write straight to the DOM at ~15fps, no re-renders.
 */

const LIGHTS = 12;
const PULL_MS = 9000;

type Sample = { rpm: number; boost: number; afr: number; ign: number; knock: number };

function sample(t: number): Sample {
  const p = (t % PULL_MS) / PULL_MS; // 0..1 through the pull
  const ramp = clamp(p / 0.82, 0, 1);
  const hold = p > 0.82 ? (p - 0.82) / 0.18 : 0;
  const rpm = 2600 + 5400 * (1 - Math.pow(1 - ramp, 1.6)) - hold * 4200;
  const boostCurve = clamp((rpm - 3000) / 1400, 0, 1) * (1 - clamp((rpm - 7000) / 2400, 0, 0.12));
  const boost = 22.4 * boostCurve * (hold > 0 ? 1 - hold : 1);
  const afr = 14.7 - 3.0 * clamp(boost / 18, 0, 1) + 0.04 * Math.sin(t / 130);
  const ign = 26 - 0.55 * boost - 2.0 * clamp((rpm - 6500) / 1500, 0, 1);
  const knock = 0.18 + 0.1 * Math.abs(Math.sin(t / 260)) * clamp(boost / 20, 0, 1);
  return { rpm, boost, afr, ign, knock };
}

function Metric({ label, unit, valueRef, initial }: { label: string; unit: string; valueRef: React.Ref<HTMLSpanElement>; initial: string }) {
  return (
    <div className="border-l border-border-strong pl-3">
      <dt className="text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">{label}</dt>
      <dd className="mt-1 flex items-baseline gap-1">
        <span ref={valueRef} className="text-2xl font-medium text-foreground">
          {initial}
        </span>
        <span className="text-[11px] text-foreground-subtle">{unit}</span>
      </dd>
    </div>
  );
}

export function HeroTelemetry({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rpmRef = useRef<HTMLSpanElement>(null);
  const boostRef = useRef<HTMLSpanElement>(null);
  const afrRef = useRef<HTMLSpanElement>(null);
  const ignRef = useRef<HTMLSpanElement>(null);
  const knockRef = useRef<HTMLSpanElement>(null);
  const lightRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const still = useStill();
  const stillRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    stillRef.current = still;
  }, [still]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    let last = 0;
    const start = performance.now();

    function paint(s: Sample) {
      if (rpmRef.current) rpmRef.current.textContent = Math.round(s.rpm / 10) * 10 + "";
      if (boostRef.current) boostRef.current.textContent = s.boost.toFixed(1);
      if (afrRef.current) afrRef.current.textContent = s.afr.toFixed(2);
      if (ignRef.current) ignRef.current.textContent = s.ign.toFixed(1);
      if (knockRef.current) knockRef.current.textContent = s.knock.toFixed(2);
      const lit = Math.round(clamp((s.rpm - 4800) / 3000, 0, 1) * LIGHTS);
      lightRefs.current.forEach((el, i) => {
        if (!el) return;
        const on = i < lit;
        const col = i < 4 ? "#3ccf7a" : i < 8 ? "#ff6a1f" : "#ff4d4d";
        el.style.background = on ? col : "#25252b";
        el.style.boxShadow = on ? `0 0 10px ${col}` : "none";
      });
    }

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      if (!visibleRef.current || stillRef.current) return;
      if (now - last < 66) return;
      last = now;
      paint(sample(now - start));
    }

    // Reduced motion / paused: show a representative mid-pull frame.
    paint(sample(PULL_MS * 0.62));
    const stop = watchVisible(root, (v) => {
      visibleRef.current = v;
    });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      stop();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`font-mono-tech brackets relative border border-border-strong bg-background/70 p-5 backdrop-blur-md ${className ?? ""}`}
      role="group"
      aria-label="Example calibration readout. Simulated values, not a real result."
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          Calibration &middot; live
        </span>
        <span>Example data</span>
      </div>

      <div className="mt-4 flex items-end gap-1" aria-hidden>
        {Array.from({ length: LIGHTS }).map((_, i) => (
          <span
            key={i}
            ref={(el) => {
              lightRefs.current[i] = el;
            }}
            className="h-2.5 flex-1 rounded-[1px] bg-border"
          />
        ))}
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span ref={rpmRef} className="text-5xl font-semibold tracking-tight text-foreground">
          6180
        </span>
        <span className="text-xs uppercase tracking-[0.16em] text-foreground-subtle">rpm</span>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
        <Metric label="Boost" unit="psi" valueRef={boostRef} initial="21.6" />
        <Metric label="AFR" unit=":1" valueRef={afrRef} initial="11.78" />
        <Metric label="Ignition" unit="° btdc" valueRef={ignRef} initial="12.6" />
        <Metric label="Knock" unit="v" valueRef={knockRef} initial="0.24" />
      </dl>
    </div>
  );
}
