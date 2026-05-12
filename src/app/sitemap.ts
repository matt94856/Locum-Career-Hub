import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { LANDING_SLUGS } from "@/lib/landings";
import { SITE } from "@/lib/site";
import { SPECIALTY_SEO_SLUGS } from "@/lib/specialty-seo";
import { STATE_LOCUM_SLUGS } from "@/lib/state-locum-seo";

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/physician-opportunities",
  "/guides",
  "/specialties",
  "/locations",
  "/blog",
  "/faq",
  "/for-physicians",
  "/physicians-guide-to-locum-tenens",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [
    ...staticRoutes.map((path) => ({
      url: `${SITE.url}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...LANDING_SLUGS.map((slug) => ({
      url: `${SITE.url}/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.65,
    })),
    ...SPECIALTY_SEO_SLUGS.map((slug) => ({
      url: `${SITE.url}/specialties/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.64,
    })),
    ...STATE_LOCUM_SLUGS.map((slug) => ({
      url: `${SITE.url}/locum-tenens-jobs/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.63,
    })),
    ...BLOG_POSTS.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
  ];

  return entries;
}
