import Link from "next/link";
import { CARDIOLOGY_HUB_PATH, cardiologySpecialtyPath } from "@/lib/seo/cardiology-locum-jobs-config";
import { RESOURCES_HUB_PATH, getCardiologyArticle } from "@/lib/cardiology-authority/articles";
import { LEAD_FORM_HREF } from "@/lib/seo/tier1-discovery";

type Props = {
  specialtyPathSlugs?: string[];
  articleSlugs?: string[];
  stateSlug?: string;
  className?: string;
};

/** Hub-and-spoke internal links (Phase 7). */
export function RelatedCardiologyLinks({
  specialtyPathSlugs = [],
  articleSlugs = [],
  stateSlug,
  className = "",
}: Props) {
  return (
    <nav className={`rounded-2xl border border-slate-100 bg-slate-50/80 p-6 ${className}`.trim()} aria-label="Related cardiology resources">
      <h2 className="font-display text-lg font-semibold text-slate-950">Related cardiology resources</h2>
      <ul className="mt-4 space-y-2 text-sm">
        <li>
          <Link href={CARDIOLOGY_HUB_PATH} className="font-semibold text-brand-700 hover:underline">
            Cardiology locum jobs hub
          </Link>
        </li>
        <li>
          <Link href={RESOURCES_HUB_PATH} className="font-semibold text-brand-700 hover:underline">
            Cardiology career resources
          </Link>
        </li>
        <li>
          <Link href={LEAD_FORM_HREF} className="font-semibold text-brand-700 hover:underline">
            Explore current opportunities
          </Link>
        </li>
        {stateSlug ? (
          <li>
            <Link href={`/locum-tenens-jobs/${stateSlug}`} className="font-semibold text-brand-700 hover:underline">
              Locum cardiology jobs in this state
            </Link>
          </li>
        ) : null}
      </ul>
      {specialtyPathSlugs.length > 0 ? (
        <>
          <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Subspecialties</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {specialtyPathSlugs.map((slug) => (
              <li key={slug}>
                <Link href={cardiologySpecialtyPath(slug)} className="text-brand-700 hover:underline">
                  {slug.replace(/-/g, " ")} locum jobs
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {articleSlugs.length > 0 ? (
        <>
          <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Guides</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {articleSlugs.map((slug) => {
              const a = getCardiologyArticle(slug);
              if (!a) return null;
              return (
                <li key={slug}>
                  <Link href={a.path} className="text-brand-700 hover:underline">
                    {a.h1}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </nav>
  );
}
