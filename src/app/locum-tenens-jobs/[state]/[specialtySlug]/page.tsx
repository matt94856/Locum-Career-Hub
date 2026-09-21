import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { LeadConversionBand } from "@/components/sections/LeadConversionBand";
import { Tier1QuickLinks } from "@/components/sections/Tier1QuickLinks";
import { ContentSections } from "@/components/seo/ContentSections";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import {
  featuredOpportunityPath,
  getFeaturedOpportunitiesForState,
} from "@/lib/featured-cardiology-opportunities";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { buildSpecialtyStatePageContent } from "@/lib/seo/specialty-state-content";
import { buildSpecialtyStateMetadata, specialtyStatePath } from "@/lib/specialty-state-seo";
import { SPECIALTY_SEO_SLUGS, getSpecialtyNameBySlug, specialtyToSlug } from "@/lib/specialty-seo";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { getStateLocumPage } from "@/lib/state-locum-seo";
import { US_STATE_SLUGS } from "@/lib/us-state-slugs";
import { CTA, SITE } from "@/lib/site";
import { formSubtitleForPlace } from "@/lib/marketing-copy";
import { LatticeUpLinks } from "@/components/marketing/LatticeUpLinks";

export function generateStaticParams() {
  const out: { state: string; specialtySlug: string }[] = [];
  for (const state of US_STATE_SLUGS) {
    for (const specialtySlug of SPECIALTY_SEO_SLUGS) {
      out.push({ state, specialtySlug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; specialtySlug: string }>;
}): Promise<Metadata> {
  const { state, specialtySlug } = await params;
  const statePage = getStateLocumPage(state);
  const specialtyName = getSpecialtyNameBySlug(specialtySlug);
  if (!statePage || !specialtyName) return {};
  return buildSpecialtyStateMetadata({
    stateSlug: state,
    stateName: statePage.stateName,
    specialtySlug,
    specialtyName,
  });
}

export default async function SpecialtyStateLocumPage({
  params,
}: {
  params: Promise<{ state: string; specialtySlug: string }>;
}) {
  const { state, specialtySlug } = await params;
  const statePage = getStateLocumPage(state);
  const specialtyName = getSpecialtyNameBySlug(specialtySlug);
  if (!statePage || !specialtyName) notFound();

  const path = specialtyStatePath(state, specialtySlug);
  const content = buildSpecialtyStatePageContent({
    stateSlug: state,
    stateName: statePage.stateName,
    specialtySlug,
    specialtyName,
  });
  if (!content) notFound();

  const medical = medicalWebPageJsonLd({
    name: `${specialtyName} locum jobs in ${statePage.stateName} | ${SITE.name}`,
    description: content.metaDescription,
    path,
    keywords: [
      `${specialtyName} locum ${statePage.stateName}`,
      "locum tenens jobs",
      "cardiologist locum jobs",
      "cardiology locum tenens",
    ],
    aboutTopics: [specialtyName, "Locum tenens", statePage.stateName, "Cardiologist careers"],
  });

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Cardiology locums", path: "/cardiology-locums" },
    { name: statePage.stateName, path: `/locum-tenens-jobs/${state}` },
    { name: specialtyName, path },
  ]);

  const otherSpecs = CARDIOLOGY_SUBSPECIALTIES.filter((s) => specialtyToSlug(s) !== specialtySlug);
  const featuredOpportunities = getFeaturedOpportunitiesForState(state, specialtySlug);

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={medical} />
      <JsonLd data={faqJsonLd(content.faqs)} />
      <JsonLd data={crumbs} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
            {statePage.stateName} · {specialtyName}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-5xl">
            {specialtyName} locum tenens jobs in {statePage.stateName}
          </h1>
          <h2 className="mt-4 text-lg font-medium text-slate-700 sm:text-xl">{content.heroSubhead}</h2>
          <p className="mt-6 rounded-2xl border border-brand-100 bg-white/90 p-4 text-base font-medium leading-relaxed text-slate-800 shadow-sm sm:p-5 sm:text-lg">
            <span className="text-brand-800">Direct answer: </span>
            {content.directAnswer}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">{content.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/physician-opportunities#lead-form" className="justify-center">
              {CTA.explore}
            </Button>
            <Button href={`/specialties/${specialtySlug}`} variant="secondary" className="justify-center">
              {specialtyName} overview →
            </Button>
            <Button href={`/locum-tenens-jobs/${state}`} variant="secondary" className="justify-center">
              All {statePage.stateName} cardiology locums →
            </Button>
            {specialtySlug === "electrophysiology" ? (
              <>
                <Button href="/ep-cardiology-locums-pay" variant="secondary" className="justify-center">
                  EP locums pay guide →
                </Button>
                <Button href="/locum-jobs/cardiology/electrophysiology" variant="secondary" className="justify-center">
                  EP specialty hub →
                </Button>
                {state !== "new-york" ? (
                  <Button href="/locum-tenens-jobs/new-york/electrophysiology" variant="secondary" className="justify-center">
                    New York EP locums →
                  </Button>
                ) : null}
                {state !== "tennessee" ? (
                  <Button href="/locum-tenens-jobs/tennessee/electrophysiology" variant="secondary" className="justify-center">
                    Tennessee EP locums →
                  </Button>
                ) : null}
              </>
            ) : null}
            {specialtySlug === "interventional-cardiology" ? (
              <>
                <Button href="/interventional-cardiology-locums-pay" variant="secondary" className="justify-center">
                  Interventional locums pay →
                </Button>
                <Button href="/locum-jobs/cardiology/interventional" variant="secondary" className="justify-center">
                  Interventional specialty hub →
                </Button>
                {state !== "ohio" ? (
                  <Button href="/featured-cardiology-jobs/ohio-interventional-cardiology-locum" variant="secondary" className="justify-center">
                    Featured Ohio IC locum →
                  </Button>
                ) : null}
              </>
            ) : null}
            {specialtySlug === "general-cardiology" ? (
              <Button href="/locum-jobs/cardiology/general" variant="secondary" className="justify-center">
                General cardiology hub →
              </Button>
            ) : null}
            {specialtySlug === "advanced-imaging" || specialtyName.toLowerCase().includes("imaging") ? (
              <>
                <Button href="/locum-jobs/cardiology/cardiac-imaging" variant="secondary" className="justify-center">
                  Cardiac imaging hub →
                </Button>
                <Button href="/cardiologist-locums-calculator" variant="secondary" className="justify-center">
                  Estimate imaging locum pay →
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {featuredOpportunities.length ? (
        <section className="border-b border-brand-100 bg-brand-50 py-10">
          <div className="container-site">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
              Currently recruiting
            </p>
            <div className="mt-4 grid gap-4">
              {featuredOpportunities.map((opportunity) => (
                <article
                  key={opportunity.slug}
                  className="rounded-3xl border border-brand-200 bg-white p-6 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-8"
                >
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950">
                      {opportunity.shortLabel}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
                      {opportunity.setting}. {opportunity.schedule}.{" "}
                      {opportunity.supportLine ??
                        "Travel, lodging, and malpractice insurance covered."}
                    </p>
                  </div>
                  <Button
                    href={featuredOpportunityPath(opportunity.slug)}
                    className="mt-5 shrink-0 sm:mt-0"
                  >
                    View featured job
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 space-y-10 lg:col-span-7">
            <ContentSections sections={content.sections} />

            <LatticeUpLinks specialtySlug={specialtySlug} specialtyName={specialtyName} />

            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">FAQs</h2>
              <dl className="mt-6 space-y-6">
                {content.faqs.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <dt className="font-semibold text-slate-900">{f.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-slate-950">Same state, other specialties</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {otherSpecs.map((s) => {
                  const slug = specialtyToSlug(s);
                  return (
                    <li key={slug}>
                      <Link
                        href={specialtyStatePath(state, slug)}
                        className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50"
                      >
                        {s}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href={`/locum-tenens-jobs/${state}`}
                    className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50"
                  >
                    All specialties in {statePage.stateName} →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <aside className="min-w-0 space-y-6 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <LeadCaptureForm
              title={`Let’s look in ${statePage.stateName}`}
              subtitle={formSubtitleForPlace(statePage.stateName)}
              defaultSpecialty={specialtyName}
              defaultPreferredStates={[statePage.stateName]}
              layout="sidebar"
            />
            <Tier1QuickLinks />
            <LeadConversionBand
              headline={`Request ${specialtyName} in ${statePage.stateName}`}
              subline="2-minute form—physician recruiter follow-up, not a blast."
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
