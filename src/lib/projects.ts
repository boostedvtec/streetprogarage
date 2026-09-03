export type ProjectMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string };

export type Project = {
  slug: string;
  title: string;
  vehicle: string;
  region: "uk" | "pk";
  summary: string;
  /** The build list — mods/spec, shown as a bullet list. */
  buildList: string[];
  /**
   * Result panel. Dyno builds get a real graph image + numbers; road-tuned
   * builds (no dyno session) omit image/alt and just state the method in
   * `power` (e.g. "Road Tuned").
   */
  dyno: {
    image?: string;
    alt?: string;
    power: string;
    torque?: string;
  };
  /** Optional — a project can be listed with just the build list + result if no photo/video is available. */
  media?: ProjectMedia;
};

/**
 * Real completed builds only — no placeholder/sample entries. Add new
 * projects here as they're finished; each one follows the same format
 * (build list + result, plus an optional photo/video) rendered by
 * ProjectCard.
 *
 * Example shape for reference when adding a new one:
 *
 * {
 *   slug: "civic-k24-turbo",
 *   title: "K24 Turbo Civic",
 *   vehicle: "Honda Civic (K24 swap)",
 *   region: "uk",
 *   summary: "Turbo K24 swap tuned on the rolling road for a reliable daily/track dual-purpose build.",
 *   buildList: ["K24 block, built internals", "Single turbo kit", "AEM Infinity standalone", "Flex fuel"],
 *   dyno: { image: "/images/builds/k24-remote-tune-dyno.jpg", alt: "K24 dyno graph", power: "444 WHP", torque: "389 lb-ft" },
 *   media: { type: "image", src: "/images/builds/civic-k24-turbo.jpeg", alt: "K24 turbo Civic at a night car meet" },
 * },
 */
