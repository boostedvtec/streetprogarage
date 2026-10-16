"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { clamp, fitCanvas, makeProjector, watchVisible } from "@/components/home/canvas-utils";
import { plexMono } from "@/components/home/mono-font";
import { toggleMotionPaused, useMotionPaused, useStill } from "@/components/home/motion";

type V3 = [number, number, number];

type Circuit = {
  name: string;
  short: string;
  at: V3;
  /** true when the ECU drives it (pulses flow out), false for sensors (pulses flow in) */
  output: boolean;
  wires: number;
  note: string;
};

const CIRCUITS: Circuit[] = [
  { name: "Injectors", short: "Injectors", at: [1.4, 0.45, -0.4], output: true, wires: 3, note: "One feed and one driver wire per injector, loomed together and labelled." },
  { name: "Ignition coils", short: "Coils", at: [0.95, 0.55, 0.32], output: true, wires: 3, note: "Coil power and trigger wires, fused and kept clear of the sensor lines." },
  { name: "MAP sensor", short: "MAP", at: [0.3, 0.52, 0.45], output: false, wires: 3, note: "5V reference, signal and sensor ground, so the boost reading stays clean." },
  { name: "Throttle position (TPS)", short: "TPS", at: [0.15, 0.12, -0.62], output: false, wires: 3, note: "Position sensor wiring, with the correct connector for your throttle body." },
  { name: "Wideband O2", short: "Wideband", at: [1.7, -0.12, 0.62], output: false, wires: 2, note: "Controller power and the analogue signal back into the ECU for accurate AFR." },
  { name: "Crank and cam", short: "Crank/Cam", at: [1.6, 0.08, -0.05], output: false, wires: 3, note: "Shielded signal lines routed away from coil and injector wiring." },
  { name: "IAT and coolant temp", short: "IAT/CLT", at: [0.65, 0.3, -0.5], output: false, wires: 2, note: "Temperature sensors with proper returns, so readings do not drift." },
  { name: "Fuel pump relay", short: "Fuel pump", at: [-0.25, -0.5, 0.68], output: true, wires: 2, note: "Fused and relayed from the ECU so the pump only runs when it should." },
  { name: "Boost control solenoid", short: "Boost solenoid", at: [0.8, 0.62, -0.18], output: true, wires: 2, note: "Switched output for boost control, wired and fused to suit your setup." },
];

const WIRE_COLORS = ["#e03131", "#1c7ed6", "#2f9e44", "#f08c00", "#9c36b5", "#212529", "#0ca678", "#e64980"];
const ACCENT = "#cf5f1c";
const TEAL = "#0e9f93";

const ECU_C: V3 = [-1.45, 0, 0];
const ECU_H: V3 = [0.32, 0.17, 0.25];
const ENG_C: V3 = [1.0, -0.05, 0];
const ENG_H: V3 = [0.78, 0.4, 0.45];
const JUNC: V3 = [-0.6, -0.08, 0];
const START: V3 = [-1.13, -0.02, 0];

function bez(p0: V3, p1: V3, p2: V3, p3: V3, t: number): V3 {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1], a * p0[2] + b * p1[2] + c * p2[2] + d * p3[2]];
}
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

function branchCtrl(c: Circuit): [V3, V3, V3, V3] {
  const e = c.at;
  return [JUNC, [JUNC[0] + 0.55, JUNC[1] + 0.02, e[2] * 0.25], [e[0] - 0.45, e[1] + 0.05, e[2] * 0.85], e];
}

