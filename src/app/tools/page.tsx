import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { PORTFOLIO_TOOLS } from "@/lib/tools/portfolio-tools";
import { SITE } from "@/lib/site";

const indexed = PORTFOLIO_TOOLS.filter((tool) => tool.risk === "standard");
const staged = PORTFOLIO_TOOLS.filter((tool) => tool.risk === "expert-review");

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiologist Calculators and Decision Tools",
  description: "Use evidence-versioned calculators for cardiology locums earnings, IMLC eligibility, credentialing, offer comparison, call burden, licenses, contracts, RVUs, and career planning.",
  path: "/tools",
  keywords: ["cardiologist calculator", "physician locum tools", "cardiology compensation tools"],
});

function ToolCard({ tool }: { tool: (typeof PORTFOLIO_TOOLS)[number] }) {
  return (
    <Link href={tool.path} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">{tool.eyebrow}</p>
        {tool.risk === "expert-review" ? <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-900">Review-gated</span> : null}
      </div>
      <h2 className="mt-3 font-display text-2xl font-semibold text-slate-950 group-hover:text-brand-800">{tool.shortName}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>
      <span className="mt-5 inline-block text-sm font-semibold text-brand-700">Open tool →</span>
    </Link>
  );
}

export default function ToolsIndexPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cardiologist decision tools",
    itemListElement: PORTFOLIO_TOOLS.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${SITE.url}${tool.path}`,
    })),
  };

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cardiologist tools", path: "/tools" }])} />
      <JsonLd data={itemList} />
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Cardiologist decision tools</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Make clearer cardiology career and locums decisions</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">Ten transparent calculators turn licensing, credentialing, offer economics, call burden, contract terms, compensation, and career timing into structured next steps. Calculations are anonymous unless you explicitly request follow-up.</p>
          <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">Flagship career report</p>
              <h2 className="mt-2 font-display text-2xl font-semibold">Cardiologist locums earning potential calculator</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">Model specialty, availability, licenses, travel, fit score, and additional-income ranges.</p>
            </div>
            <Link href="/cardiologist-locums-calculator" className="mt-5 inline-flex shrink-0 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600 sm:mt-0">Calculate earning potential</Link>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site max-w-5xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-slate-950">Source-verified public tools</h2>
            <p className="mt-3 leading-7 text-slate-600">Use these for licensing, readiness, and assignment comparisons. Every page shows formulas, effective dates, limitations, and official verification steps.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">{indexed.map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-5xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-slate-950">Educational tools under qualified review</h2>
            <p className="mt-3 leading-7 text-slate-600">Tax, legal, compliance, compensation, and retirement models are usable for scenario testing but intentionally noindex until the appropriate qualified reviewer approves the methodology.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">{staged.map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site max-w-4xl">
          <h2 className="font-display text-3xl font-semibold text-slate-950">How to use the portfolio</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["1. Establish access", "Check IMLC, license ROI, and credentialing readiness before promising a start date."],
              ["2. Normalize the work", "Compare offers and call burden using total committed time—not headline rates alone."],
              ["3. Review the agreement", "Pressure-test contract, compensation, and transition assumptions with qualified advisors."],
            ].map(([title, body]) => <div key={title} className="rounded-2xl border border-slate-200 p-5"><h3 className="font-semibold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
