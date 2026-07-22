import { NextResponse } from "next/server";
import { sendNewsletterWelcome } from "@/lib/lead-email";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

type Body = {
  email?: unknown;
  subspecialtyInterest?: unknown;
  pagePath?: unknown;
};

function isEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export async function POST(req: Request) {
  const json = (await req.json().catch(() => null)) as Body | null;
  if (!json || !isEmail(json.email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  const email = json.email.trim().toLowerCase();
  const subspecialtyInterest =
    typeof json.subspecialtyInterest === "string" && json.subspecialtyInterest.trim().length > 0
      ? json.subspecialtyInterest.trim().slice(0, 120)
      : "General Cardiology";

  const pagePath =
    typeof json.pagePath === "string" && json.pagePath.trim().length > 0
      ? json.pagePath.trim().slice(0, 500)
      : null;

  let supabase;
  try {
    supabase = createSupabaseAdmin();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "SUPABASE_NOT_CONFIGURED",
        error: "Newsletter signup is not available on this deployment yet.",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("physician_leads").insert({
    first_name: "Newsletter",
    last_name: "Subscriber",
    email,
    phone: "N/A",
    specialty: subspecialtyInterest,
    preferred_states: ["Unspecified"],
    years_experience: "N/A",
    availability: "Newsletter only",
    travel: "n/a",
    sms_opt_in: false,
    lead_magnet: false,
    source: "newsletter",
    metadata: {
      ...(pagePath ? { page_path: pagePath } : {}),
      newsletter: "true",
    },
  });

  if (error) {
    console.error("[newsletter] supabase insert failed", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return NextResponse.json({ ok: false, error: "Could not save subscription. Please try again." }, { status: 500 });
  }

  void sendNewsletterWelcome(email).catch((e) => console.error("[newsletter] welcome email failed", e));

  return NextResponse.json({ ok: true });
}
