"use client";

import Link from "next/link";
import { CalendlyBookButton } from "@/components/cta/CalendlyBookButton";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function RecruiterCta() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-12 text-white sm:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_20%,rgba(37,99,235,0.55),transparent_55%),radial-gradient(600px_circle_at_90%_30%,rgba(14,165,233,0.35),transparent_55%)]" />
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="min-w-0 lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">Physician desk</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                A conversation that starts with your life—not a quota
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
                If you want schedule relief, travel optionality, or a quieter path through a hard season, we map
                realistic options and timelines. No spam. No bait-and-switch rates.
              </p>
              <div className="mt-6 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
                <CalendlyBookButton source="recruiter_cta" className="w-full justify-center" />
                <Button
                  href={`tel:${SITE.phoneTel}`}
                  variant="secondary"
                  className="w-full justify-center border-white/25 bg-white/10 !text-white hover:border-white/40 hover:bg-white/20"
                >
                  Call {SITE.phoneDisplay}
                </Button>
              </div>
            </div>

            <div className="min-w-0 lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm font-semibold">What to have ready</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  <li>CV + month/year availability</li>
                  <li>State licenses (active or in progress)</li>
                  <li>Specialty board status and DEA needs</li>
                  <li>Travel preferences and dealbreakers</li>
                </ul>
                <Link href="#get-matched" className="mt-6 inline-flex text-sm font-semibold text-brand-100 hover:text-white">
                  Prefer a form? Submit an inquiry →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
