import { tuningAddOns, preDynoTests, rollingRoad, naTunePackages, forcedInductionUplifts } from "./site-config";
import { resolveRegionPrice, formatResolvedAmount, dynoServiceLabel, type Region, type RegionPrice } from "./region";

export type ServiceType = "remote" | "rolling-road" | "both";
export type EcuType = "stock" | "standalone" | "unsure";
export type EngineInternals = "stock" | "built";

export type QuoteInputs = {
  region: Region;
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
 * confirmed pricing below takes over. No Pakistan figures given for this
 * placeholder estimate, so it falls back to "ask for pricing" there.
 */
const BASE_FEES: Record<EcuType, RegionPrice> = {
  stock: { uk: 250, pk: null },
  standalone: { uk: 380, pk: null },
  unsure: { uk: 300, pk: null },
};

export function estimateQuote(input: QuoteInputs) {
  const breakdown: { label: string; amount: number | null }[] = [];
  const region = input.region;

  const isForcedInduction = input.aspiration.some((a) =>
    ["Turbo", "Nitrous", "Supercharged"].includes(a)
  );
  const hasAnsweredAspiration = input.aspiration.length > 0;

  if (hasAnsweredAspiration) {
    // Confirmed flat-rate tune fee, the same base across every method.
    // Dyno time is NOT included — it's billed separately below whenever
    // the service involves the dyno. Drop the "(NA)" suffix once a power
    // adder uplift is being added below, since the base fee is no longer
    // describing a naturally aspirated build.
    const naSuffix = isForcedInduction ? "" : " (NA)";
    const baseLabel =
      input.serviceType === "remote"
        ? `Remote Tune${naSuffix}`
        : input.serviceType === "rolling-road"
        ? `${dynoServiceLabel(region)}${naSuffix}`
        : `Road Tune${naSuffix}`;
    breakdown.push({
      label: baseLabel,
      amount: resolveRegionPrice(naTunePackages.remoteTune.price, region),
    });

    if (isForcedInduction) {
      const uplift =
        forcedInductionUplifts.find((u) => u.key === input.engineInternals) ??
        forcedInductionUplifts[0];
      breakdown.push({
        label: uplift.label,
        amount: resolveRegionPrice(uplift.amount, region),
      });
    }

    if (input.serviceType !== "remote") {
      const hours = Math.max(1, input.rollingRoadHours || (isForcedInduction ? 2 : 1));
      const rate = resolveRegionPrice(rollingRoad.ratePerHour, region);
      breakdown.push({
        label:
          rate === null
            ? "Dyno time (ask for pricing)"
            : `Dyno time (${hours}hr @ ${formatResolvedAmount(rate, region)}/hr)`,
        amount: rate === null ? null : hours * rate,
      });
    }
  } else {
    if (input.serviceType !== "rolling-road") {
      breakdown.push({
        label: "Custom tune (base, ballpark)",
        amount: resolveRegionPrice(BASE_FEES[input.ecuType], region),
      });
    }

    if (input.serviceType !== "remote") {
      const hours = Math.max(1, input.rollingRoadHours || 2);
      const rate = resolveRegionPrice(rollingRoad.ratePerHour, region);
      const dynoSessionLabel = `${dynoServiceLabel(region)} session`;
      breakdown.push({
        label: rate === null ? dynoSessionLabel : `${dynoSessionLabel} (${hours}hr)`,
        amount: rate === null ? null : hours * rate,
      });
    }
  }

  for (const addOnName of input.addOns) {
    const addOn = tuningAddOns.find((a) => a.name === addOnName);
    if (addOn) {
      const amount = resolveRegionPrice(addOn.price, region);
      breakdown.push({
        label: amount === null ? `${addOn.name} (ask for pricing)` : addOn.name,
        amount,
      });
    }
  }

  for (const testName of input.preDyno) {
    const test = preDynoTests.find((t) => t.name === testName);
    if (test) {
      const amount = resolveRegionPrice(test.price, region);
      breakdown.push({
        label: amount === null ? `${test.name} (ask for pricing)` : test.name,
        amount,
      });
    }
  }

  const low = breakdown.reduce((sum, b) => sum + (b.amount ?? 0), 0);
  const high = Math.round((low * 1.35) / 5) * 5;

  return { low, high, breakdown };
}
