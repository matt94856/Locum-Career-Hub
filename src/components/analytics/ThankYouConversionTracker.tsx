"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics-events";

/** Fires once on thank-you page for GA4 conversion mapping. */
export function ThankYouConversionTracker() {
  useEffect(() => {
    if (window.sessionStorage.getItem("lch_lead_submitted") !== "1") return;
    window.sessionStorage.removeItem("lch_lead_submitted");
    trackEvent("lead_thank_you_view", { page_path: "/thank-you" });
  }, []);
  return null;
}
