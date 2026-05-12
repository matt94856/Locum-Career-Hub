import { createBrandShareImage } from "@/lib/create-brand-og-image";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${SITE.name} — Twitter / X preview`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return createBrandShareImage();
}
