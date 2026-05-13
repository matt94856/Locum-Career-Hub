import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import {
  buildSpecialtyMetadata,
  getSpecialtyNameBySlug,
  SPECIALTY_SEO_SLUGS,
  specialtyToSlug,
} from "@/lib/specialty-seo";
import { FEATURED_STATES } from "@/lib/states";
import { specialtyStatePath } from "@/lib/specialty-state-seo";
import { SPECIALTIES } from "@/lib/specialties";
import { CTA } from "@/lib/site";

const SPECIALTY_FAQ = (name: string) =>
  [
    {
      q: `What does flexible or locum-style work look like in ${name}?`,
      a: `Assignments vary by site, but the goal is the same: documented expectations for volume, backup, call, and documentation before you commit. We help you compare options that match your stamina and licensing footprint.`,
    },
    {
      q: "Do I need to know the term ‘locum tenens’ to inquire?",
      a: "No. Many physicians start with burnout, flexibility, or income questions. Contract block coverage is one tool we can explain in plain language.",
    },
    {
      q: "What speeds up matching?",
      a: "Share specialty, states you will consider, availability windows, travel appetite, and hard boundaries (nights, census, documentation load).",
    },
  ] as const;

export function generateStaticParams() {
  return SPECIALTY_SEO_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = getSpecialtyNameBySlug(slug);
  if (!name) return {};
  return buildSpecialtyMetadata(name, slug);
}

export default async function SpecialtyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const name = getSpecialtyNameBySlug(slug);
  if (!name) notFound();

  const path = `/specialties/${slug}`;
  const faqs = SPECIALTY_FAQ(name);
  const directAnswer = `${name} locum and flexible contract roles are short- or medium-term clinical assignments with explicit scheduling windows—often used when physicians want clearer boundaries, different intensity, or a calmer bridge while deciding what comes next.`;

  const medical = medicalWebPageJsonLd({
    name: `${name} locum & flexible physician work | Locum Career Hub`,
    description: `Explore flexible and locum-style ${name} opportunities with realistic scheduling and recruiter advocacy.`,
    path,
    keywords: [
      `${name} locum`,
      "locum tenens jobs",
      "locum physician jobs",
      "physician recruiter",
      "flexible physician careers",
    ],
    aboutTopics: [name, "Locum tenens", "Physician careers", "Flexible physician work"],
  });

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Specialties", path: "/specialties" },
    { name, path },
  ]);

  const other = SPECIALTIES.filter((s) => specialtyToSlug(s) !== slug).slice(0, 6);

  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={medical} />
      <JsonLd data={faqJsonLd([...faqs])} />
      <JsonLd data={crumbs} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Specialty</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-5xl">
            {name}: flexible work when the week no longer fits
          </h1>
          <h2 className="mt-4 text-lg font-medium text-slate-700 sm:text-xl">
            Locum tenens jobs and contract blocks—explained without staffing-agency noise
          </h2>
          <p className="mt-6 rounded-2xl border border-brand-100 bg-white/90 p-4 text-base font-medium leading-relaxed text-slate-800 shadow-sm sm:p-5 sm:text-lg">
            <span className="text-brand-800">Direct answer: </span>
            {directAnswer}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            If you are problem-aware first—burned out, schedule-strained, or unsure what is next—you still deserve clarity.
            This page is structured for semantic search and AI summaries: what {name} locums typically involves, what to
            ask before you sign, and how to move toward a calmer next step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/physician-opportunities#lead-form" className="justify-center">
              {CTA.explore}
            </Button>
            <Button href="/for-physicians" variant="secondary" className="justify-center">
              For physicians hub →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 space-y-10 lg:col-span-7">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:p-6">
              <h2 className="font-display text-lg font-semibold text-slate-950">Who should read this</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                  <span>{name} clinicians exploring locum tenens jobs or flexible physician jobs</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                  <span>Physicians comparing travel physician jobs vs local block coverage</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                  <span>New grads and mid-career attendings who want expectations documented before day one</span>
                </li>
              </ul>
            </div>

            <section>
              <h2 className="font-display text-2xl font-semibold text-slate-950">Pain first—then the tool</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                Many physicians find {name} rewarding and still hit a wall: chronic understaffing, inbox obligations, or
                nights that never quite end. Flexible contract assignments can reduce certain structural stressors when
                expectations are explicit—but they are not magic, and fit still matters.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-slate-950">What to clarify before you commit</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                  <span>Census, backup, and staffing layers (who is actually in the building overnight)</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                  <span>Call, post-call, and handoff norms—written, not vibes</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600" />
                  <span>Malpractice, stipends, housing, and cancellation terms</span>
                </li>
              </ul>
            </section>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-display text-xl font-semibold text-slate-950">{name} locums by state</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                High-intent examples—each opens a dedicated specialty × state page with FAQs and a lead path.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {FEATURED_STATES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={specialtyStatePath(s.slug, slug)}
                      className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/locum-tenens-jobs"
                    className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50"
                  >
                    All states →
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">FAQs</h2>
              <dl className="mt-6 space-y-6">
                {faqs.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <dt className="font-semibold text-slate-900">{f.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-slate-950">Other specialties</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {other.map((s) => (
                  <li key={s}>
                    <Link
                      href={`/specialties/${specialtyToSlug(s)}`}
                      className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50"
                    >
                      {s}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/locum-tenens-jobs"
                    className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50"
                  >
                    National locum hub →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <aside className="min-w-0 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <LeadCaptureForm
              title={`Request ${name} matches`}
              subtitle="Share availability, states, and boundaries. We will respond with realistic options—not spam."
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
