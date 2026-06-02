import { SITE } from "@/lib/site";

type LeadEmailPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  preferredStates: string[];
  yearsExperience: string;
  availability: string;
  travel: string;
  clinicalNotes?: string | null;
  formMode: "quick" | "full";
  smsOptIn: boolean;
  leadMagnet: boolean;
  pagePath?: string | null;
};

function resendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

async function sendResendEmail(to: string | string[], subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim() || `Locum Career Hub <onboarding@resend.dev>`;
  if (!apiKey) return { ok: false as const, skipped: true };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[lead-email] Resend error", res.status, text);
    return { ok: false as const, skipped: false };
  }
  return { ok: true as const, skipped: false };
}

function leadSummaryHtml(p: LeadEmailPayload): string {
  const states = p.preferredStates.join(", ");
  const notes = p.clinicalNotes?.trim()
    ? `<p><strong>Clinical boundaries:</strong> ${escapeHtml(p.clinicalNotes.trim())}</p>`
    : "";
  return `
    <p><strong>${escapeHtml(p.firstName)} ${escapeHtml(p.lastName)}</strong> — ${escapeHtml(p.specialty)}</p>
    <p>Email: ${escapeHtml(p.email)} · Phone: ${escapeHtml(p.phone)}</p>
    <p>States: ${escapeHtml(states)}</p>
    <p>Experience: ${escapeHtml(p.yearsExperience)} · Availability: ${escapeHtml(p.availability)} · Travel: ${escapeHtml(p.travel)}</p>
    <p>SMS opt-in: ${p.smsOptIn ? "Yes" : "No"} · Guide requested: ${p.leadMagnet ? "Yes" : "No"}</p>
    <p>Form: ${p.formMode} · Source page: ${escapeHtml(p.pagePath ?? "/")}</p>
    ${notes}
  `;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Notify recruiter inbox when a new lead is saved. */
export async function notifyRecruiterOfLead(p: LeadEmailPayload): Promise<void> {
  const notifyTo = process.env.LEAD_NOTIFY_EMAIL?.trim() || SITE.email;
  if (!resendConfigured()) return;

  await sendResendEmail(
    notifyTo,
    `[New cardiologist inquiry] ${p.specialty} — ${p.preferredStates[0] ?? "multi-state"}`,
    `<h2>New cardiologist inquiry</h2>${leadSummaryHtml(p)}<p><a href="mailto:${escapeHtml(p.email)}">Reply to candidate</a></p>`,
  );
}

/** Auto-acknowledgment to the cardiologist after form submit. */
export async function sendLeadAcknowledgment(p: LeadEmailPayload): Promise<void> {
  if (!resendConfigured()) return;

  const guideNote = p.leadMagnet
    ? `<p>We will send <strong>The Physician’s Guide to Locum Tenens</strong> to this inbox shortly. Check spam if you do not see it within a few minutes.</p>`
    : "";

  await sendResendEmail(
    p.email,
    "We received your cardiology locum inquiry | Locum Career Hub",
    `
      <p>Hi ${escapeHtml(p.firstName)},</p>
      <p>Thank you for reaching out to ${SITE.name}. A cardiology recruiter will review your subspecialty (${escapeHtml(p.specialty)}) and preferred states.</p>
      <p><strong>What happens next:</strong></p>
      <ul>
        <li>If realistic locum opportunities match your profile, we typically follow up within one business day (often sooner).</li>
        <li>If nothing fits your selected states right now, we will tell you directly—no mass blast.</li>
      </ul>
      ${guideNote}
      <p>Want to talk sooner? <a href="${SITE.calendlyUrl}">Book a short intro call</a> or call ${SITE.phoneDisplay}.</p>
      <p style="color:#64748b;font-size:12px;">Educational content only—not an employment offer or guaranteed compensation.</p>
    `,
  );
}

export async function sendNewsletterWelcome(email: string): Promise<void> {
  if (!resendConfigured()) return;

  await sendResendEmail(
    email,
    "Cardiology locum updates | Locum Career Hub",
    `
      <p>Thanks for subscribing.</p>
      <p>You will receive occasional cardiology locum market notes—subspecialty trends, credentialing reminders, and recruiter insights. No generic physician blast lists.</p>
      <p>Ready to explore matches now? <a href="${SITE.url}/physician-opportunities#lead-form">Submit a cardiologist inquiry</a>.</p>
      <p style="color:#64748b;font-size:12px;">Reply to this email anytime to unsubscribe.</p>
    `,
  );
}
