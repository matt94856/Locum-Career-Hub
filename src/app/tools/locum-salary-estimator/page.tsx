import type { Metadata } from "next";
import Link from "next/link";
import { LocumSalaryEstimator } from "@/components/tools/LocumSalaryEstimator";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, medicalWebPageJsonLd, webApplicationJsonLd } from "@/lib/schema";
import { LeadConversionBand } from "@/components/sections/LeadConversionBand";
import { buildSalaryEstimatorSerpMetadata } from "@/lib/serp-ctr";

const PATH = "/tools/locum-salary-estimator";
const DESC =
  "Illustrative locum tenens salary range calculator for physicians—gross-only modeling with explicit disclaimers (not a quote or tax advice).";

export const metadata: Metadata = buildSalaryEstimatorSerpMetadata("/tools/locum-salary-estimator");

export default function LocumSalaryEstimatorPage() {
  const medical = medicalWebPageJsonLd({
    name: "Locum tenens salary estimator (illustrative) | Locum Career Hub",
    description: DESC,
    path: PATH,
    keywords: ["locum tenens salary", "physician compensation", "locum pay calculator"],
    aboutTopics: ["Locum tenens", "Physician compensation", "Flexible physician work"],
  });
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "Locum salary estimator", path: PATH },
  ]);

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={medical} />
      <JsonLd
        data={webApplicationJsonLd({
          name: "Locum tenens salary range estimator",
          description: DESC,
          path: PATH,
        })}
      />
      <JsonLd data={crumbs} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Tools</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Cardiologist locum salary range calculator
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Estimate a directional gross range for cardiology locum blocks using shifts, weeks, and a blended hourly
            band. This is educational math—not a quote, guarantee, or tax plan. For a fuller specialty-and-schedule
            model, use the{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/cardiologist-locums-calculator">
              cardiologist locums earning calculator
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site max-w-2xl space-y-8">
          <LocumSalaryEstimator />
          <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-5 text-sm leading-relaxed text-amber-950">
            <strong>Disclaimer:</strong> This tool outputs a gross math range for education only. Consult a CPA or tax
            attorney for 1099/W-2 planning, and talk with a recruiter for market-realistic quotes tied to a specific role.
          </div>
          <p className="text-sm text-slate-600">
            Next: explore{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/locum-jobs/cardiology/general">
              general cardiology locums
            </Link>
            ,{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/locum-jobs/cardiology/interventional">
              interventional locums
            </Link>
            ,{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/locum-jobs/cardiology/electrophysiology">
              EP locums
            </Link>
            , or{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/physician-opportunities#lead-form">
              request matches
            </Link>
            .
          </p>
          <LeadConversionBand headline="Like the range? Get real locum matches." />
        </div>
      </section>
    </main>
  );
}
