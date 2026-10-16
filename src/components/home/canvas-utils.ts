export function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

export type Projected = { x: number; y: number; d: number };

/** Tiny perspective projection: yaw about the vertical axis, then pitch down. */
export function makeProjector(yaw: number, pitch: number, dist: number) {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  return (x: number, h: number, z: number): Projected => {
    const x1 = x * cy + z * sy;
    const z1 = -x * sy + z * cy;
    const up = h * cp + z1 * sp;
    const dep = z1 * cp - h * sp;
    const s = dist / (dist + dep);
    return { x: x1 * s, y: up * s, d: dep };
  };
}

/** Sizes the canvas backing store to its CSS size; reports whether it changed. */
export function fitCanvas(cv: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = cv.clientWidth;
  const h = cv.clientHeight;
  const nw = Math.round(w * dpr);
  const nh = Math.round(h * dpr);
  let changed = false;
  if (cv.width !== nw || cv.height !== nh) {
    cv.width = nw;
    cv.height = nh;
    changed = true;
  }
  return { w, h, dpr, changed };
}

/** Calls back with true/false as the element enters and leaves the viewport. */
export function watchVisible(el: Element, cb: (visible: boolean) => void) {
  if (typeof IntersectionObserver === "undefined") return () => {};
  const io = new IntersectionObserver((entries) => cb(entries[0].isIntersecting));
  io.observe(el);
  return () => io.disconnect();
}
