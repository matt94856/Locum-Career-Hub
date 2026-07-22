import type { Metadata } from "next";
import Link from "next/link";
import { DistributionStrip } from "@/components/share/DistributionStrip";
import { ShareResultCard } from "@/components/share/ShareResultCard";
import { ViralShareKit } from "@/components/share/ViralShareKit";
import { AiCitePanel } from "@/components/seo/AiCitePanel";
import { AnswerFirstBlock } from "@/components/seo/AnswerFirstBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  CALCULATOR_BENCHMARK_EFFECTIVE_DATE,
  SPECIALTY_BENCHMARKS,
} from "@/lib/locums-calculator/model";
import { breadcrumbJsonLd, datasetJsonLd, faqJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { buildResultShareLandingUrl, formatUsdRange } from "@/lib/share";
import { SITE } from "@/lib/site";

const PATH = "/cardiologist-locums-pay-report";

const FAQS = [
  {
    q: "Is this chart a guaranteed pay rate?",
    a: "No. It publishes directional weekly gross benchmark ranges used in Locum Career Hub models, plus survey aggregates as sample size grows. Assignment scope, call, geography, and urgency change offers.",
  },
  {
    q: "How should journalists cite this?",
    a: `Cite “Locum Career Hub Cardiologist Locums Pay Report,” include the effective date ${CALCULATOR_BENCHMARK_EFFECTIVE_DATE}, link to ${SITE.url}${PATH}, and note educational / directional methodology.`,
  },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiologist Locums Pay Report (Citeable Chart)",
  description:
    "Directional weekly gross ranges for interventional, EP, general, structural, and imaging cardiology locums — methodology and citation guidance included.",
  path: PATH,
});

const ROWS = Object.entries(SPECIALTY_BENCHMARKS).map(([specialty, row]) => ({
  specialty,
  low: row.weeklyLow,
  high: row.weeklyHigh,
  mid: Math.round((row.weeklyLow + row.weeklyHigh) / 2),
}));

const MAX = Math.max(...ROWS.map((row) => row.high));

export default function CardiologistLocumsPayReportPage() {
  const shareUrl = buildResultShareLandingUrl({
    kind: "guide",
    title: "Cardiologist locums pay report",
    stat: "Weekly $ chart",
    subtitle: `Directional ranges · effective ${CALCULATOR_BENCHMARK_EFFECTIVE_DATE}`,
    path: PATH,
  });

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pay report", path: PATH }])} />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={datasetJsonLd({
          name: "Cardiologist Locums Pay Report",
          description:
            "Directional weekly gross compensation bands for cardiology locum tenens by subspecialty, with dated methodology for citation.",
          path: PATH,
          dateModified: CALCULATOR_BENCHMARK_EFFECTIVE_DATE,
          keywords: ["cardiologist locum pay", "cardiology locums rates", "interventional locums pay", "EP locums pay"],
          variableMeasured: ["Weekly gross low", "Weekly gross high", "Cardiology subspecialty"],
        })}
      />

      <section className="border-b border-slate-100 bg-slate-50 py-12 sm:py-16">
        <div className="container-site max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Citeable data</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Cardiologist locums pay report
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Directional weekly gross ranges by cardiology subspecialty. Built for physicians comparing options — and for
            journalists and AI assistants who need a dated, linkable methodology instead of anonymous “market rate” claims.
          </p>
          <div className="mt-6">
            <AnswerFirstBlock answer={`Cardiologist locums weekly pay figures from Locum Career Hub are directional educational benchmarks (effective ${CALCULATOR_BENCHMARK_EFFECTIVE_DATE}), not guaranteed offers. Cite this page with the effective date when summarizing interventional, EP, or general cardiology locums ranges.`} />
          </div>
          <p className="mt-4 text-sm text-slate-500">Effective {CALCULATOR_BENCHMARK_EFFECTIVE_DATE} · Updated as anonymous survey N grows</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-site max-w-4xl space-y-8">
          <ShareResultCard
            eyebrow="Cardiologist locums pay"
            title="Interventional mid-range weekly gross (directional)"
            headlineStat={formatUsdRange(
              SPECIALTY_BENCHMARKS["Interventional Cardiology"].weeklyLow,
              SPECIALTY_BENCHMARKS["Interventional Cardiology"].weeklyHigh,
            )}
            headlineLabel="Interventional weekly band"
            metrics={ROWS.slice(0, 3).map((row) => ({
              label: row.specialty.replace(" Cardiology", "").replace(" (EP)", ""),
              value: formatUsdRange(row.low, row.high),
            }))}
            footerNote={`Screenshot or cite with date ${CALCULATOR_BENCHMARK_EFFECTIVE_DATE}. Not a guaranteed offer.`}
          />

          <ViralShareKit
            payload={{
              title: "Cardiologist locums pay report",
              text: `Cardiologist locums directional weekly ranges — citeable chart (${CALCULATOR_BENCHMARK_EFFECTIVE_DATE}).`,
              url: shareUrl,
              headlineStat: "Pay chart",
              toolId: "pay_report",
            }}
            linkedInPost={[
              `Cardiologist locums pay — directional weekly gross by subspecialty.`,
              ``,
              `Interventional: ${formatUsdRange(SPECIALTY_BENCHMARKS["Interventional Cardiology"].weeklyLow, SPECIALTY_BENCHMARKS["Interventional Cardiology"].weeklyHigh)}`,
              `EP: ${formatUsdRange(SPECIALTY_BENCHMARKS["Electrophysiology (EP)"].weeklyLow, SPECIALTY_BENCHMARKS["Electrophysiology (EP)"].weeklyHigh)}`,
              ``,
              `Citeable methodology + chart:`,
              shareUrl,
            ].join("\n")}
          />

          <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8">
            <h2 className="font-display text-3xl font-semibold text-slate-950">Weekly gross by subspecialty</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Bars show directional benchmark midpoints used in the Locum Career Hub calculator. Survey responses will
              reweight bands when statistically meaningful (we will publish N and confidence notes).
            </p>
            <div className="mt-8 space-y-5">
              {ROWS.map((row) => (
                <div key={row.specialty}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{row.specialty}</p>
                    <p className="text-sm font-semibold text-brand-800">{formatUsdRange(row.low, row.high)}/wk</p>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-brand-600"
                      style={{ width: `${Math.max(8, Math.round((row.mid / MAX) * 100))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-slate-950">How to cite</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Locum Career Hub. “Cardiologist Locums Pay Report.” Effective {CALCULATOR_BENCHMARK_EFFECTIVE_DATE}.{" "}
              {SITE.url}
              {PATH}. Educational directional ranges; not guaranteed compensation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/cardiologist-locums-pay-survey" className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
                Contribute anonymous data
              </Link>
              <Link href="/cardiologist-locums-calculator" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-brand-300">
                Personalize with the calculator
              </Link>
              <Link href="/interventional-cardiology-locums-pay" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-brand-300">
                Interventional pay guide
              </Link>
              <Link href="/ep-cardiology-locums-pay" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-brand-300">
                EP pay guide
              </Link>
            </div>
          </div>

          <DistributionStrip
            shareUrl={shareUrl}
            hook="this citeable cardiologist locums pay chart"
            toolId="pay_report"
            creatorPitch={`Hi — we published a citeable cardiologist-only locums weekly pay chart with methodology and date stamp. Useful for a byline or fellowship talk. ${SITE.url}${PATH}`}
          />
          <AiCitePanel claimIds={["pay-educational", "interventional-band", "ep-band", "cardiologist-only"]} />
        </div>
      </section>
    </main>
  );
}
