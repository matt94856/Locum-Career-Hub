"use client";

import { Button } from "@/components/ui/Button";
import { trackBookMeeting, trackCtaClick } from "@/lib/analytics-events";
import { CTA, SITE } from "@/lib/site";

type Props = {
  source: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  children?: React.ReactNode;
};

export function CalendlyBookButton({ source, variant = "primary", className = "", children }: Props) {
  const href =
    SITE.calendlyUrl ||
    `mailto:${SITE.email}?subject=${encodeURIComponent("Schedule a call — Locum Career Hub")}`;
  const external = href.startsWith("http");

  return (
    <Button
      href={href}
      variant={variant}
      className={className}
      onClick={() => {
        trackCtaClick(`book_call_${source}`, href);
        if (external) trackBookMeeting(source);
      }}
    >
      {children ?? (SITE.calendlyUrl ? CTA.bookCall : "Email to schedule a call")}
    </Button>
  );
}
