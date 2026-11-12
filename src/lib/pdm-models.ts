/**
 * PDM (power distribution module) models for the custom-wiring page.
 *
 * Every figure below was taken from the manufacturer's own published page and
 * checked in November 2026. Specifications change between revisions, so the
 * page tells visitors we confirm the exact model and ECU pairing before
 * quoting. To add a model, add an entry here; the page renders it.
 *
 * Deliberately left out: prices (they move) and any claim the manufacturer
 * does not make, such as ECU compatibility they do not list.
 */
export type PdmModel = {
  brand: string;
  model: string;
  /** One line: what it is. */
  summary: string;
  specs: string[];
  /** What it is documented to work with. */
  pairsWith: string;
  /** Manufacturer's own page. */
  url: string;
};

export const pdmSpecsChecked = "November 2026";

export const pdmModels: PdmModel[] = [
  {
    brand: "Haltech",
    model: "PD16",
    summary: "16-output PDM built into the Haltech CAN network.",
    specs: [
      "10 high-side outputs, 2 half-bridge outputs and 4 × 25 A high-current outputs",
      "8 inputs plus a dedicated ignition switch input",
      "120 A SurLok main power connector",
    ],
    pairsWith: "Haltech Elite and Nexus ECUs only. It does not work as a stand-alone PDM.",
    url: "https://www.haltech.com/product/ht-198000/",
  },
  {
    brand: "PLEX",
    model: "PDM-13",
    summary: "13-channel solid-state PDM, 100 A continuous.",
    specs: [
      "4 × 7 A, 8 × 15 A and 1 × 45 A outputs, with PWM on three outputs",
      "CAN with CAN-FD support, 250 kbit to 5 Mbit",
      "IP67 machined aluminium case, 54 × 80 × 34 mm, 215 g",
      "Set up in PLEX Device Manager V2",
    ],
    pairsWith: "PLEX lists support for many ECUs, including Haltech, Link, MaxxECU, MoTeC, Syvecs and Megasquirt.",
    url: "https://www.plex-tuning.com/product/plex-pdm-13/",
  },
  {
    brand: "Hardwire Electronics",
    model: "PDM28",
    summary: "28 high or low-side outputs. Designed and made in the UK.",
    specs: ["3 × CAN and LIN bus", "IP67 machined aluminium enclosure"],
    pairsWith: "CAN-based. We confirm your ECU's CAN output before recommending it.",
    url: "https://www.hardwire-electronics.co.uk/",
  },
  {
    brand: "Hardwire Electronics",
    model: "PDM15 / PDM25 / PDM35 V2",
    summary: "15, 25 or 35 outputs in a compact case.",
    specs: ["IP67 enclosure", "9-axis IMU", "DBC file import for CAN set-up"],
    pairsWith: "CAN-based. We confirm your ECU's CAN output before recommending it.",
    url: "https://www.hardwire-electronics.co.uk/",
  },
  {
    brand: "MoTeC",
    model: "PDM15 / PDM30 / PDM32",
    summary: "15, 30 and 32 output PDMs, controlled by switches, CAN messages and logic.",
    specs: [
      "PDM15: 8 × 20 A and 7 × 8 A outputs, 16 switch inputs",
      "PDM30: 8 × 20 A and 22 × 8 A outputs, 16 switch inputs",
      "PDM32: 8 × 20 A and 24 × 8 A outputs, 23 switch inputs",
      "Outputs programmable in 1 A steps, with over-current, short-circuit and thermal protection",
    ],
    pairsWith: "MoTeC M1 ECUs (package dependent) and MoTeC dashes and loggers.",
    url: "https://www.motec.com.au/pdm15",
  },
  {
    brand: "Link ECU",
    model: "Razor PDM",
    summary: "Compact PDM with 4 high-power outputs and 8 multi-purpose channels.",
    specs: [
      "4 high-power outputs: 25 A continuous, 80 A peak, PWM capable",
      "8 ADIO channels usable as inputs or outputs, 8 A maximum output",
      "6–24 V supply, USB-C set-up and CAN with a user-set bit rate",
    ],
    pairsWith: "Made by Link. We confirm pairing with your ECU before quoting.",
    url: "https://linkecu.com/products/razor-pdm/",
  },
  {
    brand: "MaxxECU",
    model: "PDM20",
    summary: "20-output PDM, up to 230 A.",
    specs: [
      "8 × 25 A, 8 × 15 A and 4 × 8 A outputs, all PWM capable",
      "7 digital or analog inputs, 0–24 V",
      "Adjustable over-current protection with automatic restart and soft start",
      "Support for CAN keypads",
    ],
    pairsWith: "Works with all MaxxECU devices, set up in MTune over CAN.",
    url: "https://maxxecu.com/products/pdm20",
  },
  {
    brand: "Ecumaster",
    model: "PMU16 / PMU16 DL",
    summary: "16-output power management unit, 150 A total.",
    specs: [
      "10 × 25 A and 6 × 15 A outputs, with current and voltage measured on each",
      "16 analog inputs and 2 × CAN 2.0 A/B",
      "Built-in accelerometer and gyro; the DL version adds data logging",
    ],
    pairsWith: "Ecumaster EMU BLACK and EMU CAN, with CAN set-up notes published by Ecumaster.",
    url: "https://www.ecumaster.com/products/pmu/",
  },
  {
    brand: "AEM",
    model: "PDU-8",
    summary: "8-channel power distribution unit driven over CAN.",
    specs: [
      "Commanded by a controller rather than running its own logic",
      "Reports channel current and fault states back over CAN",
    ],
    pairsWith: "AEM VCU controllers, or other CAN-capable controllers that support custom CAN settings.",
    url: "https://www.aemelectronics.com/products/ev_conversions/power_distribution_unit/parts/30-8300",
  },
  {
    brand: "AiM",
    model: "PDM08 / PDM32",
    summary: "PDMs built to connect directly to AiM displays.",
    specs: [
      "Dedicated connector linking the PDM to an AiM display with the supplied cable",
      "Set up in AiM RaceStudio 3, a free download",
    ],
    pairsWith: "AiM dashes and loggers.",
    url: "https://store.aim-sportline.com/en/content/32-pdm-power-distribution-module-series",
  },
];

/** What a PDM installation covers, in order. */
export const pdmInstallSteps: { title: string; text: string }[] = [
  {
    title: "Choose the PDM",
    text: "We match channel count, current per output and ECU pairing to your build, so you buy the right unit once.",
  },
  {
    title: "List every load",
    text: "Each circuit (fuel pump, fans, water pump, lights, accessories) gets a continuous and peak current figure, which sets output and wire sizing.",
  },
  {
    title: "Mount and feed",
    text: "Mounted dry and ventilated, close to the battery. Main feed sized and fused for the total load, with a solid earth.",
  },
  {
    title: "Wire outputs and inputs",
    text: "Loads, switches or keypads, ignition feed and sensor inputs are wired and labelled to match the configuration.",
  },
  {
    title: "Link it over CAN",
    text: "The PDM joins your ECU, dash and keypads on a properly terminated CAN bus.",
  },
  {
    title: "Configure the outputs",
    text: "In the manufacturer's software: output logic, current limits, soft start, fan control and what each output does if something fails.",
  },
  {
    title: "Test under load",
    text: "Every output is checked, fault behaviour is tested, and you get the finished wiring labelled and explained.",
  },
];
