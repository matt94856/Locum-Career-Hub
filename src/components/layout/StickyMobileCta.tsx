"use client";

import { Button } from "@/components/ui/Button";

export function StickyMobileCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-3 sm:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-lg gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-card backdrop-blur">
        <Button href="/physician-opportunities" className="flex-1 px-3 text-sm">
          Find Opportunities
        </Button>
        <Button href="/contact" variant="secondary" className="flex-1 px-3 text-sm">
          Talk to a Recruiter
        </Button>
      </div>
    </div>
  );
}
