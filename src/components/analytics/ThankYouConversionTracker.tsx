"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics-events";

/** Fires once on thank-you page for GA4 conversion mapping. */
export function ThankYouConversionTracker() {
  useEffect(() => {
    trackEvent("lead_thank_you_view", { page_path: "/thank-you" });
  }, []);
  return null;
}
