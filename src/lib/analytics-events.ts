/** Client-side GA4 event helpers — call only from browser code. */

import { GA_MEASUREMENT_ID } from "@/lib/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __lchGa4Ready?: boolean;
  }
}

export const GA4_QUEUE_KEY = "lch_ga4_queue";
export const PENDING_GENERATE_LEAD_KEY = "lch_pending_generate_lead";
export const GA4_READY_EVENT = "lch-ga4-ready";

type EventParams = Record<string, string | number | boolean>;
type QueuedEvent = { name: string; params: EventParams };

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

export function isGa4Ready() {
  return typeof window !== "undefined" && window.__lchGa4Ready === true && typeof window.gtag === "function";
}

function readQueue(): QueuedEvent[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.sessionStorage.getItem(GA4_QUEUE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as QueuedEvent[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: QueuedEvent[]) {
  if (!canUseStorage()) return;
  window.sessionStorage.setItem(GA4_QUEUE_KEY, JSON.stringify(queue.slice(-30)));
}

function sendToGa4(name: string, params: EventParams) {
  window.gtag?.("event", name, {
    send_to: GA_MEASUREMENT_ID,
    transport_type: "beacon",
    ...params,
  });
}

export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  const payload = params ?? {};
  if (isGa4Ready()) {
    sendToGa4(name, payload);
    return;
  }
  writeQueue([...readQueue(), { name, params: payload }]);
}

export function flushQueuedAnalytics() {
  if (!isGa4Ready()) return false;
  const queue = readQueue();
  if (canUseStorage()) window.sessionStorage.removeItem(GA4_QUEUE_KEY);
  for (const item of queue) {
    sendToGa4(item.name, item.params ?? {});
  }
  return true;
}

export function markGa4Ready() {
  if (typeof window === "undefined") return;
  window.__lchGa4Ready = true;
  flushQueuedAnalytics();
  sendPersistedGenerateLead();
  window.dispatchEvent(new Event(GA4_READY_EVENT));
}

export function persistGenerateLead(
  source = "inquiry_form",
  extra?: EventParams,
) {
  if (typeof window === "undefined" || !canUseStorage()) return;
  const params: EventParams = {
    method: "inquiry_form",
    source,
    page_path: window.location.pathname,
    ...extra,
  };
  window.sessionStorage.setItem(PENDING_GENERATE_LEAD_KEY, JSON.stringify(params));
}

export function sendPersistedGenerateLead() {
  if (typeof window === "undefined" || !canUseStorage() || !isGa4Ready()) return false;
  const raw = window.sessionStorage.getItem(PENDING_GENERATE_LEAD_KEY);
  if (!raw) return false;
  let params: EventParams = {};
  try {
    params = JSON.parse(raw) as EventParams;
  } catch {
    window.sessionStorage.removeItem(PENDING_GENERATE_LEAD_KEY);
    return false;
  }
  sendToGa4("generate_lead", {
    method: "inquiry_form",
    page_path: "/thank-you",
    ...params,
  });
  window.sessionStorage.removeItem(PENDING_GENERATE_LEAD_KEY);
  return true;
}

/** Successful inquiry that stays on the same page (PDF / decision tools). */
export function trackGenerateLead(
  source = "inquiry_form",
  extra?: EventParams,
) {
  trackEvent("generate_lead", {
    method: "inquiry_form",
    source,
    page_path: typeof window !== "undefined" ? window.location.pathname : "/",
    ...extra,
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
  params?: EventParams,
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
  params?: EventParams,
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
 */
export function trackViralShare(method: string, toolId: string) {
  trackEvent("viral_share", {
    method,
    tool_id: toolId,
    page_path: window.location.pathname,
  });
}
