import type { Metadata } from "next";
import Link from "next/link";
import { LeadConversionBand } from "@/components/sections/LeadConversionBand";
import { buildToolsIndexSerpMetadata } from "@/lib/serp-ctr";

export const metadata: Metadata = buildToolsIndexSerpMetadata();

const TOOLS = [
  {
    href: "/tools/locum-salary-estimator",
    title: "Free locum tenens salary calculator",
    body: "Matches “locum tenens income calculator” searches—weekly gross ranges, illustrative only.",
  },
  {
    href: "/tools/w2-vs-1099-physician",
    title: "Locum vs employed calculator (W-2 vs 1099)",
    body: "Compare pay structures before you sign—educational, not tax advice.",
  },
] as const;

export default function ToolsIndexPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Tools</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Physician-friendly calculators & comparisons
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            These pages are designed to be citation-friendly: structured headings, explicit disclaimers, and links into
            specialty and state hubs when you want geography-specific context.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site max-w-2xl space-y-6">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="block rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-brand-200"
            >
              <h2 className="font-display text-xl font-semibold text-slate-950">{t.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.body}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-700">Open tool →</span>
            </Link>
          ))}
          <LeadConversionBand headline="Ran the numbers—want real locum matches?" />
        </div>
      </section>
    </main>
  );
}
