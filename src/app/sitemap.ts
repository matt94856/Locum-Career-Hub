import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { LANDING_SLUGS } from "@/lib/landings";
import { SITE } from "@/lib/site";

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/physician-opportunities",
  "/specialties",
  "/locations",
  "/blog",
  "/faq",
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
    ...BLOG_POSTS.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
  ];

  return entries;
}
