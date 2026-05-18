import Link from "next/link";
import { TIER1_PRIORITY_LINKS, TIER1_STATE_LINKS } from "@/lib/seo/tier1-discovery";

/** Compact internal link row for state/specialty/glossary pages. */
export function Tier1QuickLinks() {
  const links = [...TIER1_PRIORITY_LINKS.slice(0, 4), ...TIER1_STATE_LINKS.slice(0, 3)];

  return (
    <nav aria-label="Popular site pages" className="rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Popular on Locum Career Hub</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50"
            >
              {l.shortTitle ?? l.title}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/physician-opportunities#lead-form"
            className="inline-block rounded-full border border-brand-300 bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-700"
          >
            Get matched →
          </Link>
        </li>
      </ul>
    </nav>
  );
}
