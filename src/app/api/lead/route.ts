import { NextResponse } from "next/server";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { US_STATES } from "@/lib/states";
import { getFeaturedCardiologyOpportunity } from "@/lib/featured-cardiology-opportunities";
import { notifyRecruiterOfLead, sendLeadAcknowledgment } from "@/lib/lead-email";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";
import { isCareerStageId, screensForSpecialty, type CareerStageId } from "@/lib/lead-lattice";

const ALLOWED_SPECIALTIES = new Set<string>([
  ...CARDIOLOGY_SUBSPECIALTIES,
  "Cardiology",
  "General Cardiology",
  "Non-Invasive Cardiology",
]);
const ALLOWED_STATES = new Set<string>(US_STATES);

type LeadBody = {
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

function honeypotFilled(body: LeadBody): boolean {
  return isNonEmptyString(body.companyWebsite) || isNonEmptyString(body.faxLine);
}

function looksLikeHumanLead(body: LeadBody): boolean {
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

function isToolOrPdfSource(source: string): boolean {
  return /pdf|calculator|tool|gate|estimator|portfolio/i.test(source);
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
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

function normalizeLead(body: LeadBody) {
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

  const preferredStates = Array.isArray(body.preferredStates)
    ? body.preferredStates.map((s) => String(s).trim()).filter(Boolean)
    : [];

  if (preferredStates.length === 0 && formMode !== "quick") {
    return { ok: false as const, error: "Select at least one preferred state." };
  }
  if (preferredStates.some((state) => !ALLOWED_STATES.has(state))) {
    return { ok: false as const, error: "One or more selected states are invalid." };
  }
  if (isNonEmptyString(body.homeState) && !ALLOWED_STATES.has(body.homeState.trim())) {
    return { ok: false as const, error: "Select a valid home or practice state." };
  }
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
  const rawQualificationResponses = safeJsonObject(
    body.qualificationResponses,
    5000,
  );
  const opportunityResponses = (() => {
    if (!opportunity || !rawQualificationResponses) return null;
    const responses = Object.fromEntries(
      opportunity.screeningQuestions.flatMap((question) => {
        const response = rawQualificationResponses[question.id];
        return typeof response === "string" &&
          question.options.includes(response)
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
        return typeof response === "string" &&
          question.options.includes(response)
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
  const careerStage: CareerStageId | null = isNonEmptyString(body.careerStage) && isCareerStageId(body.careerStage)
    ? body.careerStage
    : null;
  if (careerStage) metadata.career_stage = careerStage;
  if (opportunity) {
    metadata.opportunity_slug = opportunity.slug;
    metadata.opportunity_title = opportunity.title;
  }
  if (isNonEmptyString(body.homeState)) metadata.home_state = body.homeState.trim().slice(0, 100);
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
      homeState: isNonEmptyString(body.homeState) ? body.homeState.trim() : null,
      source,
      opportunitySlug: opportunity?.slug ?? null,
      opportunityTitle: opportunity?.title ?? null,
      qualificationResponses,
      careerStage,
    },
  };
}

export async function POST(req: Request) {
  const json = (await req.json().catch(() => null)) as LeadBody | null;
  if (!json || typeof json !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Password managers also autofill
  // "companyWebsite", which previously returned success without saving a real physician.
  if (honeypotFilled(json) && !looksLikeHumanLead(json)) {
    return NextResponse.json({ ok: true });
  }

  // formMode is normalized inside normalizeLead
  const source = isNonEmptyString(json.source) ? json.source.trim() : "lead_form";
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const skipCaptcha = isToolOrPdfSource(source);

  if (secret && !skipCaptcha) {
    const token = typeof json.recaptchaToken === "string" ? json.recaptchaToken : "";
    const forwarded = req.headers.get("x-forwarded-for");
    const remoteip =
      (forwarded ? forwarded.split(",")[0] : null)?.trim() ||
      req.headers.get("x-real-ip")?.trim() ||
      null;

    const captchaOk = await verifyRecaptchaToken(token, remoteip);
    if (!captchaOk) {
      return NextResponse.json(
        { ok: false, error: "Security verification failed. Please complete the reCAPTCHA and try again." },
        { status: 400 },
      );
    }
  }

  const normalized = normalizeLead(json);
  if (!normalized.ok) {
    return NextResponse.json({ ok: false, error: normalized.error }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createSupabaseAdmin();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "SUPABASE_NOT_CONFIGURED",
        error:
          "We could not save your inquiry on this deployment yet. Please email us directly and we will help you from there.",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("physician_leads").insert(normalized.value);

  if (error) {
    console.error("[lead] supabase insert failed", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
      source: normalized.value.source,
    });
    return NextResponse.json({ ok: false, error: "Could not save your inquiry. Please try again." }, { status: 500 });
  }

  const emailResults = await Promise.allSettled([
    notifyRecruiterOfLead(normalized.emailPayload),
    sendLeadAcknowledgment(normalized.emailPayload),
  ]);
  emailResults.forEach((result) => {
    if (result.status === "rejected") {
      console.error("[lead] email side effect failed", result.reason);
    }
  });

  return NextResponse.json({ ok: true });
}
