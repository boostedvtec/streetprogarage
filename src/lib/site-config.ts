import type { RegionPrice } from "./region";

/** Canonical production domain — used for sitemap, robots.txt, canonical links and structured data. */
export const siteUrl = "https://www.streetprogarage.com";

export const siteConfig = {
  name: "Street PRO Garage",
  shortName: "SPG",
  tagline: "Custom Built. Precision Tuned.",
  description:
    "Custom-built remote ECU tuning worldwide, rolling road dyno tuning in Manchester UK, and performance parts sales, fitting & diagnostics.",
  phone: "+44 7438 483559",
  phoneHref: "tel:+447438483559",
  email: "info@streetprogarage.com",
  location: {
    city: "Manchester",
    country: "United Kingdom",
    note: "Rolling road & workshop services based in Manchester, UK. Remote tuning available worldwide. Full address provided upon booking confirmation.",
  },
  social: {
    instagram: null,
    facebook: null,
    tiktok: null,
    note: "Social channels launching soon.",
  },
} as const;

export const navLinks = [
  { href: "/tuning", label: "Tuning", regions: ["uk", "pk"] },
  { href: "/custom-wiring", label: "Wiring", regions: ["uk", "pk"] },
  { href: "/dyno-rental", label: "Dyno Rental", regions: ["uk", "pk"] },
  { href: "/parts", label: "Parts", regions: ["uk"] },
  { href: "/engine-swaps", label: "Engine Swaps", regions: ["pk"] },
  { href: "/projects", label: "Projects", regions: ["uk", "pk"] },
  { href: "/our-story", label: "Story", regions: ["uk", "pk"] },
  { href: "/faq", label: "FAQ", regions: ["uk", "pk"] },
  { href: "/contact", label: "Contact", regions: ["uk", "pk"] },
] as const;

export type EcuCategory = {
  category: string;
  ecus: string[];
  note?: string;
};

export const supportedEcus: EcuCategory[] = [
  {
    category: "Stock ECU (OBD Reflash via HP Tuners / Hondata)",
    ecus: ["Honda", "Subaru", "Mitsubishi Evo", "+ all HP Tuners supported platforms"],
    note: "Credit-locked platform — see HP Tuners Credits below.",
  },
  {
    category: "Honda-Specific Platforms (Piggyback & Chipped ECU)",
    ecus: ["Honda P28 (chipped)", "Hondata S300", "Hondata KPro", "Hondavert", "HTS", "Neptune RTP"],
    note: "Covers Civic and Integra D-series, B-series, H-series, F-series, K-series and R-series builds.",
  },
  {
    category: "Nissan-Specific (Piggyback / Reflash)",
    ecus: ["Nistune (stock ECU reflash)"],
    note: "Covers SR20DET Pulsar, Sentra and Sunny platforms.",
  },
  {
    category: "Standalone ECUs",
    ecus: [
      "MaxxECU",
      "Link ECU",
      "Haltech",
      "Speeduino",
      "Megasquirt",
      "ME (Motorsport Electronics)",
      "AEM Infinity",
      "EcuMaster (incl. DET3+)",
    ],
    note: "Speeduino and MegaSquirt builds tuned via TunerStudio.",
  },
];

export type VehiclePlatform = {
  make: string;
  models: string;
  engines: string[];
  /** Slug of the matching entry in platform-pages.ts, if a dedicated deep-dive page exists. */
  slug?: string;
};

/** Makes, models and engine codes we regularly tune — used on the Tuning page for platform coverage. */
export const tunedVehiclePlatforms: VehiclePlatform[] = [
  {
    make: "Honda — OBD1",
    models: "Civic, CRX, Del Sol & Prelude — D/B/H/F-series swaps, incl. mini D16 swaps",
    engines: ["D16", "B16", "B18", "B20", "H22", "H23", "F20B", "F22", "F23"],
    slug: "honda-obd1",
  },
  {
    make: "Honda — K & R-Series",
    models: "Civic (incl. EP3 Type R) K20/K24 & R18 — Hondata KPro, MaxxECU or Haltech standalone",
    engines: ["K20", "K24", "R18"],
    slug: "honda-k-series",
  },
  {
    make: "Toyota",
    models: "Supra & MR2 Turbo — 2JZGTE & 3SGTE on AEM Infinity, 2ZZ-GE on EcuMaster",
    engines: ["2JZGTE", "3SGTE", "2ZZ-GE"],
    slug: "toyota-supra-mr2",
  },
  {
    make: "Mitsubishi",
    models: "Lancer Evo I–III, IV–VI & VIII–IX — stock ECU, AEM Infinity, MegaSquirt or MaxxECU standalone",
    engines: ["4G63T"],
    slug: "mitsubishi-evo",
  },
  {
    make: "Subaru",
    models: "Impreza WRX & STI — UK 2000 model, 2001–05 (race ROM upgrade), 2006 onward",
    engines: [],
    slug: "subaru-wrx-sti",
  },
  {
    make: "Nissan",
    models: "Pulsar GTiR — stock ECU on Nistune, or Link ECU standalone",
    engines: ["SR20DET"],
    slug: "nissan-pulsar",
  },
  {
    make: "Mazda",
    models: "Miata/MX-5 — naturally aspirated, turbo & supercharged",
    engines: [],
    slug: "mazda-miata-mx5",
  },
];

