"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { clamp, fitCanvas, makeProjector, watchVisible } from "./canvas-utils";
import { plexMono } from "./mono-font";
import { useStill } from "./motion";

const ROWS = 10;
const CELL_T = 0.5;
const ROW_DT = 0.035;
const HOLD1 = 0.5;
const TRACE = 5.2;
const HOLD2 = 1.6;
const DRAIN = 0.6;
const ACCENT_D = "#ff6a1f";
const PAGE = "#0d0d11";
const HEAD = "#2b2b31";
const INK = "#e9e9ed";
const MUTED = "#a9a8b0";
const HEAT_MAX = 84;

function ve(u: number, v: number) {
  const hump = Math.exp(-(((u - 0.55) * (u - 0.55)) / 0.05 + ((v - 0.72) * (v - 0.72)) / 0.08));
  const dip = Math.exp(-(((u - 0.15) * (u - 0.15)) / 0.03 + ((v - 0.9) * (v - 0.9)) / 0.05));
  return Math.round(clamp(22 + 50 * Math.pow(v, 0.85) * (0.62 + 0.38 * Math.sin(Math.PI * (0.12 + u * 0.82))) + 16 * hump - 9 * dip, 14, 108));
}

/** MoTeC M1 Tune style table spectrum: blue (low) through cyan, green, yellow to red (high). */
const SPECTRUM: [number, number, number, number][] = [
  [0, 36, 64, 214],
  [0.25, 34, 170, 226],
  [0.5, 64, 200, 96],
  [0.75, 244, 216, 56],
  [1, 232, 58, 40],
];

function heat(f: number): [number, number, number] {
  f = clamp(f, 0, 1);
  let k = 1;
  while (k < SPECTRUM.length - 1 && f > SPECTRUM[k][0]) k++;
  const a = SPECTRUM[k - 1];
  const b = SPECTRUM[k];
  const t = (f - a[0]) / (b[0] - a[0]);
  return [Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t), Math.round(a[3] + (b[3] - a[3]) * t)];
}

/** Black text on light cells, white on the deep blue and red ends. */
function inkOn(col: [number, number, number]) {
  const lum = 0.299 * col[0] + 0.587 * col[1] + 0.114 * col[2];
  return lum < 120 ? "#ffffff" : "#0b0b0d";
}

function ease(x: number) {
  x = clamp(x, 0, 1);
  return 1 - Math.pow(1 - x, 3);
}

