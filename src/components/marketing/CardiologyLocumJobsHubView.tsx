import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/seo/ContentSections";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { LeadConversionBand } from "@/components/sections/LeadConversionBand";
import { AnswerFirstBlock } from "@/components/seo/AnswerFirstBlock";
import { RelatedCardiologyLinks } from "@/components/seo/RelatedCardiologyLinks";
import {
  CARDIOLOGY_HUB_FAQS,
  CARDIOLOGY_HUB_PATH,
  CARDIOLOGY_HUB_SECTIONS,
  CARDIOLOGY_LOCUM_SPECIALTIES,
  cardiologySpecialtyPath,
  specialtyLinkLabels,
} from "@/lib/seo/cardiology-locum-jobs-config";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { CTA } from "@/lib/site";

export function CardiologyLocumJobsHubView() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Cardiology", path: CARDIOLOGY_HUB_PATH },
  ]);

  const medical = medicalWebPageJsonLd({
    name: "Locum Cardiologist Jobs & Recruitment",
    description:
      "Nationwide locum cardiologist and cardiology locum tenens opportunities with cardiologist-only recruiter support.",
    path: CARDIOLOGY_HUB_PATH,
    keywords: ["locum cardiologist jobs", "cardiology locum tenens", "cardiologist recruiting"],
    aboutTopics: ["Cardiology", "Locum tenens", "Cardiologist careers"],
  });

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={crumbs} />
      <JsonLd data={medical} />
      <JsonLd data={faqJsonLd(CARDIOLOGY_HUB_FAQS)} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cardiology" }]} />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Cardiology locum tenens</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Locum Cardiologist Jobs & Recruitment
          </h1>
          <div className="mt-6">
            <AnswerFirstBlock answer="A locum cardiologist is a board-certified or board-eligible MD/DO cardiologist who provides temporary cardiology coverage under contract—consult, cath lab, clinic, imaging, or EP—while hospitals fill leave, volume gaps, or staffing transitions. Locum Career Hub recruits cardiologists only; we are not the employer." />
          </div>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            We match MD/DO cardiologists with programs that document call, cath lab scope, privileging, and malpractice
            before you start—across interventional, EP, heart failure, imaging, structural, preventive, pediatric, and
            adult congenital subspecialties.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/physician-opportunities#lead-form">{CTA.explore}</Button>
            <Button href="/salary" variant="secondary">
              Cardiology salary guides →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <ContentSections sections={CARDIOLOGY_HUB_SECTIONS} />

          <h2 className="mt-12 font-display text-2xl font-semibold text-slate-950">Browse cardiology subspecialties</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Each page includes duties, requirements, pay drivers, and FAQs for that cardiology discipline.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {CARDIOLOGY_LOCUM_SPECIALTIES.map((s) => {
              const labels = specialtyLinkLabels(s.name);
              return (
                <li key={s.pathSlug} className="surface-card p-5">
                  <Link href={cardiologySpecialtyPath(s.pathSlug)} className="font-display text-lg font-semibold text-brand-800 hover:underline">
                    {s.h1}
                  </Link>
                  <p className="mt-2 text-sm text-slate-600">{s.intro.slice(0, 140)}…</p>
                  <p className="mt-3 text-xs font-semibold text-brand-700">
                    <Link href={cardiologySpecialtyPath(s.pathSlug)} className="hover:underline">
                      {labels.jobs}
                    </Link>
                    {" · "}
                    <Link href={cardiologySpecialtyPath(s.pathSlug)} className="hover:underline">
                      {labels.tenens}
                    </Link>
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Physician resources</h2>
            <p className="mt-3 text-sm text-slate-600">
              Salary guides, credentialing explainers, and career transition articles for cardiologists.{" "}
              <Link href="/resources" className="font-semibold text-brand-700 hover:underline">
                Browse all resources →
              </Link>
            </p>
          </div>

          <div className="mt-12">
            <RelatedCardiologyLinks
              specialtyPathSlugs={CARDIOLOGY_LOCUM_SPECIALTIES.slice(0, 4).map((s) => s.pathSlug)}
              articleSlugs={["how-much-do-locum-cardiologists-make", "locum-vs-permanent-cardiology-jobs"]}
            />
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-slate-950">FAQs</h2>
            <dl className="mt-6 space-y-6">
              {CARDIOLOGY_HUB_FAQS.map((f) => (
                <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <dt className="font-semibold text-slate-900">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50/60 py-14">
        <div className="container-site max-w-xl">
          <LeadConversionBand headline="Ready to discuss locum cardiologist jobs?" />
        </div>
      </section>
    </main>
  );
}
