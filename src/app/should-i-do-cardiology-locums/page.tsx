import type { Metadata } from "next";
import Link from "next/link";
import { LocumFitQuiz } from "@/components/tools/LocumFitQuiz";
import { LocumVsEmployedComparisonTable } from "@/components/marketing/LocumVsEmployedComparisonTable";
import { AnswerFirstBlock } from "@/components/seo/AnswerFirstBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { LOCUM_FIT_QUIZ_PATH } from "@/lib/locum-fit-quiz/model";
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from "@/lib/schema";
import { buildSerpDescription, buildSerpMetadata } from "@/lib/serp-ctr";

const PATH = LOCUM_FIT_QUIZ_PATH;
const DESCRIPTION = buildSerpDescription({
  hook: "Free 2-minute quiz for employed cardiologists weighing locums vs another hospital year.",
  proof: "Honest fit score for burnout, schedule, travel, and 1099 benefits.",
  cta: "Then see matching locum dates.",
});

const DIRECT_ANSWER =
  "Locums fits employed cardiologists who want written dates, a defined scope, and real weeks off — and who can accept 1099 pay, credentialing lead time, and at least regional travel. It is a weaker first move if you need W-2 benefits, cannot leave town, or no longer want to practice cardiology. This quiz scores those tradeoffs in about two minutes.";

const FAQS = [
  {
    q: "Should an employed physician switch to locum tenens?",
    a: "Switch if the strain is job design — call, inbox, committees, or a calendar you do not own — and you still want to practice. Stay employed or moonlight first if you need benefits, a home-base identity, or cannot travel even regionally. The quiz separates those two pictures.",
  },
  {
    q: "Is locum tenens worth it for a mid-career cardiologist?",
    a: "It is worth a first block when you want optionality more than a second employed contract: defined weeks, written STEMI or consult scope, and recovery that actually happens. It is a poor swap if you are trying to fix medicine itself or need a partnership track.",
  },
  {
    q: "Can locums prevent physician burnout?",
    a: "No. Burnout can be clinical, organizational, or personal. Locums can change the calendar — call, committees, and open-ended employed weeks — but it is not treatment. If you are in crisis, get licensed help first. In the U.S., call or text 988.",
  },
  {
    q: "How do locum physicians replace employer benefits?",
    a: "You price health insurance, retirement, unpaid credentialing time, and cancellation risk against the daily or block rate. 1099 gross looks high until those line items are real. If replacing benefits is the blocker, moonlighting around a W-2 job is often the first test.",
  },
  {
    q: "Should I leave employed cardiology for locums?",
    a: "Usually plan licenses, privileges, and one written block before you resign. Leaving employed cardiology is a work-structure change, not a new identity. Short blocks can be a bridge while you decide.",
  },
  {
    q: "What happens after I submit the form?",
    a: "A cardiologist-only recruiter reviews specialty, timing, and the quiz notes. You hear about blocks that match — not every open job. There is no fee to the physician.",
  },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "Should I Do Cardiology Locums? | Employed Fit Quiz",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "should I do locums",
    "employed physician to locum",
    "mid-career locum physician",
    "preventing physician burnout with locums",
    "how to replace employer benefits as locum physician",
    "physician burnout alternative career",
    "is locum tenens worth it",
    "leave employed cardiology",
  ],
});

export default function ShouldIDoCardiologyLocumsPage() {
  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd
        data={webApplicationJsonLd({
          name: "Cardiology locums fit quiz",
          description: DESCRIPTION,
          path: PATH,
          applicationCategory: "HealthApplication",
          featureList: [
            "Eight-question employed-to-locums check",
            "Honest fit score for burnout, travel, and 1099 tradeoffs",
            "Optional lead form for matching cardiology blocks",
          ],
        })}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Should I do cardiology locums?", path: PATH },
        ])}
      />

      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 py-14 text-white sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
            Free · 2 minutes · Employed cardiologists
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Should you try cardiology locums — or stay employed?
          </h1>
          <div className="mt-6">
            <AnswerFirstBlock answer={DIRECT_ANSWER} />
          </div>
          <p className="mt-6 text-sm leading-7 text-slate-300">
            Built for mid-career attendings who are burned out, boxed in, or done with an open-ended hospital calendar —
            and still want to practice cardiology. Eight genuine questions. Then an honest fit score.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            This is a career preference check, not medical advice.{" "}
            <Link className="font-semibold text-brand-200 hover:underline" href="/cardiologist-burnout-solutions">
              Burnout is not a job title
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="container-site max-w-3xl">
          <LocumFitQuiz />
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-14">
        <div className="container-site max-w-3xl space-y-12">
          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-950">
              Employed physician to locum — who this quiz is for
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              The people who search this are usually still clinically good and tired of the job around the job: STEMI
              nights, inbox, RVU theater, or a calendar assigned by someone else. They are not looking for a hobby
              career. They want to know whether locums is a better structure than another employed year.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
              <li>Hospital-employed IC, EP, imaging, or general cardiologists considering a first block</li>
              <li>Mid-career locum physician curiosity — not a fellowship experiment and not full retirement yet</li>
              <li>Attendings who want recovery weeks, not a second full-time identity</li>
              <li>Physicians who need to know if they can replace employer benefits before they resign</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-950">
              Locum vs employed cardiology
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Cardiologists who prefer locums usually want a start date, an end date, and a scope they can read before
              they pack. Employed structure still wins if you need W-2 benefits, a single community, or a program to
              build. The table is educational — not a recommendation to quit.
            </p>
            <div className="mt-6">
              <LocumVsEmployedComparisonTable />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-950">
              Preventing physician burnout with locums
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              AMN’s 2024 locum survey found that 86% of respondents named a better schedule, and 80% named addressing
              burnout, as important reasons they chose locums. Freedom and less bureaucracy are what they later call
              rewarding. That is job-design relief, not a diagnosis or a cure. If the clinical work itself is the
              problem, changing employers or going locums will not fix it.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Related:{" "}
              <Link className="font-semibold text-brand-700 hover:underline" href="/physician-burnout-alternatives">
                physician burnout alternatives
              </Link>
              {" · "}
              <Link className="font-semibold text-brand-700 hover:underline" href="/cardiologist-burnout-solutions">
                cardiologist burnout solutions
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-950">
              How locum physicians replace employer benefits
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              The quiz asks about 1099 pay on purpose. A higher daily rate is not take-home until you buy health
              insurance, fund retirement, sit through unpaid credentialing, and accept cancellation risk. If that math
              is the blocker, keep the W-2 and test a local or regional moonlighting block first.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Related:{" "}
              <Link className="font-semibold text-brand-700 hover:underline" href="/tools/w2-vs-1099-physician">
                W-2 vs 1099
              </Link>
              {" · "}
              <Link className="font-semibold text-brand-700 hover:underline" href="/moonlighting-physician-jobs">
                cardiologist moonlighting
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-14">
        <div className="container-site max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Common questions</h2>
          <dl className="mt-6 space-y-5">
            {FAQS.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-950">{item.q}</dt>
                <dd className="mt-2 text-sm leading-7 text-slate-600">{item.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-slate-600">
            Related:{" "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/leaving-employed-cardiology">
              Leaving employed cardiology
            </Link>
            {" · "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/career-change-for-doctors">
              Career change for doctors
            </Link>
            {" · "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/resources/locum-vs-permanent-cardiology-jobs">
              Locum vs permanent
            </Link>
            {" · "}
            <Link className="font-semibold text-brand-700 hover:underline" href="/cardiologist-locums-calculator">
              Pay calculator
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
