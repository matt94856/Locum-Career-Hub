"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { FEATURED_STATES, US_STATES } from "@/lib/states";
import { Button } from "@/components/ui/Button";
import { LeadFormAltActions } from "@/components/forms/LeadFormAltActions";
import { RecaptchaField, type RecaptchaFieldHandle } from "@/components/forms/RecaptchaField";
import { trackGenerateLead, trackEvent } from "@/lib/analytics-events";
import { readLeadAttribution } from "@/lib/attribution";
import {
  CAREER_STAGES,
  isCareerStageId,
  screensForSpecialty,
  type CareerStageId,
} from "@/lib/lead-lattice";
import { CTA, SITE } from "@/lib/site";
import { FORM_CHIPS, FORM_EYEBROW, FORM_SUBTITLE, FORM_TITLE } from "@/lib/marketing-copy";

const recaptchaSiteConfigured = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

function normalizeFormSpecialty(value: string): string {
  if ((CARDIOLOGY_SUBSPECIALTIES as readonly string[]).includes(value)) return value;
  if (/imaging/i.test(value)) return "Advanced Imaging";
  if (/interventional/i.test(value)) return "Interventional Cardiology";
  if (/electro/i.test(value)) return "Electrophysiology";
  if (/heart failure|hf/i.test(value)) return "Heart Failure";
  if (/pediatric/i.test(value)) return "Pediatric Cardiology";
  if (/preventive/i.test(value)) return "Preventive Cardiology";
  if (/structural/i.test(value)) return "Structural Heart";
  return "General Cardiology";
}

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
    <fieldset className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
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
  defaultCareerStage?: CareerStageId;
  layout?: "full" | "sidebar";
  className?: string;
};

