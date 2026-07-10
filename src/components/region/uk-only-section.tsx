"use client";

import type { ReactNode } from "react";
import { useRegion } from "@/components/region/region-context";

/** Renders its children only when the UK region is selected. */
export function UkOnlySection({ children }: { children: ReactNode }) {
  const { region } = useRegion();
  if (region !== "uk") return null;
  return <>{children}</>;
}
