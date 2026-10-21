import clsx from "clsx";

/**
 * Decorative dyno-sheet backdrop: a faint grid of hairline boxes. Sits behind
 * section content; ignored by assistive tech.
 */
export function DynoLines({ flip = false, className }: { flip?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className={clsx("pointer-events-none absolute inset-0 h-full w-full select-none", flip && "-scale-x-100", className)}
    >
      <g stroke="#ffffff" strokeWidth="1" opacity="0.055">
        {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((y) => (
          <line key={y} x1="0" y1={y} x2="1200" y2={y} />
        ))}
        {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="600" />
        ))}
      </g>
    </svg>
  );
}
