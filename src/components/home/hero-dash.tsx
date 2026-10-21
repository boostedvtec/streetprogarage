"use client";

import { useEffect, useRef } from "react";
import { clamp, watchVisible } from "./canvas-utils";
import { useStill } from "./motion";

/**
 * Race-dash style readout for the hero: shift lights, RPM bar, gear, speed,
 * MAP, battery, throttle and pressure bars, on a black bezel. Values are a
 * simulated repeating pull and the dash says so. Updates write straight to
 * the DOM at ~20fps, no re-renders.
 */

const PULL_MS = 9000;
const TOP_LEDS = 10;
const LED_COLORS = ["#3ccf7a", "#3ccf7a", "#3ccf7a", "#ff5d5d", "#ff5d5d", "#ff5d5d", "#2f9bff", "#2f9bff", "#2f9bff", "#2f9bff"];
const SIDE_LEDS = ["#ffb020", "#ffffff", "#25d6e0", "#e040fb"];

type Sample = { rpm: number; speed: number; map: number; bat: number; tps: number; oil: number; fuel: number; gx: number; gy: number };

function sample(t: number): Sample {
  const p = (t % PULL_MS) / PULL_MS;
  const ramp = clamp(p / 0.82, 0, 1);
  const hold = p > 0.82 ? (p - 0.82) / 0.18 : 0;
  const rpm = 2600 + 5400 * (1 - Math.pow(1 - ramp, 1.6)) - hold * 4200;
  const boost = clamp((rpm - 3000) / 1400, 0, 1) * (hold > 0 ? 1 - hold : 1);
  return {
    rpm,
    speed: rpm * 0.0176,
    map: 100 + boost * 150,
    bat: 13.9 + 0.2 * Math.sin(t / 700),
    tps: hold > 0 ? clamp(100 - hold * 400, 0, 100) : 100,
    oil: 38 + 52 * clamp(rpm / 8000, 0, 1),
    fuel: 52 + 30 * boost,
    gx: Math.sin(t / 900) * 0.25,
    gy: hold > 0 ? -0.55 * hold : 0.6 * (1 - ramp) + 0.25,
  };
}

