import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-config";

/**
 * Page metadata with a self-referencing canonical, Open Graph and a large
 * Twitter card. Share images live in /public/og (1200x630).
 */
export function pageMeta({
  title,
  description,
  path,
  image = "/og/home.jpg",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path === "" ? "/" : path },
    openGraph: {
      siteName: "Street PRO Garage",
      title,
      description,
      url,
      type: "website",
      images: [{ url: `${siteUrl}${image}`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}${image}`],
    },
  };
}
