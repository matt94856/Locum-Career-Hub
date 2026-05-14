/** Client-side GA4 event helpers — call only from browser code. */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const { gtag } = window;
  if (typeof gtag !== "function") return;
  gtag("event", name, params ?? {});
}

/** Successful inquiry form submission (mark as Key event in GA4). */
export function trackGenerateLead(source = "inquiry_form") {
  trackEvent("generate_lead", {
    method: "inquiry_form",
    source,
    page_path: window.location.pathname,
  });
}

/** Calendly / booking link click (mark as Key event in GA4). */
export function trackBookMeeting(source: string) {
  trackEvent("book_meeting", {
    method: "calendly",
    source,
    page_path: window.location.pathname,
  });
}

/** Primary CTA taps — hero, sticky bar, header. */
export function trackCtaClick(ctaName: string, destination: string) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    link_url: destination,
    page_path: window.location.pathname,
  });
}
