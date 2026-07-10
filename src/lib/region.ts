export type Region = "uk" | "pk";

export type RegionData = {
  value: Region;
  label: string;
  flag: string;
  city: string;
  country: string;
  phone: string;
  phoneHref: string;
  whatsapp: string | null;
  whatsappHref: string | null;
  email: string;
  locationNote: string;
  mapQuery: string;
  /** Which services this region's workshop actually offers. */
  services: {
    remoteTuning: boolean;
    rollingRoadDyno: boolean;
    customWiring: boolean;
    parts: boolean;
    engineSwaps: boolean;
  };
};

export const regionData: Record<Region, RegionData> = {
  uk: {
    value: "uk",
    label: "United Kingdom",
    flag: "🇬🇧",
    city: "Manchester",
    country: "United Kingdom",
    phone: "+44 7438 483559",
    phoneHref: "tel:+447438483559",
    whatsapp: null,
    whatsappHref: null,
    email: "fradybooth@gmail.com",
    locationNote:
      "Rolling road & workshop services based in Manchester, UK. Remote tuning available worldwide. Full address provided upon booking confirmation.",
    mapQuery: "Manchester, UK",
    services: {
      remoteTuning: true,
      rollingRoadDyno: true,
      customWiring: true,
      parts: true,
      engineSwaps: false,
    },
  },
  pk: {
    value: "pk",
    label: "Pakistan",
    flag: "🇵🇰",
    city: "Karachi",
    country: "Pakistan",
    phone: "+92 346 2767382",
    phoneHref: "tel:+923462767382",
    whatsapp: "+92 321 3356171",
    whatsappHref: "https://wa.me/923213356171",
    email: "fradybooth@gmail.com",
    locationNote:
      "Workshop based in Nazimabad, Karachi, Pakistan. Exact address confirmed upon booking.",
    mapQuery: "Nazimabad, Karachi, Pakistan",
    services: {
      remoteTuning: true,
      rollingRoadDyno: true,
      customWiring: true,
      parts: false,
      engineSwaps: true,
    },
  },
};

/**
 * UK and Pakistan pricing are set independently by the business, not
 * derived from each other by exchange rate. `null` on either side means
 * "ask for pricing" for that region.
 */
export type RegionPrice = {
  uk: number | null;
  pk: number | null;
};

export function resolveRegionPrice(price: RegionPrice, region: Region): number | null {
  return region === "pk" ? price.pk : price.uk;
}

/** Formats an amount already resolved to the given region's currency. */
export function formatResolvedAmount(amount: number | null, region: Region): string {
  if (amount === null) return "Ask for pricing";
  if (region === "pk") return `Rs ${amount.toLocaleString("en-US")}`;
  return `£${amount}`;
}

export function formatRegionPrice(price: RegionPrice, region: Region): string {
  return formatResolvedAmount(resolveRegionPrice(price, region), region);
}

/** "Rolling Road Dyno Tune" everywhere in the UK, just "Dyno Tune" in Pakistan. */
export function dynoServiceLabel(region: Region): string {
  return region === "pk" ? "Dyno Tune" : "Rolling Road Dyno Tune";
}
