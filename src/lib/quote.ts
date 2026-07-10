import { tuningAddOns, preDynoTests, rollingRoad, naTunePackages, forcedInductionUplifts } from "./site-config";

export type ServiceType = "remote" | "rolling-road" | "both";
export type EcuType = "stock" | "standalone" | "unsure";
export type EngineInternals = "stock" | "built";

export type QuoteInputs = {
  serviceType: ServiceType;
  ecuType: EcuType;
  aspiration: string[];
  engineInternals: EngineInternals;
  addOns: string[];
  preDyno: string[];
  rollingRoadHours: number;
};

/**
 * Ballpark base tuning fee used only when the aspiration question hasn't
 * been answered yet — as soon as N/A or a power adder is selected, the flat
 * confirmed pricing below takes over.
 */
const BASE_FEES: Record<EcuType, number> = {
  stock: 250,
  standalone: 380,
  unsure: 300,
};

export function estimateQuote(input: QuoteInputs) {
  const breakdown: { label: string; amount: number | null }[] = [];

  const isForcedInduction = input.aspiration.some((a) =>
    ["Turbo", "Nitrous", "Supercharged"].includes(a)
  );
  const hasAnsweredAspiration = input.aspiration.length > 0;

  if (hasAnsweredAspiration) {
    // Confirmed flat-rate tune fee, the same base across every method —
    // rolling road's dyno session is bundled in. Drop the "(NA)" suffix
    // once a power adder uplift is being added below, since the base fee
    // is no longer describing a naturally aspirated build.
    const naSuffix = isForcedInduction ? "" : " (NA)";
    const baseLabel =
      input.serviceType === "remote"
        ? `Remote Tune${naSuffix}`
        : input.serviceType === "rolling-road"
        ? `Rolling Road Dyno Tune${naSuffix} (incl. dyno session)`
        : `Road Tune${naSuffix}`;
    breakdown.push({ label: baseLabel, amount: naTunePackages.remoteTune.price });

    if (isForcedInduction) {
      const uplift =
        forcedInductionUplifts.find((u) => u.key === input.engineInternals) ??
        forcedInductionUplifts[0];
      breakdown.push({ label: uplift.label, amount: uplift.amount });
    }
  } else {
    if (input.serviceType !== "rolling-road") {
      const base = BASE_FEES[input.ecuType];
      breakdown.push({ label: "Custom tune (base, ballpark)", amount: base });
    }

    if (input.serviceType !== "remote") {
      const hours = Math.max(1, input.rollingRoadHours || 2);
      breakdown.push({
        label: `Rolling road dyno tune session (${hours}hr @ £${rollingRoad.ratePerHour}/hr)`,
        amount: hours * rollingRoad.ratePerHour,
      });
    }
  }

  for (const addOnName of input.addOns) {
    const addOn = tuningAddOns.find((a) => a.name === addOnName);
    if (addOn) {
      breakdown.push({
        label: addOn.priceFrom === null ? `${addOn.name} (ask for pricing)` : addOn.name,
        amount: addOn.priceFrom,
      });
    }
  }

  for (const testName of input.preDyno) {
    const test = preDynoTests.find((t) => t.name === testName);
    if (test) breakdown.push({ label: test.name, amount: test.priceFrom });
  }

  const low = breakdown.reduce((sum, b) => sum + (b.amount ?? 0), 0);
  const high = Math.round((low * 1.35) / 5) * 5;

  return { low, high, breakdown };
}