export type EcuBrandLogo = {
  name: string;
  src: string;
  /** Logo asset is white/reversed and needs a dark chip to stay visible on a light page. */
  onDark?: boolean;
  /** Source file is a two-variant sprite (light+dark stacked) — show only one half. */
  crop?: "top" | "bottom";
};

export const ecuBrandLogos: EcuBrandLogo[] = [
  { name: "HP Tuners", src: "/images/logos/HPT_LOGO_blublk.png" },
  { name: "Hondata", src: "/images/logos/hondata-logo.jpg" },
  { name: "MaxxECU", src: "/images/logos/MaxxECU-Logo-1.jpg" },
  { name: "Link ECU", src: "/images/logos/LNK-Logo-whiteout.svg", onDark: true },
  { name: "Haltech", src: "/images/logos/haltech-dual.png", crop: "top" },
  { name: "Speeduino", src: "/images/logos/speeduino-logo.png" },
  { name: "ME (Motorsport Electronics)", src: "/images/logos/me-ecu.png" },
  { name: "AEM Infinity", src: "/images/logos/AEM-Advanced-Engine-Management-Logo.png" },
  { name: "EcuMaster", src: "/images/logos/ecumaster.png" },
  { name: "Megasquirt", src: "/images/logos/megasquirt-logo.png" },
];

export type AddOn = {
  name: string;
  description: string;
  price: RegionPrice;
};

export const tuningAddOns: AddOn[] = [
  {
    name: "Launch Control",
    description: "Custom launch RPM & anti-stall mapping for consistent starts.",
    price: { uk: 50, pk: null },
  },
  {
    name: "Anti-Lag System (ALS)",
    description: "Anti-lag mapping for turbocharged builds — reduces spool lag.",
    price: { uk: 100, pk: null },
  },
  {
    name: "Pops & Bangs / Overrun Crackle",
    description: "Exhaust overrun tune for pops, bangs and crackle on decel.",
    price: { uk: 50, pk: null },
  },
  {
    name: "Methanol Injection Tuning",
    description: "Progressive methanol injection mapping and safety failsafes.",
    price: { uk: 100, pk: null },
  },
  {
    name: "Mechanical Cam Degree Optimisation",
    description: "Cam timing verification & degreeing to match the tune to actual mechanical setup.",
    price: { uk: 100, pk: null },
  },
  {
    name: "Extra Revision",
    description:
      "Additional tuning revision beyond what's included in your package. Post-delivery revision requests (e.g. a cold-start issue) are free within 14 days of your final tune — after that, revisions are chargeable at this rate.",
    price: { uk: 50, pk: null },
  },
  {
    name: "ECU Installation",
    description: "Fitting and setup of your standalone or piggyback ECU.",
    price: { uk: null, pk: null },
  },
  {
    name: "ECU Custom Wiring",
    description: "Custom harness build for your ECU installation.",
    price: { uk: null, pk: null },
  },
  {
    name: "Additional Sensor for ECU",
    description: "Wideband, knock, EGT and other sensor integration.",
    price: { uk: null, pk: null },
  },
  {
    name: "Gauges Installation",
    description: "Boost, AFR, oil, EGT and other gauge fitting.",
    price: { uk: null, pk: null },
  },
];

/** Shown wherever an "Ask for pricing" item appears. */
export const variablePriceNote =
  "Installation pricing varies by vehicle and complexity — ask for details before placing an order.";

export const FLEX_FUEL_LABEL = "Flex Fuel (Pump Gas + E85)";

