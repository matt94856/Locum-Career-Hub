import { NextResponse } from "next/server";
import {
  evaluateLeadRequest,
  isNonEmptyString,
  skipLeadCaptcha,
  type LeadBody,
} from "@/lib/lead-intake";
import { notifyRecruiterOfLead, sendLeadAcknowledgment } from "@/lib/lead-email";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";

export async function POST(req: Request) {
  const json = (await req.json().catch(() => null)) as LeadBody | null;
  if (!json || typeof json !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Password managers also autofill
  // "companyWebsite" / "faxLine". Complete human contact still saves.
  const evaluated = evaluateLeadRequest(json);
  if (evaluated.outcome === "drop_honeypot") {
    return NextResponse.json({ ok: true });
  }

  const source = isNonEmptyString(json.source) ? json.source.trim() : "lead_form";
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const skipCaptcha = skipLeadCaptcha(source);

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

  if (evaluated.outcome === "reject") {
    return NextResponse.json({ ok: false, error: evaluated.error }, { status: 400 });
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

  const { error } = await supabase.from("physician_leads").insert(evaluated.value);

  if (error) {
    console.error("[lead] supabase insert failed", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
      source: evaluated.value.source,
    });
    return NextResponse.json({ ok: false, error: "Could not save your inquiry. Please try again." }, { status: 500 });
  }

  const emailResults = await Promise.allSettled([
    notifyRecruiterOfLead(evaluated.emailPayload),
    sendLeadAcknowledgment(evaluated.emailPayload),
  ]);
  emailResults.forEach((result) => {
    if (result.status === "rejected") {
      console.error("[lead] email side effect failed", result.reason);
    }
  });

  return NextResponse.json({ ok: true });
}
