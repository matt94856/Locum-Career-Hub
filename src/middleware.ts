import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isRscRequest, prefersMarkdown } from "@/lib/ai-seo/accept";

const SKIP_PREFIXES = [
  "/_next",
  "/api/",
  "/ai-markdown",
  "/favicon",
  "/icon",
  "/apple-icon",
  "/opengraph-image",
  "/manifest",
];

const SKIP_EXACT = new Set([
  "/llms.txt",
  "/llms-full.txt",
  "/ai-catalog.json",
  "/sitemap.xml",
  "/robots.txt",
]);

function shouldSkip(pathname: string): boolean {
  if (SKIP_EXACT.has(pathname)) return true;
  if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  if (/\.[a-z0-9]+$/i.test(pathname)) return true;
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }
  if (shouldSkip(pathname) || isRscRequest(request.headers)) {
    return NextResponse.next();
  }

  if (prefersMarkdown(request.headers.get("accept"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/ai-markdown";
    url.searchParams.set("path", pathname);
    const headers = new Headers(request.headers);
    headers.set("x-markdown-path", pathname);
    const response = NextResponse.rewrite(url, { request: { headers } });
    response.headers.set("Vary", "Accept");
    return response;
  }

  const response = NextResponse.next();
  response.headers.append("Vary", "Accept");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
