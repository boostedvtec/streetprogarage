export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Single source of truth for FAQ content — rendered on /faq and used to
 * generate the FAQPage structured data, so the two never drift apart.
 * Kept region-neutral (no hardcoded prices) since UK and Pakistan pricing
 * differ and this content is meant to be crawled without JS.
 */
export const faqItems: FaqItem[] = [
  {
    question: "What does Street PRO Garage do?",
    answer:
      "Street PRO Garage writes custom ECU tunes from scratch — no generic Stage 1/2/3 kits. We offer remote tuning (live or road-logged), rolling road dyno tuning in Manchester, UK, custom ECU wiring and installation, and performance parts sales with fitting (UK). In Pakistan, we also do full engine swaps and builds out of our Karachi workshop.",
  },
  {
    question: "Do you tune Honda ECUs like the P28, Hondata S300, or Hondavert?",
    answer:
      "Yes. Alongside stock ECU reflashing via HP Tuners, we work with Honda-specific platforms including the P28 (chipped), Hondata S300, Hondavert, HTS and Neptune RTP — covering D-series, B-series and K-series Civic and Integra builds.",
  },
  {
    question: "Which standalone ECUs do you support?",
    answer:
      "AEM Infinity, Link ECU, MaxxECU, Haltech, Speeduino, Megasquirt, ME (Motorsport Electronics), and EcuMaster (including the DET3+). If your ECU can be logged and tuned, we can very likely work with it — submit your build list if you're not sure.",
  },
  {
    question: "What's the difference between remote tuning, road tuning, and rolling road dyno tuning?",
    answer:
      "Remote tuning is a live session over a remote connection while you drive or run the car. Road tuning is done from datalogs you record yourself following our checklist, with maps sent back and revised. Rolling road dyno tuning happens live on our in-house dyno in Manchester, with full datalogging and real-time adjustment — dyno time is billed separately from the tune price.",
  },
  {
    question: "Is dyno time included in the tuning price?",
    answer:
      "No — the tune price and dyno time are billed separately. Dyno time is typically around 1 hour for naturally aspirated engines without variable valve timing, and 2–4 hours for forced induction or more complex builds, depending on your build list and power target.",
  },
  {
    question: "What makes and models do you regularly tune?",
    answer:
      "Honda Civic and Integra (D14, D16, B16, B18), Toyota Supra and MR2 (2JZGTE, 1JZGTE, 2ZZ), Mitsubishi Lancer Evo V through X (4G63T), Subaru Impreza WRX and STI, and Mazda MX-5 in naturally aspirated, turbo and supercharged form — plus plenty of other platforms on request.",
  },
  {
    question: "Can I get a revision after my final tune?",
    answer:
      "Yes. If you notice a cold-start issue or need a revision after your final tune, let us know within 14 days and it's free. After that 14-day window, revisions are chargeable at our standard revision rate.",
  },
  {
    question: "Does my car need to be roadworthy for road tuning?",
    answer:
      "Yes. Road tuning involves driving at higher speed on public roads to gather datalogs, so your brakes, tyres, steering and suspension need to be in safe, roadworthy condition before you start — see the Pre-Tune Checklist for the full list.",
  },
  {
    question: "Do you offer flex fuel tuning?",
    answer:
      "Yes — Pump Gas Premium, E85, and Flex Fuel (a blend of both) are all supported fuel types. Flex Fuel tuning carries a small surcharge on top of the base tune price; single-fuel setups (Pump Gas or E85 alone) don't.",
  },
  {
    question: "Where is Street PRO Garage located?",
    answer:
      "Our rolling road dyno and workshop are based in Manchester, United Kingdom, with a second workshop in Karachi, Pakistan handling dyno tuning and engine swaps. Remote ECU tuning is available worldwide regardless of location.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Submit your build list through our Build List & Quote form — tell us your vehicle, engine, mods, ECU and goals. UK customers get an instant ballpark price range; every tune is custom-written, so the exact quote is confirmed after we review your full build.",
  },
];
