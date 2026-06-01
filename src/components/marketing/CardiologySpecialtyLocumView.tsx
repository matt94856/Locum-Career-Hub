import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/seo/ContentSections";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import {
  CARDIOLOGY_HUB_PATH,
  CARDIOLOGY_LOCUM_SPECIALTIES,
  type CardiologyLocumSpecialty,
  cardiologySpecialtyPath,
  specialtyLinkLabels,
} from "@/lib/seo/cardiology-locum-jobs-config";
import { getSpecialtyProfile } from "@/lib/seo/specialty-profiles";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { CTA } from "@/lib/site";

export function CardiologySpecialtyLocumView({ specialty }: { specialty: CardiologyLocumSpecialty }) {
  const path = cardiologySpecialtyPath(specialty.pathSlug);
  const profile = getSpecialtyProfile(specialty.legacySlug);

  const profileSections = profile
    ? [
        {
          h2: `${specialty.name}: assignment snapshot`,
          paragraphs: [profile.assignmentSnapshot, profile.workflowNotes],
        },
        {
          h2: "Credentialing and documentation",
          paragraphs: [
            profile.documentationFocus,
            `Checklist: ${profile.credentialingChecklist.join(" · ")}`,
          ],
        },
      ]
    : [];

  const allFaqs = [...specialty.faqs, ...(profile?.faqs ?? [])];
  const related = CARDIOLOGY_LOCUM_SPECIALTIES.filter((s) => specialty.relatedPathSlugs.includes(s.pathSlug));

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Cardiology", path: CARDIOLOGY_HUB_PATH },
    { name: specialty.name, path },
  ]);

  const medical = medicalWebPageJsonLd({
    name: specialty.h1,
    description: specialty.metaDescription,
    path,
    keywords: [specialty.titleKeyword, "locum cardiologist jobs", "cardiology locum tenens"],
    aboutTopics: [specialty.name, "Locum tenens", "Cardiology"],
  });

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={crumbs} />
      <JsonLd data={medical} />
      <JsonLd data={faqJsonLd(allFaqs)} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Cardiology", href: CARDIOLOGY_HUB_PATH },
              { label: specialty.name },
            ]}
          />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{specialty.name}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {specialty.h1}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">{specialty.intro}</p>
          <p className="mt-4 text-sm text-slate-600">
            Explore{" "}
            <Link href={CARDIOLOGY_HUB_PATH} className="font-semibold text-brand-700 hover:underline">
              locum cardiologist jobs
            </Link>{" "}
            across all subspecialties—or submit an inquiry for {specialty.name.toLowerCase()} matches.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/physician-opportunities#lead-form">{CTA.explore}</Button>
            <Button href={CARDIOLOGY_HUB_PATH} variant="secondary">
              All cardiology locums →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 space-y-10 lg:col-span-7">
            <ContentSections sections={[...specialty.sections, ...profileSections]} />

            {profile ? (
              <section>
                <h2 className="font-display text-2xl font-semibold text-slate-950">Pay drivers and fit signals</h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  Rate drivers include {profile.payDrivers.join(", ")}. {profile.fitSignals.join(" ")}
                </p>
              </section>
            ) : null}

            <blockquote className="rounded-2xl border border-brand-100 bg-brand-50/40 p-5 text-sm italic leading-relaxed text-slate-700">
              “The best {specialty.name.toLowerCase()} locum contracts spell out call, scope, and backup before day
              one—cardiologists should never guess about STEMI, census, or cath lab expectations.”
              <footer className="mt-3 text-xs font-semibold not-italic text-slate-500">— Locum Career Hub recruiting team</footer>
            </blockquote>

            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">FAQs</h2>
              <dl className="mt-6 space-y-6">
                {allFaqs.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <dt className="font-semibold text-slate-900">{f.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-slate-950">Explore more cardiologist jobs</h2>
              <ul className="mt-4 space-y-3">
                {related.map((s) => {
                  const labels = specialtyLinkLabels(s.name);
                  return (
                    <li key={s.pathSlug} className="text-sm">
                      <Link href={cardiologySpecialtyPath(s.pathSlug)} className="font-semibold text-brand-700 hover:underline">
                        {labels.jobs}
                      </Link>
                      <span className="text-slate-500"> — </span>
                      <Link href={cardiologySpecialtyPath(s.pathSlug)} className="text-brand-700 hover:underline">
                        {labels.tenens}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-sm">
                <Link href={CARDIOLOGY_HUB_PATH} className="font-semibold text-brand-700 hover:underline">
                  ← Back to locum cardiologist jobs hub
                </Link>
              </p>
            </div>
          </div>

          <aside className="min-w-0 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <LeadCaptureForm
              title={`Request ${specialty.name} matches`}
              subtitle="Share subspecialty, states, and boundaries. Cardiologist-only recruiter follow-up."
              defaultSpecialty={specialty.name}
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
