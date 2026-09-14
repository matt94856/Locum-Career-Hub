import "jsr:@supabase/functions-js/edge-runtime.d.ts";

/**
 * Database webhook target for `physician_leads` INSERT.
 *
 * Secrets (Supabase Dashboard → Edge Functions → Secrets, not Netlify):
 *   LEAD_SMS_WEBHOOK_SECRET  — shared with the Database Webhook Authorization header
 *   TWILIO_ACCOUNT_SID
 *   TWILIO_AUTH_TOKEN
 *   TWILIO_FROM_NUMBER       — E.164, e.g. +1XXXXXXXXXX
 *   LEAD_SMS_TO              — optional; defaults to +13522936242
 */
const DEFAULT_TO = "+13522936242";

type WebhookPayload = {
  type?: string;
  table?: string;
  record?: Record<string, unknown> | null;
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function bearerToken(req: Request): string {
  const header = req.headers.get("authorization") ?? "";
  if (header.toLowerCase().startsWith("bearer ")) return header.slice(7).trim();
  return (req.headers.get("x-lead-sms-secret") ?? "").trim();
}

function authorized(req: Request): boolean {
  const secret = (Deno.env.get("LEAD_SMS_WEBHOOK_SECRET") ?? "").trim();
  const token = bearerToken(req);
  if (!secret || !token || secret.length !== token.length) return false;
  const enc = new TextEncoder();
  const a = enc.encode(secret);
  const b = enc.encode(token);
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a[i] ^ b[i];
  return mismatch === 0;
}

function formatSms(record: Record<string, unknown>): string {
  const states = Array.isArray(record.preferred_states)
    ? record.preferred_states.filter((state): state is string => typeof state === "string" && state.trim().length > 0).join(", ")
    : "";
  const phone = str(record.phone);
  const lines = [
    "New Locum Career Hub lead",
    `${str(record.first_name)} ${str(record.last_name)}`.trim(),
    str(record.specialty),
    str(record.source) || "form",
    states ? `States: ${states}` : "",
    phone && phone.toUpperCase() !== "N/A" ? `Ph: ${phone}` : "",
    str(record.email) ? `Em: ${str(record.email)}` : "",
    str(record.page_path) ? `Page: ${str(record.page_path)}` : "",
  ].filter(Boolean);
  return lines.join("\n").slice(0, 1400);
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  if (!authorized(req)) {
    return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const sid = (Deno.env.get("TWILIO_ACCOUNT_SID") ?? "").trim();
  const token = (Deno.env.get("TWILIO_AUTH_TOKEN") ?? "").trim();
  const from = (Deno.env.get("TWILIO_FROM_NUMBER") ?? "").trim();
  const to = (Deno.env.get("LEAD_SMS_TO") ?? "").trim() || DEFAULT_TO;

  if (!sid || !token || !from) {
    return new Response(JSON.stringify({ ok: false, error: "twilio_not_configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  let payload: WebhookPayload;
  try {
    payload = (await req.json()) as WebhookPayload;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (payload.table && payload.table !== "physician_leads") {
    return new Response(JSON.stringify({ ok: true, skipped: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const record = payload.record && typeof payload.record === "object" ? payload.record : null;
  if (!record) {
    return new Response(JSON.stringify({ ok: false, error: "missing_record" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const twilioRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${sid}:${token}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      To: to,
      From: from,
      Body: formatSms(record),
    }),
  });

  if (!twilioRes.ok) {
    console.error("twilio_error", twilioRes.status);
    return new Response(JSON.stringify({ ok: false, error: "twilio_failed" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
