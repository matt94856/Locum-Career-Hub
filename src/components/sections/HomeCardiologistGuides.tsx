import Link from "next/link";
import { GuideCardLink } from "@/components/ui/GuideCardLink";
import { Button } from "@/components/ui/Button";
import { LeadConversionBand } from "@/components/sections/LeadConversionBand";
import { LANDING_PAGES, type LandingPage } from "@/lib/landings";
import { HOME_LEAD_ANCHOR } from "@/lib/seo/tier1-discovery";
import { CTA } from "@/lib/site";

export const HOME_CARDIOLOGIST_GUIDES_ID = "cardiologist-guides" as const;

const PROBLEM_SLUGS = [
  "physician-burnout-solutions",
  "physician-burnout-alternatives",
  "doctor-work-life-balance",
  "flexible-physician-careers",
  "physician-schedule-flexibility",
  "part-time-physician-jobs",
  "physician-side-income",
  "moonlighting-physician-jobs",
  "careers-after-residency",
  "locum-jobs-for-new-graduates",
  "retired-physician-opportunities",
  "leaving-employed-cardiology",
  "career-change-for-doctors",
  "tired-of-being-a-doctor",
] as const;

const HIGH_INTENT_SLUGS = [
  "national-locum-tenens-jobs-guide",
  "locum-opportunities",
  "locum-physician-jobs",
  "cardiologist-travel-locums",
  "interventional-cardiologist-locum-jobs",
  "physician-travel-jobs",
] as const;

function bySlugs(slugs: readonly string[]): LandingPage[] {
  const map = new Map(LANDING_PAGES.map((p) => [p.slug, p]));
  return slugs.map((s) => map.get(s)).filter((p): p is LandingPage => Boolean(p));
}

/** Former /for-physicians content — merged into homepage for cardiologist-only funnel. */
export function HomeCardiologistGuides() {
  const problemPages = bySlugs(PROBLEM_SLUGS);
  const intentPages = bySlugs(HIGH_INTENT_SLUGS);

  return (
    <>
      <section className="border-b border-slate-100 py-14 sm:py-16">
        <div className="container-site max-w-3xl space-y-4 text-sm leading-relaxed text-slate-700">
          <h2 className="font-display text-2xl font-semibold text-slate-950 sm:text-3xl">
            If cath lab call and clinic load feel unsustainable, you are not alone
          </h2>
          <ul className="list-disc space-y-2 pl-5 marker:text-brand-600">
            <li>Relentless cath lab or consult call and difficulty switching off</li>
            <li>Hospital politics and admin load crowding out patient care</li>
            <li>Loss of autonomy—or uncertainty about what comes next in cardiology</li>
            <li>A pull toward flexibility, moonlighting, semi-retirement, or relocation</li>
            <li>A wish for income that does not require sacrificing your health</li>
          </ul>
          <p>
            Cardiology locum tenens is one path among many. When it fits, it can offer defined blocks, clearer call and
            cath lab boundaries, and a calmer way to stay clinical while you redesign life. When it does not fit, you
            still deserve a thoughtful conversation with a cardiology recruiter—not a generic job blast.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href={HOME_LEAD_ANCHOR} className="justify-center">
              {CTA.explore}
            </Button>
            <Button href="/locum-jobs/cardiology" variant="secondary" className="justify-center">
              Browse cardiology locum jobs →
            </Button>
          </div>
        </div>
      </section>

      <section id={HOME_CARDIOLOGIST_GUIDES_ID} className="scroll-mt-24 pb-14 sm:pb-16">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Cardiologist guides</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              Guides for problem-aware searches
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Skimmable pages for burnout, balance, side income, schedule design, and early-career cardiology exploration.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
            {problemPages.map((p) => (
              <div key={p.slug} className="min-w-0">
                <GuideCardLink href={`/${p.slug}`} title={p.h1} description={p.description} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cardiology-locum-intent" className="scroll-mt-24 border-t border-slate-100 bg-slate-50/60 py-14 sm:py-16">
        <div className="container-site">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              When you are ready: high-intent cardiology searches
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Straightforward guides for cardiology locums, travel blocks, subspecialty hubs, and major states.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
            {intentPages.map((p) => (
              <div key={p.slug} className="min-w-0">
                <GuideCardLink href={`/${p.slug}`} title={p.h1} description={p.description} />
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            <Link className="font-semibold text-brand-700 hover:underline" href="/guides">
              Browse the complete cardiology guide library →
            </Link>
            {" · "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/resources">
              Cardiology career resources →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-10 sm:py-12">
        <div className="container-site max-w-3xl">
          <LeadConversionBand
            headline="Talk with a cardiology recruiter"
            subline="Share subspecialty, states, and boundaries—we respond with realistic locum matches, not spam."
          />
        </div>
      </section>
    </>
  );
}
