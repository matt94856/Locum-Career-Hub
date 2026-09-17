import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CalendlyBookButton } from "@/components/cta/CalendlyBookButton";
import { HOME_H1 } from "@/lib/seo/cardiology-locum-jobs-config";
import { HOME_LEAD_ANCHOR } from "@/lib/seo/tier1-discovery";
import { CTA } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_-10%,rgba(37,99,235,0.18),transparent_55%),radial-gradient(700px_circle_at_90%_10%,rgba(14,165,233,0.12),transparent_55%)]" />

      <div className="container-site relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/70 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Cardiologists only · locum tenens
            </p>

            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {HOME_H1}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              Let’s find locum work that pays well and fits around your life—not the other way around.
            </p>

            <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
              <Button href={HOME_LEAD_ANCHOR} className="w-full justify-center">
                {CTA.requestMatches}
              </Button>
              <Button href="/cardiologist-locums-calculator" variant="secondary" className="w-full justify-center">
                Estimate pay
              </Button>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <li>
                <Link href="/locum-jobs/cardiology/general" className="font-semibold text-brand-700 hover:underline">
                  General
                </Link>
              </li>
              <li>
                <Link href="/locum-jobs/cardiology/interventional" className="font-semibold text-brand-700 hover:underline">
                  Interventional
                </Link>
              </li>
              <li>
                <Link href="/locum-jobs/cardiology/electrophysiology" className="font-semibold text-brand-700 hover:underline">
                  Electrophysiology
                </Link>
              </li>
              <li>
                <Link href="/locum-jobs-for-new-graduates" className="text-slate-700 hover:underline">
                  Fellowship
                </Link>
              </li>
              <li>
                <Link href="/moonlighting-physician-jobs" className="text-slate-700 hover:underline">
                  Moonlighting
                </Link>
              </li>
              <li>
                <Link href="/retired-physician-opportunities" className="text-slate-700 hover:underline">
                  Scale-down
                </Link>
              </li>
            </ul>
            <div className="mt-4 max-w-xl">
              <CalendlyBookButton source="hero" variant="ghost" className="w-full justify-center sm:w-auto">
                {CTA.bookCall}
              </CalendlyBookButton>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-5">
            <div className="relative min-w-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:rounded-3xl">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-200/40 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl" />

              <p className="text-sm font-semibold text-slate-900">What you keep</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Pay that makes sense. Call you agreed to. Time that’s actually yours.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {[
                  "Documented STEMI, census, and clinic load before you fly",
                  "Blocks matched to your subspecialty—not a generic board",
                  "Rates, malpractice, and travel in writing from the start",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-brand-50 text-brand-700">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Low-pressure next step</p>
                <p className="mt-2 text-sm text-slate-200">
                  Tell us the schedule you want. We’ll look for work that pays well and still leaves you room.
                </p>
                <Link
                  href={HOME_LEAD_ANCHOR}
                  className="mt-4 inline-flex text-sm font-semibold text-brand-200 hover:text-white"
                >
                  {CTA.requestMatches} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
