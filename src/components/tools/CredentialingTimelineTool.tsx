"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LeadFormAltActions } from "@/components/forms/LeadFormAltActions";
import { Button } from "@/components/ui/Button";
import { CREDENTIALING_DISCLAIMER, getCredentialingEstimate } from "@/lib/credentialing-timeline";
import { US_STATES } from "@/lib/states";
import { trackEvent } from "@/lib/analytics-events";

export function CredentialingTimelineTool() {
  const [stateName, setStateName] = useState("Florida");
  const estimate = useMemo(() => getCredentialingEstimate(stateName), [stateName]);

  return (
    <>
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Tools</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Cardiology locum credentialing timeline
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Estimate how long licensing and hospital privileging may take before your first block—then submit an inquiry
            for recruiter-led pacing on your subspecialty.
          </p>
          <div className="mt-8">
            <LeadFormAltActions source="credentialing_tool" />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site max-w-2xl">
          <label className="block">
            <span className="text-sm font-semibold text-slate-900">Select state</span>
            <select
              value={stateName}
              onChange={(e) => {
                setStateName(e.target.value);
                trackEvent("credentialing_state_select", { state: e.target.value });
              }}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-sm outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-200"
            >
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          {estimate ? (
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Medical license (typical)</dt>
                <dd className="mt-2 font-display text-2xl font-semibold text-slate-950">{estimate.licenseWeeks}</dd>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Hospital privileging</dt>
                <dd className="mt-2 font-display text-2xl font-semibold text-slate-950">{estimate.privilegingWeeks}</dd>
              </div>
              <div className="sm:col-span-2 rounded-2xl border border-brand-100 bg-brand-50/40 p-5 text-sm leading-relaxed text-slate-700">
                <p className="font-semibold text-slate-900">{estimate.stateName}</p>
                <p className="mt-2">{estimate.notes}</p>
                <p className="mt-4 text-xs text-slate-500">{CREDENTIALING_DISCLAIMER}</p>
              </div>
            </dl>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/physician-opportunities#lead-form">Start cardiologist inquiry</Button>
            <Button href="/resources/credentialing-for-locum-cardiologists" variant="secondary">
              Full credentialing guide
            </Button>
            <Link href="/tools" className="inline-flex items-center text-sm font-semibold text-brand-700 hover:underline">
              All tools →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
