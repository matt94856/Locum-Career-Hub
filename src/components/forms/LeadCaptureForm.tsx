"use client";

import { useMemo, useState } from "react";
import { SPECIALTIES } from "@/lib/specialties";
import { US_STATES } from "@/lib/states";
import { Button } from "@/components/ui/Button";

const experienceOptions = [
  "Still in training",
  "0–2 years",
  "3–7 years",
  "8–15 years",
  "16+ years",
];

const availabilityOptions = [
  "ASAP",
  "Within 30 days",
  "1–3 months",
  "3–6 months",
  "Exploring / no firm date",
];

export function LeadCaptureForm({
  id = "lead-form",
  title = "Physician inquiry",
  subtitle = "Share a few details and we will follow up with realistic opportunities—not a generic blast.",
  defaultSpecialty,
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  defaultSpecialty?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const specialtyOptions = useMemo(() => [...SPECIALTIES], []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const preferredStates = fd
      .getAll("preferredStates")
      .map((v) => String(v).trim())
      .filter(Boolean);

    const payload = {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      specialty: String(fd.get("specialty") ?? "").trim(),
      preferredStates,
      yearsExperience: String(fd.get("yearsExperience") ?? "").trim(),
      availability: String(fd.get("availability") ?? "").trim(),
      travel: String(fd.get("travel") ?? "").trim(),
      smsOptIn: fd.get("smsOptIn") === "on",
      leadMagnet: fd.get("leadMagnet") === "on",
      pagePath: typeof window !== "undefined" ? window.location.pathname : "",
    };

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.phone) {
      setStatus("error");
      setError("Please complete your name, email, and phone so we can respond.");
      return;
    }

    if (payload.preferredStates.length === 0) {
      setStatus("error");
      setError("Please select at least one preferred state.");
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad_status");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please call us or try again in a moment.");
    }
  }

  return (
    <div id={id} className="scroll-mt-24 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-card sm:p-10">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Lead capture</p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{subtitle}</p>
      </div>

      <form className="mt-8 grid gap-4 lg:grid-cols-2" onSubmit={onSubmit}>
        <label className="lg:col-span-1">
          <span className="text-xs font-semibold text-slate-700">First name</span>
          <input
            name="firstName"
            required
            autoComplete="given-name"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:ring-4"
          />
        </label>
        <label className="lg:col-span-1">
          <span className="text-xs font-semibold text-slate-700">Last name</span>
          <input
            name="lastName"
            required
            autoComplete="family-name"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:ring-4"
          />
        </label>

        <label className="lg:col-span-1">
          <span className="text-xs font-semibold text-slate-700">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:ring-4"
          />
        </label>
        <label className="lg:col-span-1">
          <span className="text-xs font-semibold text-slate-700">Phone number</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:ring-4"
          />
        </label>

        <label className="lg:col-span-2">
          <span className="text-xs font-semibold text-slate-700">Specialty</span>
          <select
            name="specialty"
            defaultValue={defaultSpecialty ?? ""}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:ring-4"
          >
            <option value="" disabled>
              Select your specialty
            </option>
            {specialtyOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="lg:col-span-2">
          <span className="text-xs font-semibold text-slate-700">Preferred states (multi-select)</span>
          <select
            name="preferredStates"
            multiple
            className="mt-2 h-40 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-brand-200 focus:ring-4"
          >
            {US_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-slate-500">
            On desktop: hold Ctrl/⌘ to select multiple. On mobile: tap multiple rows (where supported) or email us your
            list after submitting.
          </p>
        </label>

        <label className="lg:col-span-1">
          <span className="text-xs font-semibold text-slate-700">Years of experience</span>
          <select
            name="yearsExperience"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:ring-4"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select
            </option>
            {experienceOptions.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </label>

        <label className="lg:col-span-1">
          <span className="text-xs font-semibold text-slate-700">Availability timeline</span>
          <select
            name="availability"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:ring-4"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select
            </option>
            {availabilityOptions.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="lg:col-span-2">
          <legend className="text-xs font-semibold text-slate-700">Interested in travel opportunities?</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
              <input type="radio" name="travel" value="yes" required className="accent-brand-600" />
              Yes
            </label>
            <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
              <input type="radio" name="travel" value="no" className="accent-brand-600" />
              No
            </label>
            <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
              <input type="radio" name="travel" value="maybe" className="accent-brand-600" />
              Maybe / depends
            </label>
          </div>
        </fieldset>

        <label className="lg:col-span-2 inline-flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
          <input name="smsOptIn" type="checkbox" className="mt-1 accent-brand-600" />
          <span>
            <span className="font-semibold text-slate-900">SMS opt-in</span> — Receive time-sensitive updates about
            opportunities by text. Message/data rates may apply. Reply STOP to opt out.
          </span>
        </label>

        <label className="lg:col-span-2 inline-flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/40 p-4 text-sm text-slate-700">
          <input name="leadMagnet" type="checkbox" className="mt-1 accent-brand-600" defaultChecked />
          <span>
            <span className="font-semibold text-slate-900">Send the lead magnet</span> — Email me{" "}
            <span className="font-semibold">“The Physician’s Guide to Locum Tenens”</span> (PDF).
          </span>
        </label>

        {status === "success" ? (
          <div className="lg:col-span-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            Thanks—your inquiry is in. A recruiter will reach out shortly. If you requested the guide, check your inbox
            (and spam) within a few minutes.
          </div>
        ) : null}

        {status === "error" && error ? (
          <div className="lg:col-span-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">{error}</div>
        ) : null}

        <div className="lg:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
            {status === "submitting" ? "Submitting…" : "Submit inquiry"}
          </Button>
          <p className="text-xs text-slate-500">
            By submitting, you agree we may contact you about opportunities. This is not an employment offer.
          </p>
        </div>
      </form>
    </div>
  );
}
