"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { regionData, type Region, type RegionData } from "@/lib/region";

type RegionContextValue = {
  region: Region;
  data: RegionData;
  setRegion: (region: Region) => void;
};

const RegionContext = createContext<RegionContextValue | null>(null);
export const REGION_STORAGE_KEY = "spg-region";

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region>("uk");

  useEffect(() => {
    // Reading localStorage must happen post-mount (it doesn't exist during
    // SSR) — starting `region` at the default and syncing here avoids a
    // hydration mismatch that a useState lazy initializer would cause instead.
    try {
      const raw = window.localStorage.getItem(REGION_STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw === "uk" || raw === "pk") setRegionState(raw);
    } catch {
      // ignore malformed storage
    }
  }, []);

  const setRegion = (next: Region) => {
    setRegionState(next);
    try {
      window.localStorage.setItem(REGION_STORAGE_KEY, next);
    } catch {
      // ignore storage write failures (private browsing, etc.)
    }
  };

  return (
    <RegionContext.Provider value={{ region, data: regionData[region], setRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within a RegionProvider");
  return ctx;
}
