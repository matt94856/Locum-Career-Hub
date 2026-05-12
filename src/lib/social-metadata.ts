import type { Metadata } from "next";
import { SITE } from "@/lib/site";

/** Served by `app/opengraph-image.tsx` — 1200×630 PNG for Facebook, LinkedIn, Slack, iMessage, etc. */
export const SOCIAL_PREVIEW_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE.name} — flexible physician careers, burnout-aware guidance, locum tenens`,
} as const;

/** Same dimensions; explicit `twitter-image` route for X/Twitter crawlers. */
export const TWITTER_PREVIEW_IMAGE = {
  url: "/twitter-image",
  width: 1200,
  height: 630,
  alt: SOCIAL_PREVIEW_IMAGE.alt,
} as const;

export function openGraphImages() {
  return [SOCIAL_PREVIEW_IMAGE];
}

export function twitterImageUrls(): string[] {
  return [TWITTER_PREVIEW_IMAGE.url];
}

/** Standard Open Graph + Twitter Card fields for a public URL (use with `metadataBase`). */
export function socialShareMetadata(input: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = `${SITE.url}${input.path}`;
  return {
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE.name,
      type: input.type ?? "website",
      locale: "en_US",
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      images: openGraphImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: twitterImageUrls(),
    },
  };
}
