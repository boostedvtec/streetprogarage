import clsx from "clsx";

/**
 * Decorative dyno-sheet backdrop: faint grid, RPM ticks and flowing power /
 * torque curves. Sits behind section content; ignored by assistive tech.
 */
export function DynoLines({ flip = false, className }: { flip?: boolean; className?: string }) {
  const rpm = [3000, 4000, 5000, 6000, 7000, 8000];
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className={clsx("pointer-events-none absolute inset-0 h-full w-full select-none", flip && "-scale-x-100", className)}
    >
      <g stroke="#cfd6dd" strokeWidth="1" opacity="0.55">
        {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((y) => (
          <line key={y} x1="0" y1={y} x2="1200" y2={y} />
        ))}
        {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="600" />
        ))}
      </g>
      <g fill="#59636e" opacity="0.4" fontFamily="ui-monospace, monospace" fontSize="12" textAnchor="middle">
        {rpm.map((r, i) => (
          <text key={r} x={100 + i * 200} y="584">
            {r}
          </text>
        ))}
      </g>
      <g fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke">
        {/* power: smooth climb, broad peak, gentle fall */}
        <path
          d="M0 540 C 160 520, 300 400, 470 300 S 760 170, 900 175 S 1110 240, 1200 300"
          stroke="#cf5f1c"
          strokeWidth="3"
          opacity="0.28"
        />
        {/* torque: earlier peak, dashed */}
        <path
          d="M0 470 C 140 360, 250 250, 400 232 S 640 270, 800 360 S 1060 470, 1200 520"
          stroke="#cf5f1c"
          strokeWidth="2"
          strokeDasharray="8 8"
          opacity="0.22"
        />
        {/* a rougher comparison trace in blue */}
        <path
          d="M0 560 L 60 552 L 110 540 L 170 532 L 230 500 L 290 488 L 350 440 L 410 436 L 470 380 L 520 392 L 580 330 L 640 342 L 700 300 L 760 322 L 820 286 L 880 306 L 940 292 L 1000 330 L 1060 318 L 1120 356 L 1200 372"
          stroke="#2563eb"
          strokeWidth="2"
          opacity="0.2"
        />
      </g>
    </svg>
  );
}
