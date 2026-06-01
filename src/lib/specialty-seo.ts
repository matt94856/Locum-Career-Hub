import type { Metadata } from "next";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { buildSpecialtySerpMetadata } from "@/lib/serp-ctr";

export function specialtyToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const SPECIALTY_SEO_SLUGS = CARDIOLOGY_SUBSPECIALTIES.map((s) => specialtyToSlug(s));

/** Legacy single-specialty slug → primary subspecialty hub. */
export const LEGACY_CARDIOLOGY_SLUG = "cardiology";

export const REMOVED_SPECIALTY_SLUGS = [
  "hospitalist-medicine",
  "emergency-medicine",
  "anesthesiology-and-crna",
  "family-medicine",
  "internal-medicine",
  "psychiatry",
  "radiology",
  "surgery-and-orthopedics",
  "ob-gyn",
  "pediatrics",
  "cardiology",
  "urgent-care",
  "telehealth",
] as const;

export function getSpecialtyNameBySlug(slug: string): string | undefined {
  if (slug === LEGACY_CARDIOLOGY_SLUG) return "General Cardiology";
  return CARDIOLOGY_SUBSPECIALTIES.find((s) => specialtyToSlug(s) === slug);
}

export function isAllowedCardiologySpecialtySlug(slug: string): boolean {
  return SPECIALTY_SEO_SLUGS.includes(slug) || slug === LEGACY_CARDIOLOGY_SLUG;
}

export function buildSpecialtyMetadata(name: string, slug: string): Metadata {
  return buildSpecialtySerpMetadata(name, slug);
}
