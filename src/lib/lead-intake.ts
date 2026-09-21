import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { getFeaturedCardiologyOpportunity } from "@/lib/featured-cardiology-opportunities";
import { normalizeUsState } from "@/lib/states";
import { isCareerStageId, screensForSpecialty, type CareerStageId } from "@/lib/lead-lattice";

export const ALLOWED_SPECIALTIES = new Set<string>([
  ...CARDIOLOGY_SUBSPECIALTIES,
  "Cardiology",
  "General Cardiology",
  "Non-Invasive Cardiology",
]);

export type LeadBody = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  specialty?: unknown;
  preferredStates?: unknown;
  yearsExperience?: unknown;
  availability?: unknown;
  travel?: unknown;
  clinicalNotes?: unknown;
  formMode?: unknown;
  smsOptIn?: unknown;
  leadMagnet?: unknown;
  pagePath?: unknown;
  attribution?: unknown;
  calculatorProfile?: unknown;
  homeState?: unknown;
  source?: unknown;
  opportunitySlug?: unknown;
  qualificationResponses?: unknown;
  careerStage?: unknown;
  recaptchaToken?: unknown;
  companyWebsite?: unknown;
  faxLine?: unknown;
};

export function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export function honeypotFilled(body: LeadBody): boolean {
  return isNonEmptyString(body.companyWebsite) || isNonEmptyString(body.faxLine);
}

export function looksLikeHumanLead(body: LeadBody): boolean {
  if (
    !isNonEmptyString(body.firstName) ||
    !isNonEmptyString(body.lastName) ||
    !isNonEmptyString(body.email) ||
    !isNonEmptyString(body.phone)
  ) {
    return false;
  }
  const email = body.email.trim().toLowerCase();
  const digits = body.phone.replace(/\D/g, "");
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && digits.length >= 10;
}

/**
 * Drop only incomplete honeypot spam. First name "test" is never a bot signal.
 * Password-manager autofill of faxLine/companyWebsite still saves when contact fields look human.
 */
export function shouldDropAsHoneypotBot(body: LeadBody): boolean {
  return honeypotFilled(body) && !looksLikeHumanLead(body);
}

export function isToolOrPdfSource(source: string): boolean {
  return /pdf|calculator|tool|gate|estimator|portfolio/i.test(source);
}

