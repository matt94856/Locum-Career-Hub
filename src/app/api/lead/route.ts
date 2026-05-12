import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";

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
  smsOptIn?: unknown;
  leadMagnet?: unknown;
  pagePath?: unknown;
  recaptchaToken?: unknown;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function normalizeLead(body: LeadBody) {
  if (
    !isNonEmptyString(body.firstName) ||
    !isNonEmptyString(body.lastName) ||
    !isNonEmptyString(body.email) ||
    !isNonEmptyString(body.phone) ||
    !isNonEmptyString(body.specialty) ||
    !isNonEmptyString(body.yearsExperience) ||
    !isNonEmptyString(body.availability) ||
    !isNonEmptyString(body.travel)
  ) {
    return { ok: false as const, error: "Missing required fields." };
  }

  const preferredStates = Array.isArray(body.preferredStates)
    ? body.preferredStates.map((s) => String(s).trim()).filter(Boolean)
    : [];

  if (preferredStates.length === 0) {
    return { ok: false as const, error: "Select at least one preferred state." };
  }

  const smsOptIn = body.smsOptIn === true;
  const leadMagnet = body.leadMagnet === true;
  const pagePath =
    typeof body.pagePath === "string" && body.pagePath.trim().length > 0
      ? body.pagePath.trim().slice(0, 500)
      : null;

  return {
    ok: true as const,
    value: {
      first_name: body.firstName.trim(),
      last_name: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      specialty: body.specialty.trim(),
      preferred_states: preferredStates,
      years_experience: body.yearsExperience.trim(),
      availability: body.availability.trim(),
      travel: body.travel.trim(),
      sms_opt_in: smsOptIn,
      lead_magnet: leadMagnet,
      source: "lead_form",
      metadata: pagePath ? { page_path: pagePath } : {},
    },
  };
}

export async function POST(req: Request) {
  const json = (await req.json().catch(() => null)) as LeadBody | null;
  if (!json || typeof json !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (secret) {
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
    return NextResponse.json({ ok: false, error: "Server configuration error." }, { status: 503 });
  }

  const { error } = await supabase.from("physician_leads").insert(normalized.value);

  if (error) {
    return NextResponse.json({ ok: false, error: "Could not save your inquiry. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
