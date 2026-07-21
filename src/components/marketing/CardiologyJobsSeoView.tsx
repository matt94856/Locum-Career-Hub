import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { AnswerFirstBlock } from "@/components/seo/AnswerFirstBlock";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CardiologyCtaBand } from "@/components/seo/CardiologyCtaBand";
import { ContentSections } from "@/components/seo/ContentSections";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedCardiologyLinks } from "@/components/seo/RelatedCardiologyLinks";
import {
  JOB_SPECIALTY_DEFS,
  jobStatePath,
  jobStateSpecialtyPath,
  type JobSpecialtyDef,
} from "@/lib/cardiology-authority/jobs-seo";
import { leadPrefillFromJobPage } from "@/lib/lead-form-context";
import type { JobSeoPageContent } from "@/lib/cardiology-authority/types";
import { CARDIOLOGY_HUB_PATH, cardiologySpecialtyPath } from "@/lib/seo/cardiology-locum-jobs-config";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";

type Props = {
  page: JobSeoPageContent;
  specialty?: JobSpecialtyDef;
};

export function CardiologyJobsSeoView({ page, specialty }: Props) {
  const prefill = leadPrefillFromJobPage(page.stateSlug, specialty?.slug);
  const path = specialty
    ? jobStateSpecialtyPath(page.stateSlug, specialty.slug)
    : jobStatePath(page.stateSlug);

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Locum tenens jobs", path: "/locum-tenens-jobs" },
    { name: page.stateName, path: jobStatePath(page.stateSlug) },
    ...(specialty ? [{ name: specialty.name, path }] : []),
  ]);

  const medical = medicalWebPageJsonLd({
    name: page.h1,
    description: page.metaDescription,
    path,
    keywords: [page.title, "locum cardiologist jobs", page.stateName],
    aboutTopics: ["Cardiology", "Locum tenens", page.stateName],
  });

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={crumbs} />
      <JsonLd data={medical} />
      <JsonLd data={faqJsonLd(page.faqs)} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Cardiology", href: CARDIOLOGY_HUB_PATH },
              { label: page.stateName, href: jobStatePath(page.stateSlug) },
              ...(specialty ? [{ label: specialty.name }] : []),
            ]}
          />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
            {specialty ? specialty.name : "Cardiology locums"} · {page.stateName}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {page.h1}
          </h1>
          <div className="mt-6">
            <AnswerFirstBlock answer={page.directAnswer} />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 space-y-10 lg:col-span-7">
            <ContentSections sections={page.sections} />
            <CardiologyCtaBand variant="opportunities" />

            {!specialty ? (
              <div>
                <h2 className="font-display text-2xl font-semibold text-slate-950">
                  {page.stateName} cardiology subspecialties
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {JOB_SPECIALTY_DEFS.map((s) => (
                    <li key={s.slug} className="surface-card p-4 text-sm">
                      <Link
                        href={jobStateSpecialtyPath(page.stateSlug, s.slug)}
                        className="font-semibold text-brand-700 hover:underline"
                      >
                        {s.name} locums in {page.stateName}
                      </Link>
                      <p className="mt-1 text-xs text-slate-500">
                        <Link href={cardiologySpecialtyPath(s.pathSlug)} className="hover:underline">
                          National {s.name.toLowerCase()} hub →
                        </Link>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">FAQs</h2>
              <dl className="mt-6 space-y-6">
                {page.faqs.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <dt className="font-semibold text-slate-900">{f.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <CardiologyCtaBand variant="recruiter" />
            <RelatedCardiologyLinks
              stateSlug={page.stateSlug}
              specialtyPathSlugs={specialty ? [specialty.pathSlug] : JOB_SPECIALTY_DEFS.slice(0, 4).map((s) => s.pathSlug)}
              articleSlugs={["how-much-do-locum-cardiologists-make", "credentialing-for-locum-cardiologists"]}
            />
          </div>
          <aside className="min-w-0 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <LeadCaptureForm
              title={`${page.stateName} cardiology matches`}
              subtitle="Share subspecialty and availability—cardiologists only."
              defaultSpecialty={prefill.defaultSpecialty}
              defaultPreferredStates={prefill.defaultPreferredStates}
              layout="sidebar"
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
