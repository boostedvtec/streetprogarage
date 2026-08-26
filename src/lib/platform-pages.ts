export type PlatformPage = {
  slug: string;
  /** Short name used in nav/card contexts. */
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  models: string;
  engines: string[];
  ecuOptions: string[];
  buildNotes: string[];
  faqs: { question: string; answer: string }[];
};

/**
 * Dedicated SEO landing pages for major platform clusters, rendered by
 * /tuning/[platform]. Keep engine codes and ECU names consistent with
 * tunedVehiclePlatforms/supportedEcus in site-config.ts — this is the
 * deep-dive version of that same data, one platform per page instead of
 * one card on the main Tuning page.
 */
export const platformPages: PlatformPage[] = [
  {
    slug: "honda-obd1",
    name: "Honda OBD1 (D/B/H/F-Series)",
    metaTitle: "Honda OBD1 D/B/H/F-Series ECU Tuning | Street PRO Garage",
    metaDescription:
      "ECU tuning for Honda OBD1 D16, B16, B18, B20, H22, H23 and F20B/F22/F23 swaps — P28 (chipped), Hondata S300, Hondavert, HTS. Remote, road-logged or rolling road dyno tuning.",
    h1: "Honda OBD1 Tuning — D, B, H & F-Series",
    intro:
      "Classic Honda OBD1 tuning across D-series, B-series, H-series and F-series swaps — Civic, CRX, Del Sol and Prelude builds, including mini D16 swaps. Every tune is written from scratch for your actual engine, mods and fuel, not a generic chip.",
    models: "Civic, CRX, Del Sol & Prelude — OBD1 swaps, including mini D16 swaps",
    engines: ["D16", "B16", "B18", "B20", "H22", "H23", "F20B", "F22", "F23"],
    ecuOptions: ["Honda P28 (chipped)", "Hondata S300", "Hondavert", "HTS", "Neptune RTP"],
    buildNotes: [
      "P28 ECU socketing & bench testing for fast chip-based map swaps",
      "Hondata, Snake EMU or Cobra RTP installation and setup",
      "Custom wiring for swaps and standalone conversions",
      "Diagnostics if a previous OBD1 build or chip tune is stuck or misbehaving",
    ],
    faqs: [
      {
        question: "Do you tune Honda ECUs like the P28, Hondata S300, or Hondavert?",
        answer:
          "Yes. Alongside stock ECU reflashing via HP Tuners, we work with Honda-specific platforms including the P28 (chipped), Hondata S300, Hondavert, HTS and Neptune RTP — covering D-series, B-series, H-series and F-series Civic, Integra, CRX, Del Sol and Prelude builds.",
      },
      {
        question: "Can I get a revision after my final tune?",
        answer:
          "Yes. If you notice a cold-start issue or need a revision after your final tune, let us know within 14 days and it's free. After that window, revisions are chargeable at our standard revision rate.",
      },
    ],
  },
  {
    slug: "honda-k-series",
    name: "Honda K & R-Series (K20/K24/R18)",
    metaTitle: "Honda K20, K24 & R18 ECU Tuning | Street PRO Garage",
    metaDescription:
      "ECU tuning for Honda K20, K24 and R18 builds — Civic, EP3 Type R and K-swaps — on Hondata KPro, MaxxECU or Haltech standalone. Remote, road-logged or rolling road dyno tuning.",
    h1: "Honda K & R-Series Tuning — K20, K24 & R18",
    intro:
      "K-series and R18 tuning for Civic K-swaps and EP3 Type R builds, from stock-turbo K24 tunes through to full standalone conversions. We've dyno-proven results on both piggyback and standalone setups.",
    models: "Civic (incl. EP3 Type R), K20/K24 & R18 swaps",
    engines: ["K20", "K24", "R18"],
    ecuOptions: ["Hondata KPro", "MaxxECU", "Haltech", "AEM Infinity"],
    buildNotes: [
      "K-swap wiring and standalone ECU installation",
      "Turbo K-series tuning — single-turbo kits, flex fuel, launch control and anti-lag",
      "Rolling road dyno tuning with before/after logged pulls",
      "Diagnostics for a stalled or half-finished K-swap",
    ],
    faqs: [
      {
        question: "Which standalone ECUs do you support for K-series builds?",
        answer:
          "Hondata KPro for a plug-and-play K-series solution, plus MaxxECU, Haltech and AEM Infinity for fuller standalone conversions — including turbo K20/K24 builds on flex fuel.",
      },
      {
        question: "Is dyno time included in the tuning price?",
        answer:
          "No — the tune price and dyno time are billed separately. Dyno time is typically 2–4 hours for turbo K-series builds, depending on your build list and power target.",
      },
    ],
  },
  {
    slug: "subaru-wrx-sti",
    name: "Subaru WRX/STI",
    metaTitle: "Subaru WRX & STI ECU Tuning | Street PRO Garage",
    metaDescription:
      "ECU tuning for Subaru Impreza WRX & STI — UK 2000 model, 2001–05 with race ROM upgrade, and 2006-onward. Stock ECU reflash via HP Tuners plus standalone options.",
    h1: "Subaru WRX & STI Tuning",
    intro:
      "Subaru Impreza WRX and STI tuning across three distinct generations — the UK 2000 model, 2001–05 cars (with a race ROM upgrade for more headroom and features), and 2006-onward models. Every map is written for your actual mods and fuel.",
    models: "Impreza WRX & STI — UK 2000 model, 2001–05 (race ROM upgrade), 2006 onward",
    engines: ["EJ20", "EJ25"],
    ecuOptions: ["Stock ECU (HP Tuners reflash)", "MaxxECU", "Link ECU", "AEM Infinity"],
    buildNotes: [
      "Stock ECU reflashing via HP Tuners — credit-locked, purchased separately",
      "Race ROM upgrade tuning for 2001–05 cars needing more features/headroom",
      "Standalone conversions for heavily built or non-stock-ECU-compatible cars",
      "Flex fuel and forced-induction tuning across all three generations",
    ],
    faqs: [
      {
        question: "Which Subaru WRX/STI generations do you tune?",
        answer:
          "The UK 2000 model, 2001–05 cars (with a race ROM upgrade for more headroom and features), and 2006-onward models — stock ECU reflash via HP Tuners, or standalone if the build calls for it.",
      },
      {
        question: "Do you offer flex fuel tuning?",
        answer:
          "Yes — Pump Gas Premium, E85, and Flex Fuel (a blend of both) are all supported fuel types on Subaru builds. Flex Fuel tuning carries a small surcharge over a single-fuel setup.",
      },
    ],
  },
  {
    slug: "mitsubishi-evo",
    name: "Mitsubishi Lancer Evo",
    metaTitle: "Mitsubishi Lancer Evo ECU Tuning | Street PRO Garage",
    metaDescription:
      "ECU tuning for Mitsubishi Lancer Evo I–III, IV–VI and VIII–IX (4G63T) — stock ECU, AEM Infinity, MegaSquirt or MaxxECU standalone. Remote or rolling road dyno tuning.",
    h1: "Mitsubishi Lancer Evo Tuning",
    intro:
      "Lancer Evo tuning across the 4G63T-powered generations — Evo I–III, IV–VI and VIII–IX — on stock ECU or a full standalone conversion. Custom-written maps for your turbo, fuelling and power target, not a canned Evo map.",
    models: "Lancer Evo I–III, IV–VI & VIII–IX",
    engines: ["4G63T"],
    ecuOptions: ["Stock ECU (HP Tuners reflash)", "AEM Infinity", "MegaSquirt (TunerStudio)", "MaxxECU"],
    buildNotes: [
      "Stock ECU reflash for lightly modified cars",
      "Standalone conversions (AEM Infinity, MegaSquirt, MaxxECU) for built engines and big turbo setups",
      "Flex fuel and anti-lag mapping",
      "Wiring for standalone conversions and sensor integration",
    ],
    faqs: [
      {
        question: "Which Evo generations do you tune?",
        answer:
          "Evo I–III, IV–VI and VIII–IX — all 4G63T-powered — on stock ECU or standalone (AEM Infinity, MegaSquirt via TunerStudio, or MaxxECU) depending on your build.",
      },
      {
        question: "What's the difference between remote tuning, road tuning, and rolling road dyno tuning?",
        answer:
          "Remote tuning is a live session over a remote connection while you drive or run the car. Road tuning is done from datalogs you record yourself. Rolling road dyno tuning happens live on our in-house dyno in Manchester, with real-time adjustment.",
      },
    ],
  },
  {
    slug: "toyota-supra-mr2",
    name: "Toyota Supra & MR2",
    metaTitle: "Toyota Supra & MR2 ECU Tuning — 2JZGTE, 3SGTE | Street PRO Garage",
    metaDescription:
      "ECU tuning for Toyota Supra 2JZGTE, MR2 Turbo 3SGTE, and 2ZZ-GE builds on AEM Infinity or EcuMaster standalone. Remote, road-logged or rolling road dyno tuning.",
    h1: "Toyota Supra & MR2 Tuning",
    intro:
      "Toyota Supra 2JZGTE, MR2 Turbo 3SGTE and 2ZZ-GE tuning on standalone ECUs — from stock-turbo daily builds to big single-turbo setups on flex fuel.",
    models: "Supra & MR2 Turbo — 2JZGTE, 3SGTE and 2ZZ-GE",
    engines: ["2JZGTE", "3SGTE", "2ZZ-GE"],
    ecuOptions: ["AEM Infinity", "EcuMaster (incl. DET3+)"],
    buildNotes: [
      "Standalone ECU installation and wiring for 2JZGTE, 3SGTE and 2ZZ-GE swaps",
      "Single-turbo and big-turbo tuning with flex fuel",
      "Rolling road dyno tuning with full datalogging",
      "Diagnostics for a stalled swap or a standalone setup that won't start/idle right",
    ],
    faqs: [
      {
        question: "Which ECUs do you use for Supra and MR2 builds?",
        answer:
          "AEM Infinity and EcuMaster (including the DET3+) standalone, covering 2JZGTE Supra, 3SGTE MR2 Turbo, and 2ZZ-GE swaps.",
      },
      {
        question: "I'm stuck mid-build or my project is incomplete — can you help?",
        answer:
          "Yes — this is one of the most common jobs we take on. Send us the build list and we'll diagnose where it stands and what's needed to get it running and tuned properly.",
      },
    ],
  },
  {
    slug: "mazda-miata-mx5",
    name: "Mazda Miata / MX-5",
    metaTitle: "Mazda Miata / MX-5 ECU Tuning | Street PRO Garage",
    metaDescription:
      "ECU tuning for Mazda Miata/MX-5 — naturally aspirated, turbo and supercharged builds — on standalone ECUs. Remote, road-logged or rolling road dyno tuning.",
    h1: "Mazda Miata / MX-5 Tuning",
    intro:
      "Miata/MX-5 tuning across naturally aspirated, turbo and supercharged builds — from a mild NA tune to a fully boosted standalone conversion.",
    models: "Miata/MX-5 — naturally aspirated, turbo & supercharged",
    engines: ["B6", "BP", "NB", "NC"],
    ecuOptions: ["MaxxECU", "Haltech", "Link ECU", "Megasquirt (TunerStudio)"],
    buildNotes: [
      "Standalone ECU wiring and installation for turbo/supercharged conversions",
      "Naturally aspirated tuning for cams, headers and intake changes",
      "Flex fuel tuning for forced-induction builds",
      "Gauge installation — boost, AFR, oil pressure and more",
    ],
    faqs: [
      {
        question: "Do you tune both naturally aspirated and forced-induction Miatas?",
        answer:
          "Yes — naturally aspirated builds (cams, headers, intake) and forced-induction conversions (turbo or supercharged) on standalone ECUs including MaxxECU, Haltech, Link ECU and Megasquirt.",
      },
      {
        question: "Where is Street PRO Garage located?",
        answer:
          "Our rolling road dyno and workshop are based in Manchester, United Kingdom, with a second workshop in Karachi, Pakistan. Remote ECU tuning is available worldwide regardless of location.",
      },
    ],
  },
  {
    slug: "nissan-pulsar",
    name: "Nissan Pulsar GTiR",
    metaTitle: "Nissan Pulsar GTiR ECU Tuning (SR20DET) | Street PRO Garage",
    metaDescription:
      "ECU tuning for Nissan Pulsar GTiR SR20DET builds — stock ECU on Nistune, or Link ECU standalone. Remote, road-logged or rolling road dyno tuning.",
    h1: "Nissan Pulsar GTiR Tuning",
    intro:
      "SR20DET Pulsar GTiR tuning on stock ECU via Nistune reflash, or a full Link ECU standalone conversion for built/modified engines.",
    models: "Pulsar GTiR — stock ECU on Nistune, or Link ECU standalone",
    engines: ["SR20DET"],
    ecuOptions: ["Nistune (stock ECU reflash)", "Link ECU"],
    buildNotes: [
      "Nistune daughterboard installation and stock ECU reflash tuning",
      "Link ECU standalone conversion and wiring for built/modified SR20DET",
      "Flex fuel and forced-induction tuning",
      "Diagnostics for a stalled swap or wiring done elsewhere",
    ],
    faqs: [
      {
        question: "Do you tune the Nissan Pulsar GTiR?",
        answer:
          "Yes — stock ECU tuning via Nistune reflash for lightly modified cars, or a Link ECU standalone conversion for built/modified SR20DET engines.",
      },
      {
        question: "How do I get a quote?",
        answer:
          "Submit your build list through our Build List & Quote form — tell us your vehicle, engine, mods, ECU and goals, and we'll confirm your quote after reviewing the full build.",
      },
    ],
  },
];
