import type { Metadata } from "next";
import Link from "next/link";
import { NicLocumsPayRangeTool } from "@/components/tools/NicLocumsPayRangeTool";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { NIC_PAY_EFFECTIVE_DATE } from "@/lib/nic-pay/model";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd, webApplicationJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";

const PATH = "/non-invasive-cardiology-locums-pay";

const FAQS = [
  {
    q: "Is $2,200–$2,800 the non-invasive locums rate?",
    a: "No. That is a starting range we see for many attending non-invasive cardiologists, not a posted salary. TEE, nuclear, call you will take, and inpatient vs outpatient work all move a written daily guarantee.",
  },
  {
    q: "Does TEE or nuclear change the number?",
    a: "Often. Clinic-only weeks without imaging sit lower. Performing TEEs or interpreting nuclear studies opens hospital blocks that are harder to staff.",
  },
  {
    q: "Is outpatient-only paid the same as inpatient consults?",
    a: "Usually not. Outpatient clinic is a real locum product, but mixed inpatient and outpatient coverage is what most hospitals are trying to fill.",
  },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "Non-Invasive Cardiology Locums Pay | $2,200–$2,800/Day",
  description:
    "Non-invasive locums pay is a range. $2,200–$2,800 is a common starting band. TEE, nuclear, call, and inpatient vs outpatient work move a written daily guarantee.",
  path: PATH,
  keywords: ["non-invasive cardiology locums pay", "general cardiology locum rates", "non invasive cardiologist locum"],
});

export default function NonInvasiveCardiologyLocumsPayPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd
        data={medicalWebPageJsonLd({
          name: "Non-Invasive Cardiology Locums Pay",
          description: String(metadata.description),
          path: PATH,
          keywords: ["non-invasive cardiology locums pay", "general cardiology locum rates"],
          aboutTopics: ["Non-invasive cardiology", "Locum tenens compensation", "Consult and clinic coverage"],
        })}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Non-invasive cardiology locums pay", path: PATH }])} />
      <JsonLd
        data={webApplicationJsonLd({
          name: "Non-invasive locums pay range",
          description: "Educational daily-guarantee range for non-invasive cardiology locums based on TEE, nuclear, call, and setting.",
          path: PATH,
          featureList: ["TEE and nuclear mix", "Call preference", "Inpatient vs outpatient"],
        })}
      />

      <section className="border-b border-slate-100 bg-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Non-invasive cardiology</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Non-invasive locums pay is a range
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Most attending non-invasive cardiologists we recruit start around $2,200–$2,800 a day. That is a market
            band, not your number. TEE, nuclear, whether you want call, and inpatient vs outpatient work move a written
            guarantee up or down.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#nic-pay-range">Play the pay arcade</Button>
            <Button href="/locum-jobs/cardiology/general" variant="secondary">
              Non-invasive jobs
            </Button>
            <Button href="/physician-opportunities#lead-form" variant="secondary">
              Request matches
            </Button>
          </div>
        </div>
      </section>

      <section id="nic-pay-range" className="container-site max-w-4xl py-12 sm:py-16">
        <NicLocumsPayRangeTool />
      </section>

      <div className="container-site grid max-w-6xl gap-12 pb-16 lg:grid-cols-12">
        <article className="space-y-12 lg:col-span-8">
          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-950">What the $2,200–$2,800 band actually is</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              It is a starting range for many independent attending non-invasive cardiologists, effective{" "}
              {NIC_PAY_EFFECTIVE_DATE}. Fellows, no-call clinic-only weeks, or no TEE/nuclear often start lower.
              Performing TEEs, interpreting nuclear studies, or mixed inpatient and outpatient coverage can sit higher.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-950">What actually moves the number</h2>
            <ul className="mt-5 space-y-3 text-base leading-7 text-slate-700">
              <li>Whether you perform TEEs, only read them, or do neither.</li>
              <li>Nuclear supervision or interpretation, not just “I used to read stress tests.”</li>
              <li>Whether you want call, or weekday clinic only.</li>
              <li>Inpatient consults, outpatient clinic, or both.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-950">Frequently asked questions</h2>
            <div className="mt-6 divide-y divide-slate-200">
              {FAQS.map((faq) => (
                <div key={faq.q} className="py-5">
                  <h3 className="font-semibold text-slate-950">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Next step</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-slate-950">Want a written NIC range?</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Tell us TEE, nuclear, call, and whether you want inpatient, outpatient, or both. We send exclusive
                blocks that are not listed on the jobs page.
              </p>
              <Button href="/physician-opportunities#lead-form" className="mt-5 w-full justify-center">
                Request cardiology matches
              </Button>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">More pay context</p>
              <Link href="/locum-jobs/cardiology/general" className="mt-3 block text-sm font-semibold text-brand-700 hover:underline">
                General / non-invasive locum jobs
              </Link>
              <Link href="/ep-cardiology-locums-pay" className="mt-3 block text-sm font-semibold text-brand-700 hover:underline">
                EP locums pay
              </Link>
              <Link href="/interventional-cardiology-locums-pay" className="mt-3 block text-sm font-semibold text-brand-700 hover:underline">
                Interventional locums pay
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
