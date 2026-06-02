"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { FEATURED_STATES, US_STATES } from "@/lib/states";
import { Button } from "@/components/ui/Button";
import { LeadFormAltActions } from "@/components/forms/LeadFormAltActions";
import { RecaptchaField, type RecaptchaFieldHandle } from "@/components/forms/RecaptchaField";
import { trackGenerateLead, trackEvent } from "@/lib/analytics-events";
import { SITE } from "@/lib/site";

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

export type LeadCaptureFormProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  defaultSpecialty?: string;
  /** Pre-select states (e.g. from state job pages) */
  defaultPreferredStates?: string[];
  layout?: "full" | "sidebar";
  className?: string;
};

export function LeadCaptureForm({
  id = "lead-form",
  title = "Cardiologist inquiry",
  subtitle = "Share a few details and we will follow up with realistic cardiology locum options—not a generic blast.",
  defaultSpecialty = "General Cardiology",
  defaultPreferredStates = [],
  layout = "full",
  className = "",
}: LeadCaptureFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const validDefaultStates = useMemo(
    () => defaultPreferredStates.filter((s) => (US_STATES as readonly string[]).includes(s)),
    [defaultPreferredStates],
  );
  const [selectedStates, setSelectedStates] = useState<Set<string>>(() => new Set(validDefaultStates));
  const [stateQuery, setStateQuery] = useState("");
  const [captchaReady, setCaptchaReady] = useState(!recaptchaSiteConfigured);
  const [captchaLoadError, setCaptchaLoadError] = useState(false);
  const recaptchaRef = useRef<RecaptchaFieldHandle>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const specialtyOptions = useMemo(() => [...CARDIOLOGY_SUBSPECIALTIES], []);

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

  function readPayload(form: HTMLFormElement, formMode: "quick" | "full") {
    const fd = new FormData(form);
    const preferredStates = [...selectedStates].sort((a, b) => a.localeCompare(b));

    return {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      specialty: String(fd.get("specialty") ?? "").trim(),
      preferredStates,
      yearsExperience:
        String(fd.get("yearsExperience") ?? "").trim() ||
        (formMode === "quick" ? "Exploring / no firm date" : ""),
      availability: String(fd.get("availability") ?? "").trim(),
      travel: String(fd.get("travel") ?? "").trim() || (formMode === "quick" ? "maybe" : ""),
      clinicalNotes: String(fd.get("clinicalNotes") ?? "").trim() || null,
      smsOptIn: fd.get("smsOptIn") === "on",
      leadMagnet: fd.get("leadMagnet") === "on",
      formMode,
      pagePath: typeof window !== "undefined" ? window.location.pathname : "",
      recaptchaToken: recaptchaSiteConfigured ? (recaptchaRef.current?.getToken() ?? "") : "",
    };
  }

  function validatePayload(
    payload: ReturnType<typeof readPayload>,
    formMode: "quick" | "full",
  ): string | null {
    if (!payload.firstName || !payload.lastName || !payload.email || !payload.phone) {
      return "Please complete your name, email, and phone so we can respond.";
    }
    if (!payload.specialty || !payload.availability) {
      return "Select your subspecialty and availability timeline.";
    }
    if (payload.preferredStates.length === 0) {
      return "Select at least one state where you would consider working.";
    }
    if (formMode === "full") {
      if (!payload.yearsExperience || !payload.travel) {
        return "Complete experience and travel preference on step 2.";
      }
    }
    return null;
  }

  async function submitForm(formMode: "quick" | "full") {
    const form = formRef.current;
    if (!form) return;

    setStatus("submitting");
    setError(null);

    const payload = readPayload(form, formMode);
    const validationError = validatePayload(payload, formMode);
    if (validationError) {
      setStatus("error");
      setError(validationError);
      return;
    }

    if (recaptchaSiteConfigured && formMode === "full") {
      if (!captchaReady || captchaLoadError) {
        setStatus("error");
        setError(
          captchaLoadError
            ? "Security verification could not load. Please refresh the page or try again later."
            : "Security verification is still loading—please wait a moment and try again.",
        );
        return;
      }
      if (!payload.recaptchaToken.trim()) {
        setStatus("error");
        setError("Please complete the security verification on step 2.");
        setStep(2);
        return;
      }
    }

    if (recaptchaSiteConfigured && formMode === "quick") {
      payload.recaptchaToken = "";
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        code?: string;
      } | null;
      if (!res.ok) {
        setStatus("error");
        if (data?.code === "SUPABASE_NOT_CONFIGURED") {
          setError(
            `We could not save your inquiry through the form yet. Please email ${SITE.email} or call ${SITE.phoneDisplay} and we will pick it up from there.`,
          );
        } else {
          setError(typeof data?.error === "string" ? data.error : "Something went wrong. Please try again.");
        }
        return;
      }

      trackGenerateLead(payload.pagePath || "inquiry_form");
      trackEvent("form_submit", { form_mode: formMode, form_step: formMode === "quick" ? 1 : 2 });

      const params = new URLSearchParams();
      params.set("specialty", payload.specialty);
      if (payload.preferredStates.length) params.set("states", payload.preferredStates.join("|"));
      if (payload.pagePath) params.set("from", payload.pagePath.slice(0, 200));

      router.push(`/thank-you?${params.toString()}`);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please call us or try again in a moment.");
    }
  }

  function onContinueToStep2(e: React.FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const payload = readPayload(form, "quick");
    const validationError = validatePayload(payload, "quick");
    if (validationError) {
      setStatus("error");
      setError(validationError);
      return;
    }
    setError(null);
    setStatus("idle");
    setStep(2);
    trackEvent("form_step", { step: 2, action: "continue" });
  }

  function onQuickSubmit(e: React.FormEvent) {
    e.preventDefault();
    void submitForm("quick");
  }

  function onFullSubmit(e: React.FormEvent) {
    e.preventDefault();
    void submitForm("full");
  }

  const isSidebar = layout === "sidebar";

  return (
    <div
      id={id}
      className={`scroll-mt-24 rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:rounded-3xl sm:p-8 lg:p-10 ${isSidebar ? "" : "w-full"} ${className}`.trim()}
    >
      <div className={`border-b border-slate-100 pb-6 ${isSidebar ? "max-w-2xl" : ""}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Cardiologist inquiry (MD/DO)</p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{subtitle}</p>
        <div className="mt-5">
          <LeadFormAltActions source={isSidebar ? "sidebar" : "full"} compact={isSidebar} />
        </div>
        <div className="mt-5 flex items-center gap-3 text-xs text-slate-500">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold ${step === 1 ? "bg-brand-100 text-brand-800" : "bg-slate-100 text-slate-600"}`}
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[10px]">1</span>
            Essentials
          </span>
          <span className="text-slate-300" aria-hidden>
            →
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold ${step === 2 ? "bg-brand-100 text-brand-800" : "bg-slate-100 text-slate-600"}`}
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[10px]">2</span>
            Details
          </span>
        </div>
      </div>

      <form ref={formRef} className="mt-8 flex flex-col gap-8 lg:gap-10" onSubmit={step === 1 ? onContinueToStep2 : onFullSubmit}>
        {step === 1 ? (
          <>
            <FormSection
              title="Step 1 — Contact & timeline"
              description="Most cardiologists finish this step in under a minute. You can quick-submit or add credentialing details on step 2."
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

              <label className="lg:col-span-1">
                <FieldLabel required>Subspecialty</FieldLabel>
                <select
                  name="specialty"
                  defaultValue={defaultSpecialty}
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
                <FieldLabel required>When could you start?</FieldLabel>
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

              <label className="lg:col-span-2">
                <FieldLabel>Call, cath lab & clinical boundaries</FieldLabel>
                <p className="mt-1 text-xs text-slate-600">
                  Optional but helpful—e.g. no solo STEMI, max consult census, weekends-only EP lab, telemonitoring limits.
                </p>
                <textarea
                  name="clinicalNotes"
                  rows={3}
                  maxLength={2000}
                  placeholder="Share non-negotiables so we do not waste your time…"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
                />
              </label>
            </FormSection>

            <FormSection title="Preferred states" description="Tap quick-add markets or search the full list below.">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex flex-wrap gap-2">
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
                {selectedStates.size > 0 ? (
                  <p className="text-xs font-semibold text-brand-900">
                    Selected ({selectedStates.size}):{" "}
                    <span className="font-normal text-slate-800">
                      {[...selectedStates].sort((a, b) => a.localeCompare(b)).join(", ")}
                    </span>
                  </p>
                ) : null}
                {!isSidebar ? (
                  <div>
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-800">Search all states</span>
                      <input
                        type="search"
                        value={stateQuery}
                        onChange={(e) => setStateQuery(e.target.value)}
                        placeholder="Type to filter"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
                      />
                    </label>
                    <div className="mt-3 max-h-40 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-inner">
                      <ul className="grid gap-1 sm:grid-cols-2">
                        {filteredStates.map((s) => (
                          <li key={s}>
                            <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-800 hover:bg-slate-50">
                              <input
                                type="checkbox"
                                checked={selectedStates.has(s)}
                                onChange={() => toggleState(s)}
                                className="size-4 rounded border-slate-300 accent-brand-600"
                              />
                              <span>{s}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            </FormSection>
          </>
        ) : (
          <>
            <FormSection title="Step 2 — Experience & preferences">
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

              <div className="lg:col-span-1">
                <FieldLabel required>Travel interest</FieldLabel>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(
                    [
                      { v: "yes", label: "Yes" },
                      { v: "no", label: "No" },
                      { v: "maybe", label: "Maybe" },
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

              {isSidebar ? (
                <div className="lg:col-span-2 space-y-3">
                  <FieldLabel required>Preferred states</FieldLabel>
                  <div className="max-h-44 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2">
                    <ul className="grid gap-1">
                      {US_STATES.map((s) => (
                        <li key={s}>
                          <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm">
                            <input
                              type="checkbox"
                              checked={selectedStates.has(s)}
                              onChange={() => toggleState(s)}
                              className="size-4 accent-brand-600"
                            />
                            {s}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </FormSection>

            <FormSection title="Communication preferences">
              <label className="lg:col-span-2 flex cursor-pointer items-start gap-3 rounded-xl border border-brand-200 bg-brand-50/40 p-4 text-sm text-slate-700 shadow-sm">
                <input name="smsOptIn" type="checkbox" className="mt-1 size-4 accent-brand-600" />
                <span>
                  <span className="font-semibold text-slate-900">Text me about time-sensitive cardiology openings</span>
                  <span className="mt-1 block text-xs text-slate-600">
                    Ideal for EP or interventional travelers—message/data rates may apply. Reply STOP to opt out.
                  </span>
                </span>
              </label>

              <label className="lg:col-span-2 flex cursor-pointer items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/50 p-4 text-sm text-slate-700 shadow-sm">
                <input name="leadMagnet" type="checkbox" className="mt-1 size-4 accent-brand-600" defaultChecked />
                <span>
                  <span className="font-semibold text-slate-900">Email me “The Physician’s Guide to Locum Tenens”</span>
                  <span className="mt-1 block text-xs text-slate-600">
                    Sent to the email from step 1—check spam if it does not arrive within a few minutes.
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
          </>
        )}

        {status === "error" && error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">{error}</div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6">
          {step === 1 ? (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button type="submit" size="md" className="w-full sm:w-auto">
                  Continue to step 2
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto"
                  disabled={status === "submitting"}
                  onClick={onQuickSubmit}
                >
                  {status === "submitting" ? "Submitting…" : "Quick submit (step 1 only)"}
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                Quick submit skips experience and travel details—we will confirm on our first call. Step 2 is recommended
                for faster matching.
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="button" variant="ghost" size="md" className="w-full sm:w-auto" onClick={() => setStep(1)}>
                  ← Back
                </Button>
                <Button type="submit" disabled={status === "submitting"} size="md" className="w-full sm:w-auto">
                  {status === "submitting" ? "Submitting…" : "Submit inquiry"}
                </Button>
              </div>
            </>
          )}
          <p className="text-xs leading-relaxed text-slate-500">
            By submitting, you agree we may contact you about opportunities. This is not an employment offer. Need help?{" "}
            <a className="font-semibold text-brand-700 hover:underline" href={`mailto:${SITE.email}`}>
              Email us
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
