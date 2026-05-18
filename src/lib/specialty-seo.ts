import type { Metadata } from "next";
import { SPECIALTIES } from "@/lib/specialties";
import { buildSpecialtySerpMetadata } from "@/lib/serp-ctr";

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
  return buildSpecialtySerpMetadata(name, slug);
}
