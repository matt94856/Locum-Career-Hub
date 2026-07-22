import { SITE } from "@/lib/site";

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

export function formatUsdRange(low: number, high: number) {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  return `${fmt(low)}–${fmt(high)}`;
}

export function linkedInShareUrl(url: string) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}

export function xShareUrl(text: string, url: string) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}

/** Personalized OG landing so LinkedIn/Slack crawlers see weekly $ in the preview image. */
export function buildResultShareLandingUrl(input: {
  kind: "calc" | "tool" | "guide" | "survey";
  title: string;
  stat: string;
  subtitle?: string;
  path?: string;
}) {
  const params = new URLSearchParams({
    k: input.kind,
    t: input.title.slice(0, 90),
    s: input.stat.slice(0, 60),
  });
  if (input.subtitle) params.set("d", input.subtitle.slice(0, 120));
  if (input.path) params.set("p", input.path);
  return `${SITE.url}/share/r?${params.toString()}`;
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
  weeklyLow: number;
  weeklyHigh: number;
  fitScore: number;
  shareUrl: string;
}) {
  return [
    `Ran my cardiology locums profile (${input.specialty}).`,
    ``,
    `Directional weekly range: ${formatUsdRange(input.weeklyLow, input.weeklyHigh)}`,
    `Fit score: ${input.fitScore}/100`,
    ``,
    `Not a quote — a planning model. Worth a look if you're weighing locums vs employed:`,
    input.shareUrl,
  ].join("\n");
}

export function toolLinkedInPost(input: { toolName: string; headline: string; shareUrl: string }) {
  return [
    `Used the ${input.toolName} on Locum Career Hub.`,
    ``,
    input.headline,
    ``,
    `Useful if you're pressure-testing a cardiology locums decision:`,
    input.shareUrl,
  ].join("\n");
}

export function colleagueForwardBlurb(shareUrl: string, hook: string) {
  return `Thought of you — ${hook}\n\n${shareUrl}`;
}
