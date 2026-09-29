"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { trackCtaClick } from "@/lib/analytics-events";

type Props = {
  opportunitySlug: string;
  placement: "hero" | "mid_page";
  children: ReactNode;
};

export function FeaturedOpportunityApplyButton({
  opportunitySlug,
  placement,
  children,
}: Props) {
  return (
    <Button
      href="#apply"
      size={placement === "hero" ? "lg" : "md"}
      variant={placement === "hero" ? "primary" : "secondary"}
      className="h-auto min-h-12 max-w-full whitespace-normal px-5 text-center leading-snug"
      onClick={() =>
        trackCtaClick(
          `featured_job_apply_${placement}_${opportunitySlug}`,
          "#apply",
        )
      }
    >
      {children}
    </Button>
  );
}
