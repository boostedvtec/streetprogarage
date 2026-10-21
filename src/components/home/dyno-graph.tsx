"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { clamp, fitCanvas, watchVisible } from "./canvas-utils";
import { plexMono } from "./mono-font";
import { useStill } from "./motion";

/**
 * 2D dyno sheet: a rough, lower generic file (blue) against a smooth, stronger
 * custom map (orange). Example data only, drawn on when scrolled into view.
 */

const ACCENT = "#cf5f1c";
const BLUE = "#2563eb";
const R0 = 3000;
const R1 = 8000;
const DRAW_MS = 3600;

const GEN_BASE = [92, 132, 178, 222, 254, 276, 287, 290, 282, 266, 240];
const PRO_BASE = [102, 160, 222, 278, 318, 340, 348, 346, 338, 322, 298];

function catmull(a: number[], x: number) {
  const i = Math.floor(x);
  const t = x - i;
  const p0 = a[Math.max(0, i - 1)];
  const p1 = a[i];
  const p2 = a[Math.min(a.length - 1, i + 1)];
  const p3 = a[Math.min(a.length - 1, i + 2)];
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
}

function baseAt(a: number[], r: number) {
  return catmull(a, clamp((r - R0) / 500, 0, a.length - 1.0001));
}

/** Smooth, strong curve. */
function proPower(r: number) {
  return baseAt(PRO_BASE, r);
}

/** Rough, lower curve: fast ripple plus flat spots and dips (fuel, timing pulled back). */
function genPower(r: number) {
  const k = clamp((r - R0) / 5000, 0, 1);
  const amp = 3 + 6 * k;
  const ripple = amp * (0.55 * Math.sin(r / 41) + 0.3 * Math.sin(r / 17 + 1.3) + 0.25 * Math.sin(r / 8.7 + 0.7));
  const dips =
    -15 * Math.exp(-Math.pow((r - 4350) / 110, 2)) -
    20 * Math.exp(-Math.pow((r - 5950) / 85, 2)) -
    12 * Math.exp(-Math.pow((r - 7000) / 70, 2));
  return baseAt(GEN_BASE, r) + ripple + dips;
}

const torque = (power: (r: number) => number) => (r: number) => (power(r) * 5252) / r;
const genTorque = torque(genPower);
const proTorque = torque(proPower);

function peak(fn: (r: number) => number) {
  let best = 0;
  let at = R0;
  for (let r = R0; r <= R1; r += 5) {
    const v = fn(r);
    if (v > best) {
      best = v;
      at = r;
    }
  }
  return { v: best, r: at };
}

const PEAKS = {
  genP: peak(genPower),
  proP: peak(proPower),
  genT: peak(genTorque),
  proT: peak(proTorque),
};

