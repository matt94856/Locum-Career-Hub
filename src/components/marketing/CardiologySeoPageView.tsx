import type { Metadata } from "next";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { ContentSections } from "@/components/seo/ContentSections";
import { JsonLd } from "@/components/seo/JsonLd";
import { RecruiterInquiryTrust } from "@/components/seo/RecruiterInquiryTrust";
import type { CardiologySeoPage } from "@/lib/cardiology-seo/types";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { stripBrandFromTitle } from "@/lib/seo-title";
import { CTA, SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { LeadConversionBand } from "@/components/sections/LeadConversionBand";

const CATEGORY_CRUMB: Record<CardiologySeoPage["category"], { label: string; path: string }> = {
  money: { label: "Cardiology locum jobs", path: "/cardiology-locum-jobs" },
  state: { label: "States", path: "/states" },
  city: { label: "Cities", path: "/cities" },
  salary: { label: "Salary", path: "/salary" },
  licensing: { label: "Guides", path: "/guides" },
  tax: { label: "Guides", path: "/guides" },
  career: { label: "Guides", path: "/guides" },
  subspecialty: { label: "Guides", path: "/guides" },
  employer: { label: "Guides", path: "/guides" },
  comparison: { label: "Guides", path: "/guides" },
  faq: { label: "Guides", path: "/guides" },
  data: { label: "Guides", path: "/guides" },
  pillar: { label: "Guides", path: "/guides" },
};

export function buildCardiologySeoMetadata(page: CardiologySeoPage): Metadata {
  const meta = buildSerpMetadata({
    title: stripBrandFromTitle(page.title),
    description: page.metaDescription,
    path: page.path,
    keywords: page.keywords,
  });
  if (page.noindex) {
    return {
      ...meta,
      robots: { index: false, follow: true },
    };
  }
  return meta;
}

export function CardiologySeoPageView({ page }: { page: CardiologySeoPage }) {
  const cat = CATEGORY_CRUMB[page.category];
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: cat.label, path: cat.path },
    { name: page.h1, path: page.path },
  ]);
  const medical = medicalWebPageJsonLd({
    name: page.title,
    description: page.metaDescription,
    path: page.path,
    keywords: page.keywords,
    aboutTopics: ["Cardiology", "Locum tenens", "Cardiologist careers", SITE.name],
  });

  const showSidebarForm = page.category === "state" || page.category === "city" || page.category === "money";

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={medical} />
      <JsonLd data={faqJsonLd(page.faqs)} />
      <JsonLd data={crumbs} />

      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_0%,rgba(37,99,235,0.16),transparent_55%)]" />
        <div className="container-site relative">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Cardiologist-only recruiting</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-5xl">
              {page.h1}
            </h1>
            <h2 className="mt-4 text-lg font-medium text-slate-700 sm:text-xl">{page.h2}</h2>
            <p className="mt-6 rounded-2xl border border-brand-100 bg-white/90 p-4 text-base font-medium leading-relaxed text-slate-800 shadow-sm sm:p-5 sm:text-lg">
              <span className="text-brand-800">Direct answer: </span>
              {page.directAnswer}
            </p>
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">{page.intro}</p>
            <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
              <Button href="/physician-opportunities#lead-form" className="w-full justify-center">
                {CTA.explore}
              </Button>
              <Button href="/contact" variant="secondary" className="w-full justify-center">
                {CTA.recruiter}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 space-y-10 lg:col-span-7">
            {page.showRecruiterTrust ? <RecruiterInquiryTrust geoLabel={page.geoLabel} /> : null}
            <ContentSections sections={page.sections} />

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">FAQ</h2>
              <dl className="mt-6 space-y-6">
                {page.faqs.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <dt className="font-semibold text-slate-900">{f.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {page.relatedLinks.length > 0 ? (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-700">Related</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {page.relatedLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm font-medium text-brand-700 hover:text-brand-900">
                        {l.title} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {showSidebarForm ? (
            <div className="min-w-0 space-y-6 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
              <LeadCaptureForm
                title={page.geoLabel ? `Inquiry: ${page.geoLabel}` : "Cardiologist inquiry"}
                subtitle={`Select ${page.geoLabel ? `${page.geoLabel} and ` : ""}any other states you would consider. A recruiter will follow up if realistic cardiology locum opportunities exist—not a mass email blast.`}
                defaultSpecialty="General Cardiology"
              />
              <LeadConversionBand
                headline="Questions before you apply?"
                subline="Call or email—we are happy to clarify how cardiologist matching works."
              />
            </div>
          ) : (
            <div className="lg:col-span-5">
              <LeadConversionBand
                headline="Explore cardiology locum matches"
                subline="Submit subspecialty, states, and dates—a recruiter follows up when opportunities fit."
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
