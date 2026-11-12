import type { ReactNode } from "react";

/**
 * Generic wiring diagrams for the custom-wiring page. These are original
 * illustrations of common good practice, drawn as inline SVG so they stay
 * sharp, add no image requests and follow the site's colour tokens. They are
 * not a specific vehicle, ECU or pinout, and the page labels them as such.
 */

const C = {
  bg: "var(--color-background)",
  surface: "var(--color-surface)",
  surface2: "var(--color-surface-2)",
  line: "var(--color-border-strong)",
  fg: "var(--color-foreground)",
  muted: "var(--color-foreground-muted)",
  subtle: "var(--color-foreground-subtle)",
  accent: "var(--color-accent)",
};

/** Wire colours. Illustrative: they follow common convention, not a real loom. */
const W = {
  pos: "#ef4444",
  gnd: "#a1a1aa",
  sig: "#e4e4e7",
  ref: "#facc15",
  grn: "#3ccf7a",
  blu: "#38bdf8",
  out: "#ff6a1f",
};

function Frame({
  name,
  viewBox,
  title,
  desc,
  children,
}: {
  name: string;
  viewBox: string;
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <svg viewBox={viewBox} role="img" aria-labelledby={`${name}-t ${name}-d`} className="block h-auto w-full">
      <title id={`${name}-t`}>{title}</title>
      <desc id={`${name}-d`}>{desc}</desc>
      {children}
    </svg>
  );
}

function T({
  x,
  y,
  size = 13,
  fill = C.fg,
  anchor = "start",
  spacing,
  weight,
  children,
}: {
  x: number;
  y: number;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  spacing?: number;
  weight?: number;
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={fill}
      textAnchor={anchor}
      letterSpacing={spacing}
      fontWeight={weight}
      className="font-mono-tech"
    >
      {children}
    </text>
  );
}

function Wire({ d, color, w = 2.5, dash }: { d: string; color: string; w?: number; dash?: string }) {
  return (
    <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash} />
  );
}

function Dot({ x, y, color, r = 3.5 }: { x: number; y: number; color: string; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill={color} />;
}

/** Two wires twisted around each other, as a twisted pair is drawn. */
function twist(x1: number, x2: number, y: number, amp = 5, period = 22) {
  const half = period / 2;
  let a = `M${x1},${y}`;
  let b = `M${x1},${y}`;
  let s = 1;
  for (let x = x1; x + half <= x2; x += half) {
    a += ` Q${x + half / 2},${y - 2 * amp * s} ${x + half},${y}`;
    b += ` Q${x + half / 2},${y + 2 * amp * s} ${x + half},${y}`;
    s = -s;
  }
  return { a, b };
}

/* ------------------------------------------------------------------ */
/* 1. Hero: standalone ECU harness overview                            */
/* ------------------------------------------------------------------ */

export function EcuHarnessDiagram() {
  const left = [
    { y: 58, t: "Power & grounds", s: "BAT+ · IGN · GND", c: [W.pos, W.gnd, W.sig] },
    { y: 168, t: "Crank & cam", s: "trigger inputs", c: [W.sig, W.gnd, W.blu] },
    { y: 278, t: "Sensors", s: "CLT IAT TPS MAP", c: [W.ref, W.sig, W.grn] },
  ];
  const right = [
    { y: 58, t: "Injectors", s: "low-side drive", c: [W.out, W.out, W.out] },
    { y: 168, t: "Ignition coils", s: "coil triggers", c: [W.out, W.out, W.out] },
    { y: 278, t: "Relays & aux", s: "pump fan boost", c: [W.out, W.out, W.out] },
  ];

  return (
    <Frame
      name="ecu-harness"
      viewBox="0 0 480 400"
      title="Standalone ECU harness overview"
      desc="Generic diagram of a standalone ECU with its harness groups: power and grounds, crank and cam triggers and sensors on the input side, and injectors, ignition coils and relays on the output side."
    >
      <T x={8} y={18} size={11} fill={C.subtle} spacing={2}>
        INPUTS
      </T>
      <T x={472} y={18} size={11} fill={C.subtle} spacing={2} anchor="end">
        OUTPUTS
      </T>

      {/* ECU */}
      <rect x={185} y={28} width={110} height={344} rx={3} fill={C.surface2} stroke={C.accent} strokeWidth={1.5} />
      <text x={240} y={66} textAnchor="middle" fontSize={36} fill={C.fg} className="font-display">
        ECU
      </text>
      <T x={240} y={84} size={10} fill={C.muted} anchor="middle" spacing={2}>
        STANDALONE
      </T>
      <line x1={197} y1={134} x2={283} y2={134} stroke={C.line} />
      <line x1={197} y1={244} x2={283} y2={244} stroke={C.line} />
      <rect x={205} y={300} width={70} height={52} rx={2} fill={C.surface} stroke={C.line} />
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2, 3].map((c) => <circle key={`${r}-${c}`} cx={217 + c * 17} cy={314 + r * 14} r={3} fill={C.subtle} />)
      )}

      {[...left.map((g) => ({ ...g, side: "l" as const })), ...right.map((g) => ({ ...g, side: "r" as const }))].map((g) => {
        const yc = g.y + 32;
        const boxX = g.side === "l" ? 8 : 322;
        const wireFrom = g.side === "l" ? 158 : 295;
        const wireTo = g.side === "l" ? 185 : 322;
        const plugX = g.side === "l" ? 166 : 304;
        return (
          <g key={`${g.side}-${g.t}`}>
            <rect x={boxX} y={g.y} width={150} height={64} rx={3} fill={C.surface} stroke={C.line} />
            <T x={boxX + 12} y={g.y + 27} size={15} weight={600}>
              {g.t}
            </T>
            <T x={boxX + 12} y={g.y + 47} size={11} fill={C.muted}>
              {g.s}
            </T>
            {g.c.map((color, i) => (
              <Wire key={i} d={`M${wireFrom},${yc + (i - 1) * 10} H${wireTo}`} color={color} />
            ))}
            <rect x={plugX} y={yc - 17} width={10} height={34} rx={2} fill={C.surface2} stroke={C.line} />
          </g>
        );
      })}
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Power distribution                                               */
/* ------------------------------------------------------------------ */

