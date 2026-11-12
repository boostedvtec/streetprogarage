import { C, Frame, T, W, Wire } from "@/components/wiring/wiring-diagrams";

/**
 * Generic diagram of what a transmission controller reads and drives. Not a
 * specific gearbox, ECU or pinout, and the page labels it as an illustration.
 */
export function TcuDiagram() {
  const left = [
    { y: 58, t: "Gear selector", s: "PRNDL / shifter", c: [W.sig, W.grn, W.gnd] },
    { y: 168, t: "Speed & rpm", s: "shaft · engine", c: [W.sig, W.blu, W.gnd] },
    { y: 278, t: "Throttle & load", s: "TPS · MAP", c: [W.ref, W.sig, W.grn] },
  ];
  const right = [
    { y: 58, t: "Shift control", s: "solenoids · valves", c: [W.out, W.out, W.out] },
    { y: 168, t: "Line pressure", s: "shift firmness", c: [W.out, W.out, W.out] },
    { y: 278, t: "Torque converter", s: "lock-up · slip", c: [W.out, W.out, W.out] },
  ];

  return (
    <Frame
      name="tcu-diagram"
      viewBox="0 0 480 400"
      title="What a transmission controller reads and drives"
      desc="Generic diagram of a transmission controller. It reads the gear selector, speed and rpm, and throttle and load, and drives shift control, line pressure and the torque converter."
    >
      <T x={8} y={18} size={11} fill={C.subtle} spacing={2}>
        READS
      </T>
      <T x={472} y={18} size={11} fill={C.subtle} spacing={2} anchor="end">
        DRIVES
      </T>

      <rect x={185} y={28} width={110} height={344} rx={3} fill={C.surface2} stroke={C.accent} strokeWidth={1.5} />
      <text x={240} y={62} textAnchor="middle" fontSize={32} fill={C.fg} className="font-display">
        TCU
      </text>
      <T x={240} y={80} size={9.5} fill={C.muted} anchor="middle" spacing={1.5}>
        SHIFT LOGIC
      </T>
      <line x1={197} y1={134} x2={283} y2={134} stroke={C.line} />
      <line x1={197} y1={244} x2={283} y2={244} stroke={C.line} />
      {/* shift map hint */}
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={207 + c * 16}
            y={296 + r * 12}
            width={13}
            height={9}
            rx={1}
            fill={W.out}
            opacity={0.18 + ((r + c) % 5) * 0.14}
          />
        ))
      )}
      <T x={240} y={362} size={9.5} fill={C.subtle} anchor="middle">
        shift map
      </T>

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
