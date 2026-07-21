"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4 via gtag.js in root layout — loads on every route and sends `page_path` on App Router client navigations.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !ready) return;
    const { gtag } = window;
    if (typeof gtag !== "function") return;
    gtag("event", "page_view", {
      page_path: pathname || "/",
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, ready]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload" onReady={() => setReady(true)}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
