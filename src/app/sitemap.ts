import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-config";
import { products } from "@/lib/products";

const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/tuning", changeFrequency: "weekly", priority: 0.9 },
  { path: "/custom-wiring", changeFrequency: "monthly", priority: 0.7 },
  { path: "/engine-swaps", changeFrequency: "monthly", priority: 0.7 },
  { path: "/parts", changeFrequency: "weekly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/quote", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pre-tune-checklist", changeFrequency: "yearly", priority: 0.5 },
  { path: "/declaration", changeFrequency: "yearly", priority: 0.3 },
  { path: "/finance-warranty", changeFrequency: "yearly", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/parts/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
