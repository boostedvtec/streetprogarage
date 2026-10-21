/**
 * Photographs for the wiring page showcase. All are real Street PRO Garage
 * jobs already in /public. To add more: drop the image in
 * /public/images/builds, add an entry here, and (if it is a full project) add
 * the project to lib/projects.ts with "wiring" in its services.
 *
 * Images still worth shooting for this page: a finished harness laid out
 * before installation, ECU connector and terminal close-ups, and breakout
 * points with labelling and heat-shrink visible.
 */
export type WiringShot = {
  src: string;
  alt: string;
  caption: string;
  /** CSS object-position for the crop. */
  pos?: string;
  /** Slug of the related project on /projects, if any. */
  project?: string;
};

export const wiringShots: WiringShot[] = [
  {
    src: "/images/builds/2jzgte-single-turbo.jpg",
    alt: "Toyota 2JZ-GTE single turbo engine bay with a custom wiring harness",
    caption: "2JZ-GTE single turbo engine bay",
    pos: "50% 40%",
  },
  {
    src: "/images/builds/honda-ef-k24-awd-turbo.jpg",
    alt: "Standalone ECU wiring and gauges inside a Honda EF K24 AWD turbo Civic during a live tune",
    caption: "Standalone ECU wiring and gauges, EF K24 AWD turbo",
    pos: "50% 30%",
    project: "honda-ef-k24-awd-turbo",
  },
  {
    src: "/images/builds/toyota-aristo-2jzge-turbo.jpg",
    alt: "Toyota Aristo 2JZGE engine bay with a single big turbo and blue silicone piping",
    caption: "Aristo 2JZGE single turbo, EcuMaster DET3+ installed",
    pos: "50% 45%",
    project: "toyota-aristo-2jzge-turbo",
  },
  {
    src: "/images/builds/mini-d14-swap.jpg",
    alt: "Classic Mini with a Honda D14 engine swap and P28 ECU installed",
    caption: "D14 swap with P28 ECU installed, Mini",
    pos: "50% 60%",
    project: "mini-d14-swap",
  },
];
