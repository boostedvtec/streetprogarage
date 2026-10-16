"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared "pause motion" switch for the homepage animations (datalog, fuel
 * map, dyno video). Combines the visitor's own pause button with their
 * operating-system "reduce motion" preference.
 */
let paused = false;
const listeners = new Set<() => void>();

function subscribePaused(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function toggleMotionPaused() {
  paused = !paused;
  listeners.forEach((fn) => fn());
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** True when the visitor paused animations or asked their device for less motion. */
export function useStill(): boolean {
  const manual = useSyncExternalStore(
    subscribePaused,
    () => paused,
    () => false
  );
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
  return manual || reduced;
}

export function useMotionPaused(): boolean {
  return useSyncExternalStore(
    subscribePaused,
    () => paused,
    () => false
  );
}
