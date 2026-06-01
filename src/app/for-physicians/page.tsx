import type { Metadata } from "next";
import Link from "next/link";
import { GuideCardLink } from "@/components/ui/GuideCardLink";
import { LANDING_PAGES, type LandingPage } from "@/lib/landings";
import { Tier1DiscoveryHub } from "@/components/sections/Tier1DiscoveryHub";
import { buildForPhysiciansSerpMetadata } from "@/lib/serp-ctr";
import { CTA } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildForPhysiciansSerpMetadata();

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

export default function ForPhysiciansPage() {
  const problemPages = bySlugs(PROBLEM_SLUGS);
  const intentPages = bySlugs(HIGH_INTENT_SLUGS);

  return (
    <main className="pb-24 sm:pb-0">
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_15%_-10%,rgba(37,99,235,0.14),transparent_55%),radial-gradient(600px_circle_at_95%_20%,rgba(14,165,233,0.1),transparent_55%)]" />
        <div className="container-site relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">For cardiologists</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Practice cardiology on your terms—without the staffing-agency noise
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
            Most cardiologists who land here are not typing “locum tenens” first. They are tired of call, stretched by
            clinic panels, or quietly grieving the autonomy they thought they would have. This hub is built for MD/DO
            cardiologists only: empathy first, options second, pressure never.
          </p>
          <div className="mt-10 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            <Button href="/physician-opportunities" className="w-full justify-center">
              {CTA.explore}
            </Button>
            <Button href="/contact" variant="secondary" className="w-full justify-center">
              {CTA.recruiter}
            </Button>
          </div>
        </div>
      </section>

      <Tier1DiscoveryHub variant="compact" />

      <section className="py-14 sm:py-16">
        <div className="container-site max-w-3xl space-y-4 text-sm leading-relaxed text-slate-700">
          <h2 className="font-display text-2xl font-semibold text-slate-950">If this sounds familiar, you are not alone</h2>
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
        </div>
      </section>

      <section className="pb-14 sm:pb-16">
        <div className="container-site">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
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

      <section className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-16">
        <div className="container-site">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
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
          </p>
          <div className="mt-10 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            <Button href="/physician-opportunities" className="w-full justify-center">
              {CTA.flexible}
            </Button>
            <Button href="/blog" variant="secondary" className="w-full justify-center">
              {CTA.learn}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
