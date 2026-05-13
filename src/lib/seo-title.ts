import type { Metadata } from "next";
import { SITE } from "@/lib/site";

const BRAND_SUFFIX = ` | ${SITE.name}`;

/** Remove trailing brand so root `title.template` does not duplicate `| Locum Career Hub`. */
export function stripBrandFromTitle(title: string): string {
  let t = title.trim();
  while (t.endsWith(BRAND_SUFFIX)) {
    t = t.slice(0, -BRAND_SUFFIX.length);
  }
  return t;
}

/** Value for `metadata.title` (layout template appends brand). */
export function metadataPageTitle(title: string): Metadata["title"] {
  return stripBrandFromTitle(title);
}

/** Full title for Open Graph / Twitter (no template applied). */
export function shareDocumentTitle(title: string): string {
  return `${stripBrandFromTitle(title)}${BRAND_SUFFIX}`;
}