export const projects: Project[] = [
  {
    slug: "k24-turbo-civic",
    title: "K24 Turbo Civic",
    vehicle: "Honda Civic (K24 swap)",
    region: "pk",
    summary:
      "Single-turbo K24 swap into a classic Civic hatch, tuned on our in-house rolling road. Before/after pulls on the same dyno session show the tune pulling real, safe gains out of the same hardware.",
    buildList: [
      "K24 engine swap, single-turbo kit",
      "Front-mount intercooler",
      "Interior roll bar",
      "Rolling road dyno tune, logged before/after",
    ],
    dyno: {
      image: "/images/builds/k24-turbo-before-after-dyno.jpg",
      alt: "K24 turbo Civic before/after rolling road dyno graph, 402.6 HP at 7110 RPM",
      power: "402.6 WHP",
      torque: "323.0 lb-ft",
    },
    media: {
      type: "image",
      src: "/images/builds/civic-k24-turbo.jpeg",
      alt: "Turbo K24-swapped Civic hatchback at a night car meet with a Street PRO Garage windscreen banner",
    },
  },
  {
    slug: "d16-turbo-maxspeeding",
    title: "D16 Turbo — Maxspeeding Kit",
    vehicle: "Honda Civic EG (D16, auto-to-manual conversion)",
    region: "uk",
    summary:
      "A 1995 Civic EG converted from auto to manual and fitted with a budget Maxspeeding turbo kit at 8 PSI on stock internals. Road-tuned with a Plex knock detection device fitted for an extra margin of safety — proof a low-boost, sensible build doesn't need a big budget to be done properly.",
    buildList: [
      "Auto-to-manual gearbox conversion",
      "D16 engine, stock internals",
      "Maxspeeding turbo kit, running 8 PSI",
      "Plex knock detection device fitted",
      "Front-mount intercooler & oil cooler",
      "Road-tuned",
    ],
    dyno: {
      image: "/images/builds/honda-d16-turbo-dyno.jpg",
      alt: "Honda D16 turbo dyno graph, 207 HP at 7000 RPM on a Maxspeeding turbo kit at 8 PSI",
      power: "207 WHP",
      torque: "167 lb-ft",
    },
    media: {
      type: "image",
      src: "/images/builds/d16-sleeper-civic-eg.jpg",
      alt: "Turbo Honda Civic EG D16 with hood up and laptop mounted for a live road tune",
    },
  },
  {
    slug: "corolla-2zzge-swap",
    title: "Corolla 2ZZ-GE Swap",
    vehicle: "Toyota Corolla (2ZZ-GE swap)",
    region: "pk",
    summary:
      "A factory 2ZZ-GE engine swap given a proper standalone tune instead of a guessed-at map — dyno-verified and logged so the customer knows exactly what they're getting, not just what a sticker promises.",
    buildList: [
      "2ZZ-GE engine swap",
      "EcuMaster DET3+ standalone installation & tune",
      "Dyno-verified pull",
    ],
    dyno: {
      power: "191 WHP",
    },
    media: {
      type: "video",
      src: "/videos/builds/corolla-2zzge-swap.mp4",
    },
  },
  {
    slug: "mini-d14-swap",
    title: "Mini D14 Swap — Timing Fix & Tune",
    vehicle: "Classic Mini (Honda D14 swap)",
    region: "uk",
    summary:
      "A D14-swapped classic Mini that came to us not running right. Before touching the tune, we diagnosed a mechanical timing fault — out by one tooth — and corrected it first. Only then did we supply and install a P28 OBD1 ECU and road-tune it properly. Get the mechanicals right before the map, every time.",
    buildList: [
      "Honda D14 engine swap",
      "P28 OBD1 ECU supplied, installed & tuned",
      "Mechanical timing fault diagnosed & corrected (1 tooth out)",
      "Road-tuned",
    ],
    dyno: {
      power: "Road Tuned",
    },
    media: {
      type: "image",
      src: "/images/builds/mini-d14-swap.jpg",
      alt: "Classic Mini with Honda D14 engine swap and roof rack, doors open showing the swapped engine bay",
    },
  },
  {
    slug: "toyota-aristo-2jzge-turbo",
    title: "Aristo 2JZGE Single Turbo",
    vehicle: "Toyota Aristo, Automatic (2JZGE single turbo)",
    region: "pk",
    summary:
      "A single big-turbo 2JZGE Aristo with an external boost controller, installed and road-tuned on EcuMaster DET3+ for smooth, driveable power delivery through the automatic gearbox — not just a big number on paper.",
    buildList: [
      "2JZGE with single big turbo",
      "External boost controller",
      "EcuMaster DET3+ installation & road tune",
      "Automatic transmission",
    ],
    dyno: {
      power: "Road Tuned",
    },
    media: {
      type: "image",
      src: "/images/builds/toyota-aristo-2jzge-turbo.jpg",
      alt: "Toyota Aristo 2JZGTE engine bay with single big turbo and blue silicone piping",
    },
  },
  {
    slug: "civic-ek-b18-turbo-rescue",
    title: "Civic EK B18 Turbo — 3-Year Rescue",
    vehicle: "Honda Civic EK (B18 Turbo)",
    region: "pk",
    summary:
      "This EK arrived after three years stuck with wiring, sensor and mechanical issues left behind by a previous build — the AEM standalone had never been properly set up and nothing ran right. We rewired it, set up the base triggers and sensors from scratch, and road-tuned it. Stuck on your own build? This is exactly the kind of job we take on.",
    buildList: [
      "B18 turbo swap",
      "AEM standalone ECU",
      "Full wiring repair & base trigger/sensor setup",
      "Diagnosed and fixed after 3 years stuck",
      "Road-tuned",
    ],
    dyno: {
      power: "Road Tuned",
    },
    media: {
      type: "video",
      src: "/videos/builds/civic-ek-b18-turbo-rescue.mp4",
    },
  },
  {
    slug: "civic-fd-r18-turbo",
    title: "Civic FD R18 Turbo",
    vehicle: "Honda Civic FD (R18 Turbo)",
    region: "pk",
    summary:
      "A stock-internal R18 turbo build kept safe and strong — dyno-proven power with a clean, usable curve, not a spike that only looks good on one pull.",
    buildList: ["R18 turbo, stock internals", "Dyno-tuned and logged"],
    dyno: {
      image: "/images/builds/civic-fd-r18-turbo-dyno.jpg",
      alt: "Honda Civic FD R18 turbo dyno graph, 233 HP at 139 km/h",
      power: "233 WHP",
    },
  },
  {
    slug: "honda-ef-k24-awd-turbo",
    title: "EF K24 AWD Turbo",
    vehicle: "Honda Civic EF (K24 swap, AWD conversion, turbo)",
    region: "pk",
    summary:
      "One of our most ambitious builds to date — a full K24 swap into an EF Civic, converted to all-wheel drive and turbocharged, then live-tuned and proven against real competition. If it's unusual, we're the shop that wants to see it done right.",
    buildList: [
      "K24 engine swap",
      "Custom AWD conversion",
      "Turbocharged",
      "Live-tuned and track-tested",
    ],
    dyno: {
      power: "Track-Tested",
    },
    media: {
      type: "image",
      src: "/images/builds/honda-ef-k24-awd-turbo.jpg",
      alt: "Live ECU tuning session inside the Honda EF K24 AWD turbo Civic, laptop on lap with gauges and standalone ECU wiring visible",
    },
  },
];
