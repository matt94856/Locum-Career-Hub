import type { Metadata } from "next";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { OPPORTUNITIES_FAQ } from "@/lib/opportunities-seo";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { FEATURED_STATES } from "@/lib/states";
import { SITE } from "@/lib/site";
import { socialShareMetadata } from "@/lib/social-metadata";

const PAGE_TITLE = "Physician Opportunities | Locum Tenens Jobs & Flexible Careers";
const PAGE_DESCRIPTION =
  "Why physicians choose locum tenens—flexible blocks, strong markets, and recruiter support—plus a short inquiry form to get matched without pressure.";
const PAGE_OG_SNIP =
  "Explore the benefits of locums and high-demand regions, then tell us what you need—we will follow up with calm, transparent next steps.";

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

const LOCUM_BENEFITS = [
  {
    title: "Defined blocks",
    body: "Many roles run in clear shifts or weeks—easier to protect recovery time than an always-on employed schedule.",
  },
  {
    title: "Geographic optionality",
    body: "Work closer to home for extra income, or stack travel blocks when you want a change of scenery.",
  },
  {
    title: "Demand where it clusters",
    body: "Large systems and seasonal communities often need reliable coverage; that can mean more choice in how you work.",
  },
  {
    title: "Advocacy through credentialing",
    body: "The paperwork is real. A good process keeps expectations transparent so you are not guessing alone at 11 p.m.",
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
            Why physicians choose locums—then tell us what you need
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Locum tenens is not the only answer, but when it fits it can restore margin: clearer boundaries, competitive
            weekly structure, and a recruiter who explains the tradeoffs instead of pushing a quota.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="container-site max-w-3xl">
          <h2 className="text-center font-display text-2xl font-semibold text-slate-950">What draws clinicians in</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600">
            Everyone’s situation is different. These are the themes we hear most when a traditional schedule stops
            feeling sustainable.
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
            Demand shifts with season, payer mix, and staffing—but these states tend to surface often when hospitals
            need dependable coverage.
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
        <div className="container-site max-w-2xl text-center text-sm leading-relaxed text-slate-600">
          Want more depth first? Browse our{" "}
          <Link className="font-semibold text-brand-700 hover:underline" href="/guides">
            full topic guides
          </Link>
          , the{" "}
          <Link className="font-semibold text-brand-700 hover:underline" href="/for-physicians">
            For physicians
          </Link>{" "}
          hub, or{" "}
          <Link className="font-semibold text-brand-700 hover:underline" href="/blog">
            Insights
          </Link>{" "}
          on the blog.
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-site flex justify-center">
          <div className="w-full max-w-md">
            <LeadCaptureForm
              id="lead-form"
              title="Request matches"
              subtitle="Complete the form for the fastest, most accurate follow-up from our recruiting team."
            />
          </div>
        </div>
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
