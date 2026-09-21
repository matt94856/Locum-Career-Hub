"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LeadFormAltActions } from "@/components/forms/LeadFormAltActions";
import {
  RecaptchaField,
  type RecaptchaFieldHandle,
} from "@/components/forms/RecaptchaField";
import { persistGenerateLead, trackEvent } from "@/lib/analytics-events";
import { readLeadAttribution } from "@/lib/attribution";
import {
  opportunityFormSpecialty,
  type FeaturedCardiologyOpportunity,
} from "@/lib/featured-cardiology-opportunities";
import { SITE } from "@/lib/site";

const recaptchaSiteConfigured = Boolean(
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
);

type Props = {
  opportunity: FeaturedCardiologyOpportunity;
};

export function OpportunityInterestForm({ opportunity }: Props) {
  const router = useRouter();
  const recaptchaRef = useRef<RecaptchaFieldHandle>(null);
  const startedRef = useRef(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [captchaReady, setCaptchaReady] = useState(!recaptchaSiteConfigured);
  const [captchaLoadError, setCaptchaLoadError] = useState(false);

  useEffect(() => {
    readLeadAttribution();
    trackEvent("featured_opportunity_form_view", {
      opportunity_slug: opportunity.slug,
      state: opportunity.state,
      page_path: window.location.pathname,
    });
  }, [opportunity.slug, opportunity.state]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const recaptchaToken = recaptchaSiteConfigured
      ? (recaptchaRef.current?.getToken() ?? "")
      : "";

    if (recaptchaSiteConfigured && (!captchaReady || captchaLoadError)) {
      setStatus("error");
      setError(
        captchaLoadError
          ? "Security verification could not load. Please refresh or contact us directly."
          : "Security verification is still loading. Please try again in a moment.",
      );
      return;
    }
    if (recaptchaSiteConfigured && !recaptchaToken) {
      setStatus("error");
      setError("Please complete the security verification before submitting.");
      return;
    }

    const qualificationResponses = Object.fromEntries(
      opportunity.screeningQuestions
        .map((question) => [
          question.id,
          String(data.get(`screening_${question.id}`) ?? "").trim(),
        ])
        .filter(([, value]) => Boolean(value)),
    );
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
          lastName: String(data.get("lastName") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
          specialty: formSpecialty,
          preferredStates: [opportunity.state],
          yearsExperience: "Not collected on featured opportunity form",
          availability:
            String(data.get("availability") ?? "").trim() ||
            "Interested—confirm assignment dates",
          travel: "Not collected—assignment-specific interest",
          clinicalNotes:
            String(data.get("clinicalNotes") ?? "").trim() || null,
          formMode: "quick",
          smsOptIn: data.get("smsOptIn") === "on",
          leadMagnet: false,
          pagePath,
          source,
          opportunitySlug: opportunity.slug,
          qualificationResponses,
          attribution: readLeadAttribution(),
          recaptchaToken,
          faxLine: String(data.get("faxLine") ?? "").trim(),
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
        code?: string;
      } | null;

      if (!response.ok) {
        recaptchaRef.current?.reset();
        setStatus("error");
        setError(
          result?.code === "SUPABASE_NOT_CONFIGURED"
            ? `The form is temporarily unavailable. Call ${SITE.phoneDisplay} or email ${SITE.email} and mention the ${opportunity.state} opportunity.`
            : result?.error ||
                "We could not submit your interest. Please try again or contact us directly.",
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
      });
      trackEvent("form_submit", {
        form_mode: "featured_opportunity",
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
      recaptchaRef.current?.reset();
      setStatus("error");
      setError(
        `We could not submit your interest. Call ${SITE.phoneDisplay} or try again in a moment.`,
      );
    }
  }

  return (
    <div
      id="lead-form"
      className="scroll-mt-24 rounded-3xl border border-brand-200 bg-white p-6 shadow-lg shadow-brand-900/5 sm:p-8"
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
        Private physician inquiry
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950">
        Ask about the {opportunity.state} opportunity
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
        Send the four contact fields below. The fit questions are optional and
        help us answer you faster. A cardiology recruiter typically responds
        within one business day.
      </p>

      <div className="mt-5 max-w-xl">
        <LeadFormAltActions
          source={`featured_${opportunity.stateSlug}`}
          compact
        />
      </div>

      <form
        className="relative mt-8 space-y-7"
        onSubmit={onSubmit}
        onFocusCapture={() => {
          if (startedRef.current) return;
          startedRef.current = true;
          trackEvent("featured_opportunity_form_start", {
            opportunity_slug: opportunity.slug,
            state: opportunity.state,
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

        <fieldset>
          <legend className="font-display text-lg font-bold text-slate-950">
            Contact information
          </legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label>
              <span className="text-xs font-semibold text-slate-800">
                First name
              </span>
              <input
                name="firstName"
                required
                autoComplete="given-name"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
              />
            </label>
            <label>
              <span className="text-xs font-semibold text-slate-800">
                Last name
              </span>
              <input
                name="lastName"
                required
                autoComplete="family-name"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
              />
            </label>
            <label>
              <span className="text-xs font-semibold text-slate-800">Email</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
              />
            </label>
            <label>
              <span className="text-xs font-semibold text-slate-800">Phone</span>
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="Best number for follow-up"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
          <legend className="px-1 font-display text-lg font-bold text-slate-950">
            Help us respond faster{" "}
            <span className="font-sans text-xs font-normal text-slate-500">
              (optional)
            </span>
          </legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <label>
              <span className="text-xs font-semibold text-slate-800">
                When could you start?
              </span>
              <select
                name="availability"
                defaultValue=""
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
              >
                <option value="">Confirm dates with me</option>
                <option value="ASAP">ASAP</option>
                <option value="Within 30 days">Within 30 days</option>
                <option value="1–3 months">1–3 months</option>
                <option value="3–6 months">3–6 months</option>
                <option value="Exploring / no firm date">
                  Exploring / no firm date
                </option>
              </select>
            </label>
            {opportunity.screeningQuestions.map((question) => (
              <label key={question.id}>
                <span className="text-xs font-semibold leading-5 text-slate-800">
                  {question.label}
                </span>
                <select
                  name={`screening_${question.id}`}
                  defaultValue=""
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
                >
                  <option value="">Prefer to discuss</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            <label className="sm:col-span-2">
              <span className="text-xs font-semibold text-slate-800">
                Question or scheduling note
              </span>
              <textarea
                name="clinicalNotes"
                rows={3}
                maxLength={2000}
                placeholder="Optional—share dates, call questions, or the best time to reach you."
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-200 focus:border-brand-300 focus:ring-4"
              />
            </label>
          </div>
        </fieldset>

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

        <RecaptchaField
          ref={recaptchaRef}
          onReady={() => {
            setCaptchaReady(true);
            setCaptchaLoadError(false);
          }}
          onLoadError={() => {
            setCaptchaLoadError(true);
            setCaptchaReady(false);
          }}
        />

        {status === "error" && error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
          >
            {error}
          </div>
        ) : null}

        <div className="border-t border-slate-100 pt-6">
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="w-full sm:w-auto"
          >
            {status === "submitting"
              ? "Sending interest…"
              : "Send my private inquiry"}
          </Button>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            No mass blast. By submitting, you agree that we may contact you
            about this opportunity and related cardiology roles. This is not an
            employment offer. See our{" "}
            <Link
              href="/privacy"
              className="font-semibold text-brand-700 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
