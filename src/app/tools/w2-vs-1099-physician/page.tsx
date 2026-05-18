import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd, webApplicationJsonLd } from "@/lib/schema";
import { buildW2vs1099SerpMetadata } from "@/lib/serp-ctr";

const PATH = "/tools/w2-vs-1099-physician";

const FAQ = [
  {
    q: "Is locums income always 1099?",
    a: "Not always. Some arrangements use W-2 through a staffing intermediary; others use 1099-style independent contractor structures. Your agreement and payer flow determine reporting—verify with your contract and CPA.",
  },
  {
    q: "What should physicians compare beyond headline rates?",
    a: "Malpractice coverage type, tail obligations, benefits (or stipends in lieu), cancellation terms, call burden, documentation load, and tax complexity (estimated taxes, retirement contributions, insurance).",
  },
  {
    q: "Does Locum Career Hub provide tax advice?",
    a: "No. We help you understand common tradeoffs in recruiting conversations and when to escalate questions to licensed tax professionals.",
  },
] as const;

export const metadata: Metadata = buildW2vs1099SerpMetadata();

export default function W2Vs1099Page() {
  const medical = medicalWebPageJsonLd({
    name: "W-2 vs 1099 income framing for physicians | Locum Career Hub",
    description:
      "Educational overview comparing employed vs contractor framing for locum tenens and flexible physician work.",
    path: PATH,
    keywords: ["W-2 physician", "1099 physician", "locum tenens taxes", "physician contractor"],
    aboutTopics: ["Physician compensation", "Locum tenens", "Physician careers"],
  });
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "W-2 vs 1099", path: PATH },
  ]);

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={medical} />
      <JsonLd
        data={webApplicationJsonLd({
          name: "W-2 vs 1099 for physicians (overview)",
          description:
            "Educational comparison of employed (W-2) vs independent contractor (1099) framing for physicians exploring locum tenens.",
          path: PATH,
          applicationCategory: "BusinessApplication",
        })}
      />
      <JsonLd data={faqJsonLd([...FAQ])} />
      <JsonLd data={crumbs} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Tools</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            W-2 vs 1099 for physicians (overview)
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Locum tenens discussions often collide with tax structure. This page gives a clean, citation-friendly comparison
            table and FAQs—without pretending one path is universally better.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site max-w-3xl space-y-10">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-4 py-3">Topic</th>
                  <th className="px-4 py-3">W-2 employed (typical)</th>
                  <th className="px-4 py-3">1099 / IC (typical)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900">Tax withholding</td>
                  <td className="px-4 py-3">Often withheld via payroll</td>
                  <td className="px-4 py-3">Often pay quarterly estimated taxes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900">Benefits</td>
                  <td className="px-4 py-3">May include health, retirement match</td>
                  <td className="px-4 py-3">Often self-funded; sometimes stipends</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900">Malpractice</td>
                  <td className="px-4 py-3">Employer-provided structures common</td>
                  <td className="px-4 py-3">Must confirm tail, limits, and covered acts</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900">Expense flexibility</td>
                  <td className="px-4 py-3">Less direct expense control</td>
                  <td className="px-4 py-3">May deduct ordinary business expenses (CPA-dependent)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900">Operational feel</td>
                  <td className="px-4 py-3">Closer to traditional employment rails</td>
                  <td className="px-4 py-3">More admin overhead; more autonomy potential</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-950">FAQs</h2>
            <dl className="mt-6 space-y-6">
              {FAQ.map((f) => (
                <div key={f.q} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                  <dt className="font-semibold text-slate-900">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="text-sm text-slate-600">
            Pair this overview with the{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/tools/locum-salary-estimator">
              locum salary estimator
            </Link>{" "}
            and your state hub on{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/locum-tenens-jobs">
              locum tenens jobs
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
