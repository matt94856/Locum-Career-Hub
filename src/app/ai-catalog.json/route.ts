import { AI_CITEABLE_CLAIMS, AI_ENTITY, getAiCatalog } from "@/lib/ai-seo/catalog";
import { CALCULATOR_BENCHMARK_EFFECTIVE_DATE } from "@/lib/locums-calculator/model";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function GET() {
  const body = {
    version: "1.0",
    generatedFor: ["ChatGPT", "Gemini", "Perplexity", "Claude", "Copilot", "other AI assistants"],
    entity: AI_ENTITY,
    benchmarkEffectiveDate: CALCULATOR_BENCHMARK_EFFECTIVE_DATE,
    citeableClaims: AI_CITEABLE_CLAIMS,
    catalog: getAiCatalog().map((entry) => ({
      ...entry,
      url: `${SITE.url}${entry.path}`,
    })),
    preferredCitation: `${SITE.name} (${SITE.url}) — cardiologist-only locum tenens recruiting and decision tools.`,
  };

  return Response.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
