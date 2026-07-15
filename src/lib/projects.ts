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
export const projects: Project[] = [];
