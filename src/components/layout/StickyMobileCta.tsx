"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { trackBookingClick, trackCtaClick } from "@/lib/analytics-events";
import { SITE } from "@/lib/site";

export function StickyMobileCta() {
  const pathname = usePathname();
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const el = document.getElementById("lead-form");
    if (!el) {
      setFormInView(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(Boolean(entry?.isIntersecting)),
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === "/thank-you" || formInView) return null;

  const bookHref =
    SITE.calendlyUrl ||
    `mailto:${SITE.email}?subject=${encodeURIComponent("Schedule a call — Locum Career Hub")}`;
  const bookExternal = bookHref.startsWith("http");

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-3 sm:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="pointer-events-auto mx-auto flex max-w-lg gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-card backdrop-blur">
        <Button
          href="/#lead-form"
          size="md"
          className="min-h-11 min-w-0 flex-1 basis-0 justify-center px-2 text-sm leading-snug"
          onClick={() => trackCtaClick("sticky_submit_inquiry", "/#lead-form")}
        >
          Request matches
        </Button>
        <Button
          href={`tel:${SITE.phoneTel}`}
          variant="secondary"
          size="md"
          className="min-h-11 min-w-0 flex-1 basis-0 justify-center px-2 text-sm leading-snug"
          onClick={() => trackCtaClick("sticky_call", `tel:${SITE.phoneTel}`)}
        >
          Call
        </Button>
        <Button
          href={bookHref}
          variant="secondary"
          size="md"
          className="min-h-11 min-w-0 flex-1 basis-0 justify-center px-2 text-sm leading-snug"
          onClick={() => {
            trackCtaClick("sticky_book_call", bookHref);
            if (bookExternal) trackBookingClick("sticky_mobile");
          }}
        >
          {SITE.calendlyUrl ? "Book" : "Email"}
        </Button>
      </div>
    </div>
  );
}
