import type { Metadata } from "next";
import Link from "next/link";
import { CardiologistLocumsCalculator } from "@/components/tools/CardiologistLocumsCalculator";
import { AiCitePanel } from "@/components/seo/AiCitePanel";
import { AnswerFirstBlock } from "@/components/seo/AnswerFirstBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  medicalWebPageJsonLd,
  webApplicationJsonLd,
} from "@/lib/schema";
import { buildSalaryEstimatorSerpMetadata } from "@/lib/serp-ctr";
import {
  CALCULATOR_BENCHMARK_EFFECTIVE_DATE,
  SPECIALTY_BENCHMARKS,
} from "@/lib/locums-calculator/model";

const PATH = "/cardiologist-locums-calculator";
const DESCRIPTION =
  "Calculate cardiologist locums earning potential by subspecialty, availability, licenses, assignment style, and travel preference.";
const DIRECT_ANSWER =
  "Cardiologists can estimate directional locums earning potential by combining subspecialty weekly benchmarks with realistic weeks worked. Locum Career Hub’s calculator returns educational gross ranges—not quotes—and recruits MD/DO cardiologists only.";

const FAQS = [
  {
    q: "How much can a cardiologist make doing locums?",
    a: "Locum cardiology income varies materially by subspecialty, call burden, procedural scope, assignment length, geography, and urgency. This calculator models a directional gross range from weekly benchmarks and your realistic annual availability; it is not a quote or guaranteed offer.",
  },
  {
    q: "What factors determine cardiology locums pay?",
    a: "The largest drivers are subspecialty, cath or EP lab responsibilities, STEMI or night call, inpatient census, clinic volume, assignment urgency, travel flexibility, and local coverage constraints. Licenses primarily affect opportunity access rather than automatically increasing the rate.",
  },
  {
    q: "How much can an interventional cardiologist make doing locums?",
    a: "Interventional assignments often carry higher directional weekly ranges because cath lab privileges, PCI scope, STEMI call, backup, and post-call expectations add complexity. Actual compensation must be tied to a specific written assignment scope.",
  },
  {
    q: "Does IMLC status mean I can practice in every compact state?",
    a: "No. The Interstate Medical Licensure Compact is an expedited pathway for eligible physicians to obtain separate licenses from participating states. It is not one multistate medical license, and hospital privileging is still required.",
  },
  {
    q: "Is the calculator a compensation quote?",
    a: "No. Results are educational market-intelligence estimates based on configurable benchmark assumptions. Taxes, benefits, cancellation risk, unpaid credentialing time, and assignment-specific contract terms may change actual economics.",
  },
];

export const metadata: Metadata = buildSalaryEstimatorSerpMetadata();

