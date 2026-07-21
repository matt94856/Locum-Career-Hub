"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ASSIGNMENT_STYLES,
  AVAILABILITY_OPTIONS,
  calculateLocumsProfile,
  CAREER_GOALS,
  COMPENSATION_OPTIONS,
  EXPERIENCE_LEVELS,
  IMLC_OPTIONS,
  PRACTICE_TYPES,
  SPECIALTIES,
  toLeadSpecialty,
  TRAVEL_OPTIONS,
  type CalculatorAnswers,
} from "@/lib/locums-calculator/model";
import { US_STATES } from "@/lib/states";
import { Button } from "@/components/ui/Button";
import { RecaptchaField, type RecaptchaFieldHandle } from "@/components/forms/RecaptchaField";
import { readLeadAttribution } from "@/lib/attribution";
import { trackCalculatorEvent, trackGenerateLead } from "@/lib/analytics-events";
import { SITE } from "@/lib/site";

const recaptchaSiteConfigured = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
const NON_IMLC_STATES = new Set([
  "California",
  "Connecticut",
  "District of Columbia",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Nevada",
  "New Jersey",
  "New York",
  "Oregon",
  "Rhode Island",
  "Vermont",
]);

const STEP_LABELS = [
  "Specialty",
  "Experience",
  "Practice",
  "Availability",
  "Assignment",
  "Licenses",
  "IMLC",
  "Travel",
  "Compensation",
  "Goal",
] as const;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function OptionButton({ selected, children, onClick }: { selected: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`min-h-14 w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
        selected
          ? "border-brand-500 bg-brand-50 text-brand-950"
          : "border-slate-200 bg-white text-slate-800 hover:border-brand-200 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

function isComplete(answers: Partial<CalculatorAnswers>): answers is CalculatorAnswers {
  return Boolean(
    answers.specialty &&
      answers.experience &&
      answers.practiceType &&
      answers.availability &&
      answers.assignmentStyle &&
      answers.licenses &&
      answers.imlcStatus &&
      answers.travelPreference &&
      answers.currentCompensation &&
      answers.careerGoal,
  );
}

export function CardiologistLocumsCalculator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<CalculatorAnswers>>({ licenses: [] });
  const [licensesTouched, setLicensesTouched] = useState(false);
  const [stateQuery, setStateQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [reportUnlocked, setReportUnlocked] = useState(false);
  const [leadStatus, setLeadStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [leadError, setLeadError] = useState("");
  const [captchaReady, setCaptchaReady] = useState(!recaptchaSiteConfigured);
  const captchaRef = useRef<RecaptchaFieldHandle>(null);
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);

  const result = useMemo(() => (isComplete(answers) ? calculateLocumsProfile(answers) : null), [answers]);
  const filteredStates = useMemo(() => {
    const query = stateQuery.trim().toLowerCase();
    return query ? US_STATES.filter((state) => state.toLowerCase().includes(query)) : US_STATES;
  }, [stateQuery]);

  useEffect(() => {
    if (showResults && !reportUnlocked) trackCalculatorEvent("report_gate_view");
  }, [reportUnlocked, showResults]);

  useEffect(() => {
    if (!showResults) questionHeadingRef.current?.focus();
  }, [showResults, step]);

  const setAnswer = <K extends keyof CalculatorAnswers>(key: K, value: CalculatorAnswers[K]) => {
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  const currentAnswered =
    step === 0 ? Boolean(answers.specialty) :
    step === 1 ? Boolean(answers.experience) :
    step === 2 ? Boolean(answers.practiceType) :
    step === 3 ? Boolean(answers.availability) :
    step === 4 ? Boolean(answers.assignmentStyle) :
    step === 5 ? licensesTouched :
    step === 6 ? Boolean(answers.imlcStatus) :
    step === 7 ? Boolean(answers.travelPreference) :
    step === 8 ? Boolean(answers.currentCompensation) :
    Boolean(answers.careerGoal);

  function nextStep() {
    if (!currentAnswered) return;
    trackCalculatorEvent(step === 0 ? "start" : "step_complete", { step: step + 1, step_name: STEP_LABELS[step] });
    if (step === STEP_LABELS.length - 1) {
      setShowResults(true);
      trackCalculatorEvent("results_view", { specialty: answers.specialty ?? "", availability: answers.availability ?? "" });
      return;
    }
    setStep((value) => value + 1);
  }

  function toggleLicense(state: string) {
    setLicensesTouched(true);
    const selected = new Set(answers.licenses ?? []);
    if (selected.has(state)) selected.delete(state);
    else selected.add(state);
    setAnswer("licenses", [...selected].sort((a, b) => a.localeCompare(b)));
  }

  async function submitReport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result || !isComplete(answers)) return;
    const form = new FormData(event.currentTarget);
    const firstName = String(form.get("firstName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const homeState = String(form.get("homeState") ?? "").trim();
    if (!firstName || !lastName || !email || !phone || !homeState) {
      setLeadStatus("error");
      setLeadError("Complete your name, email, phone, and home or practice state.");
      return;
    }
    if (recaptchaSiteConfigured && (!captchaReady || !captchaRef.current?.getToken())) {
      setLeadStatus("error");
      setLeadError("Complete the security verification before sending your report.");
      return;
    }

    setLeadStatus("submitting");
    setLeadError("");
    const preferredStates = answers.licenses.length ? answers.licenses : [homeState];
    const calculatorProfile = { answers, result, benchmarkEffectiveDate: "2026-07-21" };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          homeState,
          specialty: toLeadSpecialty(answers.specialty),
          preferredStates,
          yearsExperience: answers.experience,
          availability: answers.availability,
          travel: answers.travelPreference,
          clinicalNotes: `Preferred assignment style: ${answers.assignmentStyle}. Primary goal: ${answers.careerGoal}.`,
          formMode: "full",
          source: "cardiologist_locums_calculator",
          pagePath: window.location.pathname,
          attribution: readLeadAttribution(),
          calculatorProfile,
          recaptchaToken: recaptchaSiteConfigured ? (captchaRef.current?.getToken() ?? "") : "",
        }),
      });
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) throw new Error(data?.error || "We could not send your report. Please try again.");
      setReportUnlocked(true);
      setLeadStatus("idle");
      trackGenerateLead("cardiologist_locums_calculator");
      trackCalculatorEvent("lead_success", { specialty: answers.specialty, fit_score: result.fitScore });
    } catch (error) {
      setLeadStatus("error");
      setLeadError(error instanceof Error ? error.message : "We could not send your report. Please try again.");
      trackCalculatorEvent("lead_error");
    }
  }

  async function shareReport() {
    if (!result || !isComplete(answers)) return;
    const text = `My ${answers.specialty} locums profile: ${result.fitScore}/100 fit score and ${formatCurrency(result.annualLow)}–${formatCurrency(result.annualHigh)} estimated annual earning potential.`;
    if (navigator.share) await navigator.share({ title: "My Cardiologist Locums Profile", text, url: window.location.href });
    else await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    trackCalculatorEvent("share");
  }

  function renderQuestion() {
    if (step === 0) return <OptionGrid options={SPECIALTIES} value={answers.specialty} onSelect={(value) => setAnswer("specialty", value)} />;
    if (step === 1) return <OptionGrid options={EXPERIENCE_LEVELS} value={answers.experience} onSelect={(value) => setAnswer("experience", value)} />;
    if (step === 2) return <OptionGrid options={PRACTICE_TYPES} value={answers.practiceType} onSelect={(value) => setAnswer("practiceType", value)} />;
    if (step === 3) return <OptionGrid options={AVAILABILITY_OPTIONS} value={answers.availability} onSelect={(value) => setAnswer("availability", value)} />;
    if (step === 4) return <OptionGrid options={ASSIGNMENT_STYLES} value={answers.assignmentStyle} onSelect={(value) => setAnswer("assignmentStyle", value)} />;
    if (step === 5) {
      return (
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-800">{answers.licenses?.length ?? 0} selected</span>
            <button type="button" className="font-semibold text-brand-700 hover:underline" onClick={() => { setAnswer("licenses", []); setLicensesTouched(true); }}>
              I have no active state licenses
            </button>
          </div>
          <input
            type="search"
            value={stateQuery}
            onChange={(event) => setStateQuery(event.target.value)}
            placeholder="Search states"
            aria-label="Search state licenses"
            className="mb-4 min-h-12 w-full rounded-xl border border-slate-200 px-4 text-sm focus:border-brand-400 focus:outline-none"
          />
          <div className="max-h-80 overflow-y-auto rounded-2xl border border-slate-200 p-2">
            <div className="grid gap-2 sm:grid-cols-2">
              {filteredStates.map((state) => (
                <label key={state} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-50">
                  <input type="checkbox" checked={answers.licenses?.includes(state) ?? false} onChange={() => toggleLicense(state)} className="size-4 accent-brand-600" />
                  <span className="min-w-0 flex-1 text-sm font-medium text-slate-800">{state}</span>
                  {!NON_IMLC_STATES.has(state) ? <span className="text-[10px] font-semibold text-brand-700">IMLC</span> : null}
                </label>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">IMLC labels are planning context only. The compact is an expedited pathway to separate state licenses, not one multistate license.</p>
        </div>
      );
    }
    if (step === 6) return <OptionGrid options={IMLC_OPTIONS} value={answers.imlcStatus} onSelect={(value) => setAnswer("imlcStatus", value)} />;
    if (step === 7) return <OptionGrid options={TRAVEL_OPTIONS} value={answers.travelPreference} onSelect={(value) => setAnswer("travelPreference", value)} />;
    if (step === 8) return <OptionGrid options={COMPENSATION_OPTIONS} value={answers.currentCompensation} onSelect={(value) => setAnswer("currentCompensation", value)} />;
    return <OptionGrid options={CAREER_GOALS} value={answers.careerGoal} onSelect={(value) => setAnswer("careerGoal", value)} />;
  }

  const prompts = [
    ["What is your cardiology specialty?", "This anchors the demand index and benchmark range."],
    ["How much experience do you have?", "Experience affects assignment fit and credentialing confidence."],
    ["What is your current practice type?", "We use this to personalize your career comparison."],
    ["How much time would you realistically dedicate to locums?", "Choose the schedule you could sustain—not an idealized maximum."],
    ["Which assignment style fits you best?", "This changes the likely coverage model and compensation mix."],
    ["Where do you currently hold active licenses?", "Select every active full state license. Fellows may continue with none selected."],
    ["Have you used or qualified through the IMLC pathway?", "This does not replace individual state licenses."],
    ["How far would you consider traveling?", "Geographic flexibility affects access to assignments and premiums."],
    ["What is your current annual compensation range?", "Optional for the career comparison. Prefer not to answer is always available."],
    ["What matters most right now?", "Your report will lead with the outcome you care about."],
  ];

  if (showResults && result && isComplete(answers)) {
    return (
      <div className="space-y-8" aria-live="polite">
        <div className="rounded-3xl border border-brand-100 bg-white p-5 shadow-card sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Your locums opportunity profile</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-slate-950">{result.fitScore}/100 Locums Fit Score</h2>
              <p className="mt-2 text-slate-600">{result.fitScore >= 85 ? "You are highly marketable for cardiology locums opportunities." : result.fitScore >= 70 ? "Your profile aligns with many common cardiology coverage models." : "Your profile has a practical path to locums with targeted planning."}</p>
            </div>
            <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white">
              <p className="text-xs uppercase tracking-wider text-slate-300">Demand index</p>
              <p className="mt-1 font-display text-3xl font-semibold">{result.demandScore}/100</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-brand-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-800">Estimated additional income</p>
              <p className="mt-2 font-display text-3xl font-semibold text-slate-950">{formatCurrency(result.annualLow)}–{formatCurrency(result.annualHigh)}</p>
              <p className="mt-2 text-xs text-slate-600">Annual gross range based on {answers.availability.toLowerCase()}.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Weekly benchmark</p>
              <p className="mt-2 font-display text-3xl font-semibold text-slate-950">{formatCurrency(result.weeklyLow)}–{formatCurrency(result.weeklyHigh)}</p>
              <p className="mt-2 text-xs text-slate-600">Directional gross range; not a quote or guaranteed offer.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="font-semibold text-slate-950">Your biggest advantages</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {result.advantages.slice(0, 2).map((item) => <li key={item}>✓ {item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-950">A likely match</h3>
              <p className="mt-3 text-sm text-slate-700">{result.matchedOpportunities[0]}</p>
              <p className="mt-2 text-xs text-slate-500">Unlock the complete report for all matches, opportunity unlocks, and career comparison.</p>
            </div>
          </div>
        </div>

        {!reportUnlocked ? (
          <form onSubmit={submitReport} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Your personalized report is ready</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-slate-950">Where should we send your Cardiologist Locums Report?</h2>
            <p className="mt-3 text-sm text-slate-600">You already received the core estimate. These details unlock the full report and let a cardiology specialist follow up only when relevant.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <input aria-label="First name" name="firstName" required placeholder="First name" autoComplete="given-name" className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
              <input aria-label="Last name" name="lastName" required placeholder="Last name" autoComplete="family-name" className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
              <input aria-label="Email" name="email" required type="email" placeholder="Email" autoComplete="email" className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
              <input aria-label="Phone" name="phone" required type="tel" placeholder="Phone" autoComplete="tel" className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
              <select aria-label="Home or primary practice state" name="homeState" required defaultValue="" className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm sm:col-span-2">
                <option value="" disabled>Home or primary practice state</option>
                {US_STATES.map((state) => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
            {recaptchaSiteConfigured ? <div className="mt-5"><RecaptchaField ref={captchaRef} onReady={() => setCaptchaReady(true)} onLoadError={() => setCaptchaReady(false)} /></div> : null}
            {leadStatus === "error" ? <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{leadError}</p> : null}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={leadStatus === "submitting"}>{leadStatus === "submitting" ? "Sending report…" : "Unlock my full report"}</Button>
              <p className="text-xs text-slate-500">No job-board blast. Your information is used for your report and relevant cardiology follow-up.</p>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 sm:p-8">
              <p className="text-sm font-semibold text-emerald-900">Your report is unlocked. A copy request has been sent to Locum Career Hub.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <ReportList title="All matching opportunity styles" items={result.matchedOpportunities} />
              <ReportList title="Opportunity unlocks" items={result.unlocks.length ? result.unlocks : ["Your current profile is already broadly accessible; keep license and availability details current."]} />
              <ReportList title="Profile strengths" items={result.advantages} />
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8">
              <h2 className="font-display text-3xl font-semibold text-slate-950">Compare your current career vs locums</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Metric label="Current compensation" value={result.currentCompMidpoint ? `~${formatCurrency(result.currentCompMidpoint)}` : "Not provided"} />
                <Metric label="Locums earning potential" value={`${formatCurrency(result.annualLow)}–${formatCurrency(result.annualHigh)}`} />
                <Metric label="Schedule modeled" value={`${result.annualWeeks} weeks/year`} />
              </div>
              <p className="mt-5 text-sm text-slate-600">
                {answers.careerGoal === "Increase income" && result.incomeIncreasePercent
                  ? `The modeled locums midpoint equals about ${result.incomeIncreasePercent}% of your current compensation benchmark in additional gross income.`
                  : answers.careerGoal === "Retirement bridge"
                    ? "Your schedule is best evaluated as a retirement bridge: clinical continuity with defined blocks rather than maximum annual utilization."
                    : answers.careerGoal === "Reduce burnout"
                      ? "Locums is not a treatment for burnout, but defined scope, call, and end dates may create more control. Discuss urgent mental-health concerns with a licensed professional."
                      : "The strongest potential difference is control: assignment scope, travel radius, and availability can be defined before you commit."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button type="button" onClick={() => { trackCalculatorEvent("compare_view"); void shareReport(); }}>Share my profile</Button>
                <Button href={SITE.calendlyUrl || "/contact"} variant="secondary">Discuss my report</Button>
              </div>
            </div>
          </div>
        )}

        <button type="button" className="text-sm font-semibold text-brand-700 hover:underline" onClick={() => { setShowResults(false); setStep(0); }}>
          Recalculate my profile
        </button>
      </div>
    );
  }

  const [prompt, help] = prompts[step];
  const progress = Math.round(((step + 1) / STEP_LABELS.length) * 100);
  const minutesRemaining = Math.max(1, Math.ceil((STEP_LABELS.length - step) * 0.15));

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-card sm:p-8">
      <div className="flex items-center justify-between gap-4 text-xs font-semibold text-slate-500">
        <span>Step {step + 1} of {STEP_LABELS.length}</span>
        <span>About {minutesRemaining} min remaining</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100" aria-label={`${progress}% complete`}>
        <div className="h-full rounded-full bg-brand-600 transition-[width]" style={{ width: `${progress}%` }} />
      </div>
      <div className="mx-auto mt-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{STEP_LABELS[step]}</p>
        <h2 ref={questionHeadingRef} tabIndex={-1} className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 outline-none sm:text-4xl">{prompt}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{help}</p>
        <div className="mt-8">{renderQuestion()}</div>
        <div className="mt-8 flex items-center justify-between gap-4">
          <Button type="button" variant="ghost" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>Back</Button>
          <Button type="button" disabled={!currentAnswered} onClick={nextStep}>{step === STEP_LABELS.length - 1 ? "Calculate my profile" : "Continue"}</Button>
        </div>
      </div>
    </div>
  );
}

function OptionGrid<T extends string>({ options, value, onSelect }: { options: readonly T[]; value?: T; onSelect: (value: T) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => <OptionButton key={option} selected={value === option} onClick={() => onSelect(option)}>{option}</OptionButton>)}
    </div>
  );
}

function ReportList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">
      <h3 className="font-semibold text-slate-950">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
        {items.map((item) => <li key={item}>✓ {item}</li>)}
      </ul>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 font-display text-xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}
