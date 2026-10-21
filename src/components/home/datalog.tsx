"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { clamp, fitCanvas, watchVisible } from "./canvas-utils";
import { plexMono } from "./mono-font";
import { toggleMotionPaused, useMotionPaused, useStill } from "./motion";

/* ---------- simulation: a repeating 9 second pull ("lap") ---------- */

type Mode = "gen" | "pro";

type Sample = {
  rpm: number;
  boost: number;
  afr: number;
  timing: number;
  kr: number;
  k: number[];
  pk: number;
  tps: number;
  duty: number;
  iat: number;
  ect: number;
  oil: number;
  fp: number;
  fpq: number;
  egt: number;
};

type SimState = {
  rpm: number;
  boost: number;
  afr: number;
  kr: number;
  k: number[];
  tps: number;
  iat: number;
  ect: number;
  oil: number;
  fp: number;
  egt: number;
};

type Channel = {
  n: string;
  s: string;
  u: string;
  c: string;
  v: (r: Sample) => string;
  lim?: number;
  raw?: (r: Sample) => number;
};

type Lane = { y: [number, number]; ticks: [string, string]; ch: Channel[] };

const N = 600;
const DT = 1 / 60;
const TARGET = 20;
/** Each cylinder has its own knock limit and trace colour. */
const THR = [1.0, 1.3, 0.9, 1.15];
const CC = ["#e03131", "#1c7ed6", "#2f9e44", "#9c36b5"];
const ACCENT = "#cf5f1c";

const PAL = {
  bg: "#f2f2ee",
  panel: "#f7f7f4",
  line: "#cfd6dd",
  grid: "#e6eaee",
  txt: "#1f2328",
  mut: "#59636e",
  bar: "#e9edf1",
  list: "#f3f5f7",
};

