"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { regionData, type Region } from "@/lib/region";
import { useRegion, REGION_STORAGE_KEY } from "@/components/region/region-context";

const REGIONS: Region[] = ["uk", "pk"];

/** Shown once per browser, the first time a visitor lands with no stored region preference. */
export function RegionGate() {
  const { setRegion } = useRegion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let hasStoredPreference = true;
    try {
      const raw = window.localStorage.getItem(REGION_STORAGE_KEY);
      hasStoredPreference = raw === "uk" || raw === "pk";
    } catch {
      hasStoredPreference = false;
    }
    if (!hasStoredPreference) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
    }
  }, []);

  function choose(region: Region) {
    setRegion(region);
    setOpen(false);
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)} title="Select Your Region">
      <p className="text-sm text-foreground-muted">
        Choose your region to see local pricing, contact details and
        available services.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {REGIONS.map((value) => {
          const data = regionData[value];
          return (
            <button
              key={value}
              type="button"
              onClick={() => choose(value)}
              className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-border-strong bg-surface p-8 text-center transition-colors hover:border-accent hover:bg-accent-soft"
            >
              <span className="text-5xl" aria-hidden>
                {data.flag}
              </span>
              <span className="font-display text-xl">{data.label}</span>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
