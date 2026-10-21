import { siteConfig } from "@/lib/site-config";

/**
 * Customer reviews and social links. Nothing here is invented: the review
 * list starts empty and the Google URLs are null until the real ones are
 * supplied, and the reviews section hides itself while there is nothing real
 * to show.
 *
 * To go live:
 *  1. Set `googleReviewsUrl` to the public Google Business Profile reviews
 *     link, and `googleWriteReviewUrl` to its "write a review" link
 *     (Google Business Profile > Get more reviews > Share review form).
 *  2. Add real reviews to `reviews`, each with the customer's permission and
 *     a `url` pointing at the original where one exists. Never add a rating
 *     or review count that cannot be checked at the source.
 */
export const reviewsConfig = {
  googleReviewsUrl: null as string | null,
  googleWriteReviewUrl: null as string | null,
};

export type Review = {
  author: string;
  text: string;
  source: "Google" | "Facebook" | "Instagram" | "Direct message";
  /** Link to the original review or message thread, if public. */
  url?: string;
  vehicle?: string;
  date?: string;
};

export const reviews: Review[] = [];

/** Workshop gallery: existing project photos, each linked to the verified profile. Add posts here. */
export type WorkshopPost = {
  image: string;
  alt: string;
  caption: string;
  /** Direct link to the original Instagram post, when known; otherwise the profile is used. */
  url?: string;
};

export const instagramProfile = {
  url: siteConfig.social.instagram,
  handle: siteConfig.social.instagramHandle,
};

export const workshopPosts: WorkshopPost[] = [
  {
    image: "/images/builds/honda-ef-k24-awd-turbo.jpg",
    alt: "Live ECU tuning session inside a Honda EF K24 AWD turbo Civic",
    caption: "Live tune, EF K24 AWD turbo",
  },
  {
    image: "/images/builds/2jzgte-single-turbo.jpg",
    alt: "Toyota 2JZ-GTE single turbo engine bay with custom wiring",
    caption: "2JZ-GTE single turbo engine bay",
  },
  {
    image: "/images/builds/civic-k24-turbo.jpeg",
    alt: "K24 turbo Honda at a night car meet",
    caption: "K24 turbo Civic at a meet",
  },
  {
    image: "/images/builds/mini-d14-swap.jpg",
    alt: "Classic Mini with a Honda D14 engine swap",
    caption: "Mini D14 swap, timing fix and tune",
  },
  {
    image: "/images/builds/d16-sleeper-civic-eg.jpg",
    alt: "Honda Civic EG D16 turbo with the bonnet open",
    caption: "D16 turbo EG, road tune",
  },
  {
    image: "/images/builds/b18-turbo.jpg",
    alt: "Honda Civic B18 turbo build",
    caption: "B18 turbo build",
  },
];
