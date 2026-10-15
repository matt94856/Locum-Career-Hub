"use client";

import { PayArcade } from "@/components/tools/PayArcade";
import {
  estimateNicDailyRange,
  NIC_PAY_EFFECTIVE_DATE,
  NIC_PAY_SPECIALTY,
  NIC_PAY_TOOL_ID,
  type NicPayAnswers,
} from "@/lib/nic-pay/model";
import type { PayArcadeRound } from "@/lib/pay-arcade/types";

const ROUNDS: PayArcadeRound[] = [
  {
    key: "experience",
    title: "How long have you been independent?",
    options: [
      { id: "fellowship", label: "Still in fellowship", hint: "Not independently privileged yet" },
      { id: "early", label: "First 3 years out", hint: "Building consult and imaging logs" },
      { id: "mid", label: "4–10 years", hint: "Most common locum non-invasive profile" },
      { id: "senior", label: "10+ years", hint: "If TEE and nuclear skills are current" },
    ],
  },
  {
    key: "tee",
    title: "Do you do TEEs?",
    options: [
      { id: "none", label: "No TEE", hint: "Clinic and consults without TEE" },
      { id: "reads", label: "I read TEEs", hint: "You interpret, someone else may perform" },
      { id: "performs", label: "I perform TEEs", hint: "Hospitals pay for this more often" },
    ],
  },
  {
    key: "nukes",
    title: "Do you do nukes?",
    options: [
      { id: "none", label: "No nuclear", hint: "Consult or clinic without nuclear" },
      { id: "supervise", label: "I supervise stress / nuclear", hint: "You cover the lab" },
      { id: "interpret", label: "I interpret nuclear studies", hint: "Reads plus supervision" },
    ],
  },
  {
    key: "call",
    title: "Do you want to take call?",
    options: [
      { id: "none", label: "No call", hint: "Clinic or weekday days only" },
      { id: "nights", label: "Some nights", hint: "Callback on top of the daily number" },
      { id: "weekends", label: "24-hour weekends", hint: "The assignments that pay for pager risk" },
    ],
  },
  {
    key: "setting",
    title: "Inpatient, outpatient, or both?",
    options: [
      { id: "outpatient", label: "Outpatient / clinic", hint: "Office days, little hospital work" },
      { id: "inpatient", label: "Inpatient / consults", hint: "Hospital rounding and consults" },
      { id: "both", label: "Both", hint: "What most hospitals are trying to fill" },
    ],
  },
];

function estimate(answers: Record<string, string>) {
  return estimateNicDailyRange(answers as NicPayAnswers);
}

export function NicLocumsPayRangeTool() {
  return (
    <PayArcade
      toolId={NIC_PAY_TOOL_ID}
      specialty={NIC_PAY_SPECIALTY}
      effectiveDate={NIC_PAY_EFFECTIVE_DATE}
      computeNote="TEE, nukes, call, setting"
      matchLabel="Request matches"
      jobsLabel="Non-invasive jobs"
      jobsHref="/locum-jobs/cardiology/general"
      sharePath="/non-invasive-cardiology-locums-pay"
      rounds={ROUNDS}
      estimateFor={estimate}
    />
  );
}
