import Link from "next/link";

const cardClass =
  "group flex h-full min-h-[9rem] min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition duration-200 hover:border-brand-200/90 hover:shadow-md sm:min-h-[10rem] sm:p-5";

type GuideCardLinkProps = {
  href: string;
  title: string;
  description: string;
  ctaLabel?: string;
  className?: string;
};

/**
 * Skimmable landing / topic card: stable height, safe text wrapping, no overlap on narrow grids.
 */
export function GuideCardLink({
  href,
  title,
  description,
  ctaLabel = "Read guide →",
  className = "",
}: GuideCardLinkProps) {
  return (
    <Link href={href} className={`${cardClass} ${className}`.trim()}>
      <p className="text-sm font-semibold leading-snug text-slate-950 [overflow-wrap:anywhere]">{title}</p>
      <p className="mt-2 min-h-0 flex-1 text-xs leading-relaxed text-slate-600 [overflow-wrap:anywhere] line-clamp-2 sm:text-sm sm:line-clamp-3">
        {description}
      </p>
      <p className="mt-4 shrink-0 text-xs font-semibold text-brand-700 transition group-hover:text-brand-800">
        {ctaLabel}
      </p>
    </Link>
  );
}