function rnd(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function newState(): SimState {
  return { rpm: 2600, boost: 0, afr: 14.7, kr: 0, k: [0, 0, 0, 0], tps: 16, iat: 34, ect: 88, oil: 96, fp: 58, egt: 460 };
}

function laneDefs(narrow: boolean): Lane[] {
  const TOP = 50;
  const lanes: Lane[] = [
    {
      y: narrow ? [TOP, 148] : [TOP, 170],
      ticks: ["0", "30"],
      ch: [
        { n: "Boost Pressure", s: "Boost", u: "psi", c: ACCENT, v: (r) => r.boost.toFixed(1) },
        { n: "Engine Speed", s: "RPM", u: "rpm", c: "#6b7480", v: (r) => String(Math.round(r.rpm / 10) * 10) },
      ],
    },
    {
      y: narrow ? [154, 210] : [176, 230],
      ticks: ["9", "16"],
      ch: [{ n: "Air Fuel Ratio", s: "AFR", u: ":1", c: "#0e9f93", v: (r) => r.afr.toFixed(1) }],
    },
    {
      y: narrow ? [216, 282] : [236, 304],
      ticks: ["0", "40"],
      ch: [
        { n: "Ignition Timing", s: "Timing", u: "deg", c: "#c99a00", v: (r) => r.timing.toFixed(1) },
        { n: "Knock Retard", s: "Knk Ret", u: "deg", c: "#d62828", v: (r) => r.kr.toFixed(1) },
      ],
    },
    {
      y: narrow ? [288, 396] : [310, 402],
      ticks: ["0", "3"],
      ch: [0, 1, 2, 3].map((j) => ({
        n: `Knock Cyl ${j + 1}`,
        s: `Knock C${j + 1}`,
        u: "deg",
        c: CC[j],
        lim: THR[j],
        v: (r: Sample) => r.k[j].toFixed(2),
        raw: (r: Sample) => r.k[j],
      })),
    },
  ];
  if (!narrow) {
    lanes.push(
      {
        y: [408, 468],
        ticks: ["0", "100"],
        ch: [
          { n: "Throttle Position", s: "TPS", u: "%", c: "#2b3137", v: (r) => String(Math.round(r.tps)) },
          { n: "Injector Duty", s: "Duty", u: "%", c: "#d6336c", v: (r) => String(Math.round(r.duty)) },
        ],
      },
      {
        y: [474, 542],
        ticks: ["40", "110"],
        ch: [
          { n: "Intake Air Temp", s: "IAT", u: "C", c: "#1098ad", v: (r) => String(Math.round(r.iat)) },
          { n: "Coolant Temp", s: "ECT", u: "C", c: "#d97706", v: (r) => String(Math.round(r.ect)) },
          { n: "Oil Temp", s: "Oil", u: "C", c: "#7048e8", v: (r) => String(Math.round(r.oil)) },
        ],
      },
      {
        y: [548, 610],
        ticks: ["30", "90"],
        ch: [
          { n: "Fuel Pressure", s: "Fuel P", u: "psi", c: "#5c940d", v: (r) => r.fp.toFixed(0) },
          { n: "Fuel Press Req", s: "Fuel Req", u: "psi", c: "#2b3137", v: (r) => r.fpq.toFixed(0) },
        ],
      }
    );
  }
  return lanes;
}

export function Datalog() {
  const [expanded, setExpanded] = useState(true);
  const onToggleExpand = () => setExpanded((v) => !v);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("gen");
  const [knockBad, setKnockBad] = useState(false);
  const still = useStill();
  const paused = useMotionPaused();

  const modeRef = useRef<Mode>("gen");
  const stillRef = useRef(false);
  const resetRef = useRef<() => void>(() => {});
  const redrawRef = useRef<() => void>(() => {});
  const badRef = useRef(false);

  useEffect(() => {
    modeRef.current = mode;
    resetRef.current();
  }, [mode]);

  useEffect(() => {
    stillRef.current = still;
    resetRef.current();
  }, [still]);

  useEffect(() => {
    resetRef.current();
  }, [expanded]);

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const c: CanvasRenderingContext2D = ctx;

    let FM = getComputedStyle(cv).fontFamily || "monospace";
    const font = (weight: number | string, px: number) => `${weight} ${px}px ${FM}`;

    let VH = 640;
    let VW = 1000;
    let simT = 0;
    let acc = 0;
    let lastT = performance.now();
    let needStatic = true;
    let needDraw = false;
    let visible = true;
    let raf = 0;
    let st = newState();
    const buf: Sample[] = [];
    let cx = -1;
    let hov = false;
    let X0 = 130;
    let X1 = 700;
    let CW = 120;

    function resetSim() {
      st = newState();
      buf.length = 0;
      simT = 0;
    }

    function sample(dt: number) {
      const mode = modeRef.current;
      simT += dt;
      const cc = simT % 9;
      const pull = cc >= 1.4 && cc < 7;
      const u = pull ? (cc - 1.4) / 5.6 : cc >= 7 ? 1 : 0;
      const rpmT = cc < 1.4 ? 2600 : pull ? 2600 + u * 4900 : 2600;
      const boostT = pull ? TARGET - 1.5 * u : 0;
      st.rpm += (rpmT - st.rpm) * Math.min(1, dt * (pull ? 5 : 2.2));
      st.boost += (boostT - st.boost) * Math.min(1, dt * (pull ? (mode === "gen" ? 4.2 : 3.2) : 6));
      let boost = st.boost;
      if (mode === "gen" && pull && u < 0.45) boost += Math.max(0, 3.8 * Math.exp(-(cc - 2.4) * (cc - 2.4) * 2.5)) + Math.sin(cc * 9) * 0.5;
      if (mode === "pro") boost += Math.sin(cc * 7) * 0.12;
      boost += rnd(-0.15, 0.15);
      const afrT = boost > 2 ? (mode === "gen" ? 11.6 + 1.3 * u * u + (u > 0.8 ? 0.5 : 0) : 11.5) : 14.7;
      st.afr += (afrT - st.afr) * Math.min(1, dt * 7);
      const afr = st.afr + rnd(-0.08, 0.08) * (mode === "gen" ? 2.2 : 1);
      let peak = 0;
      if (mode === "gen" && pull && u > 0.2 && Math.random() < dt * 1.9) {
        const cyl = (Math.random() * 4) | 0;
        const mag = rnd(0.95, 4.8);
        st.k[cyl] = Math.max(st.k[cyl], mag);
        st.kr = Math.max(st.kr, mag * 0.85);
      }
      if (mode === "pro" && pull && Math.random() < dt * 1.2) {
        const cy = (Math.random() * 4) | 0;
        st.k[cy] = Math.max(st.k[cy], rnd(0.1, 0.45));
      }
      for (let i = 0; i < 4; i++) {
        st.k[i] = Math.max(0, st.k[i] - dt * 5.5);
        peak = Math.max(peak, st.k[i] / THR[i]);
      }
      st.kr = Math.max(0, st.kr - dt * 1.4);
      const base = cc < 1.4 || cc >= 7 ? 32 : mode === "gen" ? 24.5 - 0.22 * boost : 21.5 - 0.18 * boost;
      const timing = base - st.kr + rnd(-0.1, 0.1);
      const tpsT = cc < 1.4 ? 16 : pull ? 100 : cc < 7.4 ? 2 : 5;
      st.tps += (tpsT - st.tps) * Math.min(1, dt * (pull ? 10 : 7));
      const duty = clamp(7 + (st.rpm / 8000) * 58 * (0.42 + Math.max(0, boost) / 26) * (mode === "gen" ? 1.1 : 1), 0, 100) + rnd(-0.5, 0.5);
      st.iat += (34 + Math.max(0, boost) * 0.85 + (mode === "gen" ? 3 : 0) + (pull ? u * 7 : 0) - st.iat) * Math.min(1, dt * 0.5);
      st.ect += (88 + (pull ? u * 4 * (mode === "gen" ? 1.4 : 1) : 0) + (cc >= 7 ? 2 : 0) - st.ect) * Math.min(1, dt * 0.25);
      st.oil += (96 + (pull ? u * 5 : cc >= 7 ? 3 : 0) - st.oil) * Math.min(1, dt * 0.2);
      const fpq = 58 + Math.max(0, boost);
      const sag = mode === "gen" ? (pull && u > 0.55 ? (u - 0.55) * 20 : 0) : pull && u > 0.8 ? (u - 0.8) * 3 : 0;
      st.fp += (fpq - sag - st.fp) * Math.min(1, dt * 6);
      st.egt += ((pull ? 640 + u * 230 + (mode === "gen" ? 40 + u * 30 : 0) : cc >= 7 ? 560 : 460) - st.egt) * Math.min(1, dt * 0.6);
      buf.push({
        rpm: st.rpm,
        boost,
        afr,
        timing,
        kr: st.kr,
        k: st.k.slice(),
        pk: peak,
        tps: st.tps,
        duty,
        iat: st.iat,
        ect: st.ect,
        oil: st.oil,
        fp: st.fp + rnd(-0.3, 0.3),
        fpq,
        egt: st.egt,
      });
      if (buf.length > N) buf.shift();
    }
    function prefill() {
      resetSim();
      for (let i = 0; i < N + 10; i++) sample(DT);
    }
    function staticFill() {
      resetSim();
      for (let i = 0; i < ((8.2 / DT) | 0); i++) sample(DT);
    }

    const px = (i: number) => X0 + (i / (N - 1)) * (X1 - X0);
    const ypos = (l: [number, number], v: number, a: number, b: number) => l[1] - ((clamp(v, a, b) - a) / (b - a)) * (l[1] - l[0]);
    const absX = (tt: number) => px(N - 1 - (simT - tt) / DT);

    function trace(l: [number, number], a: number, b: number, get: (s: Sample) => number, col: string, w: number, dash?: number[]) {
      c.beginPath();
      for (let i = 0; i < buf.length; i++) {
        const x = px(i + (N - buf.length));
        const y = ypos(l, get(buf[i]), a, b);
        if (i) c.lineTo(x, y);
        else c.moveTo(x, y);
      }
      c.strokeStyle = col;
      c.lineWidth = w;
      c.setLineDash(dash ?? []);
      c.lineJoin = "round";
      c.stroke();
      c.setLineDash([]);
    }

    function draw() {
      const narrow = cv!.clientWidth < 640;
      VH = narrow ? 440 : 640;
      const k = cv!.height / VH;
      c.setTransform(k, 0, 0, k, 0, 0);
      VW = VH * (cv!.clientWidth / Math.max(1, cv!.clientHeight));
      CW = narrow ? 118 : 214;
      X0 = CW + 8;
      X1 = VW - (narrow ? 8 : 176);
      const LS = laneDefs(narrow);
      const last = LS[LS.length - 1].y;
      const mode = modeRef.current;
      c.fillStyle = PAL.bg;
      c.fillRect(0, 0, VW, VH);
      /* title bar */
      const lap = Math.floor(simT / 9) + 1;
      c.fillStyle = PAL.bar;
      c.fillRect(0, 0, VW, 24);
      c.font = font(600, 11);
      c.textAlign = "left";
      c.fillStyle = PAL.txt;
      c.fillText(narrow ? `pull_03.ld   Lap ${lap}` : `Datalog analyser  /  pull_03.ld  /  Lap ${lap}  /  ${mode === "gen" ? "GENERIC FILE" : "STREET PRO MAP"}`, 10, 16);
      /* time ruler */
      c.fillStyle = "#f0f2f4";
      c.fillRect(X0, 26, X1 - X0, 20);
      c.fillStyle = PAL.mut;
      c.font = font(500, 10);
      c.fillText("Time", 10, 40);
      const t0 = Math.floor(simT);
      c.textAlign = "center";
      for (let i = 0; i <= 11; i++) {
        const tt = t0 - i;
        const x = absX(tt);
        if (x < X0 || x > X1) continue;
        c.strokeStyle = "#9aa4ae";
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(x, 38);
        c.lineTo(x, 46);
        c.stroke();
        c.fillStyle = PAL.mut;
        c.fillText(tt >= 0 ? `${tt} s` : "", x, 35);
      }
      /* lane panels + grids + channel list backgrounds */
      for (let i = 0; i < LS.length; i++) {
        const l = LS[i].y;
        c.fillStyle = PAL.panel;
        c.fillRect(X0, l[0], X1 - X0, l[1] - l[0]);
        c.strokeStyle = PAL.grid;
        c.lineWidth = 1;
        c.beginPath();
        for (let j = 1; j < 4; j++) {
          const gy = l[0] + ((l[1] - l[0]) * j) / 4;
          c.moveTo(X0, gy);
          c.lineTo(X1, gy);
        }
        for (let j = 0; j <= 11; j++) {
          const gx = absX(t0 - j);
          if (gx >= X0 && gx <= X1) {
            c.moveTo(gx, l[0]);
            c.lineTo(gx, l[1]);
          }
        }
        c.stroke();
        c.strokeStyle = PAL.line;
        c.strokeRect(X0 + 0.5, l[0] + 0.5, X1 - X0 - 1, l[1] - l[0] - 1);
        c.fillStyle = PAL.list;
        c.fillRect(0, l[0], CW, l[1] - l[0]);
        c.strokeRect(0.5, l[0] + 0.5, CW - 1, l[1] - l[0] - 1);
        c.fillStyle = PAL.mut;
        c.font = font(500, 9);
        c.textAlign = "left";
        c.fillText(LS[i].ticks[1], X0 + 4, l[0] + 11);
        c.fillText(LS[i].ticks[0], X0 + 4, l[1] - 4);
      }
      /* lap markers */
      const lapNow = Math.floor(simT / 9);
      for (let lk = lapNow; lk >= 0 && lk > lapNow - 3; lk--) {
        const lx = absX(lk * 9);
        if (lx < X0 || lx > X1) continue;
        c.strokeStyle = "#c2255c";
        c.lineWidth = 1.2;
        c.setLineDash([3, 3]);
        c.beginPath();
        c.moveTo(lx, 26);
        c.lineTo(lx, last[1]);
        c.stroke();
        c.setLineDash([]);
        c.fillStyle = "#c2255c";
        c.font = font(700, 10);
        c.textAlign = "left";
        c.fillText(`LAP ${lk + 1}`, lx + 4, 36);
      }
      /* traces */
      const L1 = LS[0].y;
      const L2 = LS[1].y;
      const L3 = LS[2].y;
      const L4 = LS[3].y;
      trace(L1, 0, 8000, (s) => s.rpm, "#6b7480", 1.3);
      c.strokeStyle = "rgba(73,80,87,.7)";
      c.lineWidth = 1.1;
      c.setLineDash([6, 5]);
      c.beginPath();
      const ty = ypos(L1, TARGET, 0, 30);
      c.moveTo(X0, ty);
      c.lineTo(X1, ty);
      c.stroke();
      c.setLineDash([]);
      c.fillStyle = "#495057";
      c.font = font(500, 9);
      c.textAlign = "right";
      c.fillText(`TARGET ${TARGET}`, X1 - 5, ty - 4);
      trace(L1, 0, 30, (s) => s.boost, ACCENT, 2);
      const by1 = ypos(L2, 11.8, 9, 16);
      const by2 = ypos(L2, 11.0, 9, 16);
      c.fillStyle = "rgba(14,159,147,.12)";
      c.fillRect(X0 + 1, by1, X1 - X0 - 2, by2 - by1);
      trace(L2, 9, 16, (s) => s.afr, "#0e9f93", 1.7);
      for (let i = 0; i < buf.length; i++) {
        const sb = buf[i];
        if (sb.kr > 0.05) {
          const kx = px(i + (N - buf.length));
          const yt = ypos(L3, sb.kr * 3.2, 0, 40);
          c.fillStyle = sb.kr > 1 ? "rgba(214,40,40,.7)" : "rgba(214,40,40,.38)";
          c.fillRect(kx - 1, yt, 2.4, L3[1] - yt);
        }
      }
      trace(L3, 0, 40, (s) => s.timing, "#c99a00", 1.8);
      const kmax = 3;
      for (let j2 = 0; j2 < 4; j2++) {
        const ty3 = ypos(L4, THR[j2], 0, kmax);
        c.strokeStyle = CC[j2];
        c.globalAlpha = 0.8;
        c.lineWidth = 1;
        c.setLineDash([6, 5]);
        c.beginPath();
        c.moveTo(X0, ty3);
        c.lineTo(X1, ty3);
        c.stroke();
        c.setLineDash([]);
        c.globalAlpha = 1;
      }
      for (let j2 = 0; j2 < 4; j2++) {
        trace(L4, 0, kmax, (s) => s.k[j2], CC[j2], 1.5);
        for (let i = 0; i < buf.length; i++) {
          const kv = buf[i].k[j2];
          if (kv > THR[j2]) {
            const ex2 = px(i + (N - buf.length));
            const ey2 = ypos(L4, kv, 0, kmax);
            c.fillStyle = "#fff";
            c.beginPath();
            c.arc(ex2, ey2, 2.2, 0, 6.2832);
            c.fill();
            c.strokeStyle = CC[j2];
            c.lineWidth = 1.3;
            c.stroke();
          }
        }
      }
      if (!narrow) {
        trace(LS[4].y, 0, 100, (s) => s.tps, "#2b3137", 1.5);
        trace(LS[4].y, 0, 100, (s) => s.duty, "#d6336c", 1.7);
        trace(LS[5].y, 40, 110, (s) => s.iat, "#1098ad", 1.6);
        trace(LS[5].y, 40, 110, (s) => s.ect, "#d97706", 1.6);
        trace(LS[5].y, 40, 110, (s) => s.oil, "#7048e8", 1.6);
        trace(LS[6].y, 30, 90, (s) => s.fpq, "rgba(73,80,87,.8)", 1.2, [6, 5]);
        trace(LS[6].y, 30, 90, (s) => s.fp, "#5c940d", 1.9);
      }
      /* cursor */
      let idx = buf.length - 1;
      let haveCur = false;
      if (hov && cx >= X0 && cx <= X1) {
        idx = clamp(Math.round(((cx - X0) / (X1 - X0)) * (N - 1)) - (N - buf.length), 0, buf.length - 1);
        haveCur = true;
      }
      const rs: Sample = buf[idx] ?? buf[buf.length - 1] ?? {
        rpm: 0, boost: 0, afr: 14.7, timing: 30, kr: 0, k: [0, 0, 0, 0], pk: 0, tps: 0, duty: 0, iat: 0, ect: 0, oil: 0, fp: 0, fpq: 0, egt: 0,
      };
      if (haveCur) {
        const cxp = px(idx + (N - buf.length));
        c.strokeStyle = "#0f1318";
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(cxp, 26);
        c.lineTo(cxp, last[1]);
        c.stroke();
        const ct = (idx - (buf.length - 1)) * DT;
        c.fillStyle = "#0f1318";
        c.fillRect(cxp - 26, 24, 52, 14);
        c.fillStyle = "#ffffff";
        c.font = font(700, 10);
        c.textAlign = "center";
        c.fillText(`${ct.toFixed(2)} s`, cxp, 34);
        const dots: [[number, number], number, number, number, string][] = [
          [L1, 0, 30, rs.boost, ACCENT],
          [L2, 9, 16, rs.afr, "#0e9f93"],
          [L3, 0, 40, rs.timing, "#c99a00"],
        ];
        for (const d of dots) {
          c.fillStyle = d[4];
          c.beginPath();
          c.arc(cxp, ypos(d[0], d[3], d[1], d[2]), 3.2, 0, 6.2832);
          c.fill();
        }
        for (let j2 = 0; j2 < 4; j2++) {
          c.fillStyle = CC[j2];
          c.beginPath();
          c.arc(cxp, ypos(L4, rs.k[j2], 0, kmax), 3, 0, 6.2832);
          c.fill();
        }
      }
      /* channel list with values at the cursor */
      const rowH = narrow ? 15 : 17;
      for (let i = 0; i < LS.length; i++) {
        const lt = LS[i].y[0];
        for (let j = 0; j < LS[i].ch.length; j++) {
          const ch = LS[i].ch[j];
          const ry = lt + 13 + j * rowH;
          c.fillStyle = ch.c;
          c.fillRect(7, ry - 8, 8, 8);
          c.font = font(500, narrow ? 9.5 : 11);
          c.textAlign = "left";
          c.fillStyle = PAL.txt;
          c.fillText(narrow ? ch.s : ch.n, 20, ry);
          const over = ch.raw && ch.lim !== undefined ? ch.raw(rs) > ch.lim : false;
          c.textAlign = "right";
          c.fillStyle = over ? "#d62828" : ch.c;
          c.font = font(700, narrow ? 10 : 12);
          c.fillText(ch.v(rs), CW - (narrow ? 5 : 34), ry);
          if (!narrow) {
            c.fillStyle = PAL.mut;
            c.font = font(500, 9);
            c.textAlign = "left";
            c.fillText(ch.u, CW - 30, ry);
          }
        }
      }
      /* knock state for the chip */
      let bad = false;
      for (let i = Math.max(0, buf.length - 180); i < buf.length; i++) if (buf[i].pk > 1) bad = true;
      if (bad !== badRef.current) {
        badRef.current = bad;
        setKnockBad(bad);
      }
      c.textAlign = "right";
      c.fillStyle = haveCur ? "#0f1318" : "#1a7f37";
      c.font = font(700, 10);
      c.fillText(haveCur ? "CURSOR" : "LIVE", VW - 10, 16);
      c.fillStyle = PAL.mut;
      c.font = font(500, 10);
      c.textAlign = "left";
      c.fillText("-10 s", X0, last[1] + 15);
      c.textAlign = "right";
      c.fillText("now", X1, last[1] + 15);
      if (narrow) return;
      /* right widget: knock bars + last-10-seconds summary */
      const TOP = 50;
      const RX = X1 + 10;
      const RW = VW - RX - 8;
      c.fillStyle = PAL.list;
      c.fillRect(RX, TOP, RW, 300);
      c.strokeStyle = PAL.line;
      c.strokeRect(RX + 0.5, TOP + 0.5, RW - 1, 299);
      c.fillStyle = PAL.txt;
      c.font = font(600, 10);
      c.textAlign = "left";
      c.fillText("KNOCK / CYLINDER", RX + 8, TOP + 16);
      const bw = 24;
      const gap = 9;
      const bx = RX + 12;
      const bt = TOP + 30;
      const bb = TOP + 150;
      for (let j = 0; j < 4; j++) {
        const v = rs.k[j];
        const h = clamp(v / 3, 0, 1) * (bb - bt);
        const x2 = bx + j * (bw + gap);
        c.fillStyle = "#e3e8ec";
        c.fillRect(x2, bt, bw, bb - bt);
        c.fillStyle = v > THR[j] ? "#e03131" : "#2f9e44";
        c.fillRect(x2, bb - h, bw, h);
        const ty4 = bb - (THR[j] / 3) * (bb - bt);
        c.strokeStyle = CC[j];
        c.lineWidth = 2.2;
        c.beginPath();
        c.moveTo(x2 - 3, ty4);
        c.lineTo(x2 + bw + 3, ty4);
        c.stroke();
        c.fillStyle = PAL.mut;
        c.font = font(500, 9);
        c.textAlign = "center";
        c.fillText(`C${j + 1}`, x2 + bw / 2, bb + 12);
      }
      c.fillStyle = PAL.mut;
      c.font = font(500, 9);
      c.textAlign = "left";
      c.fillText("tick = cylinder limit", RX + 8, bb + 26);
      let mb = 0;
      let md = 0;
      let me = 0;
      let pk = 0;
      let mfp = 999;
      for (const b of buf) {
        mb = Math.max(mb, b.boost);
        md = Math.max(md, b.duty);
        me = Math.max(me, b.egt);
        pk = Math.max(pk, ...b.k);
        mfp = Math.min(mfp, b.fp);
      }
      const sum: [string, string, string][] = [
        ["Max boost", `${mb.toFixed(1)} psi`, ACCENT],
        ["Peak knock", `${pk.toFixed(1)} deg`, pk > 0.9 ? "#d62828" : "#2f9e44"],
        ["Max duty", `${Math.round(md)} %`, "#d6336c"],
        ["Max EGT", `${Math.round(me / 5) * 5} C`, "#d97706"],
        ["Min fuel P", `${mfp.toFixed(0)} psi`, "#5c940d"],
      ];
      c.fillStyle = PAL.txt;
      c.font = font(600, 10);
      c.textAlign = "left";
      c.fillText("LAST 10 S", RX + 8, bb + 48);
      for (let j = 0; j < sum.length; j++) {
        const sy = bb + 66 + j * 18;
        c.fillStyle = PAL.mut;
        c.font = font(500, 10);
        c.textAlign = "left";
        c.fillText(sum[j][0], RX + 8, sy);
        c.fillStyle = sum[j][2];
        c.font = font(700, 11);
        c.textAlign = "right";
        c.fillText(sum[j][1], RX + RW - 8, sy);
      }
    }

    function loop(now: number) {
      const dt = Math.min(0.1, (now - lastT) / 1000);
      lastT = now;
      if (visible) {
        FM = getComputedStyle(cv!).fontFamily || FM;
        const fit = fitCanvas(cv!);
        if (fit.changed) needStatic = true;
        if (stillRef.current) {
          if (needStatic) {
            staticFill();
            needStatic = false;
            needDraw = true;
          }
          if (needDraw) {
            draw();
            needDraw = false;
          }
        } else {
          if (needStatic) {
            prefill();
            needStatic = false;
          }
          acc += dt;
          let n = 0;
          while (acc >= DT && n < 6) {
            sample(DT);
            acc -= DT;
            n++;
          }
          draw();
        }
      }
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: PointerEvent) {
      const r = cv!.getBoundingClientRect();
      cx = ((e.clientX - r.left) / r.width) * VW;
      hov = true;
      needDraw = true;
    }
    function onLeave() {
      hov = false;
      needDraw = true;
    }
    function onResize() {
      needStatic = true;
    }

    resetRef.current = () => {
      needStatic = true;
    };
    redrawRef.current = () => {
      needDraw = true;
    };
    stillRef.current = stillRef.current;
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    const stopWatch = watchVisible(cv, (v) => {
      visible = v;
    });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      stopWatch();
      resetRef.current = () => {};
      redrawRef.current = () => {};
    };
  }, []);

  return (
    <div className={clsx("overflow-hidden rounded-xl relative brackets border border-border-strong bg-surface", plexMono.className)}>
      <canvas
        ref={cvRef}
        role="img"
        aria-label="Animated engine datalog comparing a generic file with a Street PRO map. It plots boost against target, air-fuel ratio, ignition timing, knock for each cylinder, throttle, injector duty, temperatures and fuel pressure over a pull. Illustrative only."
        className={clsx("block [filter:invert(1)_hue-rotate(180deg)] w-full cursor-crosshair touch-pan-y", expanded ? "aspect-[1.1] sm:aspect-[1.6]" : "aspect-[1.1] sm:aspect-[1.5]")}
      />
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-border-strong bg-surface px-3 py-2.5">
        <span className="border border-border-strong px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground">
          Knock{" "}
          <strong className={knockBad ? "text-[#ff6b6b]" : "text-[#3ccf7a]"}>{knockBad ? "Detected" : "Clean"}</strong>
        </span>
        <p className="min-w-[200px] flex-1 text-[13px] leading-snug text-foreground-muted">
          Same pull, two tunes. Illustrative simulation, not real car data. Hover the graph to scrub.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Tune comparison" className="inline-flex border border-border-strong">
            {(
              [
                ["gen", "Generic file"],
                ["pro", "Street PRO map"],
              ] as const
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={clsx(
                  "min-h-11 cursor-pointer px-4 font-display text-base tracking-wider focus-visible:outline-3 focus-visible:outline-offset-[-5px] focus-visible:outline-accent",
                  mode === m ? "bg-accent text-accent-foreground" : "bg-transparent text-foreground-muted hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={expanded}
            onClick={onToggleExpand}
            className="min-h-11 cursor-pointer border border-border-strong px-3.5 font-display text-base tracking-wider text-foreground hover:bg-surface-2 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent aria-pressed:bg-accent aria-pressed:text-accent-foreground"
          >
            {expanded ? "Shrink datalog" : "Expand datalog"}
          </button>
          <button
            type="button"
            aria-pressed={paused}
            onClick={toggleMotionPaused}
            className="min-h-11 cursor-pointer border border-border-strong px-3.5 text-xs font-medium uppercase tracking-wider text-foreground hover:bg-surface-2 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent aria-pressed:bg-accent aria-pressed:text-accent-foreground"
          >
            {paused ? "Play motion" : "Pause motion"}
          </button>
        </div>
      </div>
    </div>
  );
}
