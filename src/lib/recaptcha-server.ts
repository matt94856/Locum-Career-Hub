/**
 * Verifies a Google reCAPTCHA v2 / v3 response token via Siteverify API.
 * @see https://developers.google.com/recaptcha/docs/verify
 */
export async function verifyRecaptchaToken(token: string, remoteip?: string | null): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return true;
  }

  const trimmed = token.trim();
  if (!trimmed) {
    return false;
  }

  const body = new URLSearchParams({ secret, response: trimmed });
  if (remoteip) {
    body.set("remoteip", remoteip);
  }

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    return false;
  }

  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}
