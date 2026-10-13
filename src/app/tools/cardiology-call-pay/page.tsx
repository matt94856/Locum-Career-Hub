import type { Metadata } from "next";
import Link from "next/link";
import { CallPayStructureTool } from "@/components/tools/CallPayStructureTool";
import { AnswerFirstBlock } from "@/components/seo/AnswerFirstBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";
import { CALL_PAY_EFFECTIVE_DATE } from "@/lib/call-pay/model";

const PATH = "/tools/cardiology-call-pay";
const DESCRIPTION =
  "Beginner tool for general and interventional cardiologists. Compare a 0–4 hour included call rate plus callback with a higher 0–6 hour guarantee.";
const DIRECT_ANSWER =
  "For interventional cardiology, a 24-hour call rate of $3,200–$3,600 with 0–4 hours included often matches an 8-hour day. Callback is often $400–$450. A consistent 9-hour day at $3,200, 0–4 included, and $400 callback pays $5,200, and that is the low end. A higher guarantee of $3,800–$4,200 includes 0–6 hours and has less callback upside. General cardiology uses $2,200–$2,800 for the 0–4 rate, callback of $275–$350, and a 0–6 guarantee of $2,600–$3,200. These are educational ranges, not offers.";

const FAQS = [
  {
    q: "What does 0–4 hours gratis mean on a 24-hour cardiology call?",
    a: "Gratis hours are already included in the daily rate. With 0–4 hours included, the first 4 hours of work do not add callback. Hour 5 and after is paid at the callback rate. That is why a busy 24-hour call can pay much more than the daily number on the contract.",
  },
  {
    q: "Why is a 24-hour call rate sometimes the same as an 8-hour rate?",
    a: "For interventional locums, $3,200–$3,600 is a common range both for an 8-hour day and for a 24-hour call that includes only 0–4 hours. The extra money is the callback after those 4 hours, often $400–$450 an hour, not a second daily rate.",
  },
  {
    q: "When should I ask for $3,800–$4,200 instead?",
    a: "Ask for that higher interventional range when you want more of the day guaranteed and you expect a quieter call. It usually includes 0–6 hours, so callback starts later. If the hospital is consistently busy, the lower daily rate with 0–4 hours included often pays more.",
  },
  {
    q: "Are these the same rates for general cardiology?",
    a: "No. General cardiology in this tool uses the published $2,200–$2,800 daily band for an 8-hour day and for a 24-hour call with 0–4 hours included. Callback is that daily rate divided by 8, or $275–$350. The higher-guarantee 0–6 hour quote is $2,600–$3,200.",
  },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiology Call Pay Tool | General & IC",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "interventional cardiology locum call pay",
    "general cardiology locum call pay",
    "24 hour cardiology call rate",
    "cardiology callback pay",
  ],
});

export default function CardiologyCallPayPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Call pay tool", path: PATH }])} />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={webApplicationJsonLd({
          name: "Cardiology call pay tool",
          description: DESCRIPTION,
          path: PATH,
          applicationCategory: "HealthApplication",
          featureList: [
            "General and interventional rates kept separate",
            "0–4 hour included call versus 0–6 hour guarantee",
            "Callback added from hours actually worked",
          ],
        })}
      />
      <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 py-14 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Beginner-friendly pay tool</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            How to get paid the most for general and interventional call
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            A simple way to read a 24-hour call quote. Pick your specialty, then move the hours you actually work. The tool shows when a smaller included block plus callback beats a higher guaranteed rate.
          </p>
          <div className="mt-6">
            <AnswerFirstBlock answer={DIRECT_ANSWER} />
          </div>
          <p className="mt-4 text-sm text-slate-500">Educational ranges, effective {CALL_PAY_EFFECTIVE_DATE}. Not a guaranteed offer.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-site max-w-3xl">
          <CallPayStructureTool />
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-12 sm:py-16">
        <div className="container-site max-w-3xl space-y-8">
          <h2 className="font-display text-3xl font-semibold text-slate-950">Questions this tool answers</h2>
          {FAQS.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-slate-950">{faq.q}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{faq.a}</p>
            </div>
          ))}
          <p className="text-sm leading-7 text-slate-600">
            Interventional figures are the call-structure ranges for this tool. General cardiology stays on the published{" "}
            <Link href="/locum-jobs/cardiology/general" className="font-semibold text-brand-700 hover:underline">general cardiology locum</Link>{" "}
            daily band. Read the{" "}
            <Link href="/interventional-cardiology-locums-pay" className="font-semibold text-brand-700 hover:underline">interventional pay guide</Link>{" "}
            before you compare a STEMI activation schedule with a clinic day.
          </p>
        </div>
      </section>
    </main>
  );
}
