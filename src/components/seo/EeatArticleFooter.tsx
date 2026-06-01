import type { EeatMeta } from "@/lib/cardiology-authority/types";
import Link from "next/link";
import { EDITORIAL_POLICY, CONTENT_REVIEW_POLICY, CARDIOLOGY_RECRUITER } from "@/lib/cardiology-authority/eeat";

type Props = {
  eeat: EeatMeta;
  className?: string;
};

export function EeatArticleFooter({ eeat, className = "" }: Props) {
  return (
    <footer className={`rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700 ${className}`.trim()}>
      <h2 className="font-display text-lg font-semibold text-slate-950">About this page</h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Author</dt>
          <dd className="mt-1">
            <Link href="/team" className="font-semibold text-brand-700 hover:underline">
              {eeat.author}
            </Link>
            <span className="text-slate-600"> — {eeat.authorRole}</span>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Reviewed</dt>
          <dd className="mt-1">{eeat.reviewer}</dd>
          <dd className="text-xs text-slate-500">{eeat.reviewerCredentials}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Last updated</dt>
          <dd className="mt-1">{eeat.lastUpdated}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Policies</dt>
          <dd className="mt-1 space-x-2">
            <Link href={EDITORIAL_POLICY.path} className="font-semibold text-brand-700 hover:underline">
              Editorial
            </Link>
            <Link href={CONTENT_REVIEW_POLICY.path} className="font-semibold text-brand-700 hover:underline">
              Review
            </Link>
          </dd>
        </div>
      </dl>
      {eeat.sources.length > 0 ? (
        <div className="mt-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sources & references</h3>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {eeat.sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} rel="noopener noreferrer" target="_blank" className="text-brand-700 hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="mt-4 text-xs text-slate-500">
        {CARDIOLOGY_RECRUITER.name} and Locum Career Hub provide recruiting information—not medical advice. Compensation
        figures are educational context, not guaranteed offers.
      </p>
    </footer>
  );
}
