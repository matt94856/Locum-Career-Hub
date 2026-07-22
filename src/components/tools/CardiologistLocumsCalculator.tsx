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
import { DistributionStrip } from "@/components/share/DistributionStrip";
import { PdfEmailGate } from "@/components/share/PdfEmailGate";
import { ShareResultCard } from "@/components/share/ShareResultCard";
import { ViralShareKit } from "@/components/share/ViralShareKit";
import { trackCalculatorEvent, trackGenerateLead } from "@/lib/analytics-events";
import {
  buildResultShareLandingUrl,
  calculatorLinkedInPost,
  formatUsdRange,
} from "@/lib/share";
import { SITE } from "@/lib/site";

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
  const [pdfUnlocked, setPdfUnlocked] = useState(false);
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);

  const result = useMemo(() => (isComplete(answers) ? calculateLocumsProfile(answers) : null), [answers]);
  const filteredStates = useMemo(() => {
    const query = stateQuery.trim().toLowerCase();
    return query ? US_STATES.filter((state) => state.toLowerCase().includes(query)) : US_STATES;
  }, [stateQuery]);

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
    const weeklyLabel = `${formatUsdRange(result.weeklyLow, result.weeklyHigh)}/wk`;
    const shareUrl = buildResultShareLandingUrl({
      kind: "calc",
      title: `${answers.specialty} locums profile`,
      stat: weeklyLabel,
      subtitle: `Fit ${result.fitScore}/100 · ${formatUsdRange(result.annualLow, result.annualHigh)} annual directional`,
      path: "/cardiologist-locums-calculator",
    });
    const linkedInPost = calculatorLinkedInPost({
      specialty: answers.specialty,
      weeklyLow: result.weeklyLow,
      weeklyHigh: result.weeklyHigh,
      fitScore: result.fitScore,
      shareUrl,
    });

    return (
      <div className="space-y-8" aria-live="polite">
        <ShareResultCard
          eyebrow="Cardiologist locums earnings"
          title={`${answers.specialty} · ${answers.availability}`}
          headlineStat={weeklyLabel}
          headlineLabel="Directional weekly gross"
          metrics={[
            { label: "Annual range", value: formatUsdRange(result.annualLow, result.annualHigh) },
            { label: "Fit score", value: `${result.fitScore}/100` },
            { label: "Demand index", value: `${result.demandScore}/100` },
          ]}
          footerNote="Screenshot this card. Educational market-intelligence estimate — not a quote or guaranteed offer."
        />

        <ViralShareKit
          payload={{
            title: "My Cardiologist Locums Profile",
            text: `My ${answers.specialty} locums profile: ${weeklyLabel} directional weekly range, ${result.fitScore}/100 fit.`,
            url: shareUrl,
            headlineStat: weeklyLabel,
            toolId: "cardiologist_locums_calculator",
          }}
          linkedInPost={linkedInPost}
        />

        <div className="rounded-3xl border border-brand-100 bg-white p-5 shadow-card sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Full result — ungated</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-slate-950">{result.fitScore}/100 Locums Fit Score</h2>
          <p className="mt-2 text-slate-600">
            {result.fitScore >= 85
              ? "You are highly marketable for cardiology locums opportunities."
              : result.fitScore >= 70
                ? "Your profile aligns with many common cardiology coverage models."
                : "Your profile has a practical path to locums with targeted planning."}
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="font-semibold text-slate-950">Your biggest advantages</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {result.advantages.map((item) => <li key={item}>✓ {item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-950">Matching opportunity styles</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {result.matchedOpportunities.map((item) => <li key={item}>✓ {item}</li>)}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-950">Compare current career vs locums</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Metric label="Current compensation" value={result.currentCompMidpoint ? `~${formatCurrency(result.currentCompMidpoint)}` : "Not provided"} />
              <Metric label="Locums earning potential" value={formatUsdRange(result.annualLow, result.annualHigh)} />
              <Metric label="Schedule modeled" value={`${result.annualWeeks} weeks/year`} />
            </div>
            <p className="mt-4 text-sm text-slate-600">
              {answers.careerGoal === "Increase income" && result.incomeIncreasePercent
                ? `The modeled locums midpoint equals about ${result.incomeIncreasePercent}% of your current compensation benchmark in additional gross income.`
                : answers.careerGoal === "Retirement bridge"
                  ? "Your schedule is best evaluated as a retirement bridge: clinical continuity with defined blocks rather than maximum annual utilization."
                  : answers.careerGoal === "Reduce burnout"
                    ? "Locums is not a treatment for burnout, but defined scope, call, and end dates may create more control."
                    : "The strongest potential difference is control: assignment scope, travel radius, and availability can be defined before you commit."}
            </p>
            {result.unlocks.length ? (
              <div className="mt-5">
                <h4 className="text-sm font-semibold text-slate-900">Opportunity unlocks</h4>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {result.unlocks.map((item) => <li key={item}>✓ {item}</li>)}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 print:hidden">
            <Button href={SITE.calendlyUrl || "/contact"}>Discuss my profile</Button>
            <Button href="/cardiologist-locums-pay-survey" variant="secondary">Contribute anonymous pay data</Button>
          </div>
        </div>

        <PdfEmailGate
          source="cardiologist_locums_calculator_pdf"
          specialty={toLeadSpecialty(answers.specialty)}
          preferredStates={answers.licenses.length ? answers.licenses : ["Florida"]}
          availability={answers.availability}
          profile={{ answers, result, benchmarkEffectiveDate: "2026-07-21" }}
          onUnlocked={() => {
            setPdfUnlocked(true);
            trackGenerateLead("cardiologist_locums_calculator_pdf");
            trackCalculatorEvent("lead_success", { specialty: answers.specialty, fit_score: result.fitScore });
          }}
        />

        <DistributionStrip
          shareUrl={shareUrl}
          hook={`this ${answers.specialty} locums earnings model (${weeklyLabel} directional weekly)`}
          toolId="cardiologist_locums_calculator"
          creatorPitch={`Hi — we built a free cardiologist locums earnings calculator with screenshot-ready weekly ranges and fit scores. Happy to walk your audience or fellowship cohort through a live demo (no job-board spam). Try it: ${SITE.url}/cardiologist-locums-calculator`}
        />

        <button type="button" className="text-sm font-semibold text-brand-700 hover:underline print:hidden" onClick={() => { setShowResults(false); setStep(0); setPdfUnlocked(false); }}>
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 font-display text-xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}
