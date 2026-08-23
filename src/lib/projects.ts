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
  /** Dyno graph image, plus the headline numbers pulled out for display. */
  dyno: {
    image: string;
    alt: string;
    power: string;
    torque?: string;
  };
  media: ProjectMedia;
};

/**
 * Real completed builds only — no placeholder/sample entries. Add new
 * projects here as they're finished; each one follows the same format
 * (build list + dyno graph + photo/video) rendered by ProjectCard.
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
    vehicle: "Honda Civic (D16, OBD1)",
    region: "pk",
    summary:
      "Stock-internal D16 running a budget Maxspeeding turbo kit at 8 PSI. Remotely tuned and dyno-logged to keep the low-boost setup safe and reliable on factory internals.",
    buildList: [
      "D16 engine, stock internals",
      "Maxspeeding turbo kit, running 8 PSI",
      "Front-mount intercooler & oil cooler",
      "Remote tune, dyno-logged",
    ],
    dyno: {
      image: "/images/builds/honda-d16-turbo-dyno.jpg",
      alt: "Honda D16 turbo dyno graph, 207 HP at 7000 RPM on a Maxspeeding turbo kit at 8 PSI",
      power: "207 WHP",
      torque: "167 lb-ft",
    },
    media: {
      type: "image",
      src: "/images/builds/d16-turbo.jpg",
      alt: "Turbo Honda Civic D16 hatchback with front-mount intercooler and oil cooler",
    },
  },
];
