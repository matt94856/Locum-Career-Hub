import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import {
  buildStateLocumMetadata,
  getStateLocumPage,
  STATE_LOCUM_PAGES,
  STATE_LOCUM_SLUGS,
} from "@/lib/state-locum-seo";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { getPageByStateSlug } from "@/lib/cardiology-seo/registry";
import { RecruiterInquiryTrust } from "@/components/seo/RecruiterInquiryTrust";
import { specialtyToSlug } from "@/lib/specialty-seo";
import { specialtyStatePath } from "@/lib/specialty-state-seo";
import { CTA } from "@/lib/site";
import { LeadConversionBand } from "@/components/sections/LeadConversionBand";
import { Tier1QuickLinks } from "@/components/sections/Tier1QuickLinks";
import { ContentSections } from "@/components/seo/ContentSections";
import { getStateProfile, getStateProfileSections } from "@/lib/seo/state-profiles";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";

export function generateStaticParams() {
  return STATE_LOCUM_SLUGS.map((state) => ({ state }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const page = getStateLocumPage(state);
  if (!page) return {};
  return buildStateLocumMetadata(page);
}

export default async function StateLocumJobsPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const page = getStateLocumPage(state);
  if (!page) notFound();

  const path = `/locum-tenens-jobs/${page.slug}`;
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Locum tenens jobs", path: "/locum-tenens-jobs" },
    { name: page.stateName, path },
  ]);
  const medical = medicalWebPageJsonLd({
    name: page.title,
    description: page.description,
    path,
    keywords: page.keywords,
    aboutTopics: [
      "Locum tenens",
      "Cardiologist careers",
      "Cardiology locum tenens",
      `${page.stateName} cardiology staffing`,
    ],
  });
  const faqLd = faqJsonLd(page.faqs);

  const otherStates = STATE_LOCUM_PAGES.filter((s) => s.slug !== page.slug).slice(0, 5);
  const stateProfile = getStateProfile(page.slug);
  const profileSections = stateProfile ? getStateProfileSections(stateProfile) : [];
  const richStatePage = getPageByStateSlug(`${page.slug}-cardiology-locum-jobs`);

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={medical} />
      <JsonLd data={faqLd} />
      <JsonLd data={crumbs} />

      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_0%,rgba(37,99,235,0.16),transparent_55%)]" />
        <div className="container-site relative">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Cardiologist state guide</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-5xl">
              {page.h1}
            </h1>
            <h2 className="mt-4 text-lg font-medium text-slate-700 sm:text-xl">{page.h2}</h2>
            <p className="mt-6 rounded-2xl border border-brand-100 bg-white/90 p-4 text-base font-medium leading-relaxed text-slate-800 shadow-sm sm:p-5 sm:text-lg">
              <span className="text-brand-800">Direct answer: </span>
              {page.answer}
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
          <div className="min-w-0 lg:col-span-7 space-y-10">
            <RecruiterInquiryTrust geoLabel={page.stateName} />

            {richStatePage ? (
              <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
                <h2 className="font-display text-lg font-semibold text-slate-950">Expanded {page.stateName} cardiology guide</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  For additional market context, licensing notes, and FAQs specific to cardiologist locums in{" "}
                  {page.stateName}, see our dedicated state page.
                </p>
                <Link
                  href={richStatePage.path}
                  className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:underline"
                >
                  {page.stateName} cardiology locum jobs (full guide) →
                </Link>
              </div>
            ) : null}

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:p-6">
              <h2 className="font-display text-lg font-semibold text-slate-950">Who should read this</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                {page.whoFor.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">What to expect</h2>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
                {page.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {profileSections.length > 0 ? <ContentSections sections={profileSections} /> : null}

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">FAQs</h2>
              <dl className="mt-6 space-y-6">
                {page.faqs.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <dt className="font-semibold text-slate-900">{f.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-display text-lg font-semibold text-slate-950">Related topics</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Explore cardiology career guides, then return here for {page.stateName}-specific context:{" "}
                <Link className="font-semibold text-brand-700 hover:underline" href="/guides/how-to-become-a-locum-cardiologist">
                  how to become a locum cardiologist
                </Link>
                ,{" "}
                <Link className="font-semibold text-brand-700 hover:underline" href={`/guides/how-to-get-a-${page.slug}-medical-license`}>
                  {page.stateName} medical license guide
                </Link>
                , and{" "}
                <Link className="font-semibold text-brand-700 hover:underline" href="/cardiology-locum-jobs">
                  cardiology locum job types
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
                Cardiology locum jobs in {page.stateName} by subspecialty
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-600">
                Pick your cardiology subspecialty for a dedicated {page.stateName} page: credentialing context, FAQs, and
                inquiry path.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {CARDIOLOGY_SUBSPECIALTIES.map((s) => {
                  const specSlug = specialtyToSlug(s);
                  return (
                    <li key={specSlug}>
                      <Link
                        href={specialtyStatePath(page.slug, specSlug)}
                        className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50"
                      >
                        {s}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-slate-950">More state hubs</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {otherStates.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/locum-tenens-jobs/${s.slug}`}
                      className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50"
                    >
                      {s.stateName}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/locations"
                    className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50"
                  >
                    All locations →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="min-w-0 space-y-6 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <LeadCaptureForm
              title={`Request ${page.stateName} cardiology matches`}
              subtitle={`Select ${page.stateName} (and any other states) plus your subspecialty. A cardiology recruiter will contact you if realistic locum opportunities exist in those areas—usually within one business day. If nothing fits, we will tell you plainly.`}
              defaultSpecialty="General Cardiology"
            />
            <Tier1QuickLinks />
            <LeadConversionBand
              headline={`${page.stateName} locums—ready to talk?`}
              subline="Submit once; we map licensing and realistic start windows."
            />
          </div>
        </div>
      </section>
    </main>
  );
}
