import Link from "next/link";
import { RECRUITER_FOLLOW_UP_PROMISE } from "@/lib/cardiology-seo/rich-content";

export function RecruiterInquiryTrust({ geoLabel }: { geoLabel?: string }) {
  const area = geoLabel ? ` in ${geoLabel}` : "";

  return (
    <aside className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">Transparent follow-up</p>
      <h2 className="mt-2 font-display text-lg font-semibold text-slate-950">What happens when you inquire{area}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{RECRUITER_FOLLOW_UP_PROMISE}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        <li className="flex gap-2">
          <span className="text-emerald-700" aria-hidden>
            ✓
          </span>
          <span>
            <strong className="font-semibold text-slate-900">No spam lists:</strong> we do not sell your inquiry as a
            generic lead blast.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-emerald-700" aria-hidden>
            ✓
          </span>
          <span>
            <strong className="font-semibold text-slate-900">Cardiologists only:</strong> MD/DO cardiology
            subspecialties we actually recruit.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-emerald-700" aria-hidden>
            ✓
          </span>
          <span>
            <strong className="font-semibold text-slate-900">Plain answers:</strong> if nothing matches your selected
            states, we will say so.
          </span>
        </li>
      </ul>
      <p className="mt-4 text-sm text-slate-600">
        Ready to start?{" "}
        <Link href="/physician-opportunities#lead-form" className="font-semibold text-brand-700 hover:underline">
          Submit the cardiologist inquiry form
        </Link>
        —most cardiologists complete step 1 in under a minute.
      </p>
    </aside>
  );
}
