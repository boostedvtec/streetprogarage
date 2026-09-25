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
    question: "Do you tune Honda ECUs like the P28, Hondata S300, KPro, FlashPro or Ktuner?",
    answer:
      "Yes. Alongside stock ECU reflashing via HP Tuners, we work with Honda-specific platforms including Hondata FlashPro, KPro and S300, Ktuner, the P28 (chipped), Hondavert, HTS and Neptune RTP — covering D-series, B-series, H-series, F-series, K-series and R-series Civic, Integra, S2000 and Prelude builds.",
  },
  {
    question: "Do you tune Skyline, GT-R, Silvia, S2000, Celica, Chaser and RX-7?",
    answer:
      "Yes. We tune Nissan Skyline and GT-R (RB20, RB25, RB26), Silvia and 200SX (SR20DET, CA18DET), Honda S2000, Toyota Celica GT-Four (3S-GTE) and Chaser (1JZ-GTE), and Mazda RX-7 (13B-REW) — on stock ECU where possible (Nistune, Hondata) or standalone (Link, Haltech, MaxxECU, AEM, EcuMaster).",
  },
  {
    question: "Which standalone ECUs do you support?",
    answer:
      "AEM Infinity, Link ECU, MaxxECU, Haltech, Speeduino, Megasquirt (both tuned via TunerStudio), ME (Motorsport Electronics), and EcuMaster (including the DET3+). If your ECU can be logged and tuned, we can very likely work with it — submit your build list if you're not sure.",
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
      "Honda Civic, Integra, CRX, Del Sol and Prelude across D-series, B-series, H-series and F-series OBD1 engines, plus K20/K24 and R18 K/R-series builds. Toyota Supra and MR2 (2JZGTE, 3SGTE), Toyota 2ZZ-GE, Mitsubishi Lancer Evo I–III, IV–VI and VIII–IX (4G63T), Subaru Impreza WRX and STI across the UK 2000 model, 2001–05 (race ROM upgrade) and 2006-onward generations, Nissan Pulsar GTiR (SR20DET), and Mazda Miata/MX-5 in naturally aspirated, turbo and supercharged form — plus plenty of other JDM swaps on request.",
  },
  {
    question: "I'm stuck mid-build or my project is incomplete — can you help?",
    answer:
      "Yes — this is one of the most common jobs we take on. If a build has stalled, a previous shop left it half-finished, or you're not sure what's wrong after a swap or wiring job, send us the build list and we'll diagnose where it stands and what's needed to get it running and tuned properly, rather than starting over from scratch.",
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
    question: "Can you tune my car remotely if I'm not near Manchester or Karachi?",
    answer:
      "Yes. Remote ECU tuning works anywhere in the world with a laptop, the right ECU interface cable and a stable connection. We tune live over a remote session or from datalogs you record, and send back revised maps until it's right — used by customers on Honda, Subaru, Toyota, Nissan, Mitsubishi and Mazda builds.",
  },
  {
    question: "How much does ECU tuning or a dyno tune cost?",
    answer:
      "Every tune is custom-written, so the price depends on your ECU platform, engine and how much work the build needs. Submit your build list for a ballpark price — UK customers get an instant range — and we confirm the exact quote after reviewing your full setup. Dyno time is billed separately from the tune.",
  },
  {
    question: "Do you supply and install standalone ECUs like MaxxECU, Link, Haltech or AEM?",
    answer:
      "Yes. We can supply, wire and install standalone ECUs — MaxxECU, Link, Haltech, AEM Infinity, EcuMaster, Speeduino and Megasquirt — then tune them, so the install and the tune are done by the same people. Custom harnesses and gauge fitting are available too.",
  },
  {
    question: "Do you do JDM engine swaps as well as tuning?",
    answer:
      "Yes — from mini D-series swaps to K-swaps, B-series, 2JZ, 2ZZ and SR20 builds. Engine swap and build work is done at our Karachi workshop, and we handle the wiring, ECU installation and tuning so the whole build is finished properly.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Submit your build list through our Build List & Quote form — tell us your vehicle, engine, mods, ECU and goals. UK customers get an instant ballpark price range; every tune is custom-written, so the exact quote is confirmed after we review your full build.",
  },
];
