"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics-events";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fires once on thank-you page for GA4 conversion mapping. */
export function ThankYouConversionTracker({
  opportunitySlug,
  sourcePath,
}: {
  opportunitySlug?: string;
  sourcePath?: string;
}) {
  useEffect(() => {
    if (window.sessionStorage.getItem("lch_lead_submitted") !== "1") return;
    window.sessionStorage.removeItem("lch_lead_submitted");
    const params = {
      page_path: "/thank-you",
      ...(opportunitySlug ? { opportunity_slug: opportunitySlug } : {}),
      ...(sourcePath ? { source_path: sourcePath } : {}),
    };
    trackEvent("lead_thank_you_view", params);
    window.fbq?.("track", "Lead", {
      content_category: opportunitySlug
        ? "featured_cardiology_opportunity"
        : "cardiology_inquiry",
      ...(opportunitySlug ? { content_name: opportunitySlug } : {}),
    });
  }, [opportunitySlug, sourcePath]);
  return null;
}
