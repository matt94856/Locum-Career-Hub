"use client";

import { ContactFallbacks } from "@/components/cta/ContactFallbacks";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/lib/site";

type Props = {
  source: string;
  compact?: boolean;
};

/** Secondary path when someone is not on the inquiry form yet. */
export function LeadFormAltActions({ source, compact = false }: Props) {
  return (
    <div className={`flex flex-col gap-3 ${compact ? "" : "max-w-xl"}`}>
      <Button
        href="/physician-opportunities#lead-form"
        className={compact ? "w-full justify-center sm:w-auto" : "w-full justify-center sm:w-auto"}
      >
        {CTA.requestMatches}
      </Button>
      <ContactFallbacks source={source} />
    </div>
  );
}