export function HeroDash({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rpmRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);
  const mapRef = useRef<HTMLSpanElement>(null);
  const batRef = useRef<HTMLSpanElement>(null);
  const tpsRef = useRef<HTMLDivElement>(null);
  const oilRef = useRef<HTMLDivElement>(null);
  const fuelRef = useRef<HTMLDivElement>(null);
  const gRef = useRef<HTMLSpanElement>(null);
  const ledRefs = useRef<(HTMLSpanElement | null)[]>([]);
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
      if (rpmRef.current) rpmRef.current.textContent = String(Math.round(s.rpm / 10) * 10);
      if (fillRef.current) fillRef.current.style.clipPath = `inset(0 ${100 - clamp(s.rpm / 8000, 0, 1) * 100}% 0 0)`;
      if (speedRef.current) speedRef.current.textContent = String(Math.round(s.speed));
      if (mapRef.current) mapRef.current.textContent = (s.map / 10).toFixed(1);
      if (batRef.current) batRef.current.textContent = s.bat.toFixed(1);
      if (tpsRef.current) tpsRef.current.style.width = `${s.tps}%`;
      if (oilRef.current) oilRef.current.style.height = `${clamp(s.oil, 0, 100)}%`;
      if (fuelRef.current) fuelRef.current.style.height = `${clamp(s.fuel, 0, 100)}%`;
      if (gRef.current) gRef.current.style.transform = `translate(${s.gx * 60}%, ${-s.gy * 60}%)`;
      const lit = Math.round(clamp((s.rpm - 4200) / 3400, 0, 1) * TOP_LEDS);
      ledRefs.current.forEach((el, i) => {
        if (!el || i >= TOP_LEDS) return;
        const on = i < lit;
        el.style.opacity = on ? "1" : "0.18";
        el.style.boxShadow = on ? `0 0 8px ${LED_COLORS[i]}` : "none";
      });
    }

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      if (!visibleRef.current || stillRef.current) return;
      if (now - last < 50) return;
      last = now;
      paint(sample(now - start));
    }

    paint(sample(PULL_MS * 0.7)); // still frame for reduced motion / paused
    const stop = watchVisible(root, (v) => {
      visibleRef.current = v;
    });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      stop();
    };
  }, []);

  const label = "text-[3.1cqw] font-medium uppercase leading-none text-[#ffb020]";

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Example race dash. Simulated values, not a real result."
      className={`font-mono-tech [container-type:inline-size] ${className ?? ""}`}
    >
      {/* Bezel */}
      <div className="relative rounded-[7cqw] border border-[#2a2a30] bg-gradient-to-b from-[#1b1b20] to-[#0b0b0d] p-[3.2cqw] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)]">
        {/* Shift lights */}
        <div className="mx-[3cqw] mb-[2.4cqw] flex justify-between px-[3cqw]" aria-hidden>
          {LED_COLORS.map((c, i) => (
            <span
              key={i}
              ref={(el) => {
                ledRefs.current[i] = el;
              }}
              className="h-[4.2cqw] w-[4.2cqw] rounded-full transition-opacity duration-75"
              style={{ background: c, opacity: 0.18 }}
            />
          ))}
        </div>

        <div className="relative flex items-stretch gap-[2cqw]">
          {/* Side LEDs */}
          <div className="flex flex-col justify-between py-[8cqw]" aria-hidden>
            {[SIDE_LEDS[0], SIDE_LEDS[1]].map((c) => (
              <span key={c} className="h-[3.4cqw] w-[3.4cqw] rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
            ))}
          </div>

          {/* Screen */}
          <div className="relative min-w-0 flex-1 overflow-hidden rounded-[1.2cqw] bg-black p-[2.2cqw] ring-1 ring-black">
            {/* RPM row */}
            <div className="flex items-baseline gap-[2cqw] text-white">
              <span ref={rpmRef} className="text-[11.5cqw] font-bold leading-none tracking-tight">
                7100
              </span>
              <span className="text-[2.6cqw] leading-[1.05] text-white/80">
                8000
                <br />
                RPM
              </span>
              <span className="ml-auto flex items-center gap-[1cqw] text-[2.6cqw] text-[#ff5d5d]">
                <span className="h-[2.2cqw] w-[2.2cqw] rounded-full bg-[#ff5d5d]" />
                REC
              </span>
            </div>
            <div className="relative mt-[1.6cqw] h-[4.2cqw] bg-[#2a2a2e]">
              <div
                ref={fillRef}
                className="absolute inset-0 bg-[linear-gradient(90deg,#ffd21f_0%,#ff9a1f_45%,#ff3b1f_80%,#e01b0b_100%)]"
                style={{ clipPath: "inset(0 11% 0 0)" }}
              />
            </div>
            <div className="mt-[0.8cqw] flex justify-between px-[1cqw] text-[2.6cqw] text-white/80" aria-hidden>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>

            {/* Middle row */}
            <div className="mt-[1.6cqw] grid grid-cols-[1fr_1fr_1.25fr] items-center gap-[1.5cqw]">
              <div className="relative mx-auto aspect-square w-[88%] rounded-full border border-white/70" aria-hidden>
                <span className="absolute inset-[18%] rounded-full border border-white/40" />
                <span className="absolute left-0 right-0 top-1/2 h-px bg-white/40" />
                <span className="absolute bottom-0 left-1/2 top-0 w-px bg-white/40" />
                <span ref={gRef} className="absolute left-1/2 top-1/2 -ml-[6%] -mt-[6%] h-[12%] w-[12%] rounded-full bg-white" />
              </div>
              <div className="text-center text-white">
                <span className={label + " block !text-[#ffb020]"}>Gear</span>
                <span className="block text-[17cqw] font-bold leading-[0.95]">3</span>
              </div>
              <div className="text-right text-white">
                <span className={label + " block pr-[1cqw]"}>Front</span>
                <span ref={speedRef} className="block text-[13cqw] font-bold leading-[0.95]">
                  125
                </span>
                <span className="block text-[2.6cqw] text-white/80">Mph</span>
              </div>
            </div>

            {/* Bottom row */}
            <div className="mt-[1.4cqw] grid grid-cols-[auto_auto_1fr_auto_auto] items-end gap-[2cqw]">
              <div>
                <span className={label + " block"}>MAP</span>
                <span ref={mapRef} className="mt-[0.6cqw] block text-[6cqw] font-bold leading-none text-white">
                  26.0
                </span>
              </div>
              <div>
                <span className={label + " block"}>Bat.</span>
                <span ref={batRef} className="mt-[0.6cqw] block text-[6cqw] font-bold leading-none text-white">
                  13.9
                </span>
              </div>
              <div className="min-w-0">
                <span className={label + " block text-center"}>TPS</span>
                <div className="mt-[0.6cqw] h-[4cqw] bg-[#2a2a2e]">
                  <div ref={tpsRef} className="h-full bg-[#2fd44a]" style={{ width: "100%" }} />
                </div>
                <div className="flex justify-between text-[2.4cqw] text-white/80" aria-hidden>
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              <div className="w-[9cqw]">
                <span className={label + " block text-center"}>Oil P.</span>
                <div className="relative mt-[0.6cqw] flex h-[10cqw] items-end bg-[#2a2a2e]">
                  <div ref={oilRef} className="w-full bg-[#2fd44a]" style={{ height: "70%" }} />
                </div>
              </div>
              <div className="w-[9cqw]">
                <span className={label + " block text-center"}>Fuel P.</span>
                <div className="relative mt-[0.6cqw] flex h-[10cqw] items-end bg-[#2a2a2e]">
                  <div ref={fuelRef} className="w-full bg-[#ff7a1a]" style={{ height: "70%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Side LEDs */}
          <div className="flex flex-col justify-between py-[8cqw]" aria-hidden>
            {[SIDE_LEDS[2], SIDE_LEDS[3]].map((c) => (
              <span key={c} className="h-[3.4cqw] w-[3.4cqw] rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
            ))}
          </div>
        </div>

        {/* Badge row */}
        <div className="mt-[2.2cqw] flex items-center justify-between px-[4cqw] text-[3cqw] uppercase tracking-[0.18em]">
          <span className="font-display text-[4.2cqw] tracking-wider text-foreground">SPG-600</span>
          <span className="text-foreground-subtle">Example data</span>
        </div>
      </div>
    </div>
  );
}
