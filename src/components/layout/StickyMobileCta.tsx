"use client";

import { Button } from "@/components/ui/Button";
import { CTA } from "@/lib/site";

export function StickyMobileCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-3 sm:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-lg gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-card backdrop-blur">
        <Button
          href="/physician-opportunities"
          size="md"
          className="min-w-0 flex-1 basis-0 justify-center px-2.5 text-xs leading-snug"
        >
          {CTA.explore}
        </Button>
        <Button
          href="/contact"
          variant="secondary"
          size="md"
          className="min-w-0 flex-1 basis-0 justify-center px-2.5 text-xs leading-snug"
        >
          {CTA.recruiter}
        </Button>
      </div>
    </div>
  );
}
