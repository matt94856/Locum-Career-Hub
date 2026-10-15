import { createArcadeShareImage } from "@/lib/create-arcade-og-image";
import { createResultShareImage } from "@/lib/create-result-og-image";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.trim() || "Cardiologist locums planning";
  const stat = searchParams.get("stat")?.trim() || "Run the free calculator";
  const subtitle = searchParams.get("subtitle")?.trim() || undefined;
  const eyebrow = searchParams.get("eyebrow")?.trim() || undefined;
  const style = searchParams.get("style")?.trim();

  if (style === "arcade") {
    return createArcadeShareImage({ title, stat, subtitle });
  }

  return createResultShareImage({ title, stat, subtitle, eyebrow });
}
