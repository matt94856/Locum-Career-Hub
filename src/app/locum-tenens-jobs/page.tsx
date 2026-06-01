import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { US_STATE_SLUGS, getStateNameBySlug } from "@/lib/us-state-slugs";
import { SPECIALTIES } from "@/lib/specialties";
import { specialtyToSlug } from "@/lib/specialty-seo";
import { GuideCardLink } from "@/components/ui/GuideCardLink";
import { LeadConversionBand } from "@/components/sections/LeadConversionBand";
import { TIER1_STATE_LINKS } from "@/lib/seo/tier1-discovery";
import { buildLocumJobsHubSerpMetadata } from "@/lib/serp-ctr";
import { specialtyStatePath } from "@/lib/specialty-state-seo";

export const metadata: Metadata = buildLocumJobsHubSerpMetadata();

export default function LocumTenensJobsHubPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Locum tenens jobs</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Cardiologist locum jobs—by state and subspecialty
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Locum Career Hub recruits cardiologists only (MD/DO). Pick a state hub, then open a subspecialty page for
            localized intent—for example, interventional cardiology in Texas or general cardiology consult blocks in
            Florida.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/physician-opportunities#lead-form" className="justify-center">
              Request matches
            </Button>
            <Button href="/specialties" variant="secondary" className="justify-center">
              Browse specialties →
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50/50 py-12 sm:py-14">
        <div className="container-site">
          <h2 className="font-display text-xl font-semibold text-slate-950">States with the most search interest</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Start with these hubs—they already earn impressions in Google. Each links to specialty-specific pages inside the state.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TIER1_STATE_LINKS.map((l) => (
              <li key={l.href} className="min-w-0">
                <GuideCardLink href={l.href} title={l.title} description={l.description} ctaLabel={l.ctaLabel} />
              </li>
            ))}
          </ul>
          <div className="mt-10 max-w-2xl">
            <LeadConversionBand headline="Want matches in a specific state?" />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-10">
        <div className="container-site max-w-3xl rounded-2xl border border-brand-100 bg-brand-50/40 p-6 text-sm leading-relaxed text-slate-800">
          <p className="font-semibold text-slate-950">Want the long-form national guide?</p>
          <p className="mt-2">
            FAQs, narrative context, and how we work with cardiologists:{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/national-locum-tenens-jobs-guide">
              National locum tenens jobs guide →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-16">
        <div className="container-site">
          <h2 className="font-display text-2xl font-semibold text-slate-950">All US states & DC</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Each link opens a cardiologist locum hub for that state with subspecialty drill-downs.
          </p>
          <ul className="mt-8 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
            {US_STATE_SLUGS.map((slug) => {
              const name = getStateNameBySlug(slug);
              if (!name) return null;
              return (
                <li key={slug} className="mb-2 break-inside-avoid">
                  <Link href={`/locum-tenens-jobs/${slug}`} className="font-semibold text-brand-700 hover:underline">
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Specialty × state matrix</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            For high-intent searches like “interventional cardiologist locums California,” open your subspecialty below—we
            link straight into{" "}
            <span className="font-medium text-slate-800">California</span> as an example; every state has the same pattern
            under{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">/locum-tenens-jobs/[state]/[specialty]</code>.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {SPECIALTIES.map((s) => {
              const slug = specialtyToSlug(s);
              return (
                <li key={slug}>
                  <Link
                    href={specialtyStatePath("california", slug)}
                    className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm hover:border-brand-200 hover:bg-brand-50"
                  >
                    {s} in CA
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm text-slate-600">
            Prefer the national specialties overview?{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/specialties">
              View all specialties →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