export function Wiring3D() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const still = useStill();
  const paused = useMotionPaused();
  const [sel, setSel] = useState<number | null>(null);
  const stillRef = useRef(false);
  const selRef = useRef<number | null>(null);
  const hovRef = useRef<number | null>(null);
  const yawRef = useRef(-0.55);
  const pitchRef = useRef(0.42);
  const visRef = useRef(true);

  useEffect(() => {
    stillRef.current = still;
  }, [still]);
  useEffect(() => {
    selRef.current = sel;
  }, [sel]);

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const c: CanvasRenderingContext2D = ctx;
    let raf = 0;
    let FM = getComputedStyle(cv).fontFamily || "monospace";
    let nodes: { x: number; y: number }[] = [];
    let dragging = false;
    let lx = 0;
    let ly = 0;
    let moved = false;

    type Item = { d: number; draw: () => void };

    function draw(now: number) {
      const fit = fitCanvas(cv!);
      const W = fit.w;
      const H = fit.h;
      c.setTransform(fit.dpr, 0, 0, fit.dpr, 0, 0);
      c.clearRect(0, 0, W, H);
      c.fillStyle = "#ffffff";
      c.fillRect(0, 0, W, H);
      const t = stillRef.current ? 0 : now / 1000;
      const yaw = yawRef.current + (stillRef.current ? 0 : Math.sin(t * 0.35) * 0.22);
      const P = makeProjector(yaw, pitchRef.current, 5.2);
      const sc = Math.min(W * 0.2, H * 0.46);
      const ox = W * 0.5;
      const oy = H * 0.56;
      const pr = (p: V3) => {
        const q = P(p[0], p[1], p[2]);
        return { x: ox + q.x * sc, y: oy - q.y * sc, d: q.d };
      };
      const active = hovRef.current ?? selRef.current;
      const items: Item[] = [];

      /* floor grid */
      c.strokeStyle = "rgba(15,19,24,.1)";
      c.lineWidth = 1;
      c.beginPath();
      for (let i = -4; i <= 4; i++) {
        const a = pr([i * 0.5, -0.62, -1.1]);
        const b = pr([i * 0.5, -0.62, 1.1]);
        c.moveTo(a.x, a.y);
        c.lineTo(b.x, b.y);
      }
      for (let k = -2; k <= 2; k++) {
        const a = pr([-2.1, -0.62, k * 0.5]);
        const b = pr([2.1, -0.62, k * 0.5]);
        c.moveTo(a.x, a.y);
        c.lineTo(b.x, b.y);
      }
      c.stroke();

      /* engine block as a faint wireframe */
      const ev: V3[] = [];
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) ev.push([ENG_C[0] + sx * ENG_H[0], ENG_C[1] + sy * ENG_H[1], ENG_C[2] + sz * ENG_H[2]]);
      const edges: [number, number][] = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
      c.strokeStyle = "rgba(89,99,110,.45)";
      c.lineWidth = 1.4;
      c.setLineDash([5, 4]);
      c.beginPath();
      for (const [a, b] of edges) {
        const pa = pr(ev[a]);
        const pb = pr(ev[b]);
        c.moveTo(pa.x, pa.y);
        c.lineTo(pb.x, pb.y);
      }
      c.stroke();
      c.setLineDash([]);
      const engLbl = pr([ENG_C[0], ENG_C[1] - ENG_H[1] - 0.12, ENG_C[2]]);
      c.fillStyle = "#59636e";
      c.font = `600 11px ${FM}`;
      c.textAlign = "center";
      c.fillText("ENGINE", engLbl.x, engLbl.y);

      /* ECU box (painter-sorted faces) */
      const hx = ECU_H[0];
      const hy = ECU_H[1];
      const hz = ECU_H[2];
      const cx0 = ECU_C[0];
      const cy0 = ECU_C[1];
      const cz0 = ECU_C[2];
      const faces: { v: V3[]; shade: number }[] = [
        { v: [[cx0 - hx, cy0 + hy, cz0 - hz], [cx0 + hx, cy0 + hy, cz0 - hz], [cx0 + hx, cy0 + hy, cz0 + hz], [cx0 - hx, cy0 + hy, cz0 + hz]], shade: 1 },
        { v: [[cx0 - hx, cy0 - hy, cz0 - hz], [cx0 + hx, cy0 - hy, cz0 - hz], [cx0 + hx, cy0 - hy, cz0 + hz], [cx0 - hx, cy0 - hy, cz0 + hz]], shade: 0.55 },
        { v: [[cx0 - hx, cy0 - hy, cz0 - hz], [cx0 + hx, cy0 - hy, cz0 - hz], [cx0 + hx, cy0 + hy, cz0 - hz], [cx0 - hx, cy0 + hy, cz0 - hz]], shade: 0.8 },
        { v: [[cx0 - hx, cy0 - hy, cz0 + hz], [cx0 + hx, cy0 - hy, cz0 + hz], [cx0 + hx, cy0 + hy, cz0 + hz], [cx0 - hx, cy0 + hy, cz0 + hz]], shade: 0.8 },
        { v: [[cx0 - hx, cy0 - hy, cz0 - hz], [cx0 - hx, cy0 - hy, cz0 + hz], [cx0 - hx, cy0 + hy, cz0 + hz], [cx0 - hx, cy0 + hy, cz0 - hz]], shade: 0.68 },
        { v: [[cx0 + hx, cy0 - hy, cz0 - hz], [cx0 + hx, cy0 - hy, cz0 + hz], [cx0 + hx, cy0 + hy, cz0 + hz], [cx0 + hx, cy0 + hy, cz0 - hz]], shade: 0.9 },
      ];
      for (const f of faces) {
        const pts = f.v.map(pr);
        const d = pts.reduce((s, p) => s + p.d, 0) / 4;
        items.push({
          d,
          draw: () => {
            c.beginPath();
            pts.forEach((p, i) => (i ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y)));
            c.closePath();
            const g = Math.round(46 * f.shade + 20);
            c.fillStyle = `rgb(${g},${g + 3},${g + 8})`;
            c.fill();
            c.strokeStyle = "#0f1318";
            c.lineWidth = 1.5;
            c.stroke();
          },
        });
      }

      /* trunk loom */
      const trunkWires = 6;
      const trunkPts = (k: number) => {
        const off: V3 = [0, (k - (trunkWires - 1) / 2) * 0.016, (k - (trunkWires - 1) / 2) * 0.02];
        const p0 = add(START, off);
        const p3 = add(JUNC, off);
        const arr: V3[] = [];
        for (let i = 0; i <= 18; i++) arr.push(bez(p0, add(p0, [0.3, 0.06, 0]), add(p3, [-0.3, -0.04, 0]), p3, i / 18));
        return arr;
      };
      const dimTrunk = active !== null ? 0.5 : 1;
      for (let k = 0; k < trunkWires; k++) {
        const arr = trunkPts(k).map(pr);
        for (let i = 0; i < arr.length - 1; i++) {
          const a = arr[i];
          const b = arr[i + 1];
          items.push({
            d: (a.d + b.d) / 2,
            draw: () => {
              c.strokeStyle = WIRE_COLORS[k % WIRE_COLORS.length];
              c.globalAlpha = dimTrunk;
              c.lineWidth = 3;
              c.lineCap = "round";
              c.beginPath();
              c.moveTo(a.x, a.y);
              c.lineTo(b.x, b.y);
              c.stroke();
              c.globalAlpha = 1;
            },
          });
        }
      }
      /* trunk sheath rings */
      for (let i = 2; i <= 16; i += 3) {
        const p = pr(bez(START, add(START, [0.3, 0.06, 0]), add(JUNC, [-0.3, -0.04, 0]), JUNC, i / 18));
        items.push({
          d: p.d - 0.05,
          draw: () => {
            c.fillStyle = "rgba(15,19,24,.85)";
            c.beginPath();
            c.arc(p.x, p.y, 7.5, 0, 6.2832);
            c.fill();
          },
        });
      }

      /* branches */
      nodes = [];
      CIRCUITS.forEach((ci, idx) => {
        const [b0, b1, b2, b3] = branchCtrl(ci);
        const on = active === null || active === idx;
        const alpha = on ? 1 : 0.18;
        for (let k = 0; k < ci.wires; k++) {
          const off: V3 = [0, (k - (ci.wires - 1) / 2) * 0.02, (k - (ci.wires - 1) / 2) * 0.02];
          const pts: V3[] = [];
          for (let i = 0; i <= 22; i++) pts.push(add(bez(b0, b1, b2, b3, i / 22), off));
          const pp = pts.map(pr);
          const col = WIRE_COLORS[(idx + k * 2) % WIRE_COLORS.length];
          for (let i = 0; i < pp.length - 1; i++) {
            const a = pp[i];
            const b = pp[i + 1];
            items.push({
              d: (a.d + b.d) / 2,
              draw: () => {
                c.strokeStyle = col;
                c.globalAlpha = alpha;
                c.lineWidth = active === idx ? 3.4 : 2.4;
                c.lineCap = "round";
                c.beginPath();
                c.moveTo(a.x, a.y);
                c.lineTo(b.x, b.y);
                c.stroke();
                c.globalAlpha = 1;
              },
            });
          }
          /* signal pulses */
          const speed = 0.22 + (idx % 3) * 0.05;
          for (let n = 0; n < 2; n++) {
            let u = (t * speed + idx * 0.13 + k * 0.17 + n * 0.5) % 1;
            if (!ci.output) u = 1 - u;
            const pt = pr(add(bez(b0, b1, b2, b3, u), off));
            items.push({
              d: pt.d - 0.1,
              draw: () => {
                const g = c.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 9);
                const pc = ci.output ? ACCENT : TEAL;
                g.addColorStop(0, "rgba(255,255,255,.95)");
                g.addColorStop(0.35, pc);
                g.addColorStop(1, "rgba(255,255,255,0)");
                c.globalAlpha = alpha;
                c.fillStyle = g;
                c.beginPath();
                c.arc(pt.x, pt.y, 9, 0, 6.2832);
                c.fill();
                c.globalAlpha = 1;
              },
            });
          }
        }
        const np = pr(ci.at);
        nodes[idx] = { x: np.x, y: np.y };
        items.push({
          d: np.d - 0.2,
          draw: () => {
            c.globalAlpha = alpha;
            c.fillStyle = "#fff";
            c.strokeStyle = ci.output ? ACCENT : TEAL;
            c.lineWidth = active === idx ? 4 : 3;
            c.beginPath();
            c.arc(np.x, np.y, active === idx ? 11 : 8.5, 0, 6.2832);
            c.fill();
            c.stroke();
            c.fillStyle = "#0f1318";
            c.font = `${active === idx ? 700 : 600} 11px ${FM}`;
            c.textAlign = "left";
            c.fillText(ci.short, np.x + 14, np.y + 4);
            c.globalAlpha = 1;
          },
        });
      });

      items.sort((a, b) => b.d - a.d);
      items.forEach((it) => it.draw());

      /* ECU label */
      const el = pr([ECU_C[0], ECU_C[1] + ECU_H[1] + 0.12, ECU_C[2]]);
      c.fillStyle = "#0f1318";
      c.font = `700 12px ${FM}`;
      c.textAlign = "center";
      c.fillText("ECU", el.x, el.y);
      /* key */
      c.font = `500 11px ${FM}`;
      c.textAlign = "left";
      c.fillStyle = ACCENT;
      c.fillRect(14, H - 38, 10, 10);
      c.fillStyle = "#4b5560";
      c.fillText("ECU output", 30, H - 29);
      c.fillStyle = TEAL;
      c.fillRect(14, H - 20, 10, 10);
      c.fillStyle = "#4b5560";
      c.fillText("Sensor signal", 30, H - 11);
    }

    function loop(now: number) {
      FM = getComputedStyle(cv!).fontFamily || FM;
      if (visRef.current) draw(now);
      raf = requestAnimationFrame(loop);
    }

    function pick(e: PointerEvent) {
      const r = cv!.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      let best: number | null = null;
      let bd = 22;
      nodes.forEach((n, i) => {
        const d = Math.hypot(n.x - x, n.y - y);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      return best;
    }
    function onDown(e: PointerEvent) {
      dragging = true;
      moved = false;
      lx = e.clientX;
      ly = e.clientY;
      cv!.setPointerCapture(e.pointerId);
    }
    function onMove(e: PointerEvent) {
      if (dragging) {
        const dx = e.clientX - lx;
        const dy = e.clientY - ly;
        if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
        yawRef.current += dx * 0.01;
        pitchRef.current = clamp(pitchRef.current + dy * 0.006, 0.12, 1.1);
        lx = e.clientX;
        ly = e.clientY;
      } else {
        hovRef.current = pick(e);
      }
    }
    function onUp(e: PointerEvent) {
      dragging = false;
      if (!moved) {
        const hit = pick(e);
        setSel((prev) => (hit === null ? null : prev === hit ? null : hit));
      }
    }
    function onLeave() {
      hovRef.current = null;
    }
    function onKey(e: KeyboardEvent) {
      let used = true;
      if (e.key === "ArrowLeft") yawRef.current -= 0.12;
      else if (e.key === "ArrowRight") yawRef.current += 0.12;
      else if (e.key === "ArrowUp") pitchRef.current = clamp(pitchRef.current - 0.06, 0.12, 1.1);
      else if (e.key === "ArrowDown") pitchRef.current = clamp(pitchRef.current + 0.06, 0.12, 1.1);
      else used = false;
      if (used) e.preventDefault();
    }
    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerup", onUp);
    cv.addEventListener("pointercancel", onLeave);
    cv.addEventListener("pointerleave", onLeave);
    cv.addEventListener("keydown", onKey);
    const stop = watchVisible(cv, (v) => {
      visRef.current = v;
    });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerup", onUp);
      cv.removeEventListener("pointercancel", onLeave);
      cv.removeEventListener("pointerleave", onLeave);
      cv.removeEventListener("keydown", onKey);
      stop();
    };
  }, []);

  const current = sel === null ? null : CIRCUITS[sel];

  return (
    <div className={clsx("overflow-hidden border-2 border-foreground bg-white shadow-[8px_8px_0_var(--color-accent)]", plexMono.className)}>
      <canvas
        ref={cvRef}
        tabIndex={0}
        role="img"
        aria-label="Interactive 3D illustration of a wiring harness running from an ECU to nine engine circuits, with signal pulses travelling along the wires. Drag, or use the arrow keys, to rotate. Select a circuit below for details."
        className="block aspect-[1.1] w-full cursor-grab touch-pan-y focus-visible:outline-3 focus-visible:outline-offset-[-4px] focus-visible:outline-accent active:cursor-grabbing sm:aspect-[1.9]"
      />
      <div className="border-t border-border-strong bg-surface-2 px-4 py-3" aria-live="polite">
        <p className="min-h-[3rem] text-sm leading-relaxed text-foreground">
          {current ? (
            <>
              <strong>{current.name}.</strong> {current.note}
            </>
          ) : (
            <span className="text-foreground-muted">Pick a circuit to light up its wires, or drag to rotate. Illustration only.</span>
          )}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t-2 border-foreground bg-white px-3 py-3">
        {CIRCUITS.map((ci, i) => (
          <button
            key={ci.name}
            type="button"
            aria-pressed={sel === i}
            onClick={() => setSel((p) => (p === i ? null : i))}
            className={clsx(
              "min-h-11 cursor-pointer border-2 border-foreground px-3 text-xs font-medium uppercase tracking-wider focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent",
              sel === i ? "bg-foreground text-white" : "bg-white text-foreground hover:bg-surface-2"
            )}
          >
            {ci.short}
          </button>
        ))}
        <button
          type="button"
          aria-pressed={paused}
          onClick={toggleMotionPaused}
          className="ml-auto min-h-11 cursor-pointer border-2 border-foreground bg-white px-3 text-xs font-medium uppercase tracking-wider text-foreground hover:bg-surface-2 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent aria-pressed:bg-foreground aria-pressed:text-white"
        >
          {paused ? "Play motion" : "Pause motion"}
        </button>
      </div>
    </div>
  );
}