export const fuelTypeOptions = ["Pump Gas Premium", "E85", FLEX_FUEL_LABEL] as const;

/** Only Flex Fuel carries a surcharge — Pump Gas and E85 are the same base tune price. */
export const flexFuelSurcharge: RegionPrice = { uk: 150, pk: null };

export type PreDynoTest = {
  name: string;
  description: string;
  price: RegionPrice;
};

export const preDynoTests: PreDynoTest[] = [
  {
    name: "Boost Leak Test",
    description: "Pressurised system check for leaks across the intake & charge pipe system.",
    price: { uk: 50, pk: null },
  },
  {
    name: "Compression Test",
    description: "Per-cylinder compression check to confirm engine health before tuning.",
    price: { uk: 30, pk: null },
  },
  {
    name: "Cylinder Leakdown Test",
    description: "Diagnoses valve, piston ring & head gasket condition with more precision than a compression test.",
    price: { uk: 50, pk: null },
  },
  {
    name: "Valve Lash Adjustment",
    description: "Valve clearance check & adjustment to manufacturer or performance spec.",
    price: { uk: 75, pk: null },
  },
  {
    name: "Spark Plug Gap Check & Set",
    description: "Verifies and sets plug gap to suit fuel type & boost level.",
    price: { uk: 30, pk: null },
  },
  {
    name: "Injector Flow Test & Cleaning",
    description: "Flow-bench test and ultrasonic cleaning to confirm injector health and a matched flow set.",
    price: { uk: 100, pk: null },
  },
];

export const rollingRoad = {
  ratePerHour: { uk: 100, pk: null } as RegionPrice,
  currency: "£",
  location: "Manchester, UK",
  bookingPolicy:
    "Rolling road dyno tune sessions require pre-booking and a deposit. No-show bookings forfeit the booking fee — it is non-refundable.",
};

/**
 * Dyno time rented on its own — no tuning included. For customers who
 * already have a map and just want logged pulls, want to verify their own
 * tune, or need before/after runs. Separate from `rollingRoad`, which is
 * the dyno time billed as part of a tuning session.
 */
export const dynoRental = {
  perTwoRuns: { uk: 50, pk: null } as RegionPrice,
  perHour: { uk: 100, pk: null } as RegionPrice,
  bookingPolicy:
    "Dyno rental sessions require pre-booking and a deposit. No-show bookings forfeit the booking fee — it is non-refundable.",
};

/** Dyno time is billed separately from the flat tune price — this explains the typical range. */
export const dynoHoursGuidance =
  "Dyno time is billed separately from the tune price, typically 1 hour for naturally aspirated engines without variable valve timing (VVTi/VTEC), and 2–4 hours for forced induction or more complex builds — the exact time depends on your build list and power target.";

export type TunePackage = {
  label: string;
  price: RegionPrice;
  description: string;
};

/**
 * Fixed price packages for naturally aspirated (N/A) builds — flat across
 * all three tuning methods. UK and Pakistan pricing are set independently.
 */
export const naTunePackages: {
  remoteTune: TunePackage;
  roadTune: TunePackage;
  dynoTune: TunePackage;
} = {
  remoteTune: {
    label: "Remote Tune (NA)",
    price: { uk: 300, pk: null },
    description: "A custom tune written live over a remote connection — no dyno time required.",
  },
  roadTune: {
    label: "Road Tune (NA)",
    price: { uk: 300, pk: null },
    description: "A custom tune written from road-driven datalogs — no dyno time required.",
  },
  dynoTune: {
    label: "Rolling Road Dyno Tune (NA)",
    price: { uk: 300, pk: null },
    description:
      "Flat tune rate for naturally aspirated builds — dyno time is billed separately at the hourly rate.",
  },
};

export type ForcedInductionUplift = {
  key: "stock" | "built";
  label: string;
  amount: RegionPrice;
  description: string;
};

/**
 * Added on top of the basic NA tune price for any build running a power
 * adder — applies across remote, road and rolling road dyno tuning alike.
 */
export const forcedInductionUplifts: ForcedInductionUplift[] = [
  {
    key: "stock",
    label: "Stock Internal — Turbo / Supercharged / Nitrous",
    amount: { uk: 100, pk: null },
    description: "Factory-internal engine running a power adder.",
  },
  {
    key: "built",
    label: "Built Internal — Turbo / Supercharged / Nitrous",
    amount: { uk: 250, pk: null },
    description: "Aftermarket/forged internals running a power adder.",
  },
];
