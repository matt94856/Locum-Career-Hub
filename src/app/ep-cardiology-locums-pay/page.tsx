import type { Metadata } from "next";
import Link from "next/link";
import { EpLocumsPayRangeTool } from "@/components/tools/EpLocumsPayRangeTool";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { EP_PAY_EFFECTIVE_DATE } from "@/lib/ep-pay/model";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd, webApplicationJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";

const PATH = "/ep-cardiology-locums-pay";

const FAQS = [
  {
    q: "Is $2,800–$3,200 the EP locums rate?",
    a: "No. That is a starting range we see for many attending electrophysiologists, not a posted salary. Ablation vs devices, complex work, call you will take, and how fast a hospital can privilege you all move a written daily guarantee.",
  },
  {
    q: "Do EP locums always cover ablations and devices?",
    a: "No. Some blocks are device clinic and implants. Others need AF ablation, VT, or extraction. Read the privilege list before you treat two jobs with the same daily number as the same work.",
  },
  {
    q: "Does callback mean I get paid twice?",
    a: "No. The daily guarantee usually already covers a block of hours. After that, extra time is billed hourly. Quiet nights often stay near the daily number. Busy nights add more.",
  },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "EP Cardiology Locums Pay | $2,800–$3,200/Day",
  description:
    "EP locums pay is a range, not a posted salary. $2,800–$3,200 is a common starting band. Ablation, devices, call, and privileging move a written daily guarantee.",
  path: PATH,
  keywords: ["EP cardiology locums pay", "electrophysiology locum tenens", "EP locum jobs"],
});

export default function EpCardiologyLocumsPayPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd
        data={medicalWebPageJsonLd({
          name: "EP Cardiology Locums Pay",
          description: String(metadata.description),
          path: PATH,
          keywords: ["EP cardiology locums pay", "electrophysiology locums"],
          aboutTopics: ["Electrophysiology", "Locum tenens compensation", "EP lab coverage"],
        })}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "EP cardiology locums pay", path: PATH }])} />
      <JsonLd
        data={webApplicationJsonLd({
          name: "EP locums pay range",
          description: "Educational daily-guarantee range for electrophysiology locums based on ablation, devices, call, and privileging speed.",
          path: PATH,
          featureList: ["Skill-based daily range instead of a single posted rate", "Ablation vs devices", "Call and license access"],
        })}
      />

      <section className="border-b border-slate-100 bg-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Electrophysiology</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            EP locums pay is a range
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Most attending electrophysiologists we recruit start around $2,800–$3,200 a day. That is a market band, not
            your number. Ablation vs devices, complex work, and the call you will actually take move a written guarantee
            up or down.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#ep-pay-range">Play the pay arcade</Button>
            <Button href="/locum-jobs/cardiology/electrophysiology" variant="secondary">
              EP jobs
            </Button>
            <Button href="/physician-opportunities#lead-form" variant="secondary">
              Request matches
            </Button>
          </div>
        </div>
      </section>

      <section id="ep-pay-range" className="container-site max-w-4xl py-12 sm:py-16">
        <EpLocumsPayRangeTool />
      </section>

      <div className="container-site grid max-w-6xl gap-12 pb-16 lg:grid-cols-12">
        <article className="space-y-12 lg:col-span-8">
          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-950">What the $2,800–$3,200 band actually is</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              It is a starting range for many independent attending electrophysiologists, effective {EP_PAY_EFFECTIVE_DATE}.
              Fellows, device-clinic-only work, or weekday lab-only days often start lower. Complex ablation, VT, or
              extraction can sit higher. We do not treat a single daily number as the rate.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-950">What actually moves the number</h2>
            <ul className="mt-5 space-y-3 text-base leading-7 text-slate-700">
              <li>Independent ablation logs, not just device clinic.</li>
              <li>Whether you will take nights and weekends, or weekday lab only.</li>
              <li>Watchman, LAA, or extraction when the hospital needs that mix.</li>
              <li>How fast privileging can happen: licenses, IMLC, and a clean file.</li>
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
              <h2 className="mt-3 font-display text-2xl font-semibold text-slate-950">Want a written EP range?</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Tell us your licenses, ablation mix, and how many weeks you can work. We come back with openings that
                match the work, including exclusive blocks not listed on the jobs page.
              </p>
              <Button href="/physician-opportunities#lead-form" className="mt-5 w-full justify-center">
                Request cardiology matches
              </Button>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">More pay context</p>
              <Link href="/locum-jobs/cardiology/electrophysiology" className="mt-3 block text-sm font-semibold text-brand-700 hover:underline">
                Electrophysiology locum jobs
              </Link>
              <Link href="/non-invasive-cardiology-locums-pay" className="mt-3 block text-sm font-semibold text-brand-700 hover:underline">
                Non-invasive locums pay
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
