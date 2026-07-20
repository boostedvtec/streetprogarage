export type Product = {
  slug: string;
  name: string;
  category: string;
  /** null = price varies — ask for details before ordering. */
  price: number | null;
  description: string;
  fitting: boolean;
  compatibility: string;
  /** True if `price` excludes VAT (VAT gets added at checkout) rather than being the final price. */
  exVat?: boolean;
};

export const categories = [
  "Turbo & Boost",
  "Fuelling",
  "Engine Management",
  "Cooling",
  "Exhaust",
  "Drivetrain",
] as const;

/**
 * Sample placeholder catalog. Replace with real inventory, pricing and
 * product photography before launch.
 */
export const products: Product[] = [
  {
    slug: "stage-2-hybrid-turbo",
    name: "Stage 2 Hybrid Turbocharger",
    category: "Turbo & Boost",
    price: 895,
    description:
      "Uprated hybrid turbo core with billet compressor wheel — supports mid-range power builds. Professional fitting available.",
    fitting: true,
    compatibility: "Honda K-Series, Subaru EJ/FA, Mitsubishi 4G63",
  },
  {
    slug: "adjustable-boost-controller",
    name: "Adjustable Manual Boost Controller",
    category: "Turbo & Boost",
    price: 65,
    description:
      "In-cabin adjustable boost controller for precise, repeatable boost targets.",
    fitting: true,
    compatibility: "Universal — turbocharged applications",
  },
  {
    slug: "1000cc-fuel-injectors-set",
    name: "1000cc Fuel Injectors (Set of 4)",
    category: "Fuelling",
    price: 320,
    description:
      "High-impedance 1000cc injectors, matched flow set — suited to high-boost, high-power builds.",
    fitting: true,
    compatibility: "Honda K/B-Series, Subaru EJ/FA, Mitsubishi 4G63",
  },
  {
    slug: "flex-fuel-sensor-kit",
    name: "Flex Fuel Sensor Kit",
    category: "Fuelling",
    price: 110,
    description:
      "Ethanol content & fuel temperature sensor kit with inline fitting hardware — required for Flex Fuel tuning.",
    fitting: true,
    compatibility: "Universal",
  },
  {
    slug: "walbro-450-fuel-pump",
    name: "450 LPH In-Tank Fuel Pump",
    category: "Fuelling",
    price: 145,
    description:
      "High-flow drop-in fuel pump for supporting power well beyond stock injector limits.",
    fitting: true,
    compatibility: "Honda, Subaru, Mitsubishi — check tank compatibility",
  },
  {
    slug: "maxxecu-street-plug-in",
    name: "MaxxECU STREET Plug-In ECU",
    category: "Engine Management",
    price: 780,
    description:
      "Plug-in standalone ECU with full tuning capability — includes base setup as part of fitting.",
    fitting: true,
    compatibility: "Model-specific plug-in loom — confirm your vehicle",
  },
  {
    slug: "wideband-afr-gauge",
    name: "AEM Wideband AFR Gauge",
    category: "Engine Management",
    price: 195,
    description:
      "AEM digital wideband air/fuel ratio gauge with data output for logging — required for most tuning packages.",
    fitting: true,
    compatibility: "Universal",
  },
  {
    slug: "honda-p28-socketed-ecu-refurbished",
    name: "Honda P28 Socketed ECU (Refurbished, Bench Tested)",
    category: "Engine Management",
    price: 400,
    description:
      "Pre-socketed, bench-tested Honda P28 ECU, refurbished and ready to run — chip-swappable straight out of the box.",
    fitting: true,
    compatibility: "Honda OBD1 — confirm engine bay compatibility before ordering",
  },
  {
    slug: "honda-obd1-base-map-chip",
    name: "Honda OBD1 Base Map Chip",
    category: "Engine Management",
    price: 50,
    description:
      "Base map tuning chip for Honda OBD1 ECUs. Add your engine code (D-, B-, H- or F-series) in the order notes before purchase so we supply the correct base map.",
    fitting: false,
    compatibility: "Honda OBD1 D/B/H/F-series — confirm engine code before ordering",
  },
  {
    slug: "ecumaster-det3-plus",
    name: "EcuMaster DET3+",
    category: "Engine Management",
    price: null,
    description:
      "Standalone plug-in ECU — price varies by vehicle and kit. Ask for a quote for your specific application.",
    fitting: true,
    compatibility: "Model-specific plug-in loom — confirm your vehicle",
  },
  {
    slug: "aluminium-front-mount-intercooler",
    name: "Aluminium Front Mount Intercooler",
    category: "Cooling",
    price: 385,
    description:
      "Larger core front-mount intercooler for reduced charge temperatures under sustained boost.",
    fitting: true,
    compatibility: "Model-specific core & pipe kit — confirm your vehicle",
  },
  {
    slug: "oil-cooler-kit",
    name: "Oil Cooler Kit",
    category: "Cooling",
    price: 210,
    description:
      "Thermostatic oil cooler kit to protect engine oil temperatures during track and dyno use.",
    fitting: true,
    compatibility: "Universal — mounting kit varies by vehicle",
  },
  {
    slug: "cat-back-exhaust-system",
    name: "Cat-Back Exhaust System",
    category: "Exhaust",
    price: 460,
    description:
      "Mandrel-bent stainless cat-back system for improved flow — pairs well with pops & bangs tuning.",
    fitting: true,
    compatibility: "Model-specific fitment — confirm your vehicle",
  },
  {
    slug: "decat-downpipe",
    name: "De-Cat Downpipe",
    category: "Exhaust",
    price: 240,
    description:
      "High-flow de-cat downpipe for turbocharged applications — off-road use only.",
    fitting: true,
    compatibility: "Model-specific fitment — confirm your vehicle",
  },
  {
    slug: "stage-2-clutch-kit",
    name: "Stage 2 Performance Clutch Kit",
    category: "Drivetrain",
    price: 340,
    description:
      "Uprated clutch kit rated for moderate power increases over stock, with organic/kevlar friction disc.",
    fitting: true,
    compatibility: "Model-specific fitment — confirm your vehicle",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
