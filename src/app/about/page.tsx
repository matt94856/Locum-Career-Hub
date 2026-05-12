import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Locum Career Hub",
  description:
    "Locum Career Hub is a modern physician recruiting partner focused on flexibility, transparency, and sustainable schedules for locum tenens.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">About</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            A physician recruiting experience that feels like a modern healthcare product
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">{SITE.tagline}</p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6 text-sm leading-relaxed text-slate-700">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Why we exist</h2>
            <p>
              Traditional staffing sites often feel transactional: noisy listings, opaque expectations, and recruiters
              who optimize for speed—not fit. Locum Career Hub was built for physicians who want clarity: schedules
              that respect life outside medicine, compensation explained honestly, and teams that match your clinical
              style.
            </p>
            <p>
              We serve new graduates exploring practice models, mid-career physicians recovering from burnout,
              moonlighters stacking shifts responsibly, and semi-retirement physicians designing a glide path.
            </p>
            <p>
              {SITE.name} is not a replacement for legal, tax, or financial advice—but we are obsessive about informed
              consent, credentialing realism, and recruiter professionalism.
            </p>
          </div>
          <div className="lg:col-span-5 rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-slate-950">Principles</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>
                <span className="font-semibold text-slate-900">Transparency:</span> rates, stipends, call, and
                malpractice expectations in writing.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Advocacy:</span> we represent you—not a quota.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Velocity:</span> fast responses without spam.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Safety:</span> clinically appropriate volume and
                support staffing.
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Button href="/physician-opportunities">Find Opportunities</Button>
              <Button href="/contact" variant="secondary">
                Talk to a Recruiter
              </Button>
            </div>
            <p className="mt-6 text-xs text-slate-500">
              Official domain:{" "}
              <a className="font-semibold text-brand-700 hover:underline" href={SITE.url}>
                {SITE.domain}
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
