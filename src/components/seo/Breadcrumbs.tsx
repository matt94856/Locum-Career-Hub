import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-600">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex min-w-0 items-center gap-1.5">
              {idx > 0 ? (
                <span className="text-slate-400" aria-hidden>
                  /
                </span>
              ) : null}
              {isLast || !item.href ? (
                <span className="font-medium text-slate-800 [overflow-wrap:anywhere]" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="font-semibold text-brand-700 hover:underline [overflow-wrap:anywhere]">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
