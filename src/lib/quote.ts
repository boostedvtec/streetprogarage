import {
  tuningAddOns,
  preDynoTests,
  rollingRoad,
  tunePrices,
  aftermarketEcuSurcharge,
  flexFuelSurcharge,
  FLEX_FUEL_LABEL,
  type TunePrice,
  type TunePriceKey,
} from "./site-config";
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
  fuelType: string;
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
  const breakdown: { label: string; amount: number | null; display?: string }[] = [];
  const region = input.region;

  const isForcedInduction = input.aspiration.some((a) =>
    ["Turbo", "Nitrous", "Supercharged"].includes(a)
  );
  const hasAnsweredAspiration = input.aspiration.length > 0;

  let ecuRangeExtra = 0;

  if (hasAnsweredAspiration) {
    // One all-in estimated tune price for the build, the same across every
    // method. Dyno time is NOT included — it's billed separately below
    // whenever the service involves the dyno.
    const tune = getTunePrice(input.aspiration[0], input.engineInternals);
    const methodLabel =
      input.serviceType === "remote"
        ? "Remote Tune"
        : input.serviceType === "rolling-road"
        ? dynoServiceLabel(region)
        : "Road Tune";
    breakdown.push({
      label: `${methodLabel} — ${tune.label}`,
      amount: resolveRegionPrice(tune.price, region),
    });

    // Aftermarket ECUs add a range depending on the ECU and features;
    // stock ECU platforms pay the price above with nothing extra.
    if (input.ecuType === "standalone" && region === "uk") {
      breakdown.push({
        label: `${aftermarketEcuSurcharge.label} (depends on ECU & features)`,
        amount: aftermarketEcuSurcharge.min,
        display: `+£${aftermarketEcuSurcharge.min}–£${aftermarketEcuSurcharge.max}`,
      });
      ecuRangeExtra = aftermarketEcuSurcharge.max - aftermarketEcuSurcharge.min;
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

  if (input.fuelType === FLEX_FUEL_LABEL) {
    const amount = resolveRegionPrice(flexFuelSurcharge, region);
    breakdown.push({
      label: amount === null ? "Flex Fuel Tuning (ask for pricing)" : "Flex Fuel Tuning",
      amount,
    });
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
  // Priced builds are a single figure, widened only by the aftermarket ECU
  // range. The loose ballpark buffer applies just before aspiration is known.
  const high = hasAnsweredAspiration
    ? low + ecuRangeExtra
    : Math.round((low * 1.35) / 5) * 5;

  return { low, high, breakdown };
}

/** Maps the form's aspiration + internals answers to a tune price entry. */
export function getTunePrice(aspiration: string, internals: EngineInternals): TunePrice {
  const byKey = (key: TunePriceKey) => tunePrices.find((p) => p.key === key) as TunePrice;
  if (aspiration === "Nitrous") return byKey("nitrous");
  if (aspiration === "Turbo" || aspiration === "Supercharged") {
    if (internals === "built") return byKey("built-boosted");
    return byKey(aspiration === "Turbo" ? "stock-turbo" : "stock-supercharged");
  }
  return byKey("na");
}
