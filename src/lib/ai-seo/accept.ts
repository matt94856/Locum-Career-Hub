/** Shared Accept parsing for Markdown negotiation (HTML vs text/markdown). */

function quality(part: string): number {
  const match = /(?:^|;)\s*q\s*=\s*([0-9.]+)/i.exec(part);
  if (!match) return 1;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : 1;
}

function mediaType(part: string): string {
  return part.split(";")[0]?.trim().toLowerCase() ?? "";
}

export function prefersMarkdown(acceptHeader: string | null | undefined): boolean {
  const accept = (acceptHeader ?? "").trim();
  if (!accept) return false;
  const parts = accept.split(",").map((part) => part.trim()).filter(Boolean);
  let markdownQ = -1;
  let htmlQ = -1;
  let starQ = -1;
  for (const part of parts) {
    const type = mediaType(part);
    const q = quality(part);
    if (type === "text/markdown") markdownQ = Math.max(markdownQ, q);
    if (type === "text/html") htmlQ = Math.max(htmlQ, q);
    if (type === "*/*") starQ = Math.max(starQ, q);
  }
  if (markdownQ < 0) return false;
  const htmlScore = htmlQ >= 0 ? htmlQ : starQ >= 0 ? starQ : 0;
  return markdownQ >= htmlScore;
}

export function isRscRequest(headers: Headers): boolean {
  if (headers.get("rsc") === "1") return true;
  if (headers.get("next-router-prefetch")) return true;
  const accept = headers.get("accept") ?? "";
  return accept.includes("text/x-component");
}

export const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";
export const MARKDOWN_VARY = "Accept";