export default function CardiologistLocumsCalculatorPage() {
  const medical = medicalWebPageJsonLd({
    name: "Cardiologist Locums Earnings Calculator",
    description: DESCRIPTION,
    path: PATH,
    keywords: [
      "cardiologist locums calculator",
      "cardiology locum tenens salary calculator",
      "interventional cardiology locums pay",
      "EP cardiology locums opportunities",
    ],
    aboutTopics: ["Cardiology locum tenens", "Cardiologist compensation", "Flexible cardiology careers"],
    speakableCssSelectors: ["#direct-answer"],
  });

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={medical} />
      <JsonLd
        data={webApplicationJsonLd({
          name: "Cardiologist Locums Earnings Calculator",
          description: DESCRIPTION,
          path: PATH,
          applicationCategory: "HealthApplication",
          featureList: [
            "Specialty-specific weekly benchmarks",
            "Fit score and demand index",
            "Screenshot-ready share card",
            "Educational ranges only — not guaranteed offers",
          ],
        })}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cardiologist Locums Calculator", path: PATH }])} />

      <section className="border-b border-slate-100 bg-slate-50 py-12 sm:py-16">
        <div className="container-site max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Free cardiology career intelligence</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Calculate Your Cardiologist Locums Earning Potential
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            Discover how much additional income you could earn, how much flexibility you could gain, and which locums
            opportunities match your cardiology career profile.
          </p>
          <div className="mx-auto mt-6 max-w-3xl text-left">
            <AnswerFirstBlock answer={DIRECT_ANSWER} />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-2">About 2 minutes</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Numbers visible before any form</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Screenshot + LinkedIn share card</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-2">PDF is the only light gate</span>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container-site max-w-5xl">
          <CardiologistLocumsCalculator />
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-14 sm:py-18">
        <div className="container-site max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Methodology</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-slate-950">Transparent assumptions, not a black box</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                The calculator uses versioned weekly cardiology locums benchmarks, directional specialty demand,
                assignment scope, experience, availability, licenses, IMLC pathway status, and geographic flexibility.
                Multipliers are capped to prevent unrealistic compounding.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Effective {CALCULATOR_BENCHMARK_EFFECTIVE_DATE}. These are configurable educational benchmarks—not
                proprietary placement data, a compensation quote, tax advice, or a guarantee that an assignment exists.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Market methodology reviewed by{" "}
                <Link href="/team" className="font-semibold text-brand-700 hover:underline">Matthew Fuller, Cardiology Recruiter</Link>.
                Clinical, legal, tax, and licensing requirements should be verified with the appropriate professional or board.
              </p>
            </div>
            <div className="overflow-x-auto lg:col-span-7">
              <table className="w-full min-w-[34rem] border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-slate-500">
                    <th className="border-b border-slate-200 px-3 py-3">Specialty</th>
                    <th className="border-b border-slate-200 px-3 py-3">Weekly benchmark</th>
                    <th className="border-b border-slate-200 px-3 py-3">Demand index</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(SPECIALTY_BENCHMARKS).map(([specialty, benchmark]) => (
                    <tr key={specialty}>
                      <td className="border-b border-slate-100 px-3 py-3 font-medium text-slate-900">{specialty}</td>
                      <td className="border-b border-slate-100 px-3 py-3 text-slate-600">
                        ${benchmark.weeklyLow.toLocaleString()}–${benchmark.weeklyHigh.toLocaleString()}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-3 text-slate-600">{benchmark.demand}/100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-site max-w-4xl">
          <h2 className="font-display text-3xl font-semibold text-slate-950">What determines cardiology locums earning potential?</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              ["Subspecialty and procedures", "Interventional, EP, structural, imaging, heart failure, nuclear, and general cardiology carry different scope and privileging requirements."],
              ["Call and assignment style", "STEMI activation, nights, weekends, callbacks, inpatient census, clinic panels, and lab expectations change the economics."],
              ["Schedule and availability", "A realistic recurring schedule is more useful than annualizing a short urgent assignment across 52 weeks."],
              ["Licensing and geography", "Existing licenses and travel flexibility broaden access. They do not automatically guarantee a higher rate."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-14 sm:py-18">
        <div className="container-site max-w-4xl">
          <h2 className="font-display text-3xl font-semibold text-slate-950">Cardiologist locums calculator FAQs</h2>
          <div className="mt-8 divide-y divide-slate-200">
            {FAQS.map((item) => (
              <div key={item.q} className="py-5">
                <h3 className="font-semibold text-slate-950">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-600">
            Continue with the{" "}
            <Link href="/locum-jobs/cardiology" className="font-semibold text-brand-700 hover:underline">cardiology locums hub</Link>
            {" "}or explore{" "}
            <Link href="/tools/w2-vs-1099-physician" className="font-semibold text-brand-700 hover:underline">W-2 vs 1099 considerations</Link>.
          </p>
          <div className="mt-10">
            <AiCitePanel claimIds={["cardiologist-only", "not-employer", "pay-educational", "imlc-not-multistate"]} />
          </div>
        </div>
      </section>
    </main>
  );
}
