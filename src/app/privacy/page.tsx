import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { buildSerpMetadata } from "@/lib/serp-ctr";

export const metadata: Metadata = buildSerpMetadata({
  title: "Privacy Policy",
  description:
    "How Locum Career Hub collects and uses physician inquiry information for cardiologist recruiting. Educational recruiting site—not medical or legal advice.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-slate-50 py-14 sm:py-16">
        <div className="container-prose">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Compliance</p>
          <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-slate-950 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            This policy explains how Locum Career Hub handles information you share when exploring cardiology locum
            opportunities. It is written for busy physicians—not legalese theater. It is not legal advice.
          </p>
          <p className="mt-3 text-sm text-slate-500">Last updated: July 28, 2026</p>
        </div>
      </section>

      <section className="container-prose space-y-10 py-14 text-base leading-relaxed text-slate-700">
        <div>
          <h2 className="font-display text-2xl font-normal text-slate-950">Who we are</h2>
          <p className="mt-4">
            Locum Career Hub ({SITE.domain}) is a cardiologist-focused recruiting and career-education site operated in
            partnership with physician recruiting workflows. Contact:{" "}
            <a className="font-semibold text-brand-700 hover:underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>{" "}
            or{" "}
            <a className="font-semibold text-brand-700 hover:underline" href={`tel:${SITE.phoneTel}`}>
              {SITE.phoneDisplay}
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-normal text-slate-950">Information we collect</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Inquiry details you submit (name, email, phone, specialty, preferred states, availability, notes).</li>
            <li>Optional calculator or tool inputs you choose to share with a PDF or follow-up request.</li>
            <li>Basic analytics events (page views, CTA clicks) via Google Analytics and similar tools when configured.</li>
            <li>Attribution parameters (UTM, ad click IDs) when present in your browser session.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl font-normal text-slate-950">How we use information</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>To respond to cardiologist inquiries and discuss potential locum matches.</li>
            <li>To email requested guides or printable tool results when you ask for them.</li>
            <li>To improve site performance, content relevance, and spam protection (including reCAPTCHA when enabled).</li>
            <li>We do not sell physician contact lists as a product.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl font-normal text-slate-950">Sharing</h2>
          <p className="mt-4">
            Inquiry details may be shared with recruiting team members supporting Locum Career Hub placements. Service
            providers (email delivery, hosting, analytics, captcha) process data only to operate the site. Facility
            partners receive information only as needed to evaluate a potential assignment you are considering.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-normal text-slate-950">Your choices</h2>
          <p className="mt-4">
            Email or call us to update or delete inquiry records we control, or to opt out of non-essential follow-up.
            SMS opt-in is optional; reply STOP to opt out of texts. Browser controls can limit analytics cookies where
            applicable.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-normal text-slate-950">Security and retention</h2>
          <p className="mt-4">
            We use reasonable administrative and technical safeguards. No method of transmission is perfectly secure.
            We retain inquiry records as needed for recruiting follow-up and compliance, then delete or de-identify when
            no longer needed.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-normal text-slate-950">Not medical or legal advice</h2>
          <p className="mt-4">
            Site content is educational. It is not medical, legal, tax, or employment advice. Assignment terms vary by
            facility and contract.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          Questions? Visit{" "}
          <Link className="font-semibold text-brand-700 hover:underline" href="/contact">
            Contact
          </Link>{" "}
          or email {SITE.email}.
        </p>
      </section>
    </main>
  );
}
