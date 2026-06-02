import type { Metadata } from "next";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { LeadFormStandaloneSection } from "@/components/forms/LeadFormStandaloneSection";
import { ContentSections } from "@/components/seo/ContentSections";
import { JsonLd } from "@/components/seo/JsonLd";
import type { CardiologyProgrammaticPage } from "@/lib/cardiology-programmatic";
import { getLegacyCardiologyLocumsRedirectDestination } from "@/lib/cardiology-seo/legacy-redirects";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { stripBrandFromTitle } from "@/lib/seo-title";
import { CTA, SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { LeadConversionBand } from "@/components/sections/LeadConversionBand";

export function buildCardiologyProgrammaticMetadata(page: CardiologyProgrammaticPage): Metadata {
  const legacyPath = `/cardiology-locums/${page.slug}`;
  const canonicalPath = getLegacyCardiologyLocumsRedirectDestination(page.slug);
  const meta = buildSerpMetadata({
    title: stripBrandFromTitle(page.title),
    description: page.metaDescription,
    path: legacyPath,
    keywords: page.keywords,
  });
  return {
    ...meta,
    robots: { index: false, follow: true },
    ...(canonicalPath
      ? {
          alternates: {
            canonical: `${SITE.url}${canonicalPath}`,
          },
        }
      : {}),
  };
}

export function CardiologyProgrammaticView({ page }: { page: CardiologyProgrammaticPage }) {
  const path = `/cardiology-locums/${page.slug}`;
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Cardiology locums", path: "/cardiology-locums" },
    { name: page.h1, path },
  ]);
  const medical = medicalWebPageJsonLd({
    name: page.title,
    description: page.metaDescription,
    path,
    keywords: page.keywords,
    aboutTopics: ["Cardiology", "Locum tenens", "Cardiologist careers", SITE.name],
  });
  const faqLd = faqJsonLd(page.faqs);

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={medical} />
      <JsonLd data={faqLd} />
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
        <div className="container-site">
          <ContentSections sections={page.sections} />
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50/50 py-14">
        <div className="container-site max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Cardiologist locum FAQ</h2>
          <dl className="mt-8 space-y-6">
            {page.faqs.map((f) => (
              <div key={f.q}>
                <dt className="text-sm font-semibold text-slate-900">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {page.relatedLinks.length > 0 ? (
        <section className="py-12">
          <div className="container-site">
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
        </section>
      ) : null}

      <LeadConversionBand
        headline="Cardiologist inquiry"
        subline="We recruit cardiologists only—share subspecialty, states, and dates for realistic locum matches."
      />

      <section className="py-14 sm:py-16">
        <LeadFormStandaloneSection withTrustPanel={false}>
          <LeadCaptureForm
            title="Request cardiologist locum matches"
            subtitle="MD/DO cardiologists only. We follow up with documented options—not a generic blast."
            defaultSpecialty="General Cardiology"
          />
        </LeadFormStandaloneSection>
      </section>
    </main>
  );
}
