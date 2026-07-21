import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PortfolioDecisionTool } from "@/components/tools/PortfolioDecisionTool";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd, webApplicationJsonLd } from "@/lib/schema";
import { TOOL_EVIDENCE_SOURCES } from "@/lib/tool-data/sources";
import { PORTFOLIO_TOOLS, type PortfolioToolDefinition } from "@/lib/tools/portfolio-tools";

const MEDICAL_PAGE_IDS = new Set(["imlc", "credentialing", "license-cme", "call-burden"]);

export function PortfolioToolPage({ definition }: { definition: PortfolioToolDefinition }) {
  const sources = definition.sourceIds.map((id) => TOOL_EVIDENCE_SOURCES[id]).filter(Boolean);
  const related = PORTFOLIO_TOOLS.filter((tool) => tool.id !== definition.id).slice(0, 4);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Cardiologist tools", path: "/tools" },
    { name: definition.shortName, path: definition.path },
  ]);

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={breadcrumb} />
      <JsonLd data={faqJsonLd(definition.faqs)} />
      <JsonLd
        data={webApplicationJsonLd({
          name: definition.name,
          description: definition.description,
          path: definition.path,
          applicationCategory: "BusinessApplication",
        })}
      />
      {MEDICAL_PAGE_IDS.has(definition.id) ? (
        <JsonLd
          data={medicalWebPageJsonLd({
            name: definition.name,
            description: definition.description,
            path: definition.path,
            keywords: definition.keywords,
            aboutTopics: ["Cardiology", "Locum tenens", "Physician career planning"],
          })}
        />
      ) : null}

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-12 sm:py-16">
        <div className="container-site max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{definition.eyebrow}</p>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${definition.risk === "expert-review" ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-800"}`}>
              {definition.reviewLabel}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{definition.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{definition.description}</p>
          <div className="mt-7 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">Direct answer</p>
            <p className="mt-2 leading-7 text-slate-800">{definition.directAnswer}</p>
          </div>
          {definition.risk === "expert-review" ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              This staged tool is available for educational testing but is intentionally excluded from search indexing until the named qualified review is complete.
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-site max-w-4xl">
          <PortfolioDecisionTool definition={definition} />
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-12 sm:py-16">
        <div className="container-site max-w-4xl">
          <h2 className="font-display text-3xl font-semibold text-slate-950">How this calculator works</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {definition.methodology.map((item, index) => (
              <li key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700">
                <span className="font-semibold text-brand-700">{index + 1}.</span> {item}
              </li>
            ))}
          </ol>
          <h2 className="mt-12 font-display text-3xl font-semibold text-slate-950">Sources and version</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Every result includes its evidence version. Official sources outrank secondary summaries, and user-entered scenario assumptions remain visibly separate from published facts.</p>
          <ul className="mt-6 space-y-4">
            {sources.map((source) => (
              <li key={source.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <a href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-brand-700 hover:underline">{source.publisher}: {source.title}</a>
                <p className="mt-2 text-sm leading-6 text-slate-600">{source.use}</p>
                <p className="mt-2 text-xs text-slate-500">Effective {source.effectiveDate} · Retrieved {source.retrievedAt} · Version {source.id}</p>
              </li>
            ))}
          </ul>
          <h2 className="mt-12 font-display text-3xl font-semibold text-slate-950">Limitations</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
            {definition.limitations.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-site max-w-4xl">
          <h2 className="font-display text-3xl font-semibold text-slate-950">Frequently asked questions</h2>
          <dl className="mt-6 space-y-4">
            {definition.faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-slate-200 p-5">
                <dt className="font-semibold text-slate-950">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12 rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
            <h2 className="font-display text-3xl font-semibold">Continue your cardiology decision path</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((tool) => (
                <TrackedToolLink key={tool.id} fromToolId={definition.id} toToolId={tool.id} href={tool.path} className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm font-semibold hover:border-brand-400">
                  {tool.shortName} →
                </TrackedToolLink>
              ))}
              <Link href="/cardiologist-locums-calculator" className="rounded-xl bg-brand-600 p-4 text-sm font-semibold hover:bg-brand-500">Calculate locums earning potential →</Link>
              <Link href="/tools" className="rounded-xl border border-slate-700 p-4 text-sm font-semibold hover:border-brand-400">View all decision tools →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
