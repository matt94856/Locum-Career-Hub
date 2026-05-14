"use client";

import { Button } from "@/components/ui/Button";
import { trackBookMeeting, trackCtaClick } from "@/lib/analytics-events";
import { CTA, SITE } from "@/lib/site";

export function StickyMobileCta() {
  const bookHref =
    SITE.calendlyUrl ||
    `mailto:${SITE.email}?subject=${encodeURIComponent("Schedule a call — Locum Career Hub")}`;
  const bookExternal = bookHref.startsWith("http");

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-3 sm:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-lg gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-card backdrop-blur">
        <Button
          href="/#lead-form"
          size="md"
          className="min-w-0 flex-1 basis-0 justify-center px-2.5 text-xs leading-snug"
          onClick={() => trackCtaClick("sticky_submit_inquiry", "/#lead-form")}
        >
          Submit inquiry
        </Button>
        <Button
          href={bookHref}
          variant="secondary"
          size="md"
          className="min-w-0 flex-1 basis-0 justify-center px-2.5 text-xs leading-snug"
          onClick={() => {
            trackCtaClick("sticky_book_call", bookHref);
            if (bookExternal) trackBookMeeting("sticky_mobile");
          }}
        >
          {SITE.calendlyUrl ? "Book call" : CTA.recruiter}
        </Button>
      </div>
    </div>
  );
}
