import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { US_STATES } from "@/lib/states";

const ALLOWED_SPECIALTIES = new Set<string>([...CARDIOLOGY_SUBSPECIALTIES, "Cardiology", "General Cardiology"]);
const ALLOWED_STATES = new Set<string>(US_STATES);

type Body = {
  email?: unknown;
  specialty?: unknown;
  region?: unknown;
  weeklyLow?: unknown;
  weeklyHigh?: unknown;
  assignmentStyle?: unknown;
  yearsDoingLocums?: unknown;
  anonymousOk?: unknown;
};

function num(v: unknown) {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function POST(req: Request) {
  const json = (await req.json().catch(() => null)) as Body | null;
  if (!json || typeof json !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email =
    typeof json.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(json.email.trim())
      ? json.email.trim().toLowerCase()
      : null;
  const specialty = typeof json.specialty === "string" ? json.specialty.trim() : "";
  const region = typeof json.region === "string" ? json.region.trim() : "";
  const weeklyLow = num(json.weeklyLow);
  const weeklyHigh = num(json.weeklyHigh);

  if (!specialty || !ALLOWED_SPECIALTIES.has(specialty)) {
    return NextResponse.json({ ok: false, error: "Select a cardiology subspecialty." }, { status: 400 });
  }
  if (!region || !ALLOWED_STATES.has(region)) {
    return NextResponse.json({ ok: false, error: "Select a valid region / state." }, { status: 400 });
  }
  if (weeklyLow == null || weeklyHigh == null || weeklyLow < 1000 || weeklyHigh < weeklyLow || weeklyHigh > 100000) {
    return NextResponse.json({ ok: false, error: "Enter a realistic weekly pay range." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createSupabaseAdmin();
  } catch {
    return NextResponse.json(
      { ok: false, code: "SUPABASE_NOT_CONFIGURED", error: "Survey storage is not configured on this deployment yet." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("physician_leads").insert({
    first_name: "Pay",
    last_name: "Survey",
    email: email ?? `pay-survey-${crypto.randomUUID().slice(0, 8)}@anonymous.locumcareerhub.com`,
    phone: "N/A",
    specialty,
    preferred_states: [region],
    years_experience: typeof json.yearsDoingLocums === "string" ? json.yearsDoingLocums.slice(0, 80) : "N/A",
    availability: "Pay survey only",
    travel: "n/a",
    sms_opt_in: false,
    lead_magnet: false,
    source: "cardiologist_pay_survey",
    metadata: {
      newsletter: "false",
      form_mode: "survey",
      page_path: "/cardiologist-locums-pay-survey",
      pay_survey: {
        weekly_low: weeklyLow,
        weekly_high: weeklyHigh,
        assignment_style: typeof json.assignmentStyle === "string" ? json.assignmentStyle.slice(0, 120) : null,
        years_doing_locums: typeof json.yearsDoingLocums === "string" ? json.yearsDoingLocums.slice(0, 80) : null,
        anonymous_ok: json.anonymousOk !== false,
        email_provided: Boolean(email),
      },
    },
  });

  if (error) {
    console.error("[pay-survey] insert failed", error.message);
    return NextResponse.json({ ok: false, error: "Could not save your response. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
