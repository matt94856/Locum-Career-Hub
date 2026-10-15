import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { LatticePersonaCards } from "@/components/marketing/LatticePersonaCards";
import { AnswerFirstBlock } from "@/components/seo/AnswerFirstBlock";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/seo/ContentSections";
import { EeatArticleFooter } from "@/components/seo/EeatArticleFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedCardiologyLinks } from "@/components/seo/RelatedCardiologyLinks";
import { getPillarExtension } from "@/lib/cardiology-authority/pillars";
import { careerFitSections, uniqueFaqs } from "@/lib/seo/unique-page-copy";
import {
  CARDIOLOGY_HUB_PATH,
  SPECIALTY_CONTEXTUAL_LINKS,
  type CardiologyLocumSpecialty,
  cardiologySpecialtyPath,
} from "@/lib/seo/cardiology-locum-jobs-config";
import { getSpecialtyProfile } from "@/lib/seo/specialty-profiles";
import { authorityArticleJsonLd, breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { CTA } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import {
  featuredOpportunityPath,
  getFeaturedOpportunitiesForSpecialtySlug,
} from "@/lib/featured-cardiology-opportunities";

export function CardiologySpecialtyLocumView({ specialty }: { specialty: CardiologyLocumSpecialty }) {
  const path = cardiologySpecialtyPath(specialty.pathSlug);
  const profile = getSpecialtyProfile(specialty.legacySlug);
  const pillar = getPillarExtension(specialty.pathSlug);

  const pillarSections = careerFitSections(pillar?.sections ?? []);
  const directAnswer = pillar?.directAnswer ?? specialty.intro;
  const allFaqs = uniqueFaqs([...specialty.faqs, ...(pillar?.faqs ?? []), ...(profile?.faqs ?? [])]);
  const eeat = pillar?.eeat;
  const contextualLinks = SPECIALTY_CONTEXTUAL_LINKS[specialty.pathSlug] ?? [];
  const featuredSpecialtySlug =
    specialty.pathSlug === "interventional"
      ? "interventional-cardiology"
      : specialty.pathSlug === "electrophysiology"
        ? "electrophysiology"
        : specialty.pathSlug === "cardiac-imaging"
          ? "advanced-imaging"
          : "general-cardiology";
  const currentJobs = getFeaturedOpportunitiesForSpecialtySlug(featuredSpecialtySlug).slice(0, 8);

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
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/physician-opportunities#lead-form">{CTA.recruiter}</Button>
            <Button href={CARDIOLOGY_HUB_PATH} variant="secondary">
              All cardiology jobs
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 space-y-10 lg:col-span-7">
            <LatticePersonaCards pathSlug={specialty.pathSlug} />

            <ContentSections sections={[...specialty.sections, ...pillarSections]} />

            {contextualLinks.length > 0 ? (
              <p className="text-sm leading-relaxed text-slate-700">
                {contextualLinks.map((link) => {
                  const href = link.href ?? (link.targetPathSlug ? cardiologySpecialtyPath(link.targetPathSlug) : "#");
                  return (
                    <span key={`${href}-${link.anchor}`}>
                      {link.prefix}{" "}
                      <Link href={href} className="font-semibold text-brand-700 hover:underline">
                        {link.anchor}
                      </Link>
                      {link.suffix ? ` ${link.suffix}` : null}{" "}
                    </span>
                  );
                })}
              </p>
            ) : null}

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

            {currentJobs.length ? (
              <div>
                <h2 className="font-display text-lg font-semibold text-slate-950">
                  Current {specialty.name.toLowerCase()} openings
                </h2>
                <ul className="mt-3 space-y-2">
                  {currentJobs.map((job) => (
                    <li key={job.slug} className="text-sm">
                      <Link
                        href={featuredOpportunityPath(job.slug)}
                        className="font-semibold text-brand-700 hover:underline"
                      >
                        {job.shortLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm">
                  <Link href="/physician-opportunities" className="font-semibold text-brand-700 hover:underline">
                    All current cardiology opportunities →
                  </Link>
                </p>
              </div>
            ) : null}
            {specialty.pathSlug === "interventional" ||
            specialty.pathSlug === "electrophysiology" ||
            specialty.pathSlug === "general" ? (
              <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
                <h2 className="font-display text-lg font-semibold text-slate-950">
                  {specialty.pathSlug === "interventional"
                    ? "Exclusive IC jobs not listed here"
                    : specialty.pathSlug === "electrophysiology"
                      ? "Exclusive EP jobs not listed here"
                      : "Exclusive non-invasive jobs not listed here"}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  The openings on this page are the ones we can list publicly. Hospitals also send exclusive{" "}
                  {specialty.pathSlug === "interventional"
                    ? "interventional"
                    : specialty.pathSlug === "electrophysiology"
                      ? "electrophysiology"
                      : "non-invasive"}{" "}
                  coverage that never appears here. Request a match with your licenses, skills, and dates, and we send
                  the blocks that fit.
                </p>
                <Button href="/physician-opportunities#lead-form" className="mt-4">
                  Request a match
                </Button>
              </div>
            ) : null}
            {specialty.pathSlug === "electrophysiology" ? (
              <p className="text-sm text-slate-600">
                Also see the{" "}
                <Link href="/ep-cardiology-locums-pay" className="font-semibold text-brand-700 hover:underline">
                  EP locums pay arcade
                </Link>
                , the{" "}
                <Link href="/salary/electrophysiologist-salary" className="font-semibold text-brand-700 hover:underline">
                  electrophysiologist salary guide
                </Link>
                ,{" "}
                <Link
                  href="/locum-tenens-jobs/new-york/electrophysiology"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  New York EP locum jobs
                </Link>
                , and{" "}
                <Link
                  href="/locum-tenens-jobs/tennessee/electrophysiology"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  Tennessee EP locum jobs
                </Link>
                .
              </p>
            ) : null}
            {specialty.pathSlug === "interventional" ? (
              <p className="text-sm text-slate-600">
                Compare rates on the{" "}
                <Link href="/interventional-cardiology-locums-pay" className="font-semibold text-brand-700 hover:underline">
                  interventional locums pay arcade
                </Link>
                , the{" "}
                <Link
                  href="/featured-cardiology-jobs/ohio-interventional-cardiology-locum"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  Ohio 1–2 weeks/month interventional locum
                </Link>
                , and review{" "}
                <Link
                  href="/locum-tenens-jobs/new-jersey/interventional-cardiology"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  New Jersey interventional locum jobs
                </Link>
                .
              </p>
            ) : null}
            {specialty.pathSlug === "general" ? (
              <p className="text-sm text-slate-600">
                See the{" "}
                <Link
                  href="/featured-cardiology-jobs/baton-rouge-non-invasive-cardiology-locum"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  Baton Rouge part-time non-invasive locum
                </Link>
                , the{" "}
                <Link href="/non-invasive-cardiology-locums-pay" className="font-semibold text-brand-700 hover:underline">
                  non-invasive locums pay arcade
                </Link>
                , the{" "}
                <Link
                  href="/featured-cardiology-jobs/kansas-inpatient-non-invasive-cardiology-locum"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  Kansas 7-on/7-off inpatient locum
                </Link>
                , and the{" "}
                <Link
                  href="/featured-cardiology-jobs/north-carolina-outpatient-cardiology-locum"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  North Carolina 2-weeks/month outpatient locum
                </Link>
                .
              </p>
            ) : null}
            {specialty.pathSlug === "cardiac-imaging" ? (
              <p className="text-sm text-slate-600">
                These pages are for attending imaging locums, not fellowship programs. Estimate imaging-block economics with the{" "}
                <Link href="/cardiologist-locums-calculator" className="font-semibold text-brand-700 hover:underline">
                  cardiologist locums calculator
                </Link>
                , then review{" "}
                <Link href="/locum-jobs/cardiology/general" className="font-semibold text-brand-700 hover:underline">
                  general cardiology locums
                </Link>
                {" "}if your mix includes consults plus reads.
              </p>
            ) : null}

            <RelatedCardiologyLinks
              specialtyPathSlugs={specialty.relatedPathSlugs}
              articleSlugs={["how-much-do-locum-cardiologists-make", "credentialing-for-locum-cardiologists"]}
              stateSlug={specialty.pathSlug === "electrophysiology" ? "new-york" : undefined}
            />

            {eeat ? <EeatArticleFooter eeat={eeat} /> : null}
          </div>

          <aside className="min-w-0 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <LeadCaptureForm
              defaultSpecialty={specialty.name}
              layout="sidebar"
            />
          </aside>
        </div>
      </section>
    </main>
  );
}

