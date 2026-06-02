import { NextResponse } from "next/server";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { notifyRecruiterOfLead, sendLeadAcknowledgment } from "@/lib/lead-email";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";

const ALLOWED_SPECIALTIES = new Set<string>([
  ...CARDIOLOGY_SUBSPECIALTIES,
  "Cardiology",
  "General Cardiology",
  "Non-Invasive Cardiology",
]);

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
  recaptchaToken?: unknown;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
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

  const metadata: Record<string, string> = {};
  if (pagePath) metadata.page_path = pagePath;
  if (clinicalNotes) metadata.clinical_notes = clinicalNotes;
  metadata.form_mode = formMode;

  return {
    ok: true as const,
    value: {
      first_name: body.firstName.trim(),
      last_name: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      specialty,
      preferred_states: preferredStates,
      years_experience: yearsExperience,
      availability: body.availability.trim(),
      travel,
      sms_opt_in: smsOptIn,
      lead_magnet: leadMagnet,
      source: "lead_form",
      metadata,
    },
    emailPayload: {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
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
    return NextResponse.json({ ok: false, error: "Could not save your inquiry. Please try again." }, { status: 500 });
  }

  void Promise.all([
    notifyRecruiterOfLead(normalized.emailPayload),
    sendLeadAcknowledgment(normalized.emailPayload),
  ]).catch((e) => console.error("[lead] email side effects failed", e));

  return NextResponse.json({ ok: true });
}
