"use client";

import { Button } from "@/components/ui/Button";
import { trackBookingClick, trackCtaClick } from "@/lib/analytics-events";
import { SITE } from "@/lib/site";

export function StickyMobileCta() {
  const bookHref =
    SITE.calendlyUrl ||
    `mailto:${SITE.email}?subject=${encodeURIComponent("Schedule a call — Locum Career Hub")}`;
  const bookExternal = bookHref.startsWith("http");

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-3 sm:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-lg gap-1.5 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-card backdrop-blur">
        <Button
          href="/#lead-form"
          size="md"
          className="min-w-0 flex-1 basis-0 justify-center px-2 text-[11px] leading-snug"
          onClick={() => trackCtaClick("sticky_submit_inquiry", "/#lead-form")}
        >
          Inquiry
        </Button>
        <Button
          href={`tel:${SITE.phoneTel}`}
          variant="secondary"
          size="md"
          className="min-w-0 flex-1 basis-0 justify-center px-2 text-[11px] leading-snug"
          onClick={() => trackCtaClick("sticky_call", `tel:${SITE.phoneTel}`)}
        >
          Call
        </Button>
        <Button
          href={bookHref}
          variant="ghost"
          size="md"
          className="min-w-0 flex-1 basis-0 justify-center px-2 text-[11px] leading-snug"
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
