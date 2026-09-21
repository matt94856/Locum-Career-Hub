import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const store = new Map<string, string>();

function installBrowserMock() {
  const gtag = vi.fn();
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      gtag,
      __lchGa4Ready: false,
      sessionStorage: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => {
          store.set(key, value);
        },
        removeItem: (key: string) => {
          store.delete(key);
        },
      },
      location: { pathname: "/" },
      dispatchEvent: () => true,
    },
  });
  return gtag;
}

describe("GA4 generate_lead queue", () => {
  beforeEach(() => {
    store.clear();
    installBrowserMock();
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("persists generate_lead when GA4 is not ready, then sends after markGa4Ready", async () => {
    const { persistGenerateLead, sendPersistedGenerateLead, markGa4Ready, PENDING_GENERATE_LEAD_KEY } =
      await import("./analytics-events");

    persistGenerateLead("/", { specialty: "General Cardiology", career_stage: "moonlighting" });
    expect(window.sessionStorage.getItem(PENDING_GENERATE_LEAD_KEY)).toContain("General Cardiology");
    expect(sendPersistedGenerateLead()).toBe(false);
    expect(window.gtag).not.toHaveBeenCalled();

    window.__lchGa4Ready = true;
    markGa4Ready();

    expect(window.gtag).toHaveBeenCalledWith(
      "event",
      "generate_lead",
      expect.objectContaining({
        send_to: "G-X61CN8CDJ6",
        transport_type: "beacon",
        specialty: "General Cardiology",
        career_stage: "moonlighting",
      }),
    );
    expect(window.sessionStorage.getItem(PENDING_GENERATE_LEAD_KEY)).toBeNull();
  });

  it("queues form_submit until GA4 is configured", async () => {
    const { trackEvent, markGa4Ready, GA4_QUEUE_KEY } = await import("./analytics-events");
    trackEvent("form_submit", { form_mode: "quick" });
    expect(JSON.parse(window.sessionStorage.getItem(GA4_QUEUE_KEY) ?? "[]")).toEqual([
      { name: "form_submit", params: { form_mode: "quick" } },
    ]);

    window.__lchGa4Ready = true;
    markGa4Ready();
    expect(window.gtag).toHaveBeenCalledWith(
      "event",
      "form_submit",
      expect.objectContaining({ form_mode: "quick", send_to: "G-X61CN8CDJ6" }),
    );
    expect(window.sessionStorage.getItem(GA4_QUEUE_KEY)).toBeNull();
  });
});
