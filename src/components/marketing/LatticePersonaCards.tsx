import Link from "next/link";
import { featuredProofForSpecialty, geoProofForSpecialty, LATTICE_DOORS } from "@/lib/lead-lattice";

export function LatticePersonaCards({ pathSlug }: { pathSlug: string }) {
  const featured = featuredProofForSpecialty(pathSlug);
  const geo = geoProofForSpecialty(pathSlug);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">Who this is for</h2>
        <p className="mt-2 text-sm text-slate-600">
          Same specialty, four different career moments. Pick the door that matches how you want to work.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {LATTICE_DOORS.map((door) => (
            <li key={door.id}>
              <Link
                href={door.href}
                className="flex h-full flex-col rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-brand-200 hover:bg-white"
              >
                <span className="font-semibold text-slate-950">{door.title}</span>
                <span className="mt-2 text-sm leading-relaxed text-slate-600">{door.detail}</span>
                <span className="mt-3 text-sm font-semibold text-brand-700">Read this path →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {featured.length > 0 ? (
        <section>
          <h2 className="font-display text-xl font-semibold text-slate-950">Live assignments</h2>
          <ul className="mt-4 grid gap-3">
            {featured.map((job) => (
              <li key={job.href}>
                <Link
                  href={job.href}
                  className="block rounded-2xl border border-brand-200 bg-brand-50/50 p-4 transition hover:border-brand-300"
                >
                  <span className="font-semibold text-slate-950">{job.title}</span>
                  <span className="mt-1 block text-sm text-slate-600">{job.detail}</span>
                  <span className="mt-2 inline-block text-sm font-semibold text-brand-700">View featured job →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {geo.length > 0 ? (
        <section>
          <h2 className="font-display text-xl font-semibold text-slate-950">High-intent markets</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {geo.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-brand-200">
                  <span className="font-semibold text-slate-950">{item.title}</span>
                  <span className="mt-1 block text-sm text-slate-600">{item.detail}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
