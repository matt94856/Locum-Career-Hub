import type { Metadata } from "next";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { GuideCardLink } from "@/components/ui/GuideCardLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { LANDING_PAGES } from "@/lib/landings";
import { OPPORTUNITIES_FAQ } from "@/lib/opportunities-seo";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { specialtyToSlug } from "@/lib/specialty-seo";
import { SPECIALTIES } from "@/lib/specialties";
import { FEATURED_STATES } from "@/lib/states";
import { SITE } from "@/lib/site";
import { socialShareMetadata } from "@/lib/social-metadata";

const PAGE_TITLE = "Physician Opportunities | Locum Tenens Jobs & Flexible Careers";
const PAGE_DESCRIPTION =
  "Physician opportunities for burnout relief, flexibility, and locum tenens jobs—with transparent expectations, credentialing support, and calm recruiter guidance.";
const PAGE_OG_SNIP =
  "Flexible physician opportunities—from burnout relief to travel blocks—with transparent expectations and recruiter support.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/physician-opportunities" },
  keywords: [
    "physician opportunities",
    "locum tenens jobs",
    "locum physician jobs",
    "physician recruiter",
    "travel physician jobs",
    "flexible physician jobs",
    "physician burnout solutions",
  ],
  ...socialShareMetadata({
    title: `Physician Opportunities | ${SITE.name}`,
    description: PAGE_OG_SNIP,
    path: "/physician-opportunities",
  }),
};

export default function OpportunitiesPage() {
  const path = "/physician-opportunities";
  const medical = medicalWebPageJsonLd({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path,
    keywords: [
      "physician opportunities",
      "locum tenens jobs",
      "locum physician jobs",
      "physician recruiter",
      "travel physician jobs",
      "flexible physician jobs",
      "physician burnout solutions",
    ],
    aboutTopics: [
      "Physician careers",
      "Locum tenens",
      "Physician burnout",
      "Flexible physician work",
      "Physician recruiting",
    ],
  });
  const faqLd = faqJsonLd([...OPPORTUNITIES_FAQ]);
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Physician opportunities", path },
  ]);

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={medical} />
      <JsonLd data={faqLd} />
      <JsonLd data={crumbs} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Opportunities</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Flexible physician opportunities when you are ready for a different rhythm
          </h1>
          <p className="mt-6 rounded-2xl border border-brand-100 bg-white/90 p-4 text-base font-medium leading-relaxed text-slate-800 shadow-sm sm:text-lg">
            <span className="text-brand-800">Direct answer: </span>
            Locum Career Hub helps physicians explore flexible work—including locum tenens jobs, travel physician jobs,
            and block-based inpatient coverage—with transparent expectations and recruiter advocacy when a traditional
            schedule is not sustainable.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Start with what you need—schedule relief, income clarity, travel, or a quieter season. Browse curated guides
            (including our{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/for-physicians">
              For physicians
            </Link>{" "}
            hub), then submit a complete inquiry so we can match you faster.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-12">
          <div className="min-w-0 flex-1 space-y-12">
            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">Popular physician searches</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Each guide is skimmable: context first, pressure never—and a clear path when you want human help.
              </p>
              <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 auto-rows-fr md:grid-cols-2">
                {LANDING_PAGES.map((p) => (
                  <li key={p.slug} className="min-w-0">
                    <GuideCardLink href={`/${p.slug}`} title={p.h1} description={p.description} />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">Specialties we recruit</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Tap a specialty for an answer-first overview, FAQs, and a direct path to the lead form.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {SPECIALTIES.map((s) => (
                  <Link
                    key={s}
                    href={`/specialties/${specialtyToSlug(s)}`}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50"
                  >
                    {s}
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                <Link className="font-semibold text-brand-700 hover:underline" href="/specialties">
                  View all specialties overview →
                </Link>
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">Featured states</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                State hubs include intent-based context, FAQs, and internal links across burnout and flexibility topics.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {FEATURED_STATES.map((s) => (
                  <Link
                    key={s.code}
                    href={`/locum-tenens-jobs/${s.slug}`}
                    className="rounded-2xl border border-slate-100 bg-white p-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-brand-200"
                  >
                    <span className="block text-base font-semibold text-slate-950">{s.name}</span>
                    <span className="mt-1 block text-xs font-normal text-slate-600">{s.note}</span>
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                <Link className="font-semibold text-brand-700 hover:underline" href="/locations">
                  Nationwide locations strategy →
                </Link>
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">FAQs</h2>
              <dl className="mt-6 max-w-3xl space-y-6">
                {OPPORTUNITIES_FAQ.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <dt className="font-semibold text-slate-900">{f.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <aside className="w-full min-w-0 shrink-0 lg:sticky lg:top-24 lg:max-w-md">
            <LeadCaptureForm
              id="lead-form"
              title="Request matches"
              subtitle="Complete the form for the fastest, most accurate follow-up from our recruiting team."
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
