"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { regionData, REGION_STORAGE_KEY, type Region, type RegionData } from "@/lib/region";

type RegionContextValue = {
  region: Region;
  data: RegionData;
  setRegion: (region: Region) => void;
};

const RegionContext = createContext<RegionContextValue | null>(null);

export function RegionProvider({
  children,
  initialRegion = "uk",
}: {
  children: ReactNode;
  initialRegion?: Region;
}) {
  // `initialRegion` comes from the server (resolved from the visitor's
  // geolocation, via the `spg-region` cookie set in proxy.ts), so this
  // already matches what was server-rendered — no hydration mismatch.
  const [region, setRegionState] = useState<Region>(initialRegion);

  useEffect(() => {
    // Safety net for visitors whose localStorage preference (from an
    // explicit manual switch) predates or outlives the region cookie.
    try {
      const raw = window.localStorage.getItem(REGION_STORAGE_KEY);
      if ((raw === "uk" || raw === "pk") && raw !== region) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRegionState(raw);
      }
    } catch {
      // ignore malformed storage
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRegion = (next: Region) => {
    setRegionState(next);
    try {
      window.localStorage.setItem(REGION_STORAGE_KEY, next);
    } catch {
      // ignore storage write failures (private browsing, etc.)
    }
    try {
      document.cookie = `${REGION_STORAGE_KEY}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    } catch {
      // ignore cookie write failures
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
