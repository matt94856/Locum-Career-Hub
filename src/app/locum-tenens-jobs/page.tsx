import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { STATE_LOCUM_PAGES } from "@/lib/state-locum-seo";
import { US_STATE_SLUGS, getStateNameBySlug } from "@/lib/us-state-slugs";
import { SPECIALTIES } from "@/lib/specialties";
import { specialtyToSlug } from "@/lib/specialty-seo";
import { SITE } from "@/lib/site";
import { socialShareMetadata } from "@/lib/social-metadata";
import { specialtyStatePath } from "@/lib/specialty-state-seo";

const DESC =
  "National locum tenens jobs hub: browse every US state, then drill into specialty-specific demand and inquiry paths for physician locums.";

export const metadata: Metadata = {
  title: "Locum Tenens Jobs by State | Nationwide Physician Locums",
  description: DESC,
  alternates: { canonical: "/locum-tenens-jobs" },
  ...socialShareMetadata({
    title: `Locum Tenens Jobs by State | ${SITE.name}`,
    description: DESC,
    path: "/locum-tenens-jobs",
  }),
};

export default function LocumTenensJobsHubPage() {
  const featured = new Set(STATE_LOCUM_PAGES.map((p) => p.slug));

  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Locum tenens jobs</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Nationwide locum tenens jobs—by state and specialty
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Locum Career Hub is a physician career and recruiting resource focused on transparent expectations—not generic
            job-board noise. Pick a state hub, then open a specialty page for localized intent (for example, emergency
            medicine in Texas or hospitalist blocks in Florida).
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

      <section className="border-b border-slate-100 bg-white py-10">
        <div className="container-site max-w-3xl rounded-2xl border border-brand-100 bg-brand-50/40 p-6 text-sm leading-relaxed text-slate-800">
          <p className="font-semibold text-slate-950">Want the long-form national guide?</p>
          <p className="mt-2">
            FAQs, narrative context, and how we work with physicians:{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/national-locum-tenens-jobs-guide">
              National locum tenens jobs guide →
            </Link>
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Featured state guides</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Deeper editorial context for high-demand markets—then explore specialty pages inside each state.
          </p>
          <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {STATE_LOCUM_PAGES.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/locum-tenens-jobs/${p.slug}`}
                  className="block rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-brand-200"
                >
                  <span className="font-display text-lg font-semibold text-slate-950">{p.stateName}</span>
                  <span className="mt-2 block text-sm text-slate-600">State hub + FAQs →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-16">
        <div className="container-site">
          <h2 className="font-display text-2xl font-semibold text-slate-950">All US states & DC</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Each link opens a state-level locum hub. {featured.size ? "Featured states above include expanded guides." : ""}
          </p>
          <ul className="mt-8 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
            {US_STATE_SLUGS.map((slug) => {
              const name = getStateNameBySlug(slug);
              if (!name) return null;
              return (
                <li key={slug} className="mb-2 break-inside-avoid">
                  <Link href={`/locum-tenens-jobs/${slug}`} className="font-semibold text-brand-700 hover:underline">
                    {name}
                    {featured.has(slug) ? <span className="ml-1 text-xs font-normal text-slate-500">(expanded)</span> : null}
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
            For high-intent searches like “psychiatry locums California,” open your specialty below—we link straight into{" "}
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
