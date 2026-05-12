"use client";

import { useMemo, useRef, useState } from "react";
import { SPECIALTIES } from "@/lib/specialties";
import { FEATURED_STATES, US_STATES } from "@/lib/states";
import { Button } from "@/components/ui/Button";
import { RecaptchaField, type RecaptchaFieldHandle } from "@/components/forms/RecaptchaField";

const recaptchaSiteConfigured = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

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

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="flex items-baseline gap-1 text-xs font-semibold text-slate-800">
      {children}
      {required ? <span className="font-normal text-red-600">*</span> : null}
    </span>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 sm:p-6">
      <legend className="px-1 font-display text-sm font-semibold tracking-tight text-slate-950">{title}</legend>
      {description ? <p className="mb-4 mt-1 max-w-2xl text-xs leading-relaxed text-slate-600">{description}</p> : null}
      <div className="grid gap-4 lg:grid-cols-2">{children}</div>
    </fieldset>
  );
}

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
  const [selectedStates, setSelectedStates] = useState<Set<string>>(() => new Set());
  const [stateQuery, setStateQuery] = useState("");
  const [captchaReady, setCaptchaReady] = useState(!recaptchaSiteConfigured);
  const [captchaLoadError, setCaptchaLoadError] = useState(false);
  const recaptchaRef = useRef<RecaptchaFieldHandle>(null);

  const specialtyOptions = useMemo(() => [...SPECIALTIES], []);

  const filteredStates = useMemo(() => {
    const q = stateQuery.trim().toLowerCase();
    if (!q) return US_STATES;
    return US_STATES.filter((s) => s.toLowerCase().includes(q));
  }, [stateQuery]);

  const toggleState = (name: string) => {
    setSelectedStates((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const preferredStates = [...selectedStates].sort((a, b) => a.localeCompare(b));

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
      recaptchaToken: recaptchaSiteConfigured ? (recaptchaRef.current?.getToken() ?? "") : "",
    };

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.phone) {
      setStatus("error");
      setError("Please complete your name, email, and phone so we can respond.");
      return;
    }

    if (preferredStates.length === 0) {
      setStatus("error");
      setError("Select at least one state where you would consider working.");
      return;
    }

    if (recaptchaSiteConfigured) {
      if (!captchaReady || captchaLoadError) {
        setStatus("error");
        setError(
          captchaLoadError
            ? "Security verification could not load. Please refresh the page or try again later."
            : "Security verification is still loading—please wait a moment and try again.",
        );
        return;
      }
      const token = recaptchaRef.current?.getToken() ?? "";
      if (!token.trim()) {
        setStatus("error");
        setError("Please complete the security verification below.");
        return;
      }
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok) {
        setStatus("error");
        setError(typeof data?.error === "string" ? data.error : "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
      setSelectedStates(new Set());
      setStateQuery("");
      recaptchaRef.current?.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please call us or try again in a moment.");
    }
  }

  return (
    <div id={id} className="scroll-mt-24 rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:rounded-3xl sm:p-10">
      <div className="max-w-2xl border-b border-slate-100 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Physician inquiry</p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{subtitle}</p>
        <p className="mt-4 text-xs text-slate-500">
          Fields marked <span className="text-red-600">*</span> are required. Typical completion time is under two
          minutes.
        </p>
      </div>

      <form className="mt-8 flex flex-col gap-10" onSubmit={onSubmit}>
        <FormSection
          title="Contact"
          description="We use this information to respond to your inquiry and route you to the right recruiting pod."
        >
          <label className="lg:col-span-1">
            <FieldLabel required>First name</FieldLabel>
            <input
              name="firstName"
              required
              autoComplete="given-name"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
            />
          </label>
          <label className="lg:col-span-1">
            <FieldLabel required>Last name</FieldLabel>
            <input
              name="lastName"
              required
              autoComplete="family-name"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
            />
          </label>

          <label className="lg:col-span-1">
            <FieldLabel required>Email</FieldLabel>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
            />
          </label>
          <label className="lg:col-span-1">
            <FieldLabel required>Phone</FieldLabel>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="Best number for follow-up"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
            />
          </label>
        </FormSection>

        <FormSection title="Clinical profile" description="Helps us match you to realistic openings and credentialing paths.">
          <label className="lg:col-span-2">
            <FieldLabel required>Specialty</FieldLabel>
            <select
              name="specialty"
              defaultValue={defaultSpecialty ?? ""}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
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

          <label className="lg:col-span-1">
            <FieldLabel required>Years of experience</FieldLabel>
            <select
              name="yearsExperience"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
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
            <FieldLabel required>Availability</FieldLabel>
            <select
              name="availability"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select timeline
              </option>
              {availabilityOptions.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>
        </FormSection>

        <FormSection
          title="Location & travel"
          description="Choose every state you would realistically consider. You can refine later—this is just a starting map."
        >
          <div className="lg:col-span-2 space-y-4">
            <div>
              <FieldLabel required>Preferred states</FieldLabel>
              <p className="mt-1 text-xs text-slate-600">
                Quick add popular markets, then fine-tune in the directory below.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {FEATURED_STATES.map((s) => {
                  const on = selectedStates.has(s.name);
                  return (
                    <button
                      key={s.code}
                      type="button"
                      onClick={() => toggleState(s.name)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        on
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-slate-200 bg-white text-slate-800 hover:border-brand-200"
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedStates.size > 0 ? (
              <div className="rounded-xl border border-brand-100 bg-brand-50/50 px-3 py-3">
                <p className="text-xs font-semibold text-brand-900">
                  Selected ({selectedStates.size}):{" "}
                  <span className="font-normal text-slate-800">
                    {[...selectedStates].sort((a, b) => a.localeCompare(b)).join(", ")}
                  </span>
                </p>
              </div>
            ) : null}

            <div>
              <label className="block">
                <span className="text-xs font-semibold text-slate-800">Search states</span>
                <input
                  type="search"
                  value={stateQuery}
                  onChange={(e) => setStateQuery(e.target.value)}
                  placeholder="Type to filter (e.g. “Carol”)"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
                />
              </label>
              <div className="mt-3 max-h-52 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-inner sm:max-h-60">
                <ul className="grid gap-1 sm:grid-cols-2">
                  {filteredStates.map((s) => {
                    const checked = selectedStates.has(s);
                    return (
                      <li key={s}>
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-800 hover:bg-slate-50">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleState(s)}
                            className="size-4 rounded border-slate-300 accent-brand-600"
                          />
                          <span>{s}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
                {filteredStates.length === 0 ? (
                  <p className="px-2 py-6 text-center text-sm text-slate-500">No states match that search.</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <FieldLabel required>Interested in travel opportunities?</FieldLabel>
            <p className="mt-1 text-xs text-slate-600">Travel can include regional driving or flying, depending on assignment.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(
                [
                  { v: "yes", label: "Yes" },
                  { v: "no", label: "No" },
                  { v: "maybe", label: "Maybe / depends" },
                ] as const
              ).map((o) => (
                <label
                  key={o.v}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50"
                >
                  <input type="radio" name="travel" value={o.v} required className="accent-brand-600" />
                  {o.label}
                </label>
              ))}
            </div>
          </div>
        </FormSection>

        <FormSection title="Communication preferences" description="Optional. You can change your mind at any time.">
          <label className="lg:col-span-2 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
            <input name="smsOptIn" type="checkbox" className="mt-1 size-4 accent-brand-600" />
            <span>
              <span className="font-semibold text-slate-900">Text me about time-sensitive opportunities</span>
              <span className="mt-1 block text-xs text-slate-600">
                SMS opt-in: message/data rates may apply. Reply STOP to opt out.
              </span>
            </span>
          </label>

          <label className="lg:col-span-2 flex cursor-pointer items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/50 p-4 text-sm text-slate-700 shadow-sm">
            <input name="leadMagnet" type="checkbox" className="mt-1 size-4 accent-brand-600" defaultChecked />
            <span>
              <span className="font-semibold text-slate-900">Email me “The Physician’s Guide to Locum Tenens”</span>
              <span className="mt-1 block text-xs text-slate-600">
                We will send the guide to the email address above. Check spam if you do not see it within a few minutes.
              </span>
            </span>
          </label>
        </FormSection>

        <RecaptchaField
          ref={recaptchaRef}
          onReady={() => {
            setCaptchaReady(true);
            setCaptchaLoadError(false);
          }}
          onLoadError={() => {
            setCaptchaLoadError(true);
            setCaptchaReady(false);
          }}
        />

        {status === "success" ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            Thank you—your inquiry is in. A recruiter will reach out shortly. If you requested the guide, check your inbox
            (and spam) within a few minutes.
          </div>
        ) : null}

        {status === "error" && error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">{error}</div>
        ) : null}

        <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <Button type="submit" disabled={status === "submitting"} size="md" className="w-full shrink-0 sm:w-auto">
            {status === "submitting" ? "Submitting…" : "Submit inquiry"}
          </Button>
          <p className="max-w-md text-xs leading-relaxed text-slate-500 sm:text-right">
            By submitting, you agree we may contact you about opportunities. This is not an employment offer. If you need
            an accommodation to complete this form, email us directly.
          </p>
        </div>
      </form>
    </div>
  );
}
