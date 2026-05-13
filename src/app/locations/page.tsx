import type { Metadata } from "next";
import Link from "next/link";
import { FEATURED_STATES, US_STATES } from "@/lib/states";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";
import { socialShareMetadata } from "@/lib/social-metadata";
import { stateNameToSlug } from "@/lib/us-state-slugs";

const LOC_DESC =
  "Locum Career Hub staffs physician locums nationwide. Explore featured states, licensing strategy, and demand hotspots for locum tenens.";

export const metadata: Metadata = {
  title: "Locations | Nationwide Locum Tenens Physician Staffing",
  description: LOC_DESC,
  alternates: { canonical: "/locations" },
  ...socialShareMetadata({
    title: `Locations | ${SITE.name}`,
    description: LOC_DESC,
    path: "/locations",
  }),
};

const STATES_BY_LETTER = US_STATES.reduce<Record<string, string[]>>((acc, state) => {
  const letter = state[0]?.toUpperCase() ?? "#";
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(state);
  return acc;
}, {});

const LETTERS = Object.keys(STATES_BY_LETTER).sort((a, b) => a.localeCompare(b));

export default function LocationsPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Locations</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Nationwide locum tenens placements with state-level strategy
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Demand shifts by specialty, season, and local staffing pipelines. We help you build a licensing footprint that
            expands optionality—not chaos.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site">
          <SectionHeading
            eyebrow="Featured"
            title="High-intent markets many physicians explore first"
            subtitle="Start with state-specific guides for demand context, then talk with a recruiter about realistic timelines for your specialty."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_STATES.map((s) => (
              <Link
                key={s.code}
                href={`/locum-tenens-jobs/${s.slug}`}
                className="surface-card flex min-h-full flex-col p-6"
              >
                <h2 className="font-display text-xl font-semibold text-slate-950">{s.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.note}</p>
                <p className="mt-4 text-sm font-semibold text-brand-700">View {s.name} guide →</p>
              </Link>
            ))}
          </div>

          <div className="mt-14 max-w-4xl">
            <h2 className="font-display text-2xl font-semibold text-slate-950">More states we cover</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Browse alphabetically. Your recruiter can prioritize licensing paths based on compact status, credentialing
              speed, and your specialty’s current demand curve.
            </p>
            <details className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm open:ring-1 open:ring-brand-100">
              <summary className="cursor-pointer list-none font-semibold text-slate-900 outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="inline-flex items-center gap-2">
                  Show all states (A–Z)
                  <span className="text-xs font-normal text-slate-500">({US_STATES.length} states)</span>
                </span>
              </summary>
              <div className="mt-6 space-y-8 border-t border-slate-100 pt-6">
                {LETTERS.map((letter) => (
                  <div key={letter}>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{letter}</h3>
                    <ul className="mt-3 grid gap-x-4 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                      {STATES_BY_LETTER[letter]?.map((s) => (
                        <li key={s} className="text-sm text-slate-700">
                          <Link
                            className="font-semibold text-brand-700 hover:underline"
                            href={`/locum-tenens-jobs/${stateNameToSlug(s)}`}
                          >
                            {s}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          </div>

          <div className="mt-12 rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-slate-950">Regional quick links</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Popular starting points—submit an inquiry when you are ready for matches tailored to your states and
              specialty.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {FEATURED_STATES.map((s) => (
                <Link
                  key={s.code}
                  href="/physician-opportunities#lead-form"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:border-brand-200 hover:bg-brand-50"
                >
                  {s.name} ({s.code})
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
