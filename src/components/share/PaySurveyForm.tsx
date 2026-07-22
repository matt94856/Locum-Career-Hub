"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics-events";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { US_STATES } from "@/lib/states";

export function PaySurveyForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const data = new FormData(event.currentTarget);
    const payload = {
      email: String(data.get("email") ?? "").trim() || undefined,
      specialty: String(data.get("specialty") ?? ""),
      region: String(data.get("region") ?? ""),
      weeklyLow: Number(data.get("weeklyLow")),
      weeklyHigh: Number(data.get("weeklyHigh")),
      assignmentStyle: String(data.get("assignmentStyle") ?? ""),
      yearsDoingLocums: String(data.get("yearsDoingLocums") ?? ""),
      anonymousOk: data.get("anonymousOk") === "on",
    };
    try {
      const response = await fetch("/api/pay-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(body.error || "Could not save your response.");
      setStatus("success");
      trackEvent("viral_share", {
        method: "pay_survey_submit",
        tool_id: "pay_survey",
        page_path: "/cardiologist-locums-pay-survey",
      });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not save your response.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8" role="status">
        <h2 className="font-display text-3xl font-semibold text-emerald-950">Thank you — response recorded</h2>
        <p className="mt-3 text-sm leading-6 text-emerald-900">
          Aggregated, anonymized ranges will update the public pay report as sample size grows. No individual rows are published.
        </p>
        <Link href="/cardiologist-locums-pay-report" className="mt-5 inline-flex rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
          View the citeable pay chart →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">8 questions · ~90 seconds</p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-slate-950">Anonymous cardiologist locums pay survey</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Help build the first citeable, cardiology-only locums pay chart. We publish aggregates only — never your name or exact row.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-900 sm:col-span-2">
          Subspecialty
          <select required name="specialty" defaultValue="General Cardiology" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3">
            {CARDIOLOGY_SUBSPECIALTIES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-900 sm:col-span-2">
          Primary region / state of recent assignments
          <select required name="region" defaultValue="Florida" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3">
            {US_STATES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-900">
          Typical weekly low (gross $)
          <input required name="weeklyLow" type="number" min={1000} max={90000} step={500} placeholder="12000" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" />
        </label>
        <label className="text-sm font-semibold text-slate-900">
          Typical weekly high (gross $)
          <input required name="weeklyHigh" type="number" min={1000} max={100000} step={500} placeholder="18000" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" />
        </label>
        <label className="text-sm font-semibold text-slate-900 sm:col-span-2">
          Assignment style
          <select name="assignmentStyle" defaultValue="Mixed / flexible" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3">
            <option>Weekend call</option>
            <option>Weekday coverage</option>
            <option>Clinic only</option>
            <option>Inpatient rounding</option>
            <option>Cath / EP lab</option>
            <option>Mixed / flexible</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-900 sm:col-span-2">
          Years doing locums
          <select name="yearsDoingLocums" defaultValue="1-3" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3">
            <option>Exploring / not yet</option>
            <option>&lt;1</option>
            <option>1-3</option>
            <option>4-7</option>
            <option>8+</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-900 sm:col-span-2">
          Email (optional — for report updates only)
          <input type="email" name="email" autoComplete="email" placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" />
        </label>
        <label className="flex items-start gap-3 text-sm text-slate-700 sm:col-span-2">
          <input type="checkbox" name="anonymousOk" defaultChecked className="mt-1 size-4 accent-brand-600" />
          <span>I understand my response may be included in anonymized aggregates only.</span>
        </label>
      </div>
      {status === "error" ? <p className="mt-4 text-sm text-red-700">{message}</p> : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "sending" ? "Saving…" : "Submit anonymous range"}
      </button>
    </form>
  );
}
