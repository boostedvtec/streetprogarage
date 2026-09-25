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
    metaTitle: "Honda D16 B16 B18 H22 ECU Tuning — Remote & Dyno | Street PRO Garage",
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
    metaTitle: "Honda K20 K24 R18 Tuning — Hondata KPro & Turbo | Street PRO Garage",
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
    metaTitle: "Subaru WRX & STI Remap & ECU Tuning — Remote & Dyno | Street PRO Garage",
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
    metaTitle: "Mitsubishi Evo ECU Tuning — Evo 1-9 Remote & Dyno | Street PRO Garage",
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
    metaTitle: "Toyota 2JZ, MR2 3SGTE & 2ZZ Tuning — Standalone ECU | Street PRO Garage",
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
    metaTitle: "Mazda MX-5 Miata Turbo & NA ECU Tuning | Street PRO Garage",
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
    metaTitle: "Nissan SR20DET Pulsar GTiR Tuning — Nistune & Link | Street PRO Garage",
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
  {
    slug: "nissan-skyline-gtr",
    name: "Nissan Skyline & GT-R",
    metaTitle: "Nissan Skyline GT-R RB25 RB26 ECU Tuning — Remote & Dyno | Street PRO Garage",
    metaDescription:
      "ECU tuning for Nissan Skyline and GT-R — RB20, RB25DET and RB26DETT — on Nistune, Haltech, Link, MaxxECU or AEM Infinity. Remote e-tuning or rolling road dyno tuning. Get a quote.",
    h1: "Nissan Skyline & GT-R Tuning — RB20, RB25 & RB26",
    intro:
      "RB-powered Skylines and GT-Rs tuned properly — stock ECU on Nistune for lightly modified cars, or a full standalone conversion for big-turbo builds. Custom-written maps, not a generic file.",
    models: "Skyline (R32, R33, R34) & GT-R — RB20DET, RB25DET, RB26DETT",
    engines: ["RB20DET", "RB25DET", "RB26DETT"],
    ecuOptions: ["Nistune (stock ECU reflash)", "Haltech", "Link ECU", "MaxxECU", "AEM Infinity"],
    buildNotes: [
      "Nistune installation and stock ECU reflash tuning",
      "Standalone conversions for big-turbo and built RB engines",
      "Flex fuel, launch control and boost-by-gear mapping",
      "Diagnostics for a stalled RB build or wiring done elsewhere",
    ],
    faqs: [
      {
        question: "Do you tune Skyline and GT-R RB engines?",
        answer:
          "Yes — RB20DET, RB25DET and RB26DETT builds on Nistune, Haltech, Link, MaxxECU or AEM Infinity, tuned remotely or on our rolling road dyno.",
      },
      {
        question: "Can you tune my Skyline remotely?",
        answer:
          "Yes. Remote e-tuning works anywhere in the world with a laptop and the right interface cable — live over a remote session or from datalogs you record.",
      },
    ],
  },
  {
    slug: "nissan-silvia-200sx",
    name: "Nissan Silvia & 200SX",
    metaTitle: "Nissan Silvia S13 S14 S15 200SX SR20DET Tuning | Street PRO Garage",
    metaDescription:
      "ECU tuning for Nissan Silvia S13, S14, S15 and 200SX — SR20DET and CA18DET — on Nistune, Link, Haltech or MaxxECU. Remote and dyno tuning, plus SR20 swaps. Get a quote.",
    h1: "Nissan Silvia & 200SX Tuning — SR20DET & CA18DET",
    intro:
      "Silvia and 200SX tuning for stock-ECU Nistune builds through to full standalone conversions on SR20DET and CA18DET engines, including SR20 swaps into other chassis.",
    models: "Silvia S13, S14, S15 & 200SX — SR20DET and CA18DET",
    engines: ["SR20DET", "CA18DET"],
    ecuOptions: ["Nistune (stock ECU reflash)", "Link ECU", "Haltech", "MaxxECU"],
    buildNotes: [
      "Nistune installation and stock ECU reflash tuning",
      "Standalone ECU conversion and wiring for big-turbo SR20DET",
      "SR20 swap wiring, ECU installation and tuning",
      "Diagnostics for a half-finished or stalled swap",
    ],
    faqs: [
      {
        question: "Do you tune Silvia and 200SX SR20DET engines?",
        answer:
          "Yes — SR20DET and CA18DET builds on Nistune for stock-ECU cars, or Link, Haltech and MaxxECU standalone for built engines.",
      },
      {
        question: "Do you do SR20 swaps?",
        answer:
          "Yes — swap wiring, standalone ECU installation and tuning, so the whole build is finished properly. Swap and build work is done at our Karachi workshop.",
      },
    ],
  },
  {
    slug: "honda-s2000",
    name: "Honda S2000",
    metaTitle: "Honda S2000 ECU Tuning — Hondata FlashPro, Turbo & NA | Street PRO Garage",
    metaDescription:
      "Honda S2000 tuning on Hondata FlashPro or standalone (MaxxECU, Haltech) — naturally aspirated, supercharged and turbo F20C/F22C builds. Remote and dyno tuning. Get a quote.",
    h1: "Honda S2000 Tuning — F20C & F22C",
    intro:
      "S2000 tuning for naturally aspirated cars on Hondata FlashPro through to supercharged and turbo builds on a standalone ECU, tuned remotely or on our rolling road dyno.",
    models: "Honda S2000 (AP1 & AP2) — naturally aspirated, supercharged & turbo",
    engines: ["F20C", "F22C"],
    ecuOptions: ["Hondata FlashPro", "MaxxECU", "Haltech"],
    buildNotes: [
      "Hondata FlashPro tuning for NA and bolt-on cars",
      "Supercharger and turbo S2000 tuning on standalone",
      "Flex fuel and E85 tuning",
      "Rolling road dyno tuning with logged before/after pulls",
    ],
    faqs: [
      {
        question: "Do you tune the Honda S2000?",
        answer:
          "Yes — AP1 and AP2 cars on Hondata FlashPro, plus supercharged and turbo builds on MaxxECU or Haltech standalone.",
      },
      {
        question: "Do you take Hondata FlashPro and Ktuner jobs?",
        answer:
          "Yes — Hondata FlashPro, KPro and S300 as well as Ktuner platforms, tuned remotely from datalogs or live, or on our rolling road dyno.",
      },
    ],
  },
  {
    slug: "toyota-celica-chaser",
    name: "Toyota Celica & Chaser",
    metaTitle: "Toyota Celica GT-Four 3S-GTE & Chaser 1JZ Tuning | Street PRO Garage",
    metaDescription:
      "ECU tuning for Toyota Celica GT-Four (3S-GTE) and Chaser (1JZ-GTE) on Link, Haltech, MaxxECU, AEM or EcuMaster. Remote and dyno tuning, wiring and swaps. Get a quote.",
    h1: "Toyota Celica GT-Four & Chaser Tuning — 3S-GTE & 1JZ-GTE",
    intro:
      "Celica GT-Four and Chaser tuning on standalone ECUs, from stock-turbo daily builds to big-turbo setups, with the wiring and installation handled properly.",
    models: "Celica GT-Four (ST205) & Chaser (JZX90, JZX100)",
    engines: ["3S-GTE", "1JZ-GTE"],
    ecuOptions: ["Link ECU", "Haltech", "MaxxECU", "AEM Infinity", "EcuMaster (incl. DET3+)"],
    buildNotes: [
      "Standalone ECU installation and wiring",
      "Big-turbo tuning with boost control and flex fuel",
      "Rolling road dyno tuning with full datalogging",
      "Diagnostics for a stalled swap or a car that won't run right",
    ],
    faqs: [
      {
        question: "Do you tune the Celica GT-Four and Chaser?",
        answer:
          "Yes — 3S-GTE Celicas and 1JZ-GTE Chasers on Link, Haltech, MaxxECU, AEM Infinity or EcuMaster standalone.",
      },
      {
        question: "I'm stuck mid-build or my project is incomplete — can you help?",
        answer:
          "Yes — this is one of the most common jobs we take on. Send us the build list and we'll diagnose where it stands and what's needed to get it running and tuned properly.",
      },
    ],
  },
  {
    slug: "mazda-rx7",
    name: "Mazda RX-7",
    metaTitle: "Mazda RX-7 FD 13B-REW ECU Tuning — Standalone | Street PRO Garage",
    metaDescription:
      "ECU tuning for Mazda RX-7 (FD 13B-REW) on Link, Haltech, MaxxECU or AEM Infinity standalone — remote e-tuning or rolling road dyno tuning. Get a quote.",
    h1: "Mazda RX-7 Tuning — FD 13B-REW",
    intro:
      "RX-7 tuning on a standalone ECU with the wiring and installation done properly, then tuned remotely or on the dyno for a reliable, driveable rotary.",
    models: "Mazda RX-7 (FD3S) — 13B-REW",
    engines: ["13B-REW"],
    ecuOptions: ["Link ECU", "Haltech", "MaxxECU", "AEM Infinity"],
    buildNotes: [
      "Standalone ECU installation and wiring",
      "Sequential turbo and boost control mapping",
      "Flex fuel tuning",
      "Diagnostics for a stalled or half-finished rotary build",
    ],
    faqs: [
      {
        question: "Do you tune the Mazda RX-7?",
        answer:
          "Yes — FD RX-7 13B-REW builds on Link, Haltech, MaxxECU or AEM Infinity standalone, remotely or on our rolling road dyno.",
      },
      {
        question: "How do I get a quote?",
        answer:
          "Submit your build list through our Build List & Quote form — tell us your vehicle, engine, mods, ECU and goals, and we'll confirm your quote after reviewing the full build.",
      },
    ],
  },
];