function safeJsonObject(value: unknown, maxLength = 50000): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  try {
    const serialized = JSON.stringify(value);
    if (serialized.length > maxLength) return null;
    return JSON.parse(serialized) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function normalizePreferredStates(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  for (const item of value) {
    const state = normalizeUsState(String(item));
    if (state) seen.add(state);
  }
  return [...seen];
}

export function normalizeLead(body: LeadBody) {
  const formMode: "quick" | "full" = body.formMode === "quick" ? "quick" : "full";
  const opportunitySlug = isNonEmptyString(body.opportunitySlug)
    ? body.opportunitySlug.trim()
    : "";
  const opportunity = opportunitySlug
    ? getFeaturedCardiologyOpportunity(opportunitySlug)
    : undefined;
  const source = opportunity
    ? `featured_opportunity_${opportunity.slug}`.slice(0, 100)
    : isNonEmptyString(body.source)
      ? body.source.trim().slice(0, 100)
      : "lead_form";
  const toolOrPdf = isToolOrPdfSource(source);

  if (
    !isNonEmptyString(body.firstName) ||
    !isNonEmptyString(body.lastName) ||
    !isNonEmptyString(body.email) ||
    !isNonEmptyString(body.specialty)
  ) {
    return { ok: false as const, error: "Missing required fields." };
  }

  const availability = isNonEmptyString(body.availability)
    ? body.availability.trim()
    : "Exploring / no firm date";

  if (!toolOrPdf && !isNonEmptyString(body.phone)) {
    return { ok: false as const, error: "Missing required fields." };
  }

  const preferredStates = normalizePreferredStates(body.preferredStates);
  const homeState = isNonEmptyString(body.homeState)
    ? normalizeUsState(body.homeState)
    : null;

  const email = body.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false as const, error: "Enter a valid email address." };
  }
  const phone = isNonEmptyString(body.phone) ? body.phone.trim() : "";
  if (phone && phone.replace(/\D/g, "").length < 10) {
    return { ok: false as const, error: "Enter a valid phone number." };
  }
  if (!toolOrPdf && phone.replace(/\D/g, "").length < 10) {
    return { ok: false as const, error: "Enter a valid phone number." };
  }

  const specialty = body.specialty.trim();
  if (!ALLOWED_SPECIALTIES.has(specialty)) {
    return {
      ok: false as const,
      error: "We currently recruit cardiologists (MD/DO) only. Please select a cardiology subspecialty.",
    };
  }

  const yearsExperience = isNonEmptyString(body.yearsExperience)
    ? body.yearsExperience.trim()
    : formMode === "quick"
      ? "Not provided (quick submit)"
      : "";

  const travel = isNonEmptyString(body.travel) ? body.travel.trim() : formMode === "quick" ? "maybe" : "";

  if (formMode === "full" && (!yearsExperience || !travel)) {
    return { ok: false as const, error: "Missing experience or travel preference." };
  }

  const clinicalNotes =
    typeof body.clinicalNotes === "string" && body.clinicalNotes.trim().length > 0
      ? body.clinicalNotes.trim().slice(0, 2000)
      : null;

  const smsOptIn = body.smsOptIn === true;
  const leadMagnet = body.leadMagnet === true;
  const pagePath =
    typeof body.pagePath === "string" && body.pagePath.trim().length > 0
      ? body.pagePath.trim().slice(0, 500)
      : null;

  const metadata: Record<string, unknown> = {};
  if (pagePath) metadata.page_path = pagePath;
  if (clinicalNotes) metadata.clinical_notes = clinicalNotes;
  metadata.form_mode = formMode;
  const attribution = safeJsonObject(body.attribution, 5000);
  if (attribution) metadata.attribution = attribution;
  const calculatorProfile = safeJsonObject(body.calculatorProfile);
  if (calculatorProfile) metadata.calculator_profile = calculatorProfile;
  const rawQualificationResponses = safeJsonObject(body.qualificationResponses, 5000);
  const opportunityResponses = (() => {
    if (!opportunity || !rawQualificationResponses) return null;
    const responses = Object.fromEntries(
      opportunity.screeningQuestions.flatMap((question) => {
        const response = rawQualificationResponses[question.id];
        return typeof response === "string" && question.options.includes(response)
          ? [[question.label, response]]
          : [];
      }),
    );
    return Object.keys(responses).length > 0 ? responses : null;
  })();
  const latticeResponses = (() => {
    if (!rawQualificationResponses) return null;
    const responses = Object.fromEntries(
      screensForSpecialty(specialty).flatMap((question) => {
        const response = rawQualificationResponses[question.id];
        return typeof response === "string" && question.options.includes(response)
          ? [[question.label, response]]
          : [];
      }),
    );
    return Object.keys(responses).length > 0 ? responses : null;
  })();
  const qualificationResponses =
    opportunityResponses || latticeResponses
      ? { ...(opportunityResponses ?? {}), ...(latticeResponses ?? {}) }
      : null;
  if (qualificationResponses) {
    metadata.qualification_responses = qualificationResponses;
  }
  const careerStage: CareerStageId | null =
    isNonEmptyString(body.careerStage) && isCareerStageId(body.careerStage)
      ? body.careerStage
      : null;
  if (careerStage) metadata.career_stage = careerStage;
  if (opportunity) {
    metadata.opportunity_slug = opportunity.slug;
    metadata.opportunity_title = opportunity.title;
  }
  if (homeState) metadata.home_state = homeState.slice(0, 100);
  if (honeypotFilled(body)) metadata.honeypot_autofill = true;

  return {
    ok: true as const,
    value: {
      first_name: body.firstName.trim(),
      last_name: body.lastName.trim(),
      email,
      phone: phone || "not-provided",
      specialty,
      preferred_states: preferredStates,
      years_experience: yearsExperience,
      availability,
      travel,
      sms_opt_in: smsOptIn,
      lead_magnet: leadMagnet,
      source,
      metadata,
    },
    emailPayload: {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email,
      phone: phone || "not provided",
      specialty,
      preferredStates,
      yearsExperience,
      availability,
      travel,
      clinicalNotes,
      formMode,
      smsOptIn,
      leadMagnet,
      pagePath,
      attribution,
      calculatorProfile,
      homeState,
      source,
      opportunitySlug: opportunity?.slug ?? null,
      opportunityTitle: opportunity?.title ?? null,
      qualificationResponses,
      careerStage,
    },
  };
}

export function evaluateLeadRequest(body: LeadBody) {
  if (shouldDropAsHoneypotBot(body)) {
    return { outcome: "drop_honeypot" as const };
  }
  const normalized = normalizeLead(body);
  if (!normalized.ok) {
    return { outcome: "reject" as const, error: normalized.error };
  }
  return {
    outcome: "save" as const,
    value: normalized.value,
    emailPayload: normalized.emailPayload,
  };
}
