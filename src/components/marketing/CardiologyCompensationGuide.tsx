import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Section = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export function CardiologyCompensationGuide({
  eyebrow,
  title,
  directAnswer,
  sections,
  faqs,
}: {
  eyebrow: string;
  title: string;
  directAnswer: string;
  sections: Section[];
  faqs: { q: string; a: string }[];
}) {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-slate-50 py-14 sm:py-18">
        <div className="container-site max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            <strong className="text-slate-900">Direct answer:</strong> {directAnswer}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/cardiologist-locums-calculator">Calculate my earning potential</Button>
            <Button href="/physician-opportunities#lead-form" variant="secondary">Request cardiology matches</Button>
          </div>
        </div>
      </section>

      <div className="container-site grid max-w-6xl gap-12 py-14 lg:grid-cols-12">
        <article className="space-y-12 lg:col-span-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-3xl font-semibold text-slate-950">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-600">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets ? (
                <ul className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700">
                  {section.bullets.map((bullet) => <li key={bullet}>✓ {bullet}</li>)}
                </ul>
              ) : null}
            </section>
          ))}

          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-950">Frequently asked questions</h2>
            <div className="mt-6 divide-y divide-slate-200">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-5">
                  <h3 className="font-semibold text-slate-950">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 rounded-3xl border border-brand-100 bg-brand-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Personalized next step</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-slate-950">See what your profile could earn</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Model your specialty, schedule, licenses, assignment style, and travel preferences in under two minutes.</p>
            <Button href="/cardiologist-locums-calculator" className="mt-5 w-full justify-center">Use the calculator</Button>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">Educational ranges only. Actual offers depend on written assignment scope and market conditions.</p>
          </div>
        </aside>
      </div>

      <section className="border-t border-slate-100 bg-slate-50 py-10">
        <div className="container-site flex max-w-4xl flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link href="/locum-jobs/cardiology" className="font-semibold text-brand-700 hover:underline">Cardiology locums hub</Link>
          <Link href="/states" className="font-semibold text-brand-700 hover:underline">Browse by state</Link>
          <Link href="/tools/cardiology-locum-offer-comparison" className="font-semibold text-brand-700 hover:underline">Compare locum offers</Link>
          <Link href="/tools/cardiology-call-burden-calculator" className="font-semibold text-brand-700 hover:underline">Calculate call burden</Link>
          <Link href="/tools/w2-vs-1099-physician" className="font-semibold text-brand-700 hover:underline">W-2 vs 1099</Link>
          <Link href="/content-review-policy" className="font-semibold text-brand-700 hover:underline">Content review policy</Link>
        </div>
      </section>
    </main>
  );
}
