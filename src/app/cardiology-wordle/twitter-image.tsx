import { createHeartleShareImage } from "@/lib/create-heartle-og-image";

export const runtime = "nodejs";
export const alt = "Heartle — daily cardiology Wordle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return createHeartleShareImage();
}
