/**
 * Sitemap: indexable cardiology SEO + core hubs (excludes noindex city long-tail and legacy /cardiology-locums URLs).
 */
import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { getAllArticleSlugs } from "@/lib/cardiology-authority/articles";
import { getIndexableCardiologySeoPaths } from "@/lib/cardiology-seo/registry";
import { PRIORITY_METRO_SLUGS } from "@/lib/cardiology-seo/metro-rich-data";
import { CARDIOLOGY_LOCUM_SPECIALTIES, cardiologySpecialtyPath } from "@/lib/seo/cardiology-locum-jobs-config";
import { GLOSSARY_SLUGS } from "@/lib/glossary-data";
import { LANDING_SLUGS } from "@/lib/landings";
import { specialtyStatePath } from "@/lib/specialty-state-seo";
import { SPECIALTY_SEO_SLUGS } from "@/lib/specialty-seo";
import { STATE_LOCUM_SLUGS } from "@/lib/state-locum-seo";
import { SITE } from "@/lib/site";
import { INDEXABLE_PORTFOLIO_TOOL_PATHS } from "@/lib/tools/portfolio-tools";
import { US_STATE_SLUGS } from "@/lib/us-state-slugs";

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/physician-opportunities",
  "/guides",
  "/locum-jobs/cardiology",
  "/resources",
  "/editorial-policy",
  "/content-review-policy",
  "/team",
  "/cities",
  "/salary",
  "/locations",
  "/blog",
  "/faq",
  "/physicians-guide-to-locum-tenens",
  "/locum-tenens-jobs",
  "/glossary",
  "/tools",
      "/cardiologist-locums-calculator",
      "/cardiologist-locums-pay-survey",
      "/cardiologist-locums-pay-report",
      "/interventional-cardiology-locums-pay",
      "/ep-cardiology-locums-pay",
      "/how-much-do-cardiologists-make-doing-locums",
      "/best-states-for-cardiology-locums",
      "/part-time-cardiologist-jobs",
      "/cardiologist-burnout-solutions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const specialtyStateEntries: MetadataRoute.Sitemap = US_STATE_SLUGS.flatMap((state) =>
    SPECIALTY_SEO_SLUGS.map((specialtySlug) => ({
      url: `${SITE.url}${specialtyStatePath(state, specialtySlug)}`,
      changeFrequency: "weekly" as const,
      priority: 0.62,
    })),
  );

  const glossaryEntries: MetadataRoute.Sitemap = GLOSSARY_SLUGS.map((slug) => ({
    url: `${SITE.url}/glossary/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.52,
  }));

  const cardiologyLocumSpecialtyEntries: MetadataRoute.Sitemap = CARDIOLOGY_LOCUM_SPECIALTIES.map((s) => ({
    url: `${SITE.url}${cardiologySpecialtyPath(s.pathSlug)}`,
    changeFrequency: "weekly" as const,
    priority: 0.82,
  }));

  const cardiologySeoEntries: MetadataRoute.Sitemap = getIndexableCardiologySeoPaths().map((path) => {
    const citySlug = path.startsWith("/cities/") ? path.replace("/cities/", "") : "";
    const isFlagshipSalary = path.startsWith("/salary/cardiologist-salary-");
    const isPriorityCity = citySlug && PRIORITY_METRO_SLUGS.has(citySlug);
    const isPillar = path.includes("complete-guide");
    const priority = isPillar || isFlagshipSalary ? 0.78 : isPriorityCity || path.startsWith("/states/") ? 0.7 : 0.64;
    return {
      url: `${SITE.url}${path}`,
      changeFrequency: "weekly" as const,
      priority,
    };
  });

  const entries: MetadataRoute.Sitemap = [
    ...staticRoutes.map((path) => ({
      url: `${SITE.url}${path}`,
      changeFrequency: "weekly" as const,
      priority:
        path === "/"
          ? 1
          : path === "/locum-jobs/cardiology" || path === "/salary" || path === "/cardiologist-locums-calculator"
            ? 0.9
            : 0.7,
    })),
    ...INDEXABLE_PORTFOLIO_TOOL_PATHS.map((path) => ({
      url: `${SITE.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.78,
    })),
    ...LANDING_SLUGS.map((slug) => ({
      url: `${SITE.url}/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.65,
    })),
    ...getAllArticleSlugs().map((slug) => ({
      url: `${SITE.url}/resources/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.76,
    })),
    ...STATE_LOCUM_SLUGS.map((slug) => ({
      url: `${SITE.url}/locum-tenens-jobs/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.63,
    })),
    ...specialtyStateEntries,
    ...cardiologyLocumSpecialtyEntries,
    ...cardiologySeoEntries,
    ...glossaryEntries,
    ...BLOG_POSTS.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
  ];

  return entries;
}
