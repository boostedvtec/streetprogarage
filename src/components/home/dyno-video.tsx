"use client";

import { useEffect, useRef, useState } from "react";
import { watchVisible } from "./canvas-utils";
import { useStill } from "./motion";

/** Real dyno footage: muted loop that only plays while on screen. */
export function DynoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const still = useStill();
  const [playing, setPlaying] = useState(false);
  const visibleRef = useRef(true);
  const stillRef = useRef(false);

  function sync() {
    const v = ref.current;
    if (!v) return;
    if (visibleRef.current && !stillRef.current) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }

  useEffect(() => {
    stillRef.current = still;
    sync();
  }, [still]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    const stop = watchVisible(v, (vis) => {
      visibleRef.current = vis;
      sync();
    });
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      stop();
    };
  }, []);

  return (
    <div className="relative overflow-hidden border-2 border-foreground bg-foreground shadow-[8px_8px_0_var(--color-accent)]">
      <video
        ref={ref}
        className="block aspect-[848/478] w-full object-cover"
        src="/videos/dyno-k24-turbo.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Real footage from our dyno: a Honda K24 turbo power run shown on the dyno software. No sound."
      />
      <span className="absolute left-3 top-3 bg-foreground px-2 py-1 text-xs font-medium uppercase tracking-wider text-white">
        Honda K24 turbo / on our dyno
      </span>
      <button
        type="button"
        onClick={() => {
          const v = ref.current;
          if (!v) return;
          if (v.paused) v.play().catch(() => {});
          else v.pause();
        }}
        className="absolute bottom-3 right-3 min-h-11 min-w-19 cursor-pointer border-2 border-foreground bg-white px-3.5 text-xs font-medium uppercase tracking-wider focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}