export function DynoGraph() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const still = useStill();
  const [showTq, setShowTq] = useState(true);
  const stillRef = useRef(false);
  const tqRef = useRef(true);
  const startRef = useRef(0);
  const visibleRef = useRef(false);
  const doneRef = useRef(false);

  useEffect(() => {
    stillRef.current = still;
    if (still) doneRef.current = false;
  }, [still]);

  useEffect(() => {
    tqRef.current = showTq;
    doneRef.current = false;
  }, [showTq]);

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const c: CanvasRenderingContext2D = ctx;
    let raf = 0;
    let FM = getComputedStyle(cv).fontFamily || "monospace";
    const font = (w: number | string, px: number) => `${w} ${px}px ${FM}`;
    let lastKey = "";

    function draw(now: number) {
      FM = getComputedStyle(cv!).fontFamily || FM;
      const fit = fitCanvas(cv!);
      const W = fit.w;
      const H = fit.h;
      const progress = stillRef.current ? 1 : clamp((now - startRef.current) / DRAW_MS, 0, 1);
      const key = `${W}x${H}:${progress}:${tqRef.current}`;
      if (key === lastKey) return;
      lastKey = key;
      c.setTransform(fit.dpr, 0, 0, fit.dpr, 0, 0);
      c.clearRect(0, 0, W, H);
      c.fillStyle = "#f2f2ee";
      c.fillRect(0, 0, W, H);
      const L = W < 520 ? 44 : 58;
      const R = W < 520 ? 44 : 58;
      const T = 40;
      const B = 44;
      const pw = W - L - R;
      const ph = H - T - B;
      const ep = 1 - Math.pow(1 - progress, 3);
      const rEnd = R0 + ep * (R1 - R0);
      const X = (r: number) => L + ((r - R0) / (R1 - R0)) * pw;
      const Y = (v: number) => T + ph - (v / 400) * ph;

      c.strokeStyle = "#e3e7ec";
      c.lineWidth = 1;
      c.beginPath();
      for (let v = 0; v <= 400; v += 50) {
        c.moveTo(L, Y(v));
        c.lineTo(W - R, Y(v));
      }
      for (let r = R0; r <= R1; r += 500) {
        c.moveTo(X(r), T);
        c.lineTo(X(r), T + ph);
      }
      c.stroke();
      c.fillStyle = "#4b5560";
      c.font = font(500, 11);
      c.textAlign = "right";
      for (let v = 0; v <= 400; v += 100) c.fillText(String(v), L - 8, Y(v) + 4);
      c.textAlign = "left";
      if (tqRef.current) for (let v = 0; v <= 400; v += 100) c.fillText(String(v), W - R + 8, Y(v) + 4);
      c.textAlign = "center";
      for (let r = R0; r <= R1; r += 1000) c.fillText(String(r), X(r), T + ph + 18);
      c.fillText("RPM", L + pw / 2, H - 8);
      c.save();
      c.translate(12, T + ph / 2);
      c.rotate(-Math.PI / 2);
      c.fillText("POWER whp", 0, 0);
      c.restore();
      if (tqRef.current) {
        c.save();
        c.translate(W - 10, T + ph / 2);
        c.rotate(Math.PI / 2);
        c.fillText("TORQUE lb-ft", 0, 0);
        c.restore();
      }

      /* gain between the two power curves */
      c.beginPath();
      for (let r = R0; r <= rEnd; r += 10) {
        const x = X(r);
        const y = Y(proPower(r));
        if (r === R0) c.moveTo(x, y);
        else c.lineTo(x, y);
      }
      for (let r = Math.floor(rEnd / 10) * 10; r >= R0; r -= 10) c.lineTo(X(r), Y(genPower(r)));
      c.closePath();
      c.fillStyle = "rgba(207,95,28,.14)";
      c.fill();

      const line = (fn: (r: number) => number, col: string, w: number, dash: number[], step: number) => {
        c.beginPath();
        for (let r = R0; r <= rEnd; r += step) {
          const x = X(r);
          const y = Y(fn(r));
          if (r === R0) c.moveTo(x, y);
          else c.lineTo(x, y);
        }
        c.strokeStyle = col;
        c.lineWidth = w;
        c.setLineDash(dash);
        c.lineJoin = "round";
        c.stroke();
        c.setLineDash([]);
      };
      if (tqRef.current) {
        line(genTorque, "#7aa2ee", 1.6, [5, 4], 10);
        line(proTorque, "#e8a37a", 2.2, [6, 5], 10);
      }
      line(genPower, BLUE, 2, [], 10);
      line(proPower, ACCENT, 3.8, [], 10);

      const marker = (pk: { v: number; r: number }, col: string, dy: number) => {
        if (rEnd < pk.r) return;
        const x = X(pk.r);
        const y = Y(pk.v);
        c.fillStyle = "#fff";
        c.strokeStyle = col;
        c.lineWidth = 3;
        c.beginPath();
        c.arc(x, y, 6, 0, 6.2832);
        c.fill();
        c.stroke();
        c.fillStyle = col;
        c.font = font(700, 12);
        c.textAlign = "center";
        c.fillText(`${Math.round(pk.v)} whp @ ${Math.round(pk.r / 10) * 10}`, clamp(x, L + 72, W - R - 72), y + dy);
      };
      marker(PEAKS.genP, BLUE, 26);
      marker(PEAKS.proP, ACCENT, -14);

      c.textAlign = "left";
      c.font = font(600, 12);
      c.fillStyle = BLUE;
      c.fillRect(L + 6, T - 26, 18, 3);
      c.fillText("Generic file (rough)", L + 32, T - 21);
      const off = Math.min(190, pw * 0.42);
      c.fillStyle = ACCENT;
      c.fillRect(L + 6 + off, T - 26, 18, 3);
      c.fillText("Street PRO map (smooth)", L + 32 + off, T - 21);
      if (progress >= 1) doneRef.current = true;
    }

    function loop(now: number) {
      if (visibleRef.current) draw(now);
      raf = requestAnimationFrame(loop);
    }
    const stop = watchVisible(cv, (v) => {
      if (v && !visibleRef.current) startRef.current = performance.now();
      visibleRef.current = v;
    });
    const onResize = () => {
      lastKey = "";
    };
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      stop();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const gain = Math.round(PEAKS.proP.v - PEAKS.genP.v);
  const tgain = Math.round(PEAKS.proT.v - PEAKS.genT.v);

  return (
    <div className={clsx("overflow-hidden relative brackets border border-border-strong bg-surface", plexMono.className)}>
      <canvas
        ref={cvRef}
        role="img"
        aria-label={`Dyno graph of power and torque against RPM. A rough, lower generic file in blue peaks near ${Math.round(PEAKS.genP.v)} whp. A smooth custom map in orange peaks near ${Math.round(PEAKS.proP.v)} whp. Example data only.`}
        className="block [filter:invert(1)_hue-rotate(180deg)] aspect-[1.15] w-full sm:aspect-[1.9]"
      />
      <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-border-strong bg-surface-2 px-3 py-2.5 text-sm tabular-nums">
        <span>
          Peak power <strong>{Math.round(PEAKS.genP.v)} → {Math.round(PEAKS.proP.v)} whp</strong> (+{gain})
        </span>
        <span>
          Peak torque <strong>{Math.round(PEAKS.genT.v)} → {Math.round(PEAKS.proT.v)} lb-ft</strong> (+{tgain})
        </span>
        <span className="text-foreground-muted">Example data</span>
      </div>
      <div className="flex flex-wrap items-center gap-3 border-t border-border-strong bg-surface px-3 py-2.5">
        <button
          type="button"
          onClick={() => {
            startRef.current = performance.now();
            doneRef.current = false;
          }}
          className="min-h-11 cursor-pointer border border-border-strong px-4 font-display text-base tracking-wider hover:bg-surface-2 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent"
        >
          Replay
        </button>
        <button
          type="button"
          aria-pressed={showTq}
          onClick={() => setShowTq((v) => !v)}
          className={clsx(
            "min-h-11 cursor-pointer border border-border-strong px-4 font-display text-base tracking-wider focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent",
            showTq ? "bg-accent text-accent-foreground" : "bg-transparent text-foreground-muted hover:text-foreground"
          )}
        >
          Torque
        </button>
        <p className="min-w-[200px] flex-1 text-[13px] leading-snug text-foreground-muted">
          Example data to show the difference, not a real result. Real client dyno runs are on the Projects page.
        </p>
      </div>
    </div>
  );
}
