import type { Metadata } from "next";
import Link from "next/link";
import { IcLocumsPayRangeTool } from "@/components/tools/IcLocumsPayRangeTool";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { IC_PAY_EFFECTIVE_DATE } from "@/lib/ic-pay/model";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd, webApplicationJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";

const PATH = "/interventional-cardiology-locums-pay";

const FAQS = [
  {
    q: "Is $3,200–$3,500 the interventional locums rate?",
    a: "No. That is a starting range we see for many attending interventionalists, not a posted salary. Independent primary PCI, current STEMI logs, structural or MCS skills, call you will take, and how fast a hospital can privilege you all move a written daily guarantee.",
  },
  {
    q: "Why do two IC jobs with the same daily number feel so different?",
    a: "Because the daily number is only the guarantee. A quiet weekday lab day and a 24-hour STEMI weekend are different jobs. Ask what hours are already included, how STEMI activation works, whether there is backup, and whether post-call relief is real.",
  },
  {
    q: "Does callback mean I get paid twice?",
    a: "No. The daily guarantee usually already covers a block of hours. After that, extra time is billed hourly. Quiet nights often stay near the daily number. Busy nights add more. We read that from the written terms, not from a formula on this page.",
  },
  {
    q: "What credentials do hospitals usually want?",
    a: "Board status, recent PCI and STEMI logs, active licenses, cath-lab privileges, ACLS, malpractice history, and references. A high headline number does not help if the start date cannot be credentialed.",
  },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "Interventional Cardiology Locums Pay | $3,200/Day",
  description:
    "IC locums pay is a range, not a posted salary. $3,200–$3,500 is a common starting band. Skills, STEMI call, and privileging move a written daily guarantee.",
  path: PATH,
  keywords: ["interventional cardiology locums pay", "interventional cardiologist locum rates", "STEMI call pay"],
});

export default function InterventionalCardiologyLocumsPayPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd
        data={medicalWebPageJsonLd({
          name: "Interventional Cardiology Locums Pay",
          description: String(metadata.description),
          path: PATH,
          keywords: ["interventional cardiology locums pay", "STEMI call pay"],
          aboutTopics: ["Interventional cardiology", "Locum tenens compensation", "Cath lab coverage"],
        })}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Interventional cardiology locums pay", path: PATH }])} />
      <JsonLd
        data={webApplicationJsonLd({
          name: "Interventional locums pay range",
          description:
            "Educational daily-guarantee range for interventional cardiology locums based on STEMI skill, call, and privileging speed.",
          path: PATH,
          featureList: [
            "Skill-based daily range instead of a single posted rate",
            "STEMI, MCS, and structural mix",
            "Call and license access",
          ],
        })}
      />

      <section className="border-b border-slate-100 bg-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Interventional cardiology</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Interventional locums pay is a range
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Most attending interventionalists we recruit start around $3,200–$3,500 a day. That is a market band, not
            your number. STEMI comfort, current logs, extra cath-lab skills, and the call you will actually take move a
            written guarantee up or down.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600">
            A weekend is two or three of those days, not a made-up weekly salary. Public job boards also post one-off
            headlines that sit under this band. Compare the written scope, not the biggest number on the internet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#ic-pay-range">Play the pay arcade</Button>
            <Button href="/featured-cardiology-jobs/kentucky-cath-lab-only-interventional-cardiology-locum" variant="secondary">
              KY cath lab only IC locum
            </Button>
            <Button href="/featured-cardiology-jobs/ohio-interventional-cardiology-locum" variant="secondary">
              Ohio IC locum example
            </Button>
            <Button href="/physician-opportunities#lead-form" variant="secondary">
              Request matches
            </Button>
          </div>
        </div>
      </section>

      <section id="ic-pay-range" className="container-site max-w-4xl py-12 sm:py-16">
        <IcLocumsPayRangeTool />
      </section>

      <div className="container-site grid max-w-6xl gap-12 pb-16 lg:grid-cols-12">
        <article className="space-y-12 lg:col-span-8">
          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-950">What the $3,200–$3,500 band actually is</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              It is a starting range for many independent attending interventionalists, effective {IC_PAY_EFFECTIVE_DATE}.
              Fellows, backup-only STEMI, or weekday lab-only work often start lower. High-volume STEMI, shock, or
              structural work can sit higher. We do not treat a single daily number as the rate.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              One October 2026 public listing sat near $2,993 a day. That is one opening, not the market. Read STEMI
              activation, included hours, and callback before you decide it is a bargain or a raise.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-950">What actually moves the number</h2>
            <ul className="mt-5 space-y-3 text-base leading-7 text-slate-700">
              <li>Independent primary PCI and current STEMI logs, not just “I used to take call.”</li>
              <li>Whether you will take nights and weekends, or weekday lab only.</li>
              <li>Impella, MCS, or structural experience when the hospital needs that mix.</li>
              <li>How fast privileging can happen: licenses, IMLC, and a clean file.</li>
              <li>The written rules: backup, transfer, post-call relief, and what hours are already included.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-950">An Ohio example, not the market</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              One current opening is 1–2 weeks a month, 24-hour call, rounding and procedures in the morning, clinic in
              the afternoon. The written pay on that job is a $3,200 guarantee for the first block of hours, then hourly
              callback after that. A quiet night stays near the daily number. A busy STEMI night can land higher. Hours
              vary. We confirm the current written terms before we present you.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              <Link href="/featured-cardiology-jobs/ohio-interventional-cardiology-locum" className="font-semibold text-brand-700 hover:underline">
                Read the Ohio interventional locum
              </Link>
              {" "}
              if that schedule is closer to what you want than a nationwide average.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-950">A Kentucky cath-lab-only example</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Another current opening is interventional locum work that stays in the cath lab — no general cardiology
              clinic, rounding, or consult census. They will take an active Kentucky license or IMLC-eligible
              physicians adding KY. Pay is confirmed in writing; it is not posted on this page.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              <Link href="/featured-cardiology-jobs/kentucky-cath-lab-only-interventional-cardiology-locum" className="font-semibold text-brand-700 hover:underline">
                Read the Kentucky cath-lab-only IC locum
              </Link>
              {" "}
              if you want the lab without general cards.
            </p>
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
              <h2 className="mt-3 font-display text-2xl font-semibold text-slate-950">Want a written IC range?</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Tell us your licenses, STEMI comfort, and how many weeks you can work. We come back with openings that
                match the work, not a generic daily number.
              </p>
              <Button href="/physician-opportunities#lead-form" className="mt-5 w-full justify-center">
                Request cardiology matches
              </Button>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">More pay context</p>
              <Link href="/cardiologist-locums-pay-report" className="mt-3 block text-sm font-semibold text-brand-700 hover:underline">
                Citeable cardiologist pay chart
              </Link>
              <Link href="/locum-jobs/cardiology/interventional" className="mt-3 block text-sm font-semibold text-brand-700 hover:underline">
                Interventional locum jobs
              </Link>
              <Link href="/ep-cardiology-locums-pay" className="mt-3 block text-sm font-semibold text-brand-700 hover:underline">
                EP locums pay arcade
              </Link>
              <Link href="/non-invasive-cardiology-locums-pay" className="mt-3 block text-sm font-semibold text-brand-700 hover:underline">
                Non-invasive locums pay arcade
              </Link>
              <Link href="/tools/cardiology-call-pay" className="mt-3 block text-sm font-semibold text-brand-700 hover:underline">
                Compare two call quotes
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
