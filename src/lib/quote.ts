import { tuningAddOns, preDynoTests, rollingRoad, naTunePackages } from "./site-config";

export type ServiceType = "remote" | "rolling-road" | "both";
export type EcuType = "stock" | "standalone" | "unsure";

export type QuoteInputs = {
  serviceType: ServiceType;
  ecuType: EcuType;
  aspiration: string[];
  addOns: string[];
  preDyno: string[];
  rollingRoadHours: number;
};

/**
 * Ballpark base tuning fees. Every tune is custom-written from scratch, so
 * these are starting estimates only — replace with real figures once
 * confirmed by the business owner.
 */
const BASE_FEES: Record<EcuType, number> = {
  stock: 250,
  standalone: 380,
  unsure: 300,
};

const FORCED_INDUCTION_UPLIFT = 100;

export function estimateQuote(input: QuoteInputs) {
  const breakdown: { label: string; amount: number }[] = [];

  const isForcedInduction = input.aspiration.some((a) =>
    ["Turbo", "Nitrous", "Supercharged"].includes(a)
  );
  const isPureNA = input.aspiration.includes("N/A") && !isForcedInduction;

  if (isPureNA) {
    // Confirmed flat-rate NA packages — supersede the generic ballpark formula.
    if (input.serviceType === "remote") {
      breakdown.push({ label: naTunePackages.roadTune.label, amount: naTunePackages.roadTune.price });
    } else {
      breakdown.push({
        label: `${naTunePackages.rollingRoadTune.label} (incl. dyno session)`,
        amount: naTunePackages.rollingRoadTune.price,
      });
    }
  } else {
    if (input.serviceType !== "rolling-road") {
      const base = BASE_FEES[input.ecuType];
      breakdown.push({ label: "Custom remote tune (base)", amount: base });
    }

    if (isForcedInduction && input.serviceType !== "rolling-road") {
      breakdown.push({
        label: "Forced induction / power-adder complexity",
        amount: FORCED_INDUCTION_UPLIFT,
      });
    }

    if (input.serviceType !== "remote") {
      const hours = Math.max(1, input.rollingRoadHours || 2);
      breakdown.push({
        label: `Rolling road session (${hours}hr @ £${rollingRoad.ratePerHour}/hr)`,
        amount: hours * rollingRoad.ratePerHour,
      });
    }
  }

  for (const addOnName of input.addOns) {
    const addOn = tuningAddOns.find((a) => a.name === addOnName);
    if (addOn) breakdown.push({ label: addOn.name, amount: addOn.priceFrom });
  }

  for (const testName of input.preDyno) {
    const test = preDynoTests.find((t) => t.name === testName);
    if (test) breakdown.push({ label: test.name, amount: test.priceFrom });
  }

  const low = breakdown.reduce((sum, b) => sum + b.amount, 0);
  const high = Math.round((low * 1.35) / 5) * 5;

  return { low, high, breakdown };
}
