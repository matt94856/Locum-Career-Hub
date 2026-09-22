"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { persistGenerateLead, trackEvent } from "@/lib/analytics-events";
import { readLeadAttribution } from "@/lib/attribution";
import {
  opportunityFormSpecialty,
  type FeaturedCardiologyOpportunity,
} from "@/lib/featured-cardiology-opportunities";
import { SITE } from "@/lib/site";

type Variant = "aside" | "page" | "card";

type Props = {
  opportunity: FeaturedCardiologyOpportunity;
  variant?: Variant;
  /** Keep a single #lead-form / #apply target per page. */
  showAnchor?: boolean;
};

export function OpportunityInterestForm({
  opportunity,
  variant = "page",
  showAnchor = false,
}: Props) {
  const router = useRouter();
  const startedRef = useRef(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    readLeadAttribution();
    trackEvent("featured_opportunity_form_view", {
      opportunity_slug: opportunity.slug,
      state: opportunity.state,
      page_path: window.location.pathname,
      variant,
    });
  }, [opportunity.slug, opportunity.state, variant]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (!email && !phone) {
      setStatus("error");
      setError("Leave an email or a mobile number so we can send more details.");
      return;
    }

    const formSpecialty = opportunityFormSpecialty(opportunity);
    const source = `featured_opportunity_${opportunity.slug}`.slice(0, 100);
    const pagePath =
      typeof window !== "undefined" ? window.location.pathname : "";

    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName: String(data.get("firstName") ?? "").trim(),
          lastName: "Not provided",
          email,
          phone,
          specialty: formSpecialty,
          preferredStates: [opportunity.state],
          yearsExperience: "Not collected on featured opportunity form",
          availability: "Interested—send more details on this assignment",
          travel: "Not collected—assignment-specific interest",
          clinicalNotes:
            String(data.get("clinicalNotes") ?? "").trim() || null,
          formMode: "quick",
          smsOptIn: data.get("smsOptIn") === "on",
          leadMagnet: false,
          pagePath,
          source,
          opportunitySlug: opportunity.slug,
          qualificationResponses: {},
          attribution: readLeadAttribution(),
          recaptchaToken: "",
          faxLine: String(data.get("faxLine") ?? "").trim(),
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
        code?: string;
      } | null;

      if (!response.ok) {
        setStatus("error");
        setError(
          result?.code === "SUPABASE_NOT_CONFIGURED"
            ? `The form is temporarily unavailable. Call ${SITE.phoneDisplay} or email ${SITE.email} and mention the ${opportunity.state} opportunity.`
            : result?.error ||
                "We could not send that. Please try again or contact us directly.",
        );
        return;
      }

      persistGenerateLead(source, {
        specialty: formSpecialty,
        opportunity_slug: opportunity.slug,
      });
      trackEvent("featured_opportunity_lead", {
        opportunity_slug: opportunity.slug,
        state: opportunity.state,
        page_path: pagePath,
        variant,
        contact_via: [email ? "email" : "", phone ? "phone" : ""]
          .filter(Boolean)
          .join("+"),
      });
      trackEvent("form_submit", {
        form_mode: "featured_opportunity_details",
        opportunity_slug: opportunity.slug,
      });
      window.sessionStorage.setItem("lch_lead_submitted", "1");

      const params = new URLSearchParams({
        specialty: formSpecialty,
        states: opportunity.state,
        from: pagePath,
        opportunity: opportunity.slug,
      });
      router.push(`/thank-you?${params.toString()}`);
    } catch {
      setStatus("error");
      setError(
        `We could not send that. Call ${SITE.phoneDisplay} or try again in a moment.`,
      );
    }
  }

  const isCard = variant === "card";
  const isAside = variant === "aside";

  return (
    <div
      id={showAnchor ? "lead-form" : undefined}
      className={
        isCard
          ? "mt-5 border-t border-slate-100 pt-5"
          : isAside
            ? "mt-6 border-t border-brand-100 pt-6"
            : "scroll-mt-24 rounded-3xl border border-brand-200 bg-white p-6 shadow-lg shadow-brand-900/5 sm:p-8"
      }
    >
      {showAnchor ? <div id="apply" className="scroll-mt-24" /> : null}
      <p
        className={
          isCard
            ? "text-xs font-bold uppercase tracking-[0.16em] text-brand-700"
            : "text-xs font-bold uppercase tracking-[0.18em] text-brand-700"
        }
      >
        Get more details
      </p>
      <h2
        className={
          isCard
            ? "mt-2 font-display text-lg font-bold tracking-tight text-slate-950"
            : isAside
              ? "mt-2 font-display text-xl font-bold tracking-tight text-slate-950"
              : "mt-3 font-display text-3xl font-bold tracking-tight text-slate-950"
        }
      >
        {isCard
          ? `Contact me about ${opportunity.state}`
          : `Send me details on the ${opportunity.state} job`}
      </h2>
      <p
        className={
          isCard
            ? "mt-2 text-sm leading-6 text-slate-600"
            : "mt-3 text-sm leading-6 text-slate-700"
        }
      >
        Leave your email or mobile. A cardiology recruiter will follow up with
        current dates, facility details, and next steps for this assignment.
      </p>

      <form
        className={isCard || isAside ? "relative mt-4 space-y-3" : "relative mt-8 space-y-5"}
        onSubmit={onSubmit}
        onFocusCapture={() => {
          if (startedRef.current) return;
          startedRef.current = true;
          trackEvent("featured_opportunity_form_start", {
            opportunity_slug: opportunity.slug,
            state: opportunity.state,
            variant,
          });
        }}
      >
        <input
          type="text"
          name="faxLine"
          tabIndex={-1}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-hidden="true"
          data-lpignore="true"
          data-1p-ignore="true"
          data-bwignore="true"
          data-form-type="other"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        <label>
          <span className="text-xs font-semibold text-slate-800">First name</span>
          <input
            name="firstName"
            required
            autoComplete="given-name"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
          />
        </label>
        <label>
          <span className="text-xs font-semibold text-slate-800">
            Email <span className="font-normal text-slate-500">(or phone)</span>
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
          />
        </label>
        <label>
          <span className="text-xs font-semibold text-slate-800">
            Mobile <span className="font-normal text-slate-500">(or email)</span>
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Best number"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
          />
        </label>

        {variant !== "card" ? (
          <label>
            <span className="text-xs font-semibold text-slate-800">
              Anything we should know{" "}
              <span className="font-normal text-slate-500">(optional)</span>
            </span>
            <textarea
              name="clinicalNotes"
              rows={2}
              maxLength={2000}
              placeholder="Dates, licenses, or a question about this job."
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
            />
          </label>
        ) : null}

        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
          <input
            name="smsOptIn"
            type="checkbox"
            className="mt-1 size-4 accent-brand-600"
          />
          <span>
            Text me about this opportunity. Message/data rates may apply; reply
            STOP to opt out.
          </span>
        </label>

        {status === "error" && error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-900"
          >
            {error}
          </div>
        ) : null}

        <Button
          type="submit"
          size={isCard ? "md" : "lg"}
          disabled={status === "submitting"}
          className="w-full"
        >
          {status === "submitting" ? "Sending…" : "Send me more details"}
        </Button>
        <p className="text-xs leading-5 text-slate-500">
          A recruiter contacts you about this {opportunity.state} role—not a
          mass list.{" "}
          <Link href="/privacy" className="font-semibold text-brand-700 hover:underline">
            Privacy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
