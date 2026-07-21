import type { Metadata } from "next";
import { SITE, CTA } from "@/lib/site";
import { socialShareMetadata } from "@/lib/social-metadata";
import { Button } from "@/components/ui/Button";

const ABOUT_DESC =
  "Meet the cardiologist-only locum recruiting team at Locum Career Hub—transparent call expectations, credentialing clarity, and career tools built for MD/DO cardiologists.";

export const metadata: Metadata = {
  title: "About Our Cardiology Locum Recruiters",
  description: ABOUT_DESC,
  alternates: { canonical: "/about" },
  ...socialShareMetadata({
    title: "About Our Cardiology Locum Recruiters | Locum Career Hub",
    description: ABOUT_DESC,
    path: "/about",
  }),
};

export default function AboutPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">About</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            A cardiology recruiting experience that feels calm, modern, and credible
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">{SITE.tagline}</p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="min-w-0 space-y-6 text-sm leading-relaxed text-slate-700 lg:col-span-7">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Why we exist</h2>
            <p>
              Traditional staffing sites often feel transactional: noisy listings, opaque expectations, and recruiters
              who optimize for speed—not fit. Locum Career Hub was built for cardiologists who want clarity: call and
              cath lab scope that respect life outside medicine, compensation drivers explained honestly, and teams
              that match your subspecialty and clinical style.
            </p>
            <p>
              We serve new cardiology attendings exploring practice models, mid-career cardiologists recovering from
              burnout, moonlighting cardiologists stacking shifts responsibly, and semi-retired cardiologists designing
              a glide path.
            </p>
            <p>
              {SITE.name} is not a replacement for legal, tax, or financial advice—but we are obsessive about informed
              consent, credentialing realism, and cardiology recruiter professionalism. We recruit MD/DO cardiologists
              only—not hospitalists, emergency physicians, or other specialties.
            </p>
          </div>
          <div className="min-w-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7 lg:col-span-5">
            <h2 className="font-display text-xl font-semibold text-slate-950">Principles</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>
                <span className="font-semibold text-slate-900">Transparency:</span> rates, stipends, call, cath lab scope,
                and malpractice expectations in writing.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Advocacy:</span> we represent you—not a quota.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Velocity:</span> fast responses without spam.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Safety:</span> clinically appropriate consult census,
                STEMI pathways, and support staffing.
              </li>
            </ul>
            <div className="mt-8 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
              <Button href="/physician-opportunities" className="w-full justify-center">
                {CTA.explore}
              </Button>
              <Button href="/contact" variant="secondary" className="w-full justify-center">
                {CTA.recruiter}
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
