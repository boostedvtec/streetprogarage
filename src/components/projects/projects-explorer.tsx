"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { projects, type ProjectMethod, type ProjectService } from "@/lib/projects";
import { ProjectCase, serviceInfo } from "./project-case";

type Make = "All" | "Honda" | "Toyota";
type Method = "All" | ProjectMethod;
type Service = "All" | ProjectService;

function Chips<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="font-mono-tech mr-1 text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">{label}</span>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={clsx(
            "font-mono-tech min-h-11 cursor-pointer border px-3.5 text-[11px] uppercase tracking-[0.14em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            value === o.value
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border-strong text-foreground-muted hover:border-accent hover:text-foreground"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Filterable list of project case studies. Filters only offer values the data contains. */
export function ProjectsExplorer() {
  const [make, setMake] = useState<Make>("All");
  const [method, setMethod] = useState<Method>("All");
  const [service, setService] = useState<Service>("All");

  const makes = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.make)))] as Make[], []);
  const methods = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.method)))] as Method[], []);
  const services = useMemo(
    () => ["All", ...(Object.keys(serviceInfo) as ProjectService[]).filter((s) => projects.some((p) => p.services.includes(s)))] as Service[],
    []
  );

  const shown = projects.filter(
    (p) => (make === "All" || p.make === make) && (method === "All" || p.method === method) && (service === "All" || p.services.includes(service))
  );

  return (
    <div>
      <div className="grid gap-3 border-y border-border py-5 lg:grid-cols-3">
        <Chips label="Make" value={make} onChange={setMake} options={makes.map((v) => ({ value: v, label: v }))} />
        <Chips label="Method" value={method} onChange={setMethod} options={methods.map((v) => ({ value: v, label: v }))} />
        <Chips
          label="Service"
          value={service}
          onChange={setService}
          options={services.map((v) => ({ value: v, label: v === "All" ? "All" : serviceInfo[v].label }))}
        />
      </div>
      <p className="font-mono-tech mt-4 text-xs uppercase tracking-[0.16em] text-foreground-subtle" aria-live="polite">
        {shown.length} of {projects.length} builds
      </p>

      {shown.length === 0 ? (
        <p className="py-16 text-foreground-muted">No builds match those filters yet. Try clearing one.</p>
      ) : (
        shown.map((p, i) => <ProjectCase key={p.slug} project={p} flip={i % 2 === 1} index={i} />)
      )}
    </div>
  );
}
