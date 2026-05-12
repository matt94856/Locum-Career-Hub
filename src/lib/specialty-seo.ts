import type { Metadata } from "next";
import { SPECIALTIES } from "@/lib/specialties";
import { SITE } from "@/lib/site";
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
  const title = `${name} Locum & Flexible Physician Work | ${SITE.name}`;
  const description = `Explore flexible and locum-style ${name} opportunities: realistic scheduling, credentialing context, and physician-first recruiting—not generic job-board noise.`;
  return {
    title,
    description,
    alternates: { canonical: `/specialties/${slug}` },
    keywords: [
      `${name} locum`,
      `${name} flexible jobs`,
      "physician recruiter",
      "locum tenens opportunities",
      "flexible physician careers",
    ],
    ...socialShareMetadata({
      title,
      description,
      path: `/specialties/${slug}`,
    }),
  };
}
