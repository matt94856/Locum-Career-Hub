import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import {
  buildSpecialtyStateFaqs,
  buildSpecialtyStateMetadata,
  specialtyStatePath,
} from "@/lib/specialty-state-seo";
import { SPECIALTY_SEO_SLUGS, getSpecialtyNameBySlug, specialtyToSlug } from "@/lib/specialty-seo";
import { SPECIALTIES } from "@/lib/specialties";
import { getStateLocumPage } from "@/lib/state-locum-seo";
import { US_STATE_SLUGS } from "@/lib/us-state-slugs";
import { CTA, SITE } from "@/lib/site";

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
  const faqs = buildSpecialtyStateFaqs(specialtyName, statePage.stateName);

  const medical = medicalWebPageJsonLd({
    name: `${specialtyName} locum jobs in ${statePage.stateName} | ${SITE.name}`,
    description: `${statePage.stateName} locum tenens and flexible ${specialtyName} work—expectations, credentialing, and calm recruiting.`,
    path,
    keywords: [
      `${specialtyName} locum ${statePage.stateName}`,
      "locum tenens jobs",
      "locum physician jobs",
      "physician staffing",
    ],
    aboutTopics: [specialtyName, "Locum tenens", statePage.stateName, "Physician careers"],
  });

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: statePage.stateName, path: `/locum-tenens-jobs/${state}` },
    { name: specialtyName, path },
  ]);

  const otherSpecs = SPECIALTIES.filter((s) => specialtyToSlug(s) !== specialtySlug).slice(0, 8);

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={medical} />
      <JsonLd data={faqJsonLd([...faqs])} />
      <JsonLd data={crumbs} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
            {statePage.stateName} · {specialtyName}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-5xl">
            {specialtyName} locum tenens jobs in {statePage.stateName}
          </h1>
          <h2 className="mt-4 text-lg font-medium text-slate-700 sm:text-xl">
            Geographic intent + specialty intent—mapped to realistic credentialing and scheduling expectations
          </h2>
          <p className="mt-6 rounded-2xl border border-brand-100 bg-white/90 p-4 text-base font-medium leading-relaxed text-slate-800 shadow-sm sm:p-5 sm:text-lg">
            <span className="text-brand-800">Direct answer: </span>
            {statePage.stateName} {specialtyName} locum roles are contract-based assignments where pay, call, backup, and
            documentation expectations should be explicit before you commit. Demand varies by market season and local
            staffing—this page is built to help semantic search and AI summaries route physicians to a calmer next step.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Weekly rates and workload are not universal truths—they shift by site, payer mix, and acuity. What should be
            universal is transparency: written expectations, credentialing owners, and a recruiter who advocates for your
            boundaries—not a volume dump disguised as opportunity.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/physician-opportunities#lead-form" className="justify-center">
              {CTA.explore}
            </Button>
            <Button href={`/specialties/${specialtySlug}`} variant="secondary" className="justify-center">
              {specialtyName} overview →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 space-y-10 lg:col-span-7">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:p-6">
              <h2 className="font-display text-lg font-semibold text-slate-950">Why physicians land on this page</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                  <span>
                    You are evaluating {specialtyName} locum tenens jobs in {statePage.stateName} specifically—not a
                    generic national posting.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                  <span>You want licensing and privileging context tied to a real geography and timeline.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                  <span>You are comparing travel physician jobs vs local block coverage while protecting recovery time.</span>
                </li>
              </ul>
            </div>

            <section>
              <h2 className="font-display text-2xl font-semibold text-slate-950">Pay, workload, and “average rates”</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                Public rate tables are often misleading because they mix shift types, call burden, and acuity. For {specialtyName}{" "}
                in {statePage.stateName}, the productive question is what is documented: census targets, backup layers,
                night responsibilities, and malpractice structure. We help you interpret offers with those variables in
                view—without pretending a single number fits every clinician.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-slate-950">Credentialing and start dates</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                Credentialing is frequently the longest pole. Starting early, naming owners, and tracking privileging tasks
                reduces surprise delays—especially when multiple facilities or telemedicine layers are involved.
              </p>
            </section>

            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">FAQs</h2>
              <dl className="mt-6 space-y-6">
                {faqs.map((f) => (
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

          <aside className="min-w-0 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <LeadCaptureForm
              title={`Request ${specialtyName} in ${statePage.stateName}`}
              subtitle="Share dates, license footprint, and boundaries. We respond with realistic options—not spam."
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
