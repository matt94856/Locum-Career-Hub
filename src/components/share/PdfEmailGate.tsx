"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics-events";
import { readLeadAttribution } from "@/lib/attribution";

type Props = {
  source: string;
  specialty: string;
  preferredStates: string[];
  profile: Record<string, unknown>;
  availability?: string;
  homeState?: string;
  onUnlocked?: () => void;
};

/**
 * Light gate: core numbers stay visible. Email (+ phone) only unlocks PDF print/email.
 */
export function PdfEmailGate({
  source,
  specialty,
  preferredStates,
  profile,
  availability = "Exploring / no firm date",
  homeState,
  onUnlocked,
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const firstName = String(form.get("firstName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const state = String(form.get("homeState") ?? homeState ?? preferredStates[0] ?? "Florida").trim();

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          specialty,
          preferredStates: preferredStates.length ? preferredStates : [state],
          homeState: state,
          availability,
          formMode: "quick",
          source,
          pagePath: window.location.pathname,
          attribution: readLeadAttribution(),
          calculatorProfile: { ...profile, delivery: "pdf_report" },
          clinicalNotes: "Requested email/PDF of tool result (light gate).",
        }),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(body.error || "Could not send your PDF request.");
      setStatus("success");
      onUnlocked?.();
      trackEvent("viral_share", {
        method: "pdf_email_gate",
        tool_id: source,
        page_path: window.location.pathname,
      });
      window.setTimeout(() => window.print(), 400);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not send your PDF request.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6 print:hidden" role="status">
        <p className="text-sm font-semibold text-emerald-900">PDF request saved — your print dialog should open.</p>
        <p className="mt-2 text-sm text-emerald-800">Choose “Save as PDF” in the print dialog. Your on-screen numbers stay free to screenshot anytime.</p>
        <button
          type="button"
          onClick={() => window.print()}
          className="mt-4 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Print / save PDF again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6 print:hidden">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Optional PDF</p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-slate-950">Email me a printable PDF of this result</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Your numbers above stay visible with no form. This only unlocks a print-ready PDF and a copy for follow-up if you want it.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <input required name="firstName" autoComplete="given-name" placeholder="First name" aria-label="First name" className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
        <input required name="lastName" autoComplete="family-name" placeholder="Last name" aria-label="Last name" className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
        <input required type="email" name="email" autoComplete="email" placeholder="Email" aria-label="Email" className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
        <input required type="tel" name="phone" autoComplete="tel" placeholder="Phone" aria-label="Phone" className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
        {!homeState ? (
          <input name="homeState" placeholder="Home or practice state" aria-label="Home or practice state" className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm sm:col-span-2" />
        ) : (
          <input type="hidden" name="homeState" value={homeState} />
        )}
      </div>
      {status === "error" ? <p className="mt-3 text-sm text-red-700">{message}</p> : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Email my PDF + open print dialog"}
      </button>
    </form>
  );
}