export function LeadCaptureForm({
  id = "lead-form",
  title = FORM_TITLE,
  subtitle = FORM_SUBTITLE,
  defaultSpecialty = "General Cardiology",
  defaultPreferredStates = [],
  defaultCareerStage,
  layout = "full",
  className = "",
}: LeadCaptureFormProps) {
  const router = useRouter();
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
  const startedRef = useRef(false);
  const [specialty, setSpecialty] = useState(() => normalizeFormSpecialty(defaultSpecialty));
  const [careerStage, setCareerStage] = useState(defaultCareerStage ?? "");

  useEffect(() => {
    readLeadAttribution();
    trackEvent("lead_form_view", { form_layout: layout, page_path: window.location.pathname });
  }, [layout]);

  const specialtyOptions = useMemo(() => [...CARDIOLOGY_SUBSPECIALTIES], []);
  const screeningQuestions = useMemo(() => screensForSpecialty(specialty), [specialty]);

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

  function markFormStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("form_start", { form_layout: layout, page_path: window.location.pathname });
  }

  function readPayload(form: HTMLFormElement, formMode: "quick" | "full") {
    const fd = new FormData(form);
    const preferredStates = [...selectedStates].sort((a, b) => a.localeCompare(b));

    return {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      specialty: String(fd.get("specialty") ?? "").trim() || specialty,
      careerStage: String(fd.get("careerStage") ?? "").trim() || careerStage,
      qualificationResponses: Object.fromEntries(
        screeningQuestions
          .map((question) => [question.id, String(fd.get(`screening_${question.id}`) ?? "").trim()])
          .filter(([, value]) => Boolean(value)),
      ),
      preferredStates,
      yearsExperience:
        String(fd.get("yearsExperience") ?? "").trim() ||
        (formMode === "quick" ? "Not provided (quick submit)" : ""),
      availability: String(fd.get("availability") ?? "").trim() || "Exploring / no firm date",
      travel: String(fd.get("travel") ?? "").trim() || (formMode === "quick" ? "maybe" : ""),
      clinicalNotes: String(fd.get("clinicalNotes") ?? "").trim() || null,
      smsOptIn: fd.get("smsOptIn") === "on",
      leadMagnet: fd.get("leadMagnet") === "on",
      formMode,
      pagePath: typeof window !== "undefined" ? window.location.pathname : "",
      attribution: readLeadAttribution(),
      recaptchaToken: recaptchaSiteConfigured ? (recaptchaRef.current?.getToken() ?? "") : "",
      faxLine: String(fd.get("faxLine") ?? "").trim(),
    };
  }

  function validatePayload(payload: ReturnType<typeof readPayload>): string | null {
    if (!payload.firstName || !payload.lastName || !payload.email || !payload.phone) {
      return "Please complete your name, email, and phone so we can respond.";
    }
    if (!payload.specialty) {
      return "Select your cardiology subspecialty.";
    }
    if (!payload.careerStage || !isCareerStageId(payload.careerStage)) {
      return "Select the career stage that best matches how you want to work.";
    }
    return null;
  }

  async function ensureCaptchaToken(payload: ReturnType<typeof readPayload>): Promise<string | null> {
    if (!recaptchaSiteConfigured) return null;
    if (!captchaReady || captchaLoadError) {
      return captchaLoadError
        ? "Security verification could not load. Please refresh the page or try again later."
        : "Security verification is still loading—please wait a moment and try again.";
    }
    if (!payload.recaptchaToken.trim()) {
      return "Please complete the security verification before submitting.";
    }
    return null;
  }

  async function submitForm() {
    const form = formRef.current;
    if (!form) return;

    setStatus("submitting");
    setError(null);

    const fd = new FormData(form);
    const hasExperience = Boolean(String(fd.get("yearsExperience") ?? "").trim());
    const hasTravel = Boolean(String(fd.get("travel") ?? "").trim());
    const formMode: "quick" | "full" = hasExperience && hasTravel ? "full" : "quick";

    const payload = readPayload(form, formMode);
    const validationError = validatePayload(payload);
    if (validationError) {
      setStatus("error");
      setError(validationError);
      return;
    }

    const captchaError = await ensureCaptchaToken(payload);
    if (captchaError) {
      setStatus("error");
      setError(captchaError);
      return;
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
        recaptchaRef.current?.reset();
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

      trackGenerateLead(payload.pagePath || "inquiry_form", {
        specialty: payload.specialty,
        career_stage: payload.careerStage,
      });
      trackEvent("form_submit", {
        form_mode: formMode,
        form_step: 1,
        specialty: payload.specialty,
        career_stage: payload.careerStage,
      });
      window.sessionStorage.setItem("lch_lead_submitted", "1");

      const params = new URLSearchParams();
      params.set("specialty", payload.specialty);
      params.set("stage", payload.careerStage);
      if (payload.preferredStates.length) params.set("states", payload.preferredStates.join("|"));
      if (payload.pagePath) params.set("from", payload.pagePath.slice(0, 200));

      router.push(`/thank-you?${params.toString()}`);
    } catch {
      recaptchaRef.current?.reset();
      setStatus("error");
      setError("Something went wrong. Please call us or try again in a moment.");
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void submitForm();
  }

  const isSidebar = layout === "sidebar";

  return (
    <div
      id={id}
      className={`scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card sm:rounded-3xl ${isSidebar ? "" : "w-full"} ${className}`.trim()}
    >
      <div className={`relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-brand-900 px-6 py-7 text-white sm:px-8 sm:py-8 ${isSidebar ? "max-w-2xl" : ""}`}>
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-400/25 blur-3xl" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-200">{FORM_EYEBROW}</p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-[15px]">{subtitle}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {FORM_CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold text-brand-100"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <div className={isSidebar ? "max-w-2xl" : ""}>
          <LeadFormAltActions source={isSidebar ? "sidebar" : "full"} compact={isSidebar} />
        </div>

        <form
          ref={formRef}
          className="relative mt-8 flex flex-col gap-8 lg:gap-10"
          onSubmit={onSubmit}
          onFocusCapture={markFormStart}
        >
        <input
          type="text"
          name="faxLine"
          tabIndex={-1}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-hidden="true"
          data-lpignore="true"
          data-1p-ignore="true"
          data-bwignore="true"
          data-form-type="other"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        <FormSection title="How to reach you" description="Name, contact, and how you like to work. States and dates can wait.">
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
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
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
              <FieldLabel required>Career stage</FieldLabel>
              <select
                name="careerStage"
                value={careerStage}
                onChange={(e) => setCareerStage(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
              >
                <option value="" disabled>
                  How do you want to work?
                </option>
                {CAREER_STAGES.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="lg:col-span-2">
              <FieldLabel>Call, cath lab and clinical boundaries</FieldLabel>
              <p className="mt-1 text-xs text-slate-600">
                Optional but helpful—e.g. no solo STEMI, max consult census, weekends-only EP lab.
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

        <details className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 sm:p-6">
          <summary className="cursor-pointer font-display text-sm font-semibold text-slate-950">
            Add preferred states and timeline (optional)
          </summary>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Skip this if you are exploring. We can still follow up from contact details alone.
          </p>
          <div className="mt-6 flex flex-col gap-8">
            {screeningQuestions.length > 0 ? (
              <FormSection
                title="Assignment fit"
                description="Optional—keeps the wrong cath lab or clinic off your list."
              >
                {screeningQuestions.map((question) => (
                  <label key={question.id} className="lg:col-span-1">
                    <FieldLabel>{question.label}</FieldLabel>
                    <select
                      name={`screening_${question.id}`}
                      defaultValue=""
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
                    >
                      <option value="">Skip for now</option>
                      {question.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </FormSection>
            ) : null}
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
              </div>
            </FormSection>

            <FormSection title="Timeline and preferences">
              <label className="lg:col-span-1">
                <FieldLabel>When could you start?</FieldLabel>
                <select
                  name="availability"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
                  defaultValue="Exploring / no firm date"
                >
                  {availabilityOptions.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </label>
              <label className="lg:col-span-1">
                <FieldLabel>Years of experience</FieldLabel>
                <select
                  name="yearsExperience"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
                  defaultValue=""
                >
                  <option value="">Skip for now</option>
                  {experienceOptions.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </label>
              <div className="lg:col-span-2">
                <FieldLabel>Travel interest</FieldLabel>
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
                      <input type="radio" name="travel" value={o.v} className="accent-brand-600" />
                      {o.label}
                    </label>
                  ))}
                </div>
              </div>
            </FormSection>
          </div>
        </details>

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

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-brand-200 bg-brand-50/40 p-4 text-sm text-slate-700 shadow-sm">
          <input name="smsOptIn" type="checkbox" className="mt-1 size-4 accent-brand-600" />
          <span>
            <span className="font-semibold text-slate-900">Text me about time-sensitive cardiology openings</span>
            <span className="mt-1 block text-xs text-slate-600">
              Message/data rates may apply. Reply STOP to opt out.
            </span>
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/50 p-4 text-sm text-slate-700 shadow-sm">
          <input name="leadMagnet" type="checkbox" className="mt-1 size-4 accent-brand-600" defaultChecked />
          <span>
            <span className="font-semibold text-slate-900">Email me “The Physician’s Guide to Locum Tenens”</span>
            <span className="mt-1 block text-xs text-slate-600">Sent to the email above.</span>
          </span>
        </label>

        {status === "error" && error ? (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            {error}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6">
          <Button type="submit" disabled={status === "submitting"} size="md" className="w-full sm:w-auto">
            {status === "submitting" ? "Submitting…" : CTA.requestMatches}
          </Button>
          <p className="text-xs text-slate-500">
            One form. We reply with realistic matches—or a plain no if nothing fits.
          </p>
          <p className="text-xs leading-relaxed text-slate-500">
            By submitting, you agree we may contact you about opportunities. This is not an employment offer. See our{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/privacy">
              Privacy Policy
            </Link>
            . Need help?{" "}
            <a className="font-semibold text-brand-700 hover:underline" href={`mailto:${SITE.email}`}>
              Email us
            </a>
            .
          </p>
        </div>
      </form>
      </div>
    </div>
  );
}
