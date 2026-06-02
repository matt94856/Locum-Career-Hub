import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { AnswerFirstBlock } from "@/components/seo/AnswerFirstBlock";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CardiologyCtaBand } from "@/components/seo/CardiologyCtaBand";
import { ContentSections } from "@/components/seo/ContentSections";
import { EeatArticleFooter } from "@/components/seo/EeatArticleFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedCardiologyLinks } from "@/components/seo/RelatedCardiologyLinks";
import type { CardiologyArticle } from "@/lib/cardiology-authority/types";
import { CARDIOLOGY_HUB_PATH } from "@/lib/seo/cardiology-locum-jobs-config";
import { authorityArticleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";
import { CARDIOLOGY_RECRUITER } from "@/lib/cardiology-authority/eeat";

export function CardiologyAuthorityPageView({ article }: { article: CardiologyArticle }) {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: article.h1, path: article.path },
  ]);

  const articleLd = authorityArticleJsonLd({
    title: article.title,
    description: article.metaDescription,
    path: article.path,
    datePublished: "2026-01-15",
    dateModified: article.eeat.lastUpdated,
    keywords: article.keywords,
    author: { name: article.eeat.author, jobTitle: article.eeat.authorRole },
    reviewer: { name: article.eeat.reviewer, credentials: article.eeat.reviewerCredentials },
  });

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={crumbs} />
      <JsonLd data={articleLd} />
      <JsonLd data={faqJsonLd(article.faqs)} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources" },
              { label: article.h1 },
            ]}
          />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Cardiology resources</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {article.h1}
          </h1>
          <div className="mt-6">
            <AnswerFirstBlock answer={article.directAnswer} />
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Part of our{" "}
            <Link href={CARDIOLOGY_HUB_PATH} className="font-semibold text-brand-700 hover:underline">
              cardiology locum jobs
            </Link>{" "}
            authority library—written for board-certified cardiologists and fellows considering locum tenens.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 space-y-10 lg:col-span-7">
            <ContentSections sections={article.sections} />
            <CardiologyCtaBand variant="salary" />
            <ContentSections
              sections={[
                {
                  h2: "What cardiologists should document before signing",
                  paragraphs: [
                    "Call frequency, cath lab or EP lab scope, consult census caps, imaging turnaround, malpractice limits, travel stipends, and cancellation terms belong in writing before day one.",
                    `${CARDIOLOGY_RECRUITER.name} recruits cardiologists only—when mutual fit exists, we advocate for clarity on those variables during negotiations.`,
                  ],
                },
              ]}
            />
            <CardiologyCtaBand variant="compare" />
            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">FAQs</h2>
              <dl className="mt-6 space-y-6">
                {article.faqs.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <dt className="font-semibold text-slate-900">{f.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <CardiologyCtaBand variant="recruiter" />
            <RelatedCardiologyLinks
              specialtyPathSlugs={article.relatedSpecialtyPathSlugs}
              articleSlugs={article.relatedArticleSlugs}
            />
            <EeatArticleFooter eeat={article.eeat} />
          </div>
          <aside className="min-w-0 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <LeadCaptureForm
              title="Talk with a cardiology recruiter"
              subtitle="Cardiologist-only matching. Response within one business day."
              layout="sidebar"
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
