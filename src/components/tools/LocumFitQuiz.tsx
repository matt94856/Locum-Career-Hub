"use client";

import { useEffect, useState } from "react";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { trackDecisionToolEvent } from "@/lib/analytics-events";
import {
  isQuizComplete,
  LOCUM_FIT_QUESTIONS,
  LOCUM_FIT_QUIZ_TOOL_ID,
  scoreLocumFitQuiz,
  type LocumFitResult,
} from "@/lib/locum-fit-quiz/model";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LocumFitQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<LocumFitResult | null>(null);
  const question = LOCUM_FIT_QUESTIONS[step];
  const total = LOCUM_FIT_QUESTIONS.length;
  const remainingMin = Math.max(1, Math.ceil(((total - step) * 12) / 60));

  useEffect(() => {
    trackDecisionToolEvent(LOCUM_FIT_QUIZ_TOOL_ID, "start");
  }, []);

  function pick(optionId: string) {
    if (!question) return;
    const nextAnswers = { ...answers, [question.id]: optionId };
    setAnswers(nextAnswers);
    trackDecisionToolEvent(LOCUM_FIT_QUIZ_TOOL_ID, "step_complete", { step: question.id });

    const advance = () => {
      if (step < total - 1) {
        setStep(step + 1);
        return;
      }
      if (!isQuizComplete(nextAnswers)) return;
      const scored = scoreLocumFitQuiz(nextAnswers);
      setResult(scored);
      trackDecisionToolEvent(LOCUM_FIT_QUIZ_TOOL_ID, "result", {
        band: scored.band,
        percent: scored.percent,
        specialty: scored.specialty,
      });
    };

    window.setTimeout(advance, prefersReducedMotion() ? 0 : 160);
  }

  if (result) {
    return (
      <div className="space-y-8">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-950 px-6 py-8 text-white sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">Your 2-minute result</p>
            <p className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{result.title}</p>
            <p className="mt-4 text-lg font-semibold text-brand-200">{result.likelihood}</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{result.summary}</p>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-brand-400" style={{ width: `${result.percent}%` }} />
            </div>
          </div>
          <div className="grid gap-6 px-6 py-7 sm:px-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-semibold text-slate-950">Why this mix points to locums</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5">
                {result.reasons.map((reason) => (
                  <li key={reason} className="text-sm leading-6 text-slate-600">
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-slate-950">Why cardiologists leave employed jobs</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5">
                {result.whyLocums.map((reason) => (
                  <li key={reason} className="text-sm leading-6 text-slate-600">
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 px-6 py-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Keep this honest</p>
            <ul className="mt-3 space-y-2">
              {result.caveats.map((caveat) => (
                <li key={caveat} className="text-sm leading-6 text-slate-600">
                  {caveat}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-5 text-sm font-semibold text-brand-700 hover:underline"
              onClick={() => {
                setResult(null);
                setStep(0);
                setAnswers({});
              }}
            >
              Retake the quiz
            </button>
          </div>
        </section>

        <section id="get-matched" className="scroll-mt-24">
          <div className="mb-5 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Next step</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950 sm:text-3xl">
              See locums positions that match this mix
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Tell us how to reach you. We will only send {result.specialty.toLowerCase()} blocks that respect the
              calendar and scope you just described — not a blast of every open job.
            </p>
          </div>
          <LeadCaptureForm
            id="locum-fit-lead"
            key={`${result.specialty}-${result.careerStage}`}
            title="Get matching locums dates"
            subtitle="Name, email, phone, and specialty. We use the quiz notes so the first conversation is not a fishing expedition."
            defaultSpecialty={result.specialty}
            defaultCareerStage={result.careerStage}
            defaultAvailability={result.availability}
            defaultTravel={result.travelInterest}
            defaultClinicalNotes={result.notes}
          />
        </section>
      </div>
    );
  }

  if (!question) return null;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Question {step + 1} of {total}
        </p>
        <p className="text-xs font-semibold text-slate-500">About {remainingMin} min left</p>
      </div>
      <div className="h-1.5 bg-slate-100">
        <div
          className="h-full bg-brand-600 transition-[width] duration-200"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      <div className="px-5 py-7 sm:px-7 sm:py-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{question.prompt}</h2>
        <div className="mt-6 grid gap-3">
          {question.options.map((option) => {
            const selected = answers[question.id] === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => pick(option.id)}
                className={`min-h-16 rounded-2xl border px-4 py-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                  selected
                    ? "border-brand-500 bg-brand-50"
                    : "border-slate-200 bg-white hover:border-brand-200 hover:bg-slate-50"
                }`}
              >
                <span className="block text-sm font-semibold text-slate-950">{option.label}</span>
                {option.hint ? <span className="mt-1 block text-sm text-slate-500">{option.hint}</span> : null}
              </button>
            );
          })}
        </div>
        {step > 0 ? (
          <button
            type="button"
            className="mt-6 text-sm font-semibold text-slate-600 hover:text-slate-950"
            onClick={() => setStep(step - 1)}
          >
            Back
          </button>
        ) : null}
      </div>
    </section>
  );
}
