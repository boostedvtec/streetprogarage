/**
 * Transmission (TCU) tuning content for the tuning page.
 *
 * Facts come from the manufacturers' own documentation, checked November 2026:
 *  - Haltech's "Toyota A340E Control" knowledge-base article
 *  - MaxxECU's 8HP feature page and 8HP documentation
 * The A340E job is one the owner recently completed. No vehicle details, results
 * or figures are stated because none were supplied. To add the project, add a
 * `recentJob` note with the vehicle and a photo.
 */
export const tcuSpecsChecked = "November 2026";

export type TcuSetup = {
  id: string;
  /** Brand logo name from ecuBrandLogos, if shown. */
  logo?: string;
  eyebrow: string;
  title: string;
  summary: string;
  /** Shown as a small tag, e.g. a recently completed job. */
  tag?: string;
  coverTitle: string;
  covers: string[];
  /** Limits and requirements the manufacturer documents. */
  checkTitle: string;
  checks: string[];
  sources: { label: string; url: string }[];
};

export const tcuSetups: TcuSetup[] = [
  {
    id: "haltech-a340e",
    logo: "Haltech",
    eyebrow: "Haltech + Toyota A340E",
    title: "Haltech A340E control",
    summary:
      "Haltech's transmission control can run the Toyota A340E four-speed automatic directly from the ECU, so shifts are calibrated alongside the engine map.",
    coverTitle: "What we set up and tune",
    covers: [
      "Wiring of the two high-side outputs that drive the S1 and S2 shift solenoids",
      "Transmission type and gear selector (PRNDL) input in the Haltech software",
      "Shift tables: when each gear change happens against throttle and speed",
      "Line pressure, so shifts hold power without being harsh",
      "Rear speed sensor and direct clutch inputs, then a check of the gear selector position channel",
    ],
    checkTitle: "Worth knowing",
    checks: [
      "Haltech notes each shift solenoid draws roughly 1 to 1.5 A, so the outputs and wiring need to suit.",
      "A tune only works as well as the transmission underneath it. Worn clutches or a damaged valve body need fixing first.",
    ],
    sources: [{ label: "Haltech: Toyota A340E control", url: "https://support.haltech.com/portal/en/kb/articles/toyota-a340e-control" }],
  },
  {
    id: "zf-8hp",
    logo: "MaxxECU",
    eyebrow: "ZF 8HP automatic",
    title: "8HP transmission tuning",
    summary:
      "The ZF 8HP eight-speed automatic, controlled from the ECU through its stock TCU, with shift points, torque handling and launch behaviour calibrated to your engine and use.",
    coverTitle: "What we tune",
    covers: [
      "Shift points and shift speed across the rev range",
      "Torque converter control and drive modes",
      "Kickdown, for fast downshifts",
      "Virtual clutch and clutch-kick behaviour",
      "Launch control and transbrake, where the build uses them",
      "Shifter set-up: Dodge, BMW or sequential shifter, or keypad shift emulation",
    ],
    checkTitle: "Check before you buy",
    checks: [
      "MaxxECU's 8HP control supports Gen 1 8HP45, 8HP70 and 8HP90 gearboxes. Send us the part number and we will confirm which you have.",
      "It controls the stock TCU, which needs a one-off reflash with an external programming tool. No internal wiring or soldering is needed.",
      "It covers the rear-wheel-drive side only. AWD, xDrive, 4WD and transfer-case control are not supported.",
      "MaxxECU documents its 8HP control as still in beta, so we confirm what your build needs before quoting.",
    ],
    sources: [
      { label: "MaxxECU: 8HP control", url: "https://www.maxxecu.com/features/8hp" },
      { label: "MaxxECU: 8HP documentation", url: "https://maxxecu.com/webhelp/advanced-8hp.html" },
    ],
  },
];

/** How a transmission tuning job runs, in order. */
export const tcuSteps: { title: string; text: string }[] = [
  {
    title: "Send the details",
    text: "Your gearbox and its part number, the ECU or TCU, the engine, the power level and how the car is used.",
  },
  {
    title: "We confirm the hardware",
    text: "We check the gearbox and controller are a supported pairing and tell you plainly if anything rules your build out.",
  },
  {
    title: "Wiring and set-up",
    text: "Solenoid, selector and speed-sensor wiring is checked or built, and the transmission is configured in the controller's software.",
  },
  {
    title: "Calibrate and test",
    text: "Shift points, line pressure and the other shift behaviour are tuned and tested, then handed over with an explanation of what was set.",
  },
];

/** Questions and answers, each backed by the manufacturer documentation noted above. */
export const tcuFaq: { q: string; a: string }[] = [
  {
    q: "Can a Haltech ECU control a Toyota A340E?",
    a: "Yes. Haltech's software includes Toyota A340E transmission control. The ECU drives the S1 and S2 shift solenoids, which Haltech says draw roughly 1 to 1.5 A each, takes a gear selector input and runs shift tables and line pressure control.",
  },
  {
    q: "Which ZF 8HP gearboxes does MaxxECU's 8HP control support?",
    a: "Gen 1 8HP45, 8HP70 and 8HP90. It controls the stock TCU after a one-off reflash with an external programming tool, with no internal wiring or soldering. MaxxECU documents the feature as still in beta.",
  },
  {
    q: "Can you control an all-wheel-drive 8HP?",
    a: "MaxxECU's 8HP control covers the rear-wheel-drive side only. AWD, xDrive, 4WD and transfer-case control are not supported, so an AWD gearbox would need the transfer case controlled separately. Send us your details and we will tell you what is possible.",
  },
  {
    q: "Do you wire the transmission into the ECU as well?",
    a: "We can. Wiring and calibration work well as one job, because the transmission has to be wired and set up correctly before it can be tuned. See our custom wiring service.",
  },
];
