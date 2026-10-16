"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { trackCtaClick } from "@/lib/analytics-events";
import { CTA } from "@/lib/site";

export function StickyMobileCta() {
  const pathname = usePathname();
  const [formInView, setFormInView] = useState(false);
  const [hasLocalForm, setHasLocalForm] = useState(false);

  useEffect(() => {
    const el = document.getElementById("lead-form");
    setHasLocalForm(Boolean(el));
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

  if (pathname === "/thank-you" || pathname === "/cardiology-wordle" || formInView) return null;

  const formHref = hasLocalForm
    ? "#lead-form"
    : "/physician-opportunities#lead-form";
  const isFeaturedOpportunity = pathname.startsWith(
    "/featured-cardiology-jobs/",
  );

  return (
    <div
      id="sticky-mobile-cta"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-3 sm:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="pointer-events-auto mx-auto flex max-w-lg gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-card backdrop-blur">
        <Button
          href={formHref}
          size="md"
          className="min-h-11 min-w-0 flex-[1.4] basis-0 justify-center px-2 text-sm leading-snug"
          onClick={() =>
            trackCtaClick(
              isFeaturedOpportunity
                ? "sticky_featured_job_inquiry"
                : "sticky_submit_inquiry",
              formHref,
            )
          }
        >
          {isFeaturedOpportunity ? "Get details" : CTA.requestMatches}
        </Button>
        <Button
          href="/contact"
          variant="secondary"
          size="md"
          className="min-h-11 min-w-0 flex-1 basis-0 justify-center px-2 text-sm leading-snug"
          onClick={() => trackCtaClick("sticky_contact", "/contact")}
        >
          {CTA.contactMe}
        </Button>
      </div>
    </div>
  );
}
