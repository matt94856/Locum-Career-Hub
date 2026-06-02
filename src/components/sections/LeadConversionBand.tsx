import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LEAD_FORM_HREF } from "@/lib/seo/tier1-discovery";
import { CTA, SITE } from "@/lib/site";

type Props = {
  headline?: string;
  subline?: string;
  className?: string;
};

/** Compact conversion strip for long-form SEO pages. */
export function LeadConversionBand({
  headline = "Ready for realistic cardiology locum matches?",
  subline = "Share subspecialty, states, and boundaries—we respond with options, not spam.",
  className = "",
}: Props) {
  return (
    <aside
      className={`rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8 ${className}`.trim()}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Next step</p>
      <h2 className="mt-2 font-display text-xl font-semibold text-slate-950 sm:text-2xl">{headline}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{subline}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button href={LEAD_FORM_HREF} className="w-full justify-center sm:w-auto">
          {CTA.explore}
        </Button>
        <Button href={`tel:${SITE.phoneTel}`} variant="secondary" className="w-full justify-center sm:w-auto">
          Call {SITE.phoneDisplay}
        </Button>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Prefer tools first?{" "}
        <Link href="/tools/locum-salary-estimator" className="font-semibold text-brand-700 hover:underline">
          Locum salary calculator
        </Link>{" "}
        ·{" "}
        <Link href="/#cardiologist-guides" className="font-semibold text-brand-700 hover:underline">
          Cardiologist guides
        </Link>
      </p>
    </aside>
  );
}
