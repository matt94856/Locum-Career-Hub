"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { flushQueuedAnalytics, isGa4Ready, markGa4Ready } from "@/lib/analytics-events";

/**
 * GA4 via gtag.js in root layout — loads on every route and sends `page_path` on App Router client navigations.
 * afterInteractive (not lazyOnload) so generate_lead can fire on the thank-you page after a form submit.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !isGa4Ready()) return;
    flushQueuedAnalytics();
    window.gtag?.("event", "page_view", {
      send_to: GA_MEASUREMENT_ID,
      page_path: pathname || "/",
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive" onReady={() => markGa4Ready()}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          window.__lchGa4Ready = true;
        `}
      </Script>
    </>
  );
}
