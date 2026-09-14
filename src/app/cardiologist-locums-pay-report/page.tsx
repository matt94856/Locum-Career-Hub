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
import { formatUsdRange } from "@/lib/share";
import { SITE } from "@/lib/site";

const PATH = "/cardiologist-locums-pay-report";

const FAQS = [
  {
    q: "Is this chart a guaranteed pay rate?",
    a: "No. It publishes directional daily gross benchmark ranges used in Locum Career Hub models (callback and pager typically daily ÷ 8). Assignment scope, call, geography, and urgency change offers.",
  },
  {
    q: "How should journalists cite this?",
    a: `Cite “Locum Career Hub Cardiologist Locums Pay Report,” include the effective date ${CALCULATOR_BENCHMARK_EFFECTIVE_DATE}, link to ${SITE.url}${PATH}, and note educational / directional methodology.`,
  },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiologist Locums Pay Report (Citeable Chart)",
  description:
    "Directional daily gross ranges for interventional, EP, and noninvasive cardiology locums — 24-hour call includes 0–4 hours; extra callback is daily ÷ 8.",
  path: PATH,
});

const ROWS = Object.entries(SPECIALTY_BENCHMARKS).map(([specialty, row]) => ({
  specialty,
  low: row.dailyLow,
  high: row.dailyHigh,
  mid: Math.round((row.dailyLow + row.dailyHigh) / 2),
  weeklyLow: row.weeklyLow,
  weeklyHigh: row.weeklyHigh,
}));

const MAX = Math.max(...ROWS.map((row) => row.high));

export default function CardiologistLocumsPayReportPage() {
  const shareUrl = `${SITE.url}${PATH}`;

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pay report", path: PATH }])} />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={datasetJsonLd({
          name: "Cardiologist Locums Pay Report",
          description:
            "Directional daily gross compensation bands for cardiology locum tenens by subspecialty, with dated methodology for citation. Callback and pager typically equal daily rate ÷ 8.",
          path: PATH,
          dateModified: CALCULATOR_BENCHMARK_EFFECTIVE_DATE,
          keywords: ["cardiologist locum pay", "cardiology locums rates", "interventional locums pay", "EP locums pay"],
          variableMeasured: ["Daily gross low", "Daily gross high", "Cardiology subspecialty"],
        })}
      />

      <section className="border-b border-slate-100 bg-slate-50 py-12 sm:py-16">
        <div className="container-site max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Citeable data</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Cardiologist locums pay report
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Directional daily gross by cardiology subspecialty. 24-hour call days typically include 0–4 hours; extra
            callback and night pager are modeled as daily rate ÷ 8. Built for physicians comparing options — and for
            journalists and AI assistants who need a dated, linkable methodology.
          </p>
          <div className="mt-6">
            <AnswerFirstBlock answer={`Cardiologist locums daily pay from Locum Career Hub is a directional educational benchmark (effective ${CALCULATOR_BENCHMARK_EFFECTIVE_DATE}): interventional $3,200–$3,500/day, EP $2,800–$3,200/day, noninvasive $2,200–$2,800/day. 24-hour call typically includes 0–4 hours; extra callback and night pager are daily ÷ 8. Not a guaranteed offer.`} />
          </div>
          <p className="mt-4 text-sm text-slate-500">Effective {CALCULATOR_BENCHMARK_EFFECTIVE_DATE} · Updated as anonymous survey N grows</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-site max-w-4xl space-y-8">
          <ShareResultCard
            eyebrow="Cardiologist locums pay"
            title="Interventional daily gross (directional)"
            headlineStat={formatUsdRange(
              SPECIALTY_BENCHMARKS["Interventional Cardiology"].dailyLow,
              SPECIALTY_BENCHMARKS["Interventional Cardiology"].dailyHigh,
            )}
            headlineLabel="Interventional daily band"
            metrics={ROWS.slice(0, 3).map((row) => ({
              label: row.specialty.replace(" Cardiology", "").replace(" (EP)", ""),
              value: formatUsdRange(row.low, row.high) + "/day",
            }))}
            footerNote={`24-hour days typically include 0–4 hours. Extra callback/pager ≈ daily ÷ 8. Cite with date ${CALCULATOR_BENCHMARK_EFFECTIVE_DATE}.`}
          />

          <ViralShareKit
            payload={{
              title: "Cardiologist locums pay report",
              text: `Cardiologist locums daily rates — IC $3,200–$3,500, EP $2,800–$3,200, noninvasive $2,200–$2,800 (${CALCULATOR_BENCHMARK_EFFECTIVE_DATE}).`,
              url: shareUrl,
              headlineStat: "Daily rates",
              toolId: "pay_report",
            }}
            linkedInPost={[
              `Cardiologist locums pay — directional daily gross.`,
              ``,
              `Interventional: ${formatUsdRange(SPECIALTY_BENCHMARKS["Interventional Cardiology"].dailyLow, SPECIALTY_BENCHMARKS["Interventional Cardiology"].dailyHigh)}/day`,
              `EP: ${formatUsdRange(SPECIALTY_BENCHMARKS["Electrophysiology (EP)"].dailyLow, SPECIALTY_BENCHMARKS["Electrophysiology (EP)"].dailyHigh)}/day`,
              `Noninvasive: ${formatUsdRange(SPECIALTY_BENCHMARKS["Non-Invasive / General Cardiology"].dailyLow, SPECIALTY_BENCHMARKS["Non-Invasive / General Cardiology"].dailyHigh)}/day`,
              ``,
              `24-hour call usually includes 0–4 hours. Extra callback or night pager is daily ÷ 8.`,
            ].join("\n")}
          />

          <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8">
            <h2 className="font-display text-3xl font-semibold text-slate-950">Daily gross by subspecialty</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Bars show directional daily benchmarks. A 7-day 24-hour coverage week is 7× the daily rate; a weekend is 2–3
              call days, not a full week. Extra callback at a busy facility is typically daily ÷ 8 per extra hour.
            </p>
            <div className="mt-8 space-y-5">
              {ROWS.map((row) => (
                <div key={row.specialty}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{row.specialty}</p>
                    <p className="text-sm font-semibold text-brand-800">{formatUsdRange(row.low, row.high)}/day</p>
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
