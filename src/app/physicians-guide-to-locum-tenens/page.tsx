import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PrintButton } from "@/components/util/PrintButton";
import { SITE } from "@/lib/site";
import { socialShareMetadata } from "@/lib/social-metadata";

const GUIDE_DESC =
  "A practical, physician-first guide to locum tenens: scheduling models, compensation questions, credentialing, travel, and burnout recovery framing.";

export const metadata: Metadata = {
  title: "The Physician’s Guide to Locum Tenens (Printable)",
  description: GUIDE_DESC,
  alternates: { canonical: "/physicians-guide-to-locum-tenens" },
  ...socialShareMetadata({
    title: `Physician’s Guide to Locum Tenens | ${SITE.name}`,
    description: GUIDE_DESC,
    path: "/physicians-guide-to-locum-tenens",
  }),
};

export default function PhysiciansGuidePage() {
  return (
    <main className="pb-24 sm:pb-0 print:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16 print:hidden">
        <div className="container-prose">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Lead magnet</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            The Physician’s Guide to Locum Tenens
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Save this page, print to PDF, or request an emailed copy via the inquiry form on the homepage.
          </p>
          <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            <Button href="/#lead-form" className="w-full justify-center">
              Email me the PDF
            </Button>
            <PrintButton />
          </div>
        </div>
      </section>

      <section className="container-prose py-14 sm:py-16">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm print:border-slate-300 print:shadow-none">
          <GuideBody />
        </div>

        <div className="mt-10 rounded-3xl border border-slate-100 bg-slate-50 p-6 print:hidden">
          <h2 className="font-display text-xl font-semibold text-slate-950">Want recruiter-backed options?</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            This guide is educational. For placement-specific timelines, stipends, and malpractice details, talk with a
            recruiter.
          </p>
          <div className="mt-5 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            <Button href="/physician-opportunities#lead-form" className="w-full justify-center">
              Submit an inquiry
            </Button>
            <Button href="/contact" variant="secondary" className="w-full justify-center">
              Book a call
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function GuideBody() {
  return (
    <div className="space-y-8 text-sm leading-relaxed text-slate-700 sm:text-base">
      <div>
        <h2 className="font-display text-2xl font-semibold text-slate-950">1) What locums solves (and what it does not)</h2>
        <p className="mt-4">
          Locum tenens is best understood as a scheduling and work-environment strategy. It can reduce certain burnout
          drivers—especially administrative overload and loss of autonomy—by letting you choose higher-leverage clinical
          blocks. It does not automatically fix moral injury, unsafe staffing, or personal health challenges without
          boundaries and site selection discipline.
        </p>
      </div>

      <div>
        <h2 className="font-display text-2xl font-semibold text-slate-950">2) The four scheduling models physicians actually use</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold text-slate-900">Block inpatient weeks:</span> predictable on/off cadence.
          </li>
          <li>
            <span className="font-semibold text-slate-900">Weekend moonlighting:</span> additive income with tight scope.
          </li>
          <li>
            <span className="font-semibold text-slate-900">Seasonal bursts:</span> earn aggressively, then recover.
          </li>
          <li>
            <span className="font-semibold text-slate-900">Semi-retirement glide paths:</span> fewer shifts, more selectivity.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="font-display text-2xl font-semibold text-slate-950">3) Compensation: the 12 questions that prevent regret</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>What is the weekly rate—and what does it assume for hours/census?</li>
          <li>How are extra shifts paid?</li>
          <li>What is included in stipends (travel, lodging, rental car)?</li>
          <li>Malpractice type and tail coverage expectations?</li>
          <li>Cancelation policies and stipend caps?</li>
          <li>Who owns credentialing costs?</li>
          <li>Telehealth or remote charting expectations?</li>
          <li>Supervision model and APP layers?</li>
          <li>Call burden and post-call protections?</li>
          <li>Documentation environment (EHR, scribes, templates)?</li>
          <li>Billing productivity pressure—real or implied?</li>
          <li>Start date realism based on privileging?</li>
        </ol>
      </div>

      <div>
        <h2 className="font-display text-2xl font-semibold text-slate-950">4) Credentialing without chaos</h2>
        <p className="mt-4">
          Treat credentialing like a project plan: owners, deadlines, and document checklist. The fastest placements
          happen when physicians respond quickly—and recruiters pre-clear dealbreakers like procedure requirements,
          case mix, and privilege categories.
        </p>
      </div>

      <div>
        <h2 className="font-display text-2xl font-semibold text-slate-950">5) Travel that does not wreck your nervous system</h2>
        <p className="mt-4">
          Sustainable travel locums is a systems game: sleep consistency, duplicated essentials, predictable recovery
          days, and choosing sites with honest cross-cover expectations.
        </p>
      </div>

      <div>
        <h2 className="font-display text-2xl font-semibold text-slate-950">6) A simple decision framework</h2>
        <p className="mt-4">
          If an assignment improves either autonomy, income, recovery time, or skill fit—without unacceptable safety
          tradeoffs—it is worth serious consideration. If it only chases a headline rate, pause.
        </p>
      </div>
    </div>
  );
}
