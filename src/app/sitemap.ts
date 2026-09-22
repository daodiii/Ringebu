import type { MetadataRoute } from "next";
import { supportPages } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ringebutann.no";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/behandlinger`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/kontakt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/symptomer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/informasjon`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/dekning`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // /priser is deliberately absent: it 308s to /behandlinger, and a sitemap
    // should list canonical URLs that return 200.
  ];

  // supportPages render at /dekning/<slug>, not /informasjon/<slug>. The old
  // template pointed every one of these at a route that does not exist, so all
  // six were 404s in the sitemap.
  const infoPages: MetadataRoute.Sitemap = supportPages.map((page) => ({
    url: `${baseUrl}/dekning/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...infoPages];
}
