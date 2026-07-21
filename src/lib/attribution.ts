"use client";

export type LeadAttribution = {
  firstLandingPage: string;
  firstReferrer: string;
  firstTouchAt: string;
  lastLandingPage: string;
  lastReferrer: string;
  lastTouchAt: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  fbclid: string;
};

const STORAGE_KEY = "lch_lead_attribution_v1";
const MAX_VALUE_LENGTH = 500;

function clean(value: string | null | undefined): string {
  return (value ?? "").trim().slice(0, MAX_VALUE_LENGTH);
}

function currentTouch() {
  const url = new URL(window.location.href);
  return {
    landingPage: clean(`${url.pathname}${url.search}`),
    referrer: clean(document.referrer),
    at: new Date().toISOString(),
    utmSource: clean(url.searchParams.get("utm_source")),
    utmMedium: clean(url.searchParams.get("utm_medium")),
    utmCampaign: clean(url.searchParams.get("utm_campaign")),
    utmTerm: clean(url.searchParams.get("utm_term")),
    utmContent: clean(url.searchParams.get("utm_content")),
    gclid: clean(url.searchParams.get("gclid")),
    fbclid: clean(url.searchParams.get("fbclid")),
  };
}

export function readLeadAttribution(): LeadAttribution | null {
  if (typeof window === "undefined") return null;
  const touch = currentTouch();

  let first: Partial<LeadAttribution> = {};
  try {
    first = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as Partial<LeadAttribution>;
  } catch {
    first = {};
  }

  const attribution: LeadAttribution = {
    firstLandingPage: clean(first.firstLandingPage) || touch.landingPage,
    firstReferrer: clean(first.firstReferrer) || touch.referrer,
    firstTouchAt: clean(first.firstTouchAt) || touch.at,
    lastLandingPage: touch.landingPage,
    lastReferrer: touch.referrer,
    lastTouchAt: touch.at,
    utmSource: touch.utmSource || clean(first.utmSource),
    utmMedium: touch.utmMedium || clean(first.utmMedium),
    utmCampaign: touch.utmCampaign || clean(first.utmCampaign),
    utmTerm: touch.utmTerm || clean(first.utmTerm),
    utmContent: touch.utmContent || clean(first.utmContent),
    gclid: touch.gclid || clean(first.gclid),
    fbclid: touch.fbclid || clean(first.fbclid),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Storage can be unavailable in private browsing or strict privacy modes.
  }
  return attribution;
}