export function FuelMap() {
  const tblRef = useRef<HTMLCanvasElement>(null);
  const surfRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<HTMLSpanElement>(null);
  const rpmRef = useRef<HTMLSpanElement>(null);
  const loadRef = useRef<HTMLSpanElement>(null);
  const veRef = useRef<HTMLSpanElement>(null);
  const still = useStill();
  const stillRef = useRef(false);
  const resetRef = useRef<() => void>(() => {});

  useEffect(() => {
    stillRef.current = still;
    resetRef.current();
  }, [still]);

  useEffect(() => {
    const tb = tblRef.current;
    const sv = surfRef.current;
    if (!tb || !sv) return;
    const tctx = tb.getContext("2d");
    const sctx = sv.getContext("2d");
    if (!tctx || !sctx) return;
    const c: CanvasRenderingContext2D = tctx;
    const sx: CanvasRenderingContext2D = sctx;

    let FM = getComputedStyle(tb).fontFamily || "monospace";
    const font = (weight: number | string, px: number) => `${weight} ${px}px ${FM}`;

    let cols = 12;
    let vals: number[][] = [];
    let dvm: number[][] = [];
    let rpms: number[] = [];
    let loads: number[] = [];
    let trail: [number, number][] = [];
    let trailRL: [number, number][] = [];
    let COL_DT = 0.38;
    let fillEnd = 5;
    let cycle = 13;
    let t = 0;
    let lastT = performance.now();
    let needInit = true;
    let visible = true;
    let raf = 0;
    let yawOff = 0;
    let pitchV = 0.86;
    let dragging = false;
    let lx0 = 0;
    let ly0 = 0;
    let lastTime = 0;

    function build() {
      cols = tb!.clientWidth < 430 ? 8 : 16;
      rpms = [];
      loads = [];
      vals = [];
      dvm = [];
      // 500 to 8000 rpm in 500 steps; narrow screens show the 1000 rpm steps only.
      for (let i = 0; i < cols; i++) rpms.push(cols === 16 ? 500 + i * 500 : 1000 + i * 1000);
      for (let j = 0; j < ROWS; j++) loads.push(20 + j * 20);
      for (let i = 0; i < cols; i++) {
        vals[i] = [];
        dvm[i] = [];
        for (let j = 0; j < ROWS; j++) {
          vals[i][j] = ve(i / (cols - 1), j / (ROWS - 1));
          dvm[i][j] = 0;
        }
      }
      COL_DT = 4.2 / (cols - 1);
      fillEnd = (cols - 1) * COL_DT + (ROWS - 1) * ROW_DT + CELL_T;
      cycle = fillEnd + HOLD1 + TRACE + HOLD2 + DRAIN;
      trail = [];
      trailRL = [];
    }

    function setText(el: HTMLSpanElement | null, text: string) {
      if (el && el.textContent !== text) el.textContent = text;
    }

    function drawTable(dpr: number, time: number) {
      const w = tb!.clientWidth;
      const h = tb!.clientHeight;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, w, h);
      c.fillStyle = PAGE;
      c.fillRect(0, 0, w, h);
      const padL = 50;
      const padT = 62;
      const padB = 50;
      const padR = 10;
      const cw = (w - padL - padR) / cols;
      const ch = (h - padT - padB) / ROWS;
      const drainStart = fillEnd + HOLD1 + TRACE + HOLD2;
      const drain = time > drainStart ? clamp((time - drainStart) / DRAIN, 0, 1) : 0;
      const filling = time < fillEnd;
      const curCol = filling ? clamp(Math.floor(time / COL_DT), 0, cols - 1) : -1;
      const fs = clamp(Math.min(cw * 0.36, ch * 0.62), 8, 13);
      c.textBaseline = "middle";
      c.font = font(600, clamp(fs, 9, 12));
      c.textAlign = "center";
      for (let i = 0; i < cols; i++) {
        c.fillStyle = HEAD;
        c.fillRect(padL + cw * i + 1, padT - 26, cw - 2, 23);
        c.fillStyle = filling && i === curCol ? ACCENT_D : INK;
        c.fillText(String(rpms[i]), padL + cw * (i + 0.5), padT - 14);
      }
      for (let j = 0; j < ROWS; j++) {
        c.fillStyle = HEAD;
        c.fillRect(6, padT + ch * j + 1, padL - 10, ch - 2);
      }
      c.textAlign = "right";
      c.fillStyle = INK;
      for (let j = 0; j < ROWS; j++) c.fillText(String(loads[j]), padL - 8, padT + ch * (j + 0.5));
      c.fillStyle = MUTED;
      c.font = font(500, 11);
      c.textAlign = "left";
      c.fillText("RPM >", padL, padT - 38);
      c.textAlign = "right";
      c.fillText("kPa", padL - 8, padT - 14);
      c.font = font(500, fs);
      c.textAlign = "center";
      const ct = time - (fillEnd + HOLD1);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < ROWS; j++) {
          const p = ease((time - (i * COL_DT + j * ROW_DT)) / CELL_T) * (1 - drain);
          const target = vals[i][j];
          dvm[i][j] = target * p;
          const col = heat((target / HEAT_MAX) * p);
          const x = padL + cw * i;
          const y = padT + ch * j;
          c.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`;
          c.fillRect(x, y, cw, ch);
          c.strokeStyle = PAGE;
          c.lineWidth = 1;
          c.strokeRect(x + 0.5, y + 0.5, cw - 1, ch - 1);
          c.fillStyle = inkOn(col);
          c.fillText(String(Math.round(target * p)), x + cw / 2, y + ch / 2 + 1);
        }
      }
      if (filling && curCol >= 0) {
        c.strokeStyle = ACCENT_D;
        c.lineWidth = 2.5;
        c.strokeRect(padL + cw * curCol + 1, padT + 1, cw - 2, ch * ROWS - 2);
      }
      let tracing = false;
      let r = 0;
      let l = 0;
      if (ct >= 0 && ct <= TRACE + HOLD2) {
        tracing = true;
        const u = clamp(ct / TRACE, 0, 1);
        const s = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
        r = 0.7 + s * (cols - 1 - 1.4);
        l = clamp(0.7 + (ROWS - 1.6) * Math.pow(s, 0.78) + Math.sin(s * 11) * 0.35 * (1 - s), 0, ROWS - 1);
        const px = padL + cw * (r + 0.5);
        const py = padT + ch * (l + 0.5);
        const lastPt = trail[trail.length - 1];
        if (ct <= TRACE && (!lastPt || Math.hypot(lastPt[0] - px, lastPt[1] - py) > 2)) {
          trail.push([px, py]);
          trailRL.push([r, l]);
        }
        if (trail.length > 90) {
          trail.shift();
          trailRL.shift();
        }
        const ci = clamp(Math.round(r), 0, cols - 1);
        const cj = clamp(Math.round(l), 0, ROWS - 1);
        const c0 = clamp(Math.floor(r), 0, cols - 2);
        const r0 = clamp(Math.floor(l), 0, ROWS - 2);
        c.strokeStyle = "rgba(0,0,0,.5)";
        c.lineWidth = 2;
        c.strokeRect(padL + cw * c0 + 1, padT + ch * r0 + 1, cw * 2 - 2, ch * 2 - 2);
        c.strokeStyle = "#000000";
        c.lineWidth = 3;
        c.strokeRect(padL + cw * ci + 1.5, padT + ch * cj + 1.5, cw - 3, ch - 3);
        c.lineJoin = "round";
        for (const [col, wd] of [["#000000", 4.5], ["#ffffff", 2]] as const) {
          c.strokeStyle = col;
          c.lineWidth = wd;
          c.beginPath();
          trail.forEach((pt, k) => {
            if (k) c.lineTo(pt[0], pt[1]);
            else c.moveTo(pt[0], pt[1]);
          });
          c.stroke();
        }
        c.fillStyle = "#fff";
        c.strokeStyle = "#000000";
        c.lineWidth = 3;
        c.beginPath();
        c.arc(px, py, 6, 0, 6.2832);
        c.fill();
        c.stroke();
        c.fillStyle = ACCENT_D;
        c.font = font(700, clamp(fs, 9, 12));
        c.textAlign = "center";
        c.fillText(String(rpms[ci]), padL + cw * (ci + 0.5), padT - 14);
        c.textAlign = "right";
        c.fillText(String(loads[cj]), padL - 8, padT + ch * (cj + 0.5));
        const rpmV = rpms[0] + (rpms[cols - 1] - rpms[0]) * (r / (cols - 1));
        const loadV = loads[0] + (loads[ROWS - 1] - loads[0]) * (l / (ROWS - 1));
        setText(rpmRef.current, String(Math.round(rpmV / 10) * 10));
        setText(loadRef.current, String(Math.round(loadV)));
        setText(veRef.current, String(vals[ci][cj]));
        setText(stateRef.current, "Tracing");
      } else if (filling) {
        setText(stateRef.current, "Filling");
        setText(rpmRef.current, String(rpms[curCol]));
        setText(loadRef.current, "-");
        setText(veRef.current, "-");
      } else if (drain > 0) {
        setText(stateRef.current, "Reset");
      } else if (time < fillEnd + HOLD1) {
        setText(stateRef.current, "Filled");
        setText(rpmRef.current, "-");
      }
      lastTime = time;
      drawSurface(time, tracing ? { r, l } : null, curCol);
    }

    function sample(u: number, v: number) {
      const x = u * (cols - 1);
      const y = v * (ROWS - 1);
      const i0 = Math.min(cols - 2, Math.floor(x));
      const j0 = Math.min(ROWS - 2, Math.floor(y));
      const fx = x - i0;
      const fy = y - j0;
      return (
        dvm[i0][j0] * (1 - fx) * (1 - fy) +
        dvm[i0 + 1][j0] * fx * (1 - fy) +
        dvm[i0][j0 + 1] * (1 - fx) * fy +
        dvm[i0 + 1][j0 + 1] * fx * fy
      );
    }

    function drawSurface(time: number, trac: { r: number; l: number } | null, curCol: number) {
      const fit = fitCanvas(sv!);
      const dpr = fit.dpr;
      const W = sv!.width;
      const H = sv!.height;
      sx.setTransform(1, 0, 0, 1, 0, 0);
      sx.clearRect(0, 0, W, H);
      const N = 26;
      const yaw = -0.72 + yawOff + (stillRef.current ? 0 : Math.sin(time * 0.3) * 0.3);
      const P = makeProjector(yaw, pitchV, 3.6);
      const sc = Math.min(W, H) * 0.3;
      const ox = W * 0.5;
      const oy = H * 0.58;
      const pr = (u: number, v: number, hv: number) => {
        const p = P((u - 0.5) * 2, (hv / 108) * 0.95 - 0.1, (v - 0.5) * 2);
        return { x: ox + p.x * sc, y: oy - p.y * sc, d: p.d, h: hv };
      };
      sx.strokeStyle = "rgba(255,255,255,.14)";
      sx.lineWidth = dpr;
      sx.beginPath();
      for (let i = 0; i <= N; i += 5) {
        const a = P((i / N - 0.5) * 2, -0.1, -1);
        const b = P((i / N - 0.5) * 2, -0.1, 1);
        const c1 = P(-1, -0.1, (i / N - 0.5) * 2);
        const d1 = P(1, -0.1, (i / N - 0.5) * 2);
        sx.moveTo(ox + a.x * sc, oy - a.y * sc);
        sx.lineTo(ox + b.x * sc, oy - b.y * sc);
        sx.moveTo(ox + c1.x * sc, oy - c1.y * sc);
        sx.lineTo(ox + d1.x * sc, oy - d1.y * sc);
      }
      sx.stroke();
      const pts: ReturnType<typeof pr>[][] = [];
      for (let i = 0; i <= N; i++) {
        pts[i] = [];
        for (let j = 0; j <= N; j++) pts[i][j] = pr(i / N, j / N, sample(i / N, j / N));
      }
      const faces: { A: ReturnType<typeof pr>; B: ReturnType<typeof pr>; C: ReturnType<typeof pr>; D: ReturnType<typeof pr>; h: number; d: number; sl: number }[] = [];
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const A = pts[i][j];
          const B = pts[i + 1][j];
          const C = pts[i + 1][j + 1];
          const D = pts[i][j + 1];
          faces.push({ A, B, C, D, h: (A.h + B.h + C.h + D.h) / 4, d: (A.d + B.d + C.d + D.d) / 4, sl: (C.h - A.h) * 0.05 + (B.h - D.h) * 0.025 });
        }
      }
      faces.sort((p1, p2) => p2.d - p1.d);
      for (const f of faces) {
        const col = heat(f.h / HEAT_MAX);
        const shade = 0.9 + clamp(f.sl, -0.18, 0.16);
        sx.beginPath();
        sx.moveTo(f.A.x, f.A.y);
        sx.lineTo(f.B.x, f.B.y);
        sx.lineTo(f.C.x, f.C.y);
        sx.lineTo(f.D.x, f.D.y);
        sx.closePath();
        sx.fillStyle = `rgb(${Math.min(255, Math.round(col[0] * shade))},${Math.min(255, Math.round(col[1] * shade))},${Math.min(255, Math.round(col[2] * shade))})`;
        sx.fill();
        sx.lineWidth = 0.6 * dpr;
        sx.strokeStyle = "rgba(0,0,0,.5)";
        sx.stroke();
      }
      if (curCol >= 0) {
        sx.strokeStyle = ACCENT_D;
        sx.lineWidth = 3 * dpr;
        sx.beginPath();
        for (let j = 0; j <= 20; j++) {
          const q = pr(curCol / (cols - 1), j / 20, sample(curCol / (cols - 1), j / 20));
          if (j) sx.lineTo(q.x, q.y);
          else sx.moveTo(q.x, q.y);
        }
        sx.stroke();
      }
      if (trac && trailRL.length > 1) {
        sx.lineJoin = "round";
        for (const [col, wd] of [["#000000", 5], ["#ffffff", 2.2]] as const) {
          sx.strokeStyle = col;
          sx.lineWidth = wd * dpr;
          sx.beginPath();
          trailRL.forEach((pt, i) => {
            const tu = pt[0] / (cols - 1);
            const tv = pt[1] / (ROWS - 1);
            const q = pr(tu, tv, sample(tu, tv) + 4);
            if (i) sx.lineTo(q.x, q.y);
            else sx.moveTo(q.x, q.y);
          });
          sx.stroke();
        }
        const cu = trac.r / (cols - 1);
        const cv2 = trac.l / (ROWS - 1);
        const cp = pr(cu, cv2, sample(cu, cv2) + 4);
        sx.fillStyle = "#fff";
        sx.strokeStyle = "#000000";
        sx.lineWidth = 3 * dpr;
        sx.beginPath();
        sx.arc(cp.x, cp.y, 7 * dpr, 0, 6.2832);
        sx.fill();
        sx.stroke();
      }
      sx.font = `500 ${11 * dpr}px ${FM}`;
      sx.fillStyle = MUTED;
      sx.textAlign = "center";
      const l1 = P(0, -0.1, -1.28);
      const l2 = P(1.28, -0.1, 0);
      sx.fillText("RPM >", ox + l1.x * sc, oy - l1.y * sc + 4 * dpr);
      sx.fillText("LOAD >", ox + l2.x * sc, oy - l2.y * sc + 4 * dpr);
      sx.textAlign = "start";
    }

    function loop(now: number) {
      const dt = Math.min(0.1, (now - lastT) / 1000);
      lastT = now;
      if (visible) {
        FM = getComputedStyle(tb!).fontFamily || FM;
        const fit = fitCanvas(tb!);
        if (fit.changed) needInit = true;
        if (needInit) {
          build();
          needInit = false;
          t = stillRef.current ? fillEnd + HOLD1 + TRACE * 0.62 : 0;
        }
        if (!stillRef.current) {
          t += dt;
          if (t >= cycle) {
            t = 0;
            trail = [];
            trailRL = [];
          }
        }
        drawTable(fit.dpr, t);
      }
      raf = requestAnimationFrame(loop);
    }

    function onDown(e: PointerEvent) {
      dragging = true;
      lx0 = e.clientX;
      ly0 = e.clientY;
      sv!.setPointerCapture(e.pointerId);
    }
    function onMove(e: PointerEvent) {
      if (!dragging) return;
      yawOff += (e.clientX - lx0) * 0.01;
      pitchV = clamp(pitchV + (e.clientY - ly0) * 0.006, 0.35, 1.3);
      lx0 = e.clientX;
      ly0 = e.clientY;
    }
    function onUp() {
      dragging = false;
    }
    function onKey(e: KeyboardEvent) {
      let used = true;
      if (e.key === "ArrowLeft") yawOff -= 0.12;
      else if (e.key === "ArrowRight") yawOff += 0.12;
      else if (e.key === "ArrowUp") pitchV = clamp(pitchV - 0.06, 0.35, 1.3);
      else if (e.key === "ArrowDown") pitchV = clamp(pitchV + 0.06, 0.35, 1.3);
      else used = false;
      if (used) e.preventDefault();
    }
    function onResize() {
      needInit = true;
    }

    resetRef.current = () => {
      needInit = true;
    };
    sv.addEventListener("pointerdown", onDown);
    sv.addEventListener("pointermove", onMove);
    sv.addEventListener("pointerup", onUp);
    sv.addEventListener("pointercancel", onUp);
    sv.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const stopWatch = watchVisible(tb, (v) => {
      visible = v;
    });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      sv.removeEventListener("pointerdown", onDown);
      sv.removeEventListener("pointermove", onMove);
      sv.removeEventListener("pointerup", onUp);
      sv.removeEventListener("pointercancel", onUp);
      sv.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      stopWatch();
      resetRef.current = () => {};
      void lastTime;
    };
  }, []);

  const tag = "absolute left-3 top-3 bg-accent px-2 py-1 text-xs font-medium uppercase tracking-wider text-accent-foreground";
  const chip = "border border-border-strong bg-surface px-2 py-1 text-xs font-medium uppercase tracking-wider tabular-nums";

  return (
    <div className={clsx("grid gap-8 lg:grid-cols-2", plexMono.className)}>
      <div className="relative overflow-hidden relative brackets border border-border-strong bg-surface">
        <canvas
          ref={tblRef}
          role="img"
          aria-label="Animated fuel map table. It starts at zero, fills with values one RPM column at a time, then traces an RPM and load path across the finished map."
          className="block aspect-[0.95] w-full bg-[#0d0d11] sm:aspect-[1.18]"
        />
        <span className={tag}>Fuel map / VE table / illustration</span>
        <span className={clsx(chip, "absolute right-3 top-3")}>
          State <strong ref={stateRef} className="text-accent-hover">Zeroed</strong>
        </span>
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap justify-between gap-2">
          <span className={chip}>
            RPM <strong ref={rpmRef} className="text-accent-hover">-</strong>
          </span>
          <span className={chip}>
            Load <strong ref={loadRef} className="text-accent-hover">-</strong> kPa
          </span>
          <span className={chip}>
            VE <strong ref={veRef} className="text-accent-hover">-</strong>
          </span>
        </div>
      </div>
      <div className="relative overflow-hidden relative brackets border border-border-strong bg-surface">
        <canvas
          ref={surfRef}
          tabIndex={0}
          role="img"
          aria-label="The same fuel map as a 3D surface. It rises as the table fills, then shows the RPM and load trace. Drag, or use the arrow keys, to rotate it."
          className="block aspect-[1.1] w-full cursor-grab touch-pan-y bg-[#0d0d11] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent active:cursor-grabbing"
        />
        <span className={tag}>Same map / 3D surface</span>
        <span className="absolute right-3 top-3 text-xs text-foreground-muted" aria-hidden>
          drag or use arrow keys
        </span>
      </div>
    </div>
  );
}
