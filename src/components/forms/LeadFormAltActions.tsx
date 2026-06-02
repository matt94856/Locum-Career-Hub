"use client";

import { CalendlyBookButton } from "@/components/cta/CalendlyBookButton";
import { Button } from "@/components/ui/Button";
import { trackCtaClick } from "@/lib/analytics-events";
import { SITE } from "@/lib/site";

type Props = {
  source: string;
  compact?: boolean;
};

/** Peer CTAs beside the inquiry form—calendar and click-to-call. */
export function LeadFormAltActions({ source, compact = false }: Props) {
  return (
    <div
      className={`flex flex-col gap-2 ${compact ? "sm:flex-row sm:flex-wrap" : "sm:flex-row sm:items-center sm:gap-3"}`}
    >
      <CalendlyBookButton
        source={`${source}_form`}
        variant="secondary"
        className={compact ? "w-full justify-center sm:w-auto sm:min-h-9 sm:px-3.5 sm:py-2 sm:text-xs" : "w-full justify-center sm:flex-1"}
      >
        Book a 15-min call
      </CalendlyBookButton>
      <Button
        href={`tel:${SITE.phoneTel}`}
        variant="ghost"
        size={compact ? "sm" : "md"}
        className={compact ? "w-full justify-center sm:w-auto" : "w-full justify-center sm:flex-1"}
        onClick={() => trackCtaClick(`call_${source}`, `tel:${SITE.phoneTel}`)}
      >
        Call {SITE.phoneDisplay}
      </Button>
    </div>
  );
}
