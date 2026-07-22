import { SITE } from "@/lib/site";

export type ShareCardMetric = {
  label: string;
  value: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  headlineStat: string;
  headlineLabel?: string;
  metrics?: ShareCardMetric[];
  footerNote?: string;
  /** id for print / screenshot targeting */
  cardId?: string;
};

/** Screenshot-worthy result card — high contrast, big numbers, brand footer. */
export function ShareResultCard({
  eyebrow = "Locum Career Hub",
  title,
  headlineStat,
  headlineLabel = "Directional range",
  metrics = [],
  footerNote = "Educational estimate — not a guaranteed offer.",
  cardId = "share-result-card",
}: Props) {
  return (
    <div
      id={cardId}
      className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 text-white shadow-card"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-300">{eyebrow}</p>
        <p className="text-xs font-medium text-slate-400">{SITE.domain}</p>
      </div>
      <div className="px-5 py-7 sm:px-7 sm:py-9">
        <h2 className="max-w-3xl font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{headlineLabel}</p>
        <p className="mt-2 font-display text-4xl font-semibold tracking-tight text-brand-300 sm:text-5xl">{headlineStat}</p>
        {metrics.length ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{metric.label}</p>
                <p className="mt-1 font-display text-xl font-semibold text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="border-t border-white/10 px-5 py-3 sm:px-7">
        <p className="text-xs leading-5 text-slate-400">{footerNote}</p>
      </div>
    </div>
  );
}
