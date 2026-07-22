import { NextResponse } from "next/server";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { US_STATES } from "@/lib/states";
import { notifyRecruiterOfLead, sendLeadAcknowledgment } from "@/lib/lead-email";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";

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
  recaptchaToken?: unknown;
};

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

  if (
    !isNonEmptyString(body.firstName) ||
    !isNonEmptyString(body.lastName) ||
    !isNonEmptyString(body.email) ||
    !isNonEmptyString(body.phone) ||
    !isNonEmptyString(body.specialty) ||
    !isNonEmptyString(body.availability)
  ) {
    return { ok: false as const, error: "Missing required fields." };
  }

  const preferredStates = Array.isArray(body.preferredStates)
    ? body.preferredStates.map((s) => String(s).trim()).filter(Boolean)
    : [];

  if (preferredStates.length === 0) {
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
  if (body.phone.replace(/\D/g, "").length < 10) {
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
      ? "Exploring / no firm date"
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
  if (isNonEmptyString(body.homeState)) metadata.home_state = body.homeState.trim().slice(0, 100);
  const source = isNonEmptyString(body.source) ? body.source.trim().slice(0, 100) : "lead_form";

  return {
    ok: true as const,
    value: {
      first_name: body.firstName.trim(),
      last_name: body.lastName.trim(),
      email,
      phone: body.phone.trim(),
      specialty,
      preferred_states: preferredStates,
      years_experience: yearsExperience,
      availability: body.availability.trim(),
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
      phone: body.phone.trim(),
      specialty,
      preferredStates,
      yearsExperience,
      availability: body.availability.trim(),
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
    },
  };
}

export async function POST(req: Request) {
  const json = (await req.json().catch(() => null)) as LeadBody | null;
  if (!json || typeof json !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const formMode = json.formMode === "quick" ? "quick" : "full";
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (secret && formMode === "full") {
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

  void Promise.all([
    notifyRecruiterOfLead(normalized.emailPayload),
    sendLeadAcknowledgment(normalized.emailPayload),
  ]).catch((e) => console.error("[lead] email side effects failed", e));

  return NextResponse.json({ ok: true });
}
