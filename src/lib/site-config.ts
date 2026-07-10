export const siteConfig = {
  name: "Street PRO Garage",
  shortName: "SPG",
  tagline: "Custom Built. Precision Tuned.",
  description:
    "Custom-built remote ECU tuning worldwide, rolling road dyno tuning in Manchester UK, and performance parts sales, fitting & diagnostics.",
  phone: "+44 7438 483559",
  phoneHref: "tel:+447438483559",
  email: "fradybooth@gmail.com",
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
  { href: "/tuning", label: "Tuning" },
  { href: "/custom-wiring", label: "Custom Wiring" },
  { href: "/parts", label: "Parts" },
  { href: "/contact", label: "Contact" },
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
    category: "Standalone ECUs",
    ecus: [
      "MaxxECU",
      "Link ECU",
      "Haltech",
      "Speeduino",
      "Megasquirt",
      "ME (Motorsport Electronics)",
      "AEM Infinity",
      "EcuMaster",
    ],
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
  /** null = price varies — ask for details before placing order. */
  priceFrom: number | null;
};

export const tuningAddOns: AddOn[] = [
  {
    name: "Launch Control",
    description: "Custom launch RPM & anti-stall mapping for consistent starts.",
    priceFrom: 50,
  },
  {
    name: "Anti-Lag System (ALS)",
    description: "Anti-lag mapping for turbocharged builds — reduces spool lag.",
    priceFrom: 100,
  },
  {
    name: "Pops & Bangs / Overrun Crackle",
    description: "Exhaust overrun tune for pops, bangs and crackle on decel.",
    priceFrom: 50,
  },
  {
    name: "Flex Fuel Tuning",
    description: "Ethanol content sensor integration with live-adjusting fuel & timing tables.",
    priceFrom: 150,
  },
  {
    name: "Methanol Injection Tuning",
    description: "Progressive methanol injection mapping and safety failsafes.",
    priceFrom: 100,
  },
  {
    name: "Mechanical Cam Degree Optimisation",
    description: "Cam timing verification & degreeing to match the tune to actual mechanical setup.",
    priceFrom: 100,
  },
  {
    name: "Extra Revision",
    description: "Additional tuning revision beyond what's included in your package.",
    priceFrom: 50,
  },
  {
    name: "ECU Installation",
    description: "Fitting and setup of your standalone or piggyback ECU.",
    priceFrom: null,
  },
  {
    name: "ECU Custom Wiring",
    description: "Custom harness build for your ECU installation.",
    priceFrom: null,
  },
  {
    name: "Additional Sensor for ECU",
    description: "Wideband, knock, EGT and other sensor integration.",
    priceFrom: null,
  },
  {
    name: "Gauges Installation",
    description: "Boost, AFR, oil, EGT and other gauge fitting.",
    priceFrom: null,
  },
];

/** Shown wherever an "Ask for pricing" item appears. */
export const variablePriceNote =
  "Installation pricing varies by vehicle and complexity — ask for details before placing an order.";

export type PreDynoTest = {
  name: string;
  description: string;
  priceFrom: number;
};

export const preDynoTests: PreDynoTest[] = [
  {
    name: "Boost Leak Test",
    description: "Pressurised system check for leaks across the intake & charge pipe system.",
    priceFrom: 50,
  },
  {
    name: "Compression Test",
    description: "Per-cylinder compression check to confirm engine health before tuning.",
    priceFrom: 30,
  },
  {
    name: "Cylinder Leakdown Test",
    description: "Diagnoses valve, piston ring & head gasket condition with more precision than a compression test.",
    priceFrom: 50,
  },
  {
    name: "Valve Lash Adjustment",
    description: "Valve clearance check & adjustment to manufacturer or performance spec.",
    priceFrom: 75,
  },
  {
    name: "Spark Plug Gap Check & Set",
    description: "Verifies and sets plug gap to suit fuel type & boost level.",
    priceFrom: 30,
  },
  {
    name: "Injector Flow Test & Cleaning",
    description: "Flow-bench test and ultrasonic cleaning to confirm injector health and a matched flow set.",
    priceFrom: 100,
  },
];

export const rollingRoad = {
  ratePerHour: 100,
  currency: "£",
  location: "Manchester, UK",
  bookingPolicy:
    "Rolling road dyno tune sessions require pre-booking and a deposit. No-show bookings forfeit the booking fee — it is non-refundable.",
};

export type TunePackage = {
  label: string;
  price: number;
  description: string;
};

/**
 * Fixed price packages for naturally aspirated (N/A) builds — flat across
 * all three tuning methods.
 */
export const naTunePackages: {
  remoteTune: TunePackage;
  roadTune: TunePackage;
  dynoTune: TunePackage;
} = {
  remoteTune: {
    label: "Remote Tune (NA)",
    price: 300,
    description: "A custom tune written live over a remote connection — no dyno time required.",
  },
  roadTune: {
    label: "Road Tune (NA)",
    price: 300,
    description: "A custom tune written from road-driven datalogs — no dyno time required.",
  },
  dynoTune: {
    label: "Rolling Road Dyno Tune (NA)",
    price: 300,
    description: "Flat rate for naturally aspirated builds — includes your rolling road dyno session.",
  },
};

export type ForcedInductionUplift = {
  key: "stock" | "built";
  label: string;
  amount: number;
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
    amount: 150,
    description: "Factory-internal engine running a power adder.",
  },
  {
    key: "built",
    label: "Built Internal — Turbo / Supercharged / Nitrous",
    amount: 250,
    description: "Aftermarket/forged internals running a power adder.",
  },
];