export function PowerDiagram() {
  const rows = [
    { y: 80, relay: "MAIN RELAY", note: "switched by ignition", l1: "ECU · COILS", l2: "INJECTORS", dash: undefined },
    { y: 152, relay: "FUEL PUMP RELAY", note: "triggered by ECU output", l1: "FUEL", l2: "PUMP", dash: undefined },
    { y: 224, relay: "FAN RELAY", note: "triggered by ECU output", l1: "COOLING", l2: "FAN", dash: undefined },
    { y: 296, relay: "IGNITION SWITCH", note: "", l1: "ECU WAKE", l2: "RELAY COILS", dash: "6 5" },
  ];

  return (
    <Frame
      name="power-diagram"
      viewBox="0 0 720 392"
      title="Power distribution: battery, fuses, relays and earth"
      desc="Generic diagram of battery positive running through a main fuse to a fuse box, then through individual fuses and relays to the ECU and ignition, fuel pump, cooling fan and an ignition-switched feed. Battery negative runs to chassis and engine block."
    >
      {/* Battery */}
      <rect x={24} y={128} width={100} height={120} rx={3} fill={C.surface2} stroke={C.line} />
      <T x={74} y={182} size={14} anchor="middle" weight={600}>
        BATTERY
      </T>
      <T x={74} y={206} size={20} fill={C.accent} anchor="middle" weight={600}>
        12 V
      </T>
      <rect x={124} y={178} width={8} height={20} fill={W.pos} />
      <rect x={60} y={248} width={24} height={8} fill={W.gnd} />
      <T x={140} y={172} size={13} fill={W.pos} weight={600}>
        +
      </T>

      {/* Main feed */}
      <Wire d="M132,188 H180" color={W.pos} w={4} />
      <rect x={180} y={176} width={60} height={24} rx={2} fill={C.surface} stroke={W.pos} strokeWidth={1.5} />
      <T x={210} y={166} size={11} fill={C.muted} anchor="middle">
        MAIN FUSE
      </T>
      <Wire d="M240,188 H324" color={W.pos} w={4} />
      <rect x={324} y={56} width={12} height={264} rx={2} fill={W.pos} />
      <T x={330} y={46} size={11} fill={C.muted} anchor="middle">
        FUSE BOX
      </T>

      {rows.map((r) => (
        <g key={r.relay}>
          <Wire d={`M336,${r.y} H372`} color={W.pos} w={3} dash={r.dash} />
          <rect x={372} y={r.y - 9} width={40} height={18} rx={2} fill={C.surface} stroke={W.pos} strokeWidth={1.5} />
          <Wire d={`M412,${r.y} H448`} color={W.pos} w={3} dash={r.dash} />
          <rect x={448} y={r.y - 24} width={132} height={48} rx={3} fill={C.surface} stroke={C.line} />
          <T x={514} y={r.y + 5} size={13} anchor="middle" weight={600}>
            {r.relay}
          </T>
          {r.note && (
            <T x={514} y={r.y + 38} size={10} fill={C.accent} anchor="middle">
              {r.note}
            </T>
          )}
          <Wire d={`M580,${r.y} H616`} color={W.pos} w={3} dash={r.dash} />
          <rect x={616} y={r.y - 24} width={90} height={48} rx={3} fill={C.surface2} stroke={C.line} />
          <T x={661} y={r.y - 3} size={12} anchor="middle">
            {r.l1}
          </T>
          <T x={661} y={r.y + 14} size={12} anchor="middle">
            {r.l2}
          </T>
        </g>
      ))}

      {/* Earth */}
      <Wire d="M72,256 V356 H560" color={W.gnd} w={4} />
      <Wire d="M560,356 V364 M548,364 H572 M553,370 H567 M558,376 H562" color={W.gnd} w={2} />
      <T x={92} y={346} size={11} fill={C.muted}>
        BATTERY − TO CHASSIS &amp; ENGINE BLOCK
      </T>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Sensor wiring                                                    */
/* ------------------------------------------------------------------ */

type SensorWire = { c: string; l: string; dash?: string };

export function SensorDiagram() {
  const rows: { y: number; title: string; sub: string; wires: SensorWire[] }[] = [
    {
      y: 80,
      title: "Throttle position (TPS)",
      sub: "5 V ref · signal · ground",
      wires: [
        { c: W.ref, l: "5V REF" },
        { c: W.sig, l: "SIGNAL" },
        { c: W.grn, l: "SENSOR GND" },
      ],
    },
    {
      y: 162,
      title: "Manifold pressure (MAP)",
      sub: "5 V ref · signal · ground",
      wires: [
        { c: W.ref, l: "5V REF" },
        { c: W.sig, l: "SIGNAL" },
        { c: W.grn, l: "SENSOR GND" },
      ],
    },
    {
      y: 244,
      title: "Coolant / intake temp",
      sub: "signal · sensor ground",
      wires: [
        { c: W.sig, l: "SIGNAL" },
        { c: W.grn, l: "SENSOR GND" },
      ],
    },
    {
      y: 326,
      title: "Wideband O2 controller",
      sub: "12 V · GND · 0–5 V out",
      wires: [
        { c: W.pos, l: "SWITCHED 12V" },
        { c: W.gnd, l: "GND" },
        { c: W.sig, l: "0-5V OUT" },
      ],
    },
    {
      y: 408,
      title: "Crank / cam trigger",
      sub: "shielded · earth at ECU end",
      wires: [
        { c: W.sig, l: "TRIGGER +" },
        { c: W.blu, l: "TRIGGER −" },
        { c: W.gnd, l: "SHIELD", dash: "5 4" },
      ],
    },
  ];
  const labelX = [215, 290, 365];

  return (
    <Frame
      name="sensor-diagram"
      viewBox="0 0 720 460"
      title="Sensor wiring: references, signals and grounds"
      desc="Generic diagram showing an ECU wired to a throttle position sensor, manifold pressure sensor, temperature sensors, a wideband controller and a shielded crank or cam trigger, with the 5 volt reference, signal and sensor ground wires labelled."
    >
      <rect x={20} y={20} width={120} height={420} rx={3} fill={C.surface2} stroke={C.accent} strokeWidth={1.5} />
      <text x={80} y={58} textAnchor="middle" fontSize={34} fill={C.fg} className="font-display">
        ECU
      </text>
      <T x={80} y={76} size={10} fill={C.muted} anchor="middle" spacing={2}>
        INPUTS
      </T>

      {rows.map((r) => {
        const n = r.wires.length;
        const gap = n === 2 ? 16 : 13;
        return (
          <g key={r.title}>
            {r.wires.map((w, i) => {
              const wy = r.y + (i - (n - 1) / 2) * gap;
              const lx = labelX[i];
              const lw = w.l.length * 6.9 + 10;
              return (
                <g key={w.l}>
                  <Wire d={`M140,${wy} H440`} color={w.c} w={2.2} dash={w.dash} />
                  <Dot x={140} y={wy} color={w.c} r={3} />
                  <Dot x={440} y={wy} color={w.c} r={3} />
                  <rect x={lx - lw / 2} y={wy - 7} width={lw} height={14} fill={C.surface} />
                  <T x={lx} y={wy + 4} size={10.5} fill={C.muted} anchor="middle">
                    {w.l}
                  </T>
                </g>
              );
            })}
            <rect x={440} y={r.y - 30} width={260} height={60} rx={3} fill={C.surface} stroke={C.line} />
            <T x={456} y={r.y - 6} size={14} weight={600}>
              {r.title}
            </T>
            <T x={456} y={r.y + 16} size={11.5} fill={C.muted}>
              {r.sub}
            </T>
          </g>
        );
      })}
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 4. CAN bus                                                          */
/* ------------------------------------------------------------------ */

export function CanDiagram() {
  const { a, b } = twist(130, 590, 146, 4.5, 40);
  const top = [
    { cx: 260, label: "WIDEBAND" },
    { cx: 470, label: "DATA LOGGER" },
  ];
  const bottom = [{ cx: 365, label: "KEYPAD" }];

  return (
    <Frame
      name="can-diagram"
      viewBox="0 0 720 304"
      title="CAN bus topology with termination at each end"
      desc="Generic diagram of a CAN bus: a twisted pair running from the ECU at one end to a dash display at the other, with short stubs to a wideband controller, a data logger and a keypad, and a 120 ohm termination resistor at each end of the bus."
    >
      {/* End nodes */}
      <rect x={20} y={106} width={110} height={80} rx={3} fill={C.surface2} stroke={C.accent} strokeWidth={1.5} />
      <text x={75} y={156} textAnchor="middle" fontSize={32} fill={C.fg} className="font-display">
        ECU
      </text>
      <rect x={590} y={106} width={110} height={80} rx={3} fill={C.surface2} stroke={C.line} />
      <T x={645} y={152} size={14} anchor="middle" weight={600}>
        DASH
      </T>
      <T x={645} y={170} size={11} fill={C.muted} anchor="middle">
        DISPLAY
      </T>

      {/* Backbone */}
      <path d={a} fill="none" stroke={W.ref} strokeWidth={2.5} strokeLinecap="round" />
      <path d={b} fill="none" stroke={W.grn} strokeWidth={2.5} strokeLinecap="round" />

      {/* Terminators */}
      {[172, 548].map((x) => (
        <g key={x}>
          <rect x={x - 6} y={134} width={12} height={24} rx={2} fill={C.surface} stroke={C.fg} strokeWidth={1.5} />
          <T x={x} y={124} size={11} fill={C.muted} anchor="middle">
            120 ohm
          </T>
        </g>
      ))}

      {/* Stub nodes */}
      {top.map((n) => (
        <g key={n.label}>
          <rect x={n.cx - 56} y={26} width={112} height={56} rx={3} fill={C.surface} stroke={C.line} />
          <T x={n.cx} y={59} size={13} anchor="middle" weight={600}>
            {n.label}
          </T>
          <Wire d={`M${n.cx - 4},82 V146`} color={W.ref} w={2} />
          <Wire d={`M${n.cx + 4},82 V146`} color={W.grn} w={2} />
          <Dot x={n.cx - 4} y={146} color={W.ref} r={3} />
          <Dot x={n.cx + 4} y={146} color={W.grn} r={3} />
        </g>
      ))}
      {bottom.map((n) => (
        <g key={n.label}>
          <rect x={n.cx - 56} y={210} width={112} height={56} rx={3} fill={C.surface} stroke={C.line} />
          <T x={n.cx} y={243} size={13} anchor="middle" weight={600}>
            {n.label}
          </T>
          <Wire d={`M${n.cx - 4},210 V146`} color={W.ref} w={2} />
          <Wire d={`M${n.cx + 4},210 V146`} color={W.grn} w={2} />
          <Dot x={n.cx - 4} y={146} color={W.ref} r={3} />
          <Dot x={n.cx + 4} y={146} color={W.grn} r={3} />
        </g>
      ))}

      {/* Legend */}
      <Wire d="M20,288 H44" color={W.ref} w={3} />
      <T x={52} y={292} size={11} fill={C.muted}>
        CAN H
      </T>
      <Wire d="M110,288 H134" color={W.grn} w={3} />
      <T x={142} y={292} size={11} fill={C.muted}>
        CAN L
      </T>
      <T x={700} y={292} size={11} fill={C.muted} anchor="end">
        twisted pair · short stubs · one terminator at each end
      </T>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Harness build board                                              */
/* ------------------------------------------------------------------ */

export function HarnessBoardDiagram() {
  const above = [
    { x: 170, y: 48, t: "INJECTORS", s: "one per cylinder", tag: "INJ", c: W.out },
    { x: 250, y: 96, t: "IGNITION COILS", s: "coil drivers", tag: "COIL", c: W.out },
    { x: 330, y: 140, t: "RELAYS & AUX", s: "pump fan boost", tag: "AUX", c: W.out },
  ];
  const below = [
    { x: 170, y: 292, t: "SENSORS", s: "CLT IAT TPS MAP", tag: "SNS", c: W.grn },
    { x: 250, y: 244, t: "TRIGGERS", s: "crank · cam", tag: "TRG", c: W.sig },
    { x: 330, y: 200, t: "POWER & GROUND", s: "fused feed · earths", tag: "PWR", c: W.pos },
  ];
  const branches = [...above, ...below];
  const trunkY = 170;

  return (
    <Frame
      name="harness-board"
      viewBox="0 0 720 340"
      title="Harness build board layout"
      desc="Generic layout of a custom ECU harness on a build board: an ECU plug on the left, a trunk in convoluted tube with cable ties, and six labelled branches with heat-shrink breakouts ending in connectors for injectors, ignition coils, relays and auxiliaries, sensors, triggers and power and ground."
    >
      {/* ECU plug */}
      <rect x={18} y={138} width={72} height={64} rx={3} fill={C.surface2} stroke={C.line} />
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2, 3].map((c) => <circle key={`${r}-${c}`} cx={32 + c * 15} cy={152 + r * 18} r={3} fill={C.subtle} />)
      )}
      <T x={54} y={224} size={11} fill={C.muted} anchor="middle">
        ECU PLUG
      </T>

      {/* Branches */}
      {branches.map((b) => {
        const d = `M${b.x},${trunkY} V${b.y} H520`;
        return (
          <g key={b.t}>
            <path d={d} fill="none" stroke={C.line} strokeWidth={9} strokeLinejoin="round" />
            <path d={d} fill="none" stroke="#1d1d22" strokeWidth={6} strokeLinejoin="round" />
            <path d={d} fill="none" stroke={b.c} strokeWidth={1.5} strokeLinejoin="round" />
            {/* wire label flag */}
            <rect x={452} y={b.y - 7} width={34} height={14} rx={1.5} fill={C.fg} />
            <T x={469} y={b.y + 3.5} size={9.5} fill={C.bg} anchor="middle" weight={600}>
              {b.tag}
            </T>
            {/* connector */}
            <rect x={520} y={b.y - 13} width={40} height={26} rx={3} fill={C.surface2} stroke={C.line} />
            <circle cx={532} cy={b.y} r={2.5} fill={C.subtle} />
            <circle cx={548} cy={b.y} r={2.5} fill={C.subtle} />
            <T x={574} y={b.y - 2} size={13} weight={600}>
              {b.t}
            </T>
            <T x={574} y={b.y + 14} size={11} fill={C.muted}>
              {b.s}
            </T>
          </g>
        );
      })}

      {/* Trunk in convoluted tube */}
      <rect x={90} y={trunkY - 11} width={250} height={22} rx={11} fill="#1d1d22" stroke={C.line} />
      <line x1={100} y1={trunkY} x2={330} y2={trunkY} stroke="#4a4a55" strokeWidth={14} strokeDasharray="3 5" />
      {[120, 210, 290].map((x) => (
        <line key={x} x1={x} y1={trunkY - 14} x2={x} y2={trunkY + 14} stroke={C.fg} strokeWidth={2.5} strokeLinecap="round" opacity={0.7} />
      ))}

      {/* Heat-shrink breakouts */}
      {[170, 250, 330].map((x) => (
        <rect key={x} x={x - 6} y={trunkY - 13} width={12} height={26} rx={2} fill={C.accent} />
      ))}

      {/* Legend */}
      <rect x={20} y={322} width={12} height={10} rx={2} fill={C.accent} />
      <T x={38} y={331} size={11} fill={C.muted}>
        heat-shrink breakout
      </T>
      <line x1={228} y1={327} x2={252} y2={327} stroke="#4a4a55" strokeWidth={8} strokeDasharray="3 4" />
      <T x={260} y={331} size={11} fill={C.muted}>
        convoluted tube
      </T>
      <rect x={410} y={321} width={22} height={11} rx={1.5} fill={C.fg} />
      <T x={440} y={331} size={11} fill={C.muted}>
        wire label
      </T>
      <line x1={540} y1={321} x2={540} y2={333} stroke={C.fg} strokeWidth={2.5} strokeLinecap="round" opacity={0.7} />
      <T x={550} y={331} size={11} fill={C.muted}>
        cable tie
      </T>
    </Frame>
  );
}
