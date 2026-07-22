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

/** Calendly outbound click. A click is not a confirmed booking. */
export function trackBookingClick(source: string) {
  trackEvent("booking_link_click", {
    method: "calendly",
    source,
    page_path: window.location.pathname,
  });
}

export function trackCalculatorEvent(
  action: "start" | "step_complete" | "results_view" | "report_gate_view" | "lead_success" | "lead_error" | "compare_view" | "share",
  params?: Record<string, string | number | boolean>,
) {
  trackEvent(`locums_calculator_${action}`, {
    page_path: window.location.pathname,
    ...params,
  });
}

export function trackDecisionToolEvent(
  toolId: string,
  action:
    | "start"
    | "step_complete"
    | "result"
    | "share"
    | "print"
    | "report_gate"
    | "lead_success"
    | "lead_error"
    | "related_tool_click",
  params?: Record<string, string | number | boolean>,
) {
  trackEvent(`decision_tool_${action}`, {
    tool_id: toolId,
    page_path: window.location.pathname,
    ...params,
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

/**
 * Remarketing-friendly share/PDF/survey events.
 * In GA4 mark `viral_share` as a key event; use method for LinkedIn vs copy vs pdf_email_gate.
 * Use the same event name in Google Ads / Meta custom conversions once the calculator proves shareability.
 */
export function trackViralShare(method: string, toolId: string) {
  trackEvent("viral_share", {
    method,
    tool_id: toolId,
    page_path: window.location.pathname,
  });
}
