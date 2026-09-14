import { SITE } from "./site";

export type SharePayload = {
  title: string;
  /** Short line meant for LinkedIn / native share text */
  text: string;
  /** Canonical page or personalized share landing URL */
  url: string;
  /** Optional big number line for cards / OG */
  headlineStat?: string;
  eyebrow?: string;
  toolId?: string;
};

export type ShareKind = "calc" | "tool" | "guide" | "survey";

const KIND_CODE: Record<ShareKind, string> = {
  calc: "c",
  tool: "t",
  guide: "g",
  survey: "v",
};

const CODE_KIND: Record<string, ShareKind> = {
  c: "calc",
  t: "tool",
  g: "guide",
  v: "survey",
  calc: "calc",
  tool: "tool",
  guide: "guide",
  survey: "survey",
};

const SHARE_PATH_CODES: Record<string, string> = {
  c: "/cardiologist-locums-calculator",
  r: "/cardiologist-locums-pay-report",
  u: "/cardiologist-locums-pay-survey",
};

const PATH_TO_CODE = Object.fromEntries(
  Object.entries(SHARE_PATH_CODES).map(([code, path]) => [path, code]),
) as Record<string, string>;

export function formatUsdRange(low: number, high: number) {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  return `${fmt(low)}–${fmt(high)}`;
}

/** Compact money for share stats and short URLs, e.g. $8k–$11k */
export function formatUsdCompactRange(low: number, high: number) {
  const fmt = (n: number) => `$${Math.round(n / 1000)}k`;
  return `${fmt(low)}–${fmt(high)}`;
}

export function formatBlockRate(low: number, high: number, unit: "weekend" | "week") {
  const suffix = unit === "weekend" ? "/weekend" : "/wk";
  return `${formatUsdRange(low, high)}${suffix}`;
}

export function formatBlockRateCompact(low: number, high: number, unit: "weekend" | "week") {
  const suffix = unit === "weekend" ? "/wknd" : "/wk";
  return `${formatUsdCompactRange(low, high)}${suffix}`;
}

export function linkedInShareUrl(url: string) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}

export function xShareUrl(text: string, url: string) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}

function compactParam(value: string, max: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function encodeSharePath(path: string) {
  const code = PATH_TO_CODE[path];
  if (code) return code;
  return path.replace(/^\//, "").slice(0, 32);
}

export function expandSharePath(value: string | undefined) {
  if (!value) return "/cardiologist-locums-calculator";
  if (SHARE_PATH_CODES[value]) return SHARE_PATH_CODES[value];
  if (value.startsWith("/")) return value;
  return `/${value}`;
}

export function expandShareKind(value: string | undefined): ShareKind {
  return CODE_KIND[value ?? ""] ?? "guide";
}

/** Viewer-facing URL without protocol; wraps better on phones. */
export function displayShareUrl(url: string) {
  try {
    const parsed = new URL(url, SITE.url);
    const shown = `${parsed.host.replace(/^www\./, "")}${parsed.pathname}${parsed.search}`;
    return decodeURIComponent(shown);
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, "");
  }
}

/** Personalized OG landing so LinkedIn/Slack crawlers see $ in the preview image. */
export function buildResultShareLandingUrl(input: {
  kind: ShareKind;
  title: string;
  stat: string;
  subtitle?: string;
  path?: string;
}) {
  const params = new URLSearchParams({
    k: KIND_CODE[input.kind],
    t: compactParam(input.title, 42),
    s: compactParam(input.stat, 28),
  });
  if (input.subtitle) params.set("d", compactParam(input.subtitle, 42));
  if (input.path) params.set("p", encodeSharePath(input.path));
  return `${SITE.url}/s?${params.toString()}`;
}

export function buildOgImageUrl(input: { title: string; stat: string; subtitle?: string; eyebrow?: string }) {
  const params = new URLSearchParams({
    title: input.title.slice(0, 90),
    stat: input.stat.slice(0, 60),
  });
  if (input.subtitle) params.set("subtitle", input.subtitle.slice(0, 120));
  if (input.eyebrow) params.set("eyebrow", input.eyebrow.slice(0, 40));
  return `${SITE.url}/api/og?${params.toString()}`;
}

export function calculatorLinkedInPost(input: {
  specialty: string;
  blockLow: number;
  blockHigh: number;
  blockUnit: "weekend" | "week";
  annualLow: number;
  annualHigh: number;
  scheduleLabel: string;
  fitScore: number;
}) {
  const per = input.blockUnit === "weekend" ? "per weekend" : "per coverage week";
  return [
    `Ran my ${input.specialty} locums profile.`,
    ``,
    `${formatUsdRange(input.blockLow, input.blockHigh)} ${per}`,
    `${input.scheduleLabel} → ${formatUsdCompactRange(input.annualLow, input.annualHigh)} directional gross`,
    `Fit ${input.fitScore}/100`,
    ``,
    `Not a quote — a planning model for cardiologists weighing locums.`,
  ].join("\n");
}

export function toolLinkedInPost(input: { toolName: string; headline: string }) {
  return [
    `Used the ${input.toolName} on Locum Career Hub.`,
    ``,
    input.headline,
    ``,
    `Useful if you're pressure-testing a cardiology locums decision.`,
  ].join("\n");
}

export function colleagueForwardBlurb(shareUrl: string, hook: string) {
  return `Thought of you — ${hook}`;
}

export function composeShareCopy(body: string, url: string) {
  return `${body.trim()}\n\n${url}`;
}
