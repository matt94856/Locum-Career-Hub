"use client";

import { useState } from "react";
import { CARDIOLOGY_SUBSPECIALTIES } from "@/lib/specialties";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics-events";

type Props = {
  className?: string;
  title?: string;
  description?: string;
};

export function NewsletterCapture({
  className = "",
  title = "Cardiology locum market notes",
  description = "Monthly email—subspecialty trends and credentialing reminders. No generic physician blast lists.",
}: Props) {
  const [email, setEmail] = useState("");
  const [subspecialty, setSubspecialty] = useState("General Cardiology");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          subspecialtyInterest: subspecialty,
          pagePath: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Could not subscribe. Try again.");
        return;
      }
      setStatus("success");
      setMessage("You are subscribed—check your inbox to confirm delivery.");
      setEmail("");
      trackEvent("newsletter_signup", { page_path: window.location.pathname });
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <aside
      className={`rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-6 shadow-sm sm:p-7 ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Stay informed</p>
      <h2 className="mt-2 font-display text-xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>

      {status === "success" ? (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {message}
        </p>
      ) : (
        <form className="mt-5 space-y-3" onSubmit={onSubmit}>
          <label className="block">
            <span className="text-xs font-semibold text-slate-800">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-200"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-800">Subspecialty interest</span>
            <select
              value={subspecialty}
              onChange={(e) => setSubspecialty(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-200"
            >
              {CARDIOLOGY_SUBSPECIALTIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit" disabled={status === "loading"} className="w-full justify-center">
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </Button>
          {status === "error" && message ? (
            <p className="text-xs text-red-700">{message}</p>
          ) : null}
          <p className="text-[11px] leading-relaxed text-slate-500">
            Unsubscribe anytime by replying to any email. Not medical, legal, or tax advice.
          </p>
        </form>
      )}
    </aside>
  );
}
