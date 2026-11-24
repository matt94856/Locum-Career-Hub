import { NextRequest } from "next/server";
import { buildLlmsFullTxt, buildLlmsTxt } from "@/lib/ai-seo/catalog";
import { MARKDOWN_CONTENT_TYPE, MARKDOWN_VARY } from "@/lib/ai-seo/accept";
import { buildMarkdownForPath } from "@/lib/ai-seo/markdown";

export const runtime = "nodejs";

function markdownResponse(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": MARKDOWN_CONTENT_TYPE,
      Vary: MARKDOWN_VARY,
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}

function requestedPath(request: NextRequest): string {
  return (
    request.headers.get("x-markdown-path") ||
    request.nextUrl.searchParams.get("path") ||
    new URL(request.url).searchParams.get("path") ||
    "/"
  );
}

export function GET(request: NextRequest) {
  const path = requestedPath(request);
  if (path === "/llms.txt") return markdownResponse(buildLlmsTxt());
  if (path === "/llms-full.txt") return markdownResponse(buildLlmsFullTxt());
  const result = buildMarkdownForPath(path);
  return markdownResponse(result.body, result.status);
}
