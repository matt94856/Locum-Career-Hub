import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { AnswerFirstBlock } from "@/components/seo/AnswerFirstBlock";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CardiologyCtaBand } from "@/components/seo/CardiologyCtaBand";
import { ContentSections } from "@/components/seo/ContentSections";
import { EeatArticleFooter } from "@/components/seo/EeatArticleFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedCardiologyLinks } from "@/components/seo/RelatedCardiologyLinks";
import { getPillarExtension } from "@/lib/cardiology-authority/pillars";
import {
  CARDIOLOGY_HUB_PATH,
  CARDIOLOGY_LOCUM_SPECIALTIES,
  SPECIALTY_CONTEXTUAL_LINKS,
  type CardiologyLocumSpecialty,
  cardiologySpecialtyPath,
  specialtyLinkLabels,
} from "@/lib/seo/cardiology-locum-jobs-config";
import { getSpecialtyProfile } from "@/lib/seo/specialty-profiles";
import { authorityArticleJsonLd, breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { CTA } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function CardiologySpecialtyLocumView({ specialty }: { specialty: CardiologyLocumSpecialty }) {
  const path = cardiologySpecialtyPath(specialty.pathSlug);
  const profile = getSpecialtyProfile(specialty.legacySlug);
  const pillar = getPillarExtension(specialty.pathSlug);

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

  const pillarSections = pillar?.sections ?? [];
  const directAnswer = pillar?.directAnswer ?? specialty.intro;
  const allFaqs = [...specialty.faqs, ...(pillar?.faqs ?? []), ...(profile?.faqs ?? [])];
  const eeat = pillar?.eeat;
  const related = CARDIOLOGY_LOCUM_SPECIALTIES.filter((s) => specialty.relatedPathSlugs.includes(s.pathSlug));
  const otherSpecialties = CARDIOLOGY_LOCUM_SPECIALTIES.filter((s) => s.pathSlug !== specialty.pathSlug);
  const contextualLinks = SPECIALTY_CONTEXTUAL_LINKS[specialty.pathSlug] ?? [];

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
    aboutTopics: [specialty.name, "Locum tenens", "Cardiology", ...(pillar?.entityNotes ?? [])],
  });

  const articleLd = eeat
    ? authorityArticleJsonLd({
        title: specialty.h1,
        description: specialty.metaDescription,
        path,
        datePublished: "2026-01-15",
        dateModified: eeat.lastUpdated,
        keywords: [specialty.titleKeyword],
        author: { name: eeat.author, jobTitle: eeat.authorRole },
        reviewer: { name: eeat.reviewer, credentials: eeat.reviewerCredentials },
      })
    : null;

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={crumbs} />
      <JsonLd data={medical} />
      <JsonLd data={faqJsonLd(allFaqs)} />
      {articleLd ? <JsonLd data={articleLd} /> : null}

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
          <div className="mt-6">
            <AnswerFirstBlock answer={directAnswer} />
          </div>
          <p className="mt-4 text-sm text-slate-600">
            {specialty.intro}{" "}
            <Link href={CARDIOLOGY_HUB_PATH} className="font-semibold text-brand-700 hover:underline">
              locum cardiologist jobs
            </Link>{" "}
            across all subspecialties—or{" "}
            <Link href="/physician-opportunities#lead-form" className="font-semibold text-brand-700 hover:underline">
              talk with a cardiology recruiter
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/physician-opportunities#lead-form">{CTA.recruiter}</Button>
            <Button href="/resources" variant="secondary">
              Cardiology guides →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 space-y-10 lg:col-span-7">
            <ContentSections sections={[...specialty.sections, ...pillarSections, ...profileSections]} />

            {contextualLinks.length > 0 ? (
              <p className="text-sm leading-relaxed text-slate-700">
                {contextualLinks.map((link) => (
                  <span key={link.targetPathSlug}>
                    {link.prefix}{" "}
                    <Link
                      href={cardiologySpecialtyPath(link.targetPathSlug)}
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      {link.anchor}
                    </Link>
                    {link.suffix ? ` ${link.suffix}` : null}
                  </span>
                ))}
              </p>
            ) : null}

            <CardiologyCtaBand variant="opportunities" />

            {profile ? (
              <section>
                <h2 className="font-display text-2xl font-semibold text-slate-950">Pay drivers and fit signals</h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  Rate drivers include {profile.payDrivers.join(", ")}. {profile.fitSignals.join(" ")}
                </p>
              </section>
            ) : null}

            {pillar?.entityNotes?.length ? (
              <section>
                <h2 className="font-display text-2xl font-semibold text-slate-950">Key cardiology entities</h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  This subspecialty intersects with {pillar.entityNotes.join(", ")} standards and workflows referenced by
                  ACC, AHA, and ABIM credentialing committees.
                </p>
              </section>
            ) : null}

            <CardiologyCtaBand variant="salary" />

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

            <CardiologyCtaBand variant="recruiter" />

            <div>
              <h2 className="font-display text-xl font-semibold text-slate-950">Explore more cardiology jobs</h2>
              <p className="mt-2 text-sm text-slate-600">
                <Link href={CARDIOLOGY_HUB_PATH} className="font-semibold text-brand-700 hover:underline">
                  locum cardiologist jobs
                </Link>{" "}
                hub · related subspecialties below
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {otherSpecialties.map((s) => {
                  const labels = specialtyLinkLabels(s.name);
                  return (
                    <li key={s.pathSlug} className="text-sm">
                      <Link href={cardiologySpecialtyPath(s.pathSlug)} className="font-semibold text-brand-700 hover:underline">
                        {labels.jobs}
                      </Link>
                      <span className="text-slate-400"> · </span>
                      <Link href={cardiologySpecialtyPath(s.pathSlug)} className="text-brand-600 hover:underline">
                        {labels.tenens}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {related.length > 0 ? (
              <div>
                <h2 className="font-display text-lg font-semibold text-slate-950">Related specialties</h2>
                <ul className="mt-3 space-y-2">
                  {related.map((s) => {
                    const labels = specialtyLinkLabels(s.name);
                    return (
                      <li key={s.pathSlug} className="text-sm">
                        <Link href={cardiologySpecialtyPath(s.pathSlug)} className="font-semibold text-brand-700 hover:underline">
                          {labels.jobs}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            <RelatedCardiologyLinks
              specialtyPathSlugs={specialty.relatedPathSlugs}
              articleSlugs={["how-much-do-locum-cardiologists-make", "credentialing-for-locum-cardiologists"]}
            />

            {eeat ? <EeatArticleFooter eeat={eeat} /> : null}
          </div>

          <aside className="min-w-0 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <LeadCaptureForm
              title="Talk with a cardiology recruiter"
              subtitle="Share subspecialty, states, and boundaries. Cardiologist-only recruiter follow-up."
              defaultSpecialty={specialty.name}
            />
          </aside>
        </div>
      </section>
    </main>
  );
}

