import type { CareerStageId } from "@/lib/lead-lattice";

export const LOCUM_FIT_QUIZ_PATH = "/should-i-do-cardiology-locums";
export const LOCUM_FIT_QUIZ_TOOL_ID = "locum_fit_quiz";

export type FitBand = "strong" | "likely" | "mixed" | "employed";

export type QuizOption = {
  id: string;
  label: string;
  hint?: string;
  score: number;
  flag?: "medicine";
  specialty?: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export const LOCUM_FIT_QUESTIONS: QuizQuestion[] = [
  {
    id: "energy",
    prompt: "How does a typical employed week feel right now?",
    options: [
      { id: "empty", label: "I am running on fumes", hint: "Recovery never quite happens", score: 3 },
      { id: "thin", label: "Tired, but I can still do it", hint: "Weekends barely reset me", score: 2 },
      { id: "steady", label: "Busy but sustainable", hint: "I am not looking to escape", score: 0 },
    ],
  },
  {
    id: "drain",
    prompt: "What is wearing you down most?",
    options: [
      { id: "call", label: "Call and always being reachable", hint: "Nights, STEMI, or the pager", score: 3 },
      { id: "admin", label: "Inbox, meetings, and RVU theater", hint: "The job around the job", score: 3 },
      { id: "control", label: "No say over my calendar", hint: "Dates, clinics, and coverage are assigned", score: 3 },
      { id: "culture", label: "Politics I cannot redesign", hint: "The hospital is the problem", score: 2 },
      { id: "medicine", label: "The clinical work itself", hint: "I may need a different kind of change", score: 0, flag: "medicine" },
      { id: "none", label: "Nothing major — I am just curious", score: 1 },
    ],
  },
  {
    id: "protect",
    prompt: "If you redesigned next year, what would you protect first?",
    options: [
      { id: "off", label: "Real weeks completely off", score: 3 },
      { id: "nights", label: "Fewer nights and weekends", score: 3 },
      { id: "admin", label: "Fewer meetings and inbox hours", score: 2 },
      { id: "same", label: "Same schedule, different hospital", score: 1 },
    ],
  },
  {
    id: "travel",
    prompt: "How do you feel about leaving town for a defined block?",
    options: [
      { id: "go", label: "I will go where the work is", score: 3 },
      { id: "regional", label: "Regional only — drive or a short flight", score: 2 },
      { id: "local", label: "I need to stay close to home", score: 1 },
      { id: "no", label: "Travel is a dealbreaker", score: 0 },
    ],
  },
  {
    id: "identity",
    prompt: "What would you do with a month that was not employed?",
    options: [
      { id: "break", label: "Take a real break, then work if I want", score: 3 },
      { id: "blocks", label: "Work one or two paid blocks", score: 3 },
      { id: "lost", label: "I would feel lost without a full-time role", score: 0 },
      { id: "benefits", label: "I need the employed benefits structure", score: 1 },
    ],
  },
  {
    id: "paymodel",
    prompt: "How do you feel about 1099 pay and buying your own benefits?",
    options: [
      { id: "fine", label: "Fine if the daily rate is right", score: 3 },
      { id: "learn", label: "Nervous, but willing to learn", score: 2 },
      { id: "w2", label: "I need W-2 benefits", score: 1 },
    ],
  },
  {
    id: "timing",
    prompt: "How soon could you actually take dates?",
    options: [
      { id: "soon", label: "In the next 3 months", score: 3 },
      { id: "year", label: "After this contract — 6 to 12 months", score: 2 },
      { id: "explore", label: "Just thinking. No timeline.", score: 1 },
    ],
  },
  {
    id: "specialty",
    prompt: "Which cardiology work do you actually do?",
    options: [
      { id: "ic", label: "Interventional", score: 2, specialty: "Interventional Cardiology" },
      { id: "ep", label: "Electrophysiology", score: 2, specialty: "Electrophysiology" },
      { id: "nic", label: "Non-invasive / general", score: 2, specialty: "General Cardiology" },
      { id: "imaging", label: "Advanced imaging", score: 2, specialty: "Advanced Imaging" },
      { id: "hf", label: "Heart failure", score: 2, specialty: "Heart Failure" },
      { id: "other", label: "Other cardiology", score: 2, specialty: "General Cardiology" },
    ],
  },
];

export const LOCUM_FIT_MAX_SCORE = LOCUM_FIT_QUESTIONS.reduce(
  (sum, question) => sum + Math.max(...question.options.map((option) => option.score)),
  0,
);

export type LocumFitResult = {
  score: number;
  maxScore: number;
  percent: number;
  band: FitBand;
  title: string;
  likelihood: string;
  summary: string;
  reasons: string[];
  caveats: string[];
  whyLocums: string[];
  specialty: string;
  careerStage: CareerStageId;
  availability: string;
  travelInterest: "yes" | "no" | "maybe";
  notes: string;
  burnedOut: boolean;
  medicineFlag: boolean;
};

const WHY_LOCUMS = [
  "The calendar is the product. You pick defined blocks instead of an open-ended employed year of call, clinic, and committees.",
  "Scope is written down. Census, STEMI, EP lab, and weekends are in the assignment — not a moving target after you start.",
  "Recovery is real. Many cardiologists use locums to put empty weeks on the calendar, not to work more.",
  "You can try a market without selling a house or resigning from a pension plan on day one. A first block is information.",
  "Pay is a daily or block rate tied to the work, not an RVU formula plus a bonus you argue about in March.",
];

function bandFromScore(score: number, medicineFlag: boolean): FitBand {
  if (medicineFlag && score >= 13) return "mixed";
  if (score >= 18) return "strong";
  if (score >= 13) return "likely";
  if (score >= 8) return "mixed";
  return "employed";
}

function percentFromScore(score: number, band: FitBand) {
  const raw = Math.round(22 + (score / LOCUM_FIT_MAX_SCORE) * 72);
  if (band === "employed") return Math.min(raw, 38);
  if (band === "mixed") return Math.min(Math.max(raw, 42), 58);
  if (band === "likely") return Math.min(Math.max(raw, 64), 78);
  return Math.min(Math.max(raw, 82), 94);
}

function careerStageFromAnswers(answers: Record<string, string>): CareerStageId {
  if (answers.identity === "blocks" && answers.timing !== "soon") return "moonlighting";
  if (answers.identity === "break" || answers.identity === "blocks") return "locums-primary";
  if (answers.energy === "empty" && answers.timing === "soon") return "locums-primary";
  return "moonlighting";
}

function availabilityFromAnswers(answers: Record<string, string>) {
  if (answers.timing === "soon") return "1–3 months";
  if (answers.timing === "year") return "3–6 months";
  return "Exploring / no firm date";
}

function travelFromAnswers(answers: Record<string, string>): "yes" | "no" | "maybe" {
  if (answers.travel === "go" || answers.travel === "regional") return "yes";
  if (answers.travel === "no") return "no";
  return "maybe";
}

function optionFor(questionId: string, optionId: string) {
  const question = LOCUM_FIT_QUESTIONS.find((item) => item.id === questionId);
  return question?.options.find((option) => option.id === optionId);
}

export function scoreLocumFitQuiz(answers: Record<string, string>): LocumFitResult {
  let score = 0;
  let medicineFlag = false;
  let specialty = "General Cardiology";
  const picked: { prompt: string; label: string }[] = [];

  for (const question of LOCUM_FIT_QUESTIONS) {
    const option = optionFor(question.id, answers[question.id] ?? "");
    if (!option) continue;
    score += option.score;
    if (option.flag === "medicine") medicineFlag = true;
    if (option.specialty) specialty = option.specialty;
    picked.push({ prompt: question.prompt, label: option.label });
  }

  const burnedOut = answers.energy === "empty" || answers.energy === "thin";
  const band = bandFromScore(score, medicineFlag);
  const percent = percentFromScore(score, band);

  const titles: Record<FitBand, string> = {
    strong: "You look like a strong locums fit",
    likely: "Locums is likely a better fit than staying employed as-is",
    mixed: "Locums could work — with a careful first block",
    employed: "A full-time job may still fit you better right now",
  };

  const likelihoods: Record<FitBand, string> = {
    strong: `${percent}% likely to prefer locums over another employed year`,
    likely: `${percent}% likely to prefer locums if the first assignment is scoped well`,
    mixed: `${percent}% likely — a trial block would tell you more than another year of guessing`,
    employed: `${percent}% likely today. Curiosity is useful; a resignation is not required`,
  };

  const summaries: Record<FitBand, string> = {
    strong:
      "You want control over dates, a written scope, and recovery that actually happens. That is the main reason cardiologists leave hospital-employed jobs for locums — not because they stopped liking the work.",
    likely:
      "The strain you named is mostly job design: call, inbox, or a calendar you do not own. Locums will not fix every week, but it lets you buy back empty time and say no to committees.",
    mixed:
      "There is a real pull toward flexibility, and also a reason to go slowly — travel, benefits, identity, or the clinical work itself. A short, written block is the honest next test.",
    employed:
      "You may still want employed structure, benefits, or a home base. Locums is optional here: a few local or regional dates, or no change until the job itself is the problem.",
  };

  const reasons: string[] = [];
  if (burnedOut) {
    reasons.push(
      "You are already paying for an unsustainable week. Locums does not treat burnout, but it can stop an open-ended employed calendar from being the only option.",
    );
  }
  if (answers.drain === "call" || answers.protect === "nights") {
    reasons.push("Call is a locums variable. You can take no-call clinic, scheduled lab days, or a STEMI block — you do not have to inherit the employed pager as a package.");
  }
  if (answers.drain === "admin" || answers.protect === "admin") {
    reasons.push("Most locum assignments do not come with service meetings, inbox ownership, or RVU committees. You show up for the clinical work that was written down.");
  }
  if (answers.drain === "control" || answers.protect === "off") {
    reasons.push("Employed cardiology rarely lets you put two empty weeks on the calendar without using PTO politics. Locums starts from dates you accept.");
  }
  if (answers.travel === "go" || answers.travel === "regional") {
    reasons.push("Willingness to travel — even regionally — opens more IC, EP, and consult blocks than staying in one health system.");
  }
  if (medicineFlag) {
    reasons.push(
      "You said the clinical work itself is the problem. Changing employers or going locums will not fix that. Get the career question separate from whether you still want to practice cardiology.",
    );
  }
  if (answers.identity === "lost" || answers.paymodel === "w2") {
    reasons.push("Wanting a full-time identity or W-2 benefits is a real reason to stay employed — or to take locums only as added dates, not a full swap.");
  }
  if (reasons.length < 2) {
    reasons.push("Cardiologists who prefer locums usually want a start date, an end date, and a scope they can read before they pack.");
  }

  const caveats = [
    "This is a preference check, not a job offer, medical advice, or a burnout diagnosis.",
    "First assignments still need licenses, hospital privileges, and a written scope. That takes weeks, not a weekend.",
    "1099 rates look high until you price health insurance, retirement, unpaid credentialing time, and cancellation risk.",
  ];
  if (burnedOut) {
    caveats.unshift(
      "If you are in crisis or unsafe, get clinical help first. In the U.S., call or text 988. A quiz is not care.",
    );
  }

  const notes = [
    `Locum fit quiz: ${titles[band]} (${percent}%).`,
    ...picked.map((row) => `${row.prompt} → ${row.label}`),
  ].join("\n");

  return {
    score,
    maxScore: LOCUM_FIT_MAX_SCORE,
    percent,
    band,
    title: titles[band],
    likelihood: likelihoods[band],
    summary: summaries[band],
    reasons: reasons.slice(0, 4),
    caveats,
    whyLocums: WHY_LOCUMS,
    specialty,
    careerStage: careerStageFromAnswers(answers),
    availability: availabilityFromAnswers(answers),
    travelInterest: travelFromAnswers(answers),
    notes: notes.slice(0, 2000),
    burnedOut,
    medicineFlag,
  };
}

export function isQuizComplete(answers: Record<string, string>) {
  return LOCUM_FIT_QUESTIONS.every((question) => Boolean(answers[question.id]));
}
