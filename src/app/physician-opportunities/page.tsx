import type { Metadata } from "next";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { LeadFormStandaloneSection } from "@/components/forms/LeadFormStandaloneSection";
import { OpportunityInterestForm } from "@/components/forms/OpportunityInterestForm";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  FEATURED_CARDIOLOGY_OPPORTUNITIES,
  featuredOpportunityPath,
} from "@/lib/featured-cardiology-opportunities";
import { OPPORTUNITIES_FAQ } from "@/lib/opportunities-seo";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { FEATURED_STATES } from "@/lib/states";
import { buildPhysicianOpportunitiesSerpMetadata } from "@/lib/serp-ctr";

export const metadata: Metadata = buildPhysicianOpportunitiesSerpMetadata();

const PAGE_TITLE = "Cardiologist Locum Opportunities | Submit Your Preferences";
const PAGE_DESCRIPTION =
  "Tell us cardiology subspecialty, states, and dates—get realistic locum matches with cardiologist-only recruiter advocacy (not spam).";

const LOCUM_BENEFITS = [
  {
    title: "Defined blocks",
    body: "Clear weeks or weekends—easier to protect recovery than an always-on employed schedule.",
  },
  {
    title: "Geographic optionality",
    body: "Stay close to home, or stack travel when you want a change of scenery.",
  },
  {
    title: "Demand where it clusters",
    body: "Hospitals need coverage. That can mean more choice in how—and when—you work.",
  },
  {
    title: "Advocacy through credentialing",
    body: "Paperwork is real. We keep owners and timelines visible so you are not guessing at 11 p.m.",
  },
] as const;

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

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-12 sm:py-14">
        <div className="container-site max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Opportunities</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Find locum work that pays well and fits your life
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Lucrative coverage, on a schedule you control. Tell us what you want from a block.
          </p>
        </div>
      </section>

      <section className="border-b border-brand-100 bg-brand-50 py-12 sm:py-14">
        <div className="container-site max-w-5xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
            Featured cardiology jobs
          </p>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold tracking-tight text-slate-950">
            Current cardiology opportunities
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_CARDIOLOGY_OPPORTUNITIES.map((opportunity) => (
              <article
                key={opportunity.slug}
                className="rounded-3xl border border-brand-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  {opportunity.state}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950">
                  {opportunity.setting}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {opportunity.schedule}. {opportunity.supportLine ?? "Travel, lodging, and malpractice insurance covered."}
                </p>
                <OpportunityInterestForm
                  opportunity={opportunity}
                  variant="card"
                />
                <Link
                  href={featuredOpportunityPath(opportunity.slug)}
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:underline"
                >
                  Read the full assignment →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="container-site max-w-3xl">
          <h2 className="text-center font-display text-2xl font-semibold text-slate-950">What draws clinicians in</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600">
            The themes we hear most when a traditional schedule stops feeling sustainable.
          </p>
          <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {LOCUM_BENEFITS.map((b) => (
              <li
                key={b.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm sm:p-6"
              >
                <h3 className="font-semibold text-slate-950">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50/70 py-12 sm:py-14">
        <div className="container-site max-w-3xl">
          <h2 className="text-center font-display text-2xl font-semibold text-slate-950">Hotspot markets we watch</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600">
            Demand shifts—but these states surface often when hospitals need dependable coverage.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
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
          <p className="mt-6 text-center text-sm text-slate-600">
            <Link className="font-semibold text-brand-700 hover:underline" href="/locations">
              Nationwide locations overview →
            </Link>
          </p>
        </div>
      </section>

      <section className="py-4 sm:py-6">
        <div className="container-site max-w-2xl text-center text-sm text-slate-600">
          Prefer to read first?{" "}
          <Link className="font-semibold text-brand-700 hover:underline" href="/guides">
            Guides
          </Link>{" "}
          ·{" "}
          <Link className="font-semibold text-brand-700 hover:underline" href="/blog">
            Insights
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50/40 py-12 sm:py-16">
        <LeadFormStandaloneSection withTrustPanel={false}>
          <LeadCaptureForm id="lead-form" />
        </LeadFormStandaloneSection>
      </section>

      <section className="border-t border-slate-100 bg-white pb-16 pt-4 sm:pb-20">
        <div className="container-site max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-slate-950">FAQs</h2>
          <p className="mt-2 text-sm text-slate-600">Quick answers about how we work with physicians.</p>
          <dl className="mt-8 space-y-6">
            {OPPORTUNITIES_FAQ.map((f) => (
              <div key={f.q} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-sm">
                <dt className="font-semibold text-slate-900">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
