"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown, Check, Globe } from "@phosphor-icons/react/dist/ssr";
import { regionData, type Region } from "@/lib/region";
import { useRegion } from "@/components/region/region-context";

const REGIONS: Region[] = ["uk", "pk"];

export function RegionSwitcher({ className }: { className?: string }) {
  const { region, setRegion } = useRegion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const current = regionData[region];

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
      >
        <Globe size={18} aria-hidden />
        <span aria-hidden>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <CaretDown size={14} aria-hidden />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select region"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg border border-border bg-surface shadow-lg"
        >
          {REGIONS.map((value) => {
            const data = regionData[value];
            const isActive = value === region;
            return (
              <li key={value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    setRegion(value);
                    setOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-3 text-left text-sm transition-colors hover:bg-surface-2 ${
                    isActive ? "text-accent font-semibold" : "text-foreground-muted"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden>{data.flag}</span>
                    {data.label}
                  </span>
                  {isActive && <Check size={16} weight="bold" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
