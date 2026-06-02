import type { ReactNode } from "react";
import { RecruiterInquiryTrust } from "@/components/seo/RecruiterInquiryTrust";
import { SITE } from "@/lib/site";

const STANDALONE_POINTS = [
  "Subspecialty-aware matching—not a generic physician job board",
  "Call, cath lab scope, and privileging discussed before you commit",
  "Response within one business day when mutual fit exists",
] as const;

type Props = {
  children: ReactNode;
  /**
   * When true (default), desktop shows trust content beside the form.
   * Set false when the page already has rich content above the form (e.g. opportunities page).
   */
  withTrustPanel?: boolean;
  className?: string;
};

/**
 * Wraps the inquiry form for full-width standalone sections.
 * - With trust panel: 4/8 column split on desktop (info + wide form).
 * - Without trust panel: form uses full container width on desktop.
 */
export function LeadFormStandaloneSection({ children, withTrustPanel = true, className = "" }: Props) {
  if (!withTrustPanel) {
    return (
      <div className={`container-site w-full ${className}`.trim()}>
        <div className="w-full">{children}</div>
      </div>
    );
  }

  return (
    <div className={`container-site ${className}`.trim()}>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start xl:gap-10">
        <div className="min-w-0 space-y-6 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <RecruiterInquiryTrust />
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">What to expect</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
              {STANDALONE_POINTS.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-slate-500">
              Questions first? Call{" "}
              <a href={`tel:${SITE.phoneTel}`} className="font-semibold text-brand-700 hover:underline">
                {SITE.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </div>
    </div>
  );
}
