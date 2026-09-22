import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { OpportunityInterestForm } from "@/components/forms/OpportunityInterestForm";
import { FeaturedOpportunityApplyButton } from "@/components/cta/FeaturedOpportunityApplyButton";
import {
  opportunitySpecialtySlug,
  opportunitySupportLine,
  type FeaturedCardiologyOpportunity,
} from "@/lib/featured-cardiology-opportunities";
import { SITE } from "@/lib/site";

function DetailList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-display text-xl font-bold tracking-tight text-slate-950">
        {title}
      </h2>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 size-2 shrink-0 rounded-full bg-brand-600"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FeaturedCardiologyOpportunityView({
  opportunity,
}: {
  opportunity: FeaturedCardiologyOpportunity;
}) {
  const specialtySlug = opportunitySpecialtySlug(opportunity);
  const relatedLinks = opportunity.relatedLinks ?? [
    {
      href: "/guides/non-invasive-cardiology-locums",
      label: "Non-invasive cardiology locums guide",
    },
    {
      href: "/guides/inpatient-vs-outpatient-cardiology-locums",
      label: "Inpatient vs outpatient locums",
    },
    {
      href: "/part-time-cardiologist-jobs",
      label: "Part-time cardiologist schedules",
    },
    {
      href: "/cardiologist-locums-calculator",
      label: "Estimate locum compensation",
    },
  ];

  return (
    <main>
      <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <Link href="/" className="hover:text-brand-700">
              Home
            </Link>
            <span aria-hidden="true" className="px-2">
              /
            </span>
            <Link href="/physician-opportunities" className="hover:text-brand-700">
              Physician opportunities
            </Link>
            <span aria-hidden="true" className="px-2">
              /
            </span>
            <span aria-current="page">{opportunity.state}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">
                {opportunity.eyebrow ?? "Featured non-invasive cardiology opportunity"}
              </p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {opportunity.h1}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
                {opportunity.directAnswer}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <FeaturedOpportunityApplyButton
                  opportunitySlug={opportunity.slug}
                  placement="hero"
                >
                  Request more details
                </FeaturedOpportunityApplyButton>
                <Button
                  href={`/locum-tenens-jobs/${opportunity.stateSlug}/${specialtySlug}`}
                  size="lg"
                  variant="secondary"
                >
                  Explore {opportunity.state} locums
                </Button>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                Assignment details and availability can change. We confirm the current
                written scope before presenting a candidate.
              </p>
            </div>

            <aside className="rounded-3xl border border-brand-200 bg-white p-6 shadow-lg shadow-brand-900/5">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Assignment snapshot
              </p>
              <dl className="mt-5 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold text-slate-950">Setting</dt>
                  <dd className="mt-1 leading-6 text-slate-700">{opportunity.setting}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950">Schedule</dt>
                  <dd className="mt-1 leading-6 text-slate-700">{opportunity.schedule}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950">Call</dt>
                  <dd className="mt-1 leading-6 text-slate-700">{opportunity.call}</dd>
                </div>
                {opportunity.compensation ? (
                  <div>
                    <dt className="font-semibold text-slate-950">Pay</dt>
                    <dd className="mt-1 leading-6 text-slate-700">{opportunity.compensation}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="font-semibold text-slate-950">Covered</dt>
                  <dd className="mt-1 leading-6 text-slate-700">
                    {opportunitySupportLine(opportunity)}
                  </dd>
                </div>
              </dl>
              <OpportunityInterestForm
                opportunity={opportunity}
                variant="aside"
                showAnchor
              />
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <DetailList title="Required qualifications" items={opportunity.requirements} />
          <DetailList title="Why physicians consider this role" items={opportunity.benefits} />
        </div>
        <div className="mt-8 rounded-3xl bg-brand-700 p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Want the current dates and facility details?
            </h2>
            <p className="mt-2 text-sm leading-6 text-brand-50">
              Leave an email or mobile number. We contact you about this
              assignment—not a general mailing list.
            </p>
          </div>
          <div className="mt-5 flex shrink-0 flex-wrap gap-3 sm:mt-0">
            <FeaturedOpportunityApplyButton
              opportunitySlug={opportunity.slug}
              placement="mid_page"
            >
              Send me details
            </FeaturedOpportunityApplyButton>
            <Button
              href={`tel:${SITE.phoneTel}`}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              Call {SITE.phoneDisplay}
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-300">
            Candidate fit
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight">
            Cardiologists this opportunity may fit
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {opportunity.idealFits.map((fit) => (
              <article
                key={fit.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="font-display text-lg font-bold">{fit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{fit.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {opportunity.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950">
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-6">
            {opportunity.faqs.map((item) => (
              <section key={item.q} className="py-6">
                <h3 className="font-display text-lg font-bold text-slate-950">{item.q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.a}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950">
          Compare schedules and prepare
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold leading-6 text-slate-900 shadow-sm transition hover:border-brand-300 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 bg-brand-50 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <OpportunityInterestForm opportunity={opportunity} variant="page" />
        </div>
      </section>
    </main>
  );
}
