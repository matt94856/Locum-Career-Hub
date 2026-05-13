import type { Metadata } from "next";
import { SPECIALTIES } from "@/lib/specialties";
import { shareDocumentTitle } from "@/lib/seo-title";
import { socialShareMetadata } from "@/lib/social-metadata";

export function specialtyToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const SPECIALTY_SEO_SLUGS = SPECIALTIES.map((s) => specialtyToSlug(s));

export function getSpecialtyNameBySlug(slug: string): string | undefined {
  return SPECIALTIES.find((s) => specialtyToSlug(s) === slug);
}

export function buildSpecialtyMetadata(name: string, slug: string): Metadata {
  const titlePart = `${name} Locum Tenens Jobs & Flexible Physician Work`;
  const description = `${name} locum tenens jobs and flexible contract roles—credentialing context, realistic scheduling, and physician-first recruiting (not generic job-board noise).`;
  return {
    title: titlePart,
    description,
    alternates: { canonical: `/specialties/${slug}` },
    keywords: [
      `${name} locum tenens`,
      `${name} locum jobs`,
      `${name} flexible jobs`,
      "physician recruiter",
      "locum tenens opportunities",
      "flexible physician careers",
    ],
    ...socialShareMetadata({
      title: shareDocumentTitle(titlePart),
      description,
      path: `/specialties/${slug}`,
    }),
  };
}
