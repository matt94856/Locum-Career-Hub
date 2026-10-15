"use client";

import { PayArcade } from "@/components/tools/PayArcade";
import {
  estimateEpDailyRange,
  EP_PAY_EFFECTIVE_DATE,
  EP_PAY_SPECIALTY,
  EP_PAY_TOOL_ID,
  type EpPayAnswers,
} from "@/lib/ep-pay/model";
import type { PayArcadeRound } from "@/lib/pay-arcade/types";

const ROUNDS: PayArcadeRound[] = [
  {
    key: "experience",
    title: "How long have you been independent?",
    options: [
      { id: "fellowship", label: "Still in fellowship", hint: "Not independently privileged yet" },
      { id: "early", label: "First 3 years out", hint: "Building ablation and device logs" },
      { id: "mid", label: "4–10 years", hint: "Most common locum EP profile" },
      { id: "senior", label: "10+ years", hint: "If ablation logs are current" },
    ],
  },
  {
    key: "work",
    title: "What EP work do you actually take?",
    options: [
      { id: "devices", label: "Devices and clinic", hint: "Implants, interrogations, device clinic" },
      { id: "ablation", label: "AF or SVT ablation", hint: "You take the typical EP lab day" },
      { id: "complex", label: "Complex ablation or VT", hint: "Harder-to-staff lab work" },
    ],
  },
  {
    key: "skill",
    title: "Any extra EP skills?",
    options: [
      { id: "core", label: "Core devices", hint: "Everyday device coverage" },
      { id: "laa", label: "Watchman or LAA", hint: "Helps on structural-adjacent programs" },
      { id: "extraction", label: "Lead extraction", hint: "A smaller pool, higher demand" },
    ],
  },
  {
    key: "call",
    title: "What call will you take?",
    options: [
      { id: "weekday", label: "Weekday lab only", hint: "Little or no night call" },
      { id: "nights", label: "Some nights", hint: "Callback on top of the daily number" },
      { id: "weekends", label: "24-hour arrhythmia weekends", hint: "The assignments that pay for activation" },
    ],
  },
  {
    key: "access",
    title: "How quickly can we privilege you?",
    options: [
      { id: "one_state", label: "One state license", hint: "Local or a single compact state" },
      { id: "multi_state", label: "Two or more licenses", hint: "Faster to match urgent blocks" },
      { id: "imlc", label: "IMLC eligible", hint: "Shorter path into more states" },
    ],
  },
];

function estimate(answers: Record<string, string>) {
  return estimateEpDailyRange(answers as EpPayAnswers);
}

export function EpLocumsPayRangeTool() {
  return (
    <PayArcade
      toolId={EP_PAY_TOOL_ID}
      specialty={EP_PAY_SPECIALTY}
      effectiveDate={EP_PAY_EFFECTIVE_DATE}
      computeNote="Ablation, devices, call, access"
      matchLabel="Request EP matches"
      jobsLabel="EP jobs"
      jobsHref="/locum-jobs/cardiology/electrophysiology"
      sharePath="/ep-cardiology-locums-pay"
      rounds={ROUNDS}
      estimateFor={estimate}
    />
  );
}
