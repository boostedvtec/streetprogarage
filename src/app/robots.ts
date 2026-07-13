import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-config";

// AI crawlers used by chat/answer engines (ChatGPT, Claude, Perplexity, and
// Google's AI Overviews / Gemini training crawler) — allowed explicitly so a
// future edit to the wildcard rule below can't accidentally block them.
const aiCrawlerUserAgents = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cart", "/checkout"],
      },
      ...aiCrawlerUserAgents.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/cart", "/checkout"],
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
