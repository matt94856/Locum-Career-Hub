"use client";

import { PayArcade } from "@/components/tools/PayArcade";
import {
  estimateIcDailyRange,
  IC_PAY_EFFECTIVE_DATE,
  IC_PAY_SPECIALTY,
  IC_PAY_TOOL_ID,
  type IcPayAnswers,
} from "@/lib/ic-pay/model";
import type { PayArcadeRound } from "@/lib/pay-arcade/types";

const ROUNDS: PayArcadeRound[] = [
  {
    key: "experience",
    title: "How long have you been independent?",
    options: [
      { id: "fellowship", label: "Still in fellowship", hint: "Not independently privileged yet" },
      { id: "early", label: "First 3 years out", hint: "Building independent logs" },
      { id: "mid", label: "4–10 years", hint: "Most common locum IC profile" },
      { id: "senior", label: "10+ years", hint: "If STEMI logs are current" },
    ],
  },
  {
    key: "stemi",
    title: "What STEMI work do you actually take?",
    options: [
      { id: "backup", label: "Backup or scheduled lab", hint: "Someone else takes primary STEMI" },
      { id: "independent", label: "Independent primary PCI", hint: "You take the activation" },
      { id: "shock", label: "Busy STEMI and shock", hint: "Impella, MCS, or high activation volume" },
    ],
  },
  {
    key: "skill",
    title: "Any extra cath-lab skills?",
    options: [
      { id: "core", label: "Core PCI", hint: "Everyday cath-lab coverage" },
      { id: "mcs", label: "Impella or MCS", hint: "Helps on harder STEMI nights" },
      { id: "structural", label: "Structural", hint: "TAVR or similar program work" },
    ],
  },
  {
    key: "call",
    title: "What call will you take?",
    options: [
      { id: "weekday", label: "Weekday lab only", hint: "Little or no night call" },
      { id: "nights", label: "Some nights", hint: "Callback on top of the daily number" },
      { id: "stemi_weekends", label: "24-hour STEMI weekends", hint: "The assignments that pay for activation" },
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
  return estimateIcDailyRange(answers as IcPayAnswers);
}

export function IcLocumsPayRangeTool() {
  return (
    <PayArcade
      toolId={IC_PAY_TOOL_ID}
      specialty={IC_PAY_SPECIALTY}
      effectiveDate={IC_PAY_EFFECTIVE_DATE}
      computeNote="STEMI, skills, call, access"
      matchLabel="Request IC matches"
      jobsLabel="IC jobs"
      jobsHref="/locum-jobs/cardiology/interventional"
      sharePath="/interventional-cardiology-locums-pay"
      rounds={ROUNDS}
      estimateFor={estimate}
    />
  );
}
