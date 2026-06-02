import type { Metadata } from "next";
import Link from "next/link";
import { ThankYouConversionTracker } from "@/components/analytics/ThankYouConversionTracker";
import { CalendlyBookButton } from "@/components/cta/CalendlyBookButton";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { thankYouReadingLinks } from "@/lib/lead-form-context";
import { SITE, CTA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You | Inquiry Received",
  description: "Your cardiologist locum inquiry was received. Next steps from Locum Career Hub.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

type Props = {
  searchParams: Promise<{ specialty?: string; states?: string; from?: string }>;
};

export default async function ThankYouPage({ searchParams }: Props) {
  const params = await searchParams;
  const specialty = params.specialty?.trim();
  const states = params.states?.split("|").filter(Boolean) ?? [];
  const fromPath = params.from?.trim();
  const reading = thankYouReadingLinks(fromPath ?? null);

  return (
    <main className="pb-24 sm:pb-0">
      <ThankYouConversionTracker />
      <section className="border-b border-emerald-100 bg-gradient-to-b from-emerald-50/80 to-white py-14 sm:py-20">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">Inquiry received</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Thank you—we are on it
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            A cardiology recruiter will review your profile
            {specialty ? (
              <>
                {" "}
                (<strong className="font-semibold text-slate-800">{specialty}</strong>)
              </>
            ) : null}
            {states.length > 0 ? (
              <>
                {" "}
                for markets including <strong className="font-semibold text-slate-800">{states.join(", ")}</strong>
              </>
            ) : null}
            . If realistic locum opportunities exist, we typically follow up within <strong>one business day</strong>—often
            sooner for urgent timelines.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-emerald-600" aria-hidden>
                ✓
              </span>
              <span>No mass email blast—if nothing matches, we will tell you directly.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600" aria-hidden>
                ✓
              </span>
              <span>Check your inbox (and spam) for our confirmation and optional locum guide.</span>
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <CalendlyBookButton source="thank_you" className="w-full justify-center sm:w-auto">
              {CTA.bookCall}
            </CalendlyBookButton>
            <Button href={`tel:${SITE.phoneTel}`} variant="secondary" className="w-full justify-center sm:w-auto">
              Call {SITE.phoneDisplay}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <SectionHeading
              align="left"
              eyebrow="While you wait"
              title="Recommended reading for your situation"
              subtitle="Short, cardiology-specific guides—not generic physician job-board noise."
            />
            <ul className="mt-8 space-y-3">
              {reading.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="surface-card block p-4 text-sm font-semibold text-brand-700 hover:text-brand-950"
                  >
                    {link.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-5">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 sm:p-7">
              <h2 className="font-display text-xl font-semibold text-slate-950">Know a cardiologist exploring options?</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Refer a colleague—when they submit an inquiry and mention your name, we prioritize transparent follow-up for
                both of you. We recruit cardiologists only (MD/DO).
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Share:{" "}
                <a className="font-semibold text-brand-700 hover:underline" href={`${SITE.url}/physician-opportunities`}>
                  {SITE.url}/physician-opportunities
                </a>
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-6">
              <h3 className="font-display text-lg font-semibold text-slate-950">One more thing that helps us match you</h3>
              <p className="mt-2 text-sm text-slate-600">
                Reply to our confirmation email with your hardest boundary—solo STEMI, max consult census, cath lab
                frequency, or travel radius. It saves a round trip on the first call.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
