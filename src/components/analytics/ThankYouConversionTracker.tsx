"use client";

import { useEffect } from "react";
import {
  GA4_READY_EVENT,
  persistGenerateLead,
  sendPersistedGenerateLead,
  trackEvent,
} from "@/lib/analytics-events";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fires generate_lead once on thank-you so the hit is not lost during the form navigation. */
export function ThankYouConversionTracker({
  opportunitySlug,
  sourcePath,
  specialty,
  careerStage,
}: {
  opportunitySlug?: string;
  sourcePath?: string;
  specialty?: string;
  careerStage?: string;
}) {
  useEffect(() => {
    const submitted = window.sessionStorage.getItem("lch_lead_submitted") === "1";
    const pending = window.sessionStorage.getItem("lch_pending_generate_lead");
    if (!submitted && !pending) return;

    persistGenerateLead(sourcePath || opportunitySlug || "inquiry_form", {
      ...(opportunitySlug ? { opportunity_slug: opportunitySlug } : {}),
      ...(sourcePath ? { source_path: sourcePath } : {}),
      ...(specialty ? { specialty } : {}),
      ...(careerStage ? { career_stage: careerStage } : {}),
    });

    const thankYouParams = {
      page_path: "/thank-you",
      ...(opportunitySlug ? { opportunity_slug: opportunitySlug } : {}),
      ...(sourcePath ? { source_path: sourcePath } : {}),
      ...(specialty ? { specialty } : {}),
      ...(careerStage ? { career_stage: careerStage } : {}),
    };

    const fire = () => {
      const sent = sendPersistedGenerateLead();
      if (!sent) return false;
      trackEvent("lead_thank_you_view", thankYouParams);
      window.sessionStorage.removeItem("lch_lead_submitted");
      window.fbq?.("track", "Lead", {
        content_category: opportunitySlug
          ? "featured_cardiology_opportunity"
          : "cardiology_inquiry",
        ...(opportunitySlug ? { content_name: opportunitySlug } : {}),
      });
      return true;
    };

    if (fire()) return;

    const onReady = () => {
      fire();
    };
    window.addEventListener(GA4_READY_EVENT, onReady);
    const interval = window.setInterval(() => {
      if (fire()) window.clearInterval(interval);
    }, 250);
    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
    }, 8000);

    return () => {
      window.removeEventListener(GA4_READY_EVENT, onReady);
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [opportunitySlug, sourcePath, specialty, careerStage]);
  return null;
}
