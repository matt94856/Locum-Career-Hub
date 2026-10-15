import type { Metadata } from "next";
import Link from "next/link";
import { CardiologyWordle } from "@/components/tools/CardiologyWordle";
import { JsonLd } from "@/components/seo/JsonLd";
import { CARDIOLOGY_WORDLE_PATH } from "@/lib/cardiology-wordle/daily";
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";

const PATH = CARDIOLOGY_WORDLE_PATH;

const FAQS = [
  {
    q: "What is Cardiology Wordle?",
    a: "Cardiology Wordle is a daily Wordle-style puzzle. The answer is always a real cardiology term — anatomy, rhythm, procedure, device, imaging, or locums slang. The on-board name is Heartle. It is not the New York Times game.",
  },
  {
    q: "How often does the Cardiology Wordle word change?",
    a: "Once per calendar day in America/New_York. Everyone gets the same word that day. A new Heartle starts at midnight Eastern.",
  },
  {
    q: "Why are some Cardiology Wordle days 4 or 6 letters?",
    a: "Most days are 5 letters, like classic Wordle. Some days are 4 or 6 so real cardiology terms such as TAVR or NSTEMI can be answers. A category chip shows before you guess so those days stay fair.",
  },
  {
    q: "Is this the official Wordle?",
    a: "No. It is a Wordle-style cardiology puzzle from Locum Career Hub. Green, yellow, and gray tiles work the same way. The word list is heart language, not the NYT dictionary.",
  },
  {
    q: "What can I do after I finish Cardiology Wordle?",
    a: "Share the emoji grid, then open Locum Career Hub or a pay arcade for interventional, EP, or non-invasive locums. There is no hard redirect — you stay on the puzzle until you choose a link.",
  },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "Cardiology Wordle | Daily Heart Puzzle",
  description:
    "Play Cardiology Wordle, a daily Wordle-style heart puzzle. Six guesses, real cardiology terms, new word each midnight Eastern.",
  path: PATH,
  keywords: ["cardiology wordle", "heartle", "cardiology puzzle", "daily cardiology word game"],
});

export default function CardiologyWordlePage() {
  return (
    <main className="pb-24 sm:pb-0">
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cardiology Wordle", path: PATH }])} />
      <JsonLd
        data={webApplicationJsonLd({
          name: "Cardiology Wordle",
          description:
            "Daily Wordle-style cardiology puzzle. Guess a real heart term in six tries. New word at midnight Eastern.",
          path: PATH,
          applicationCategory: "GameApplication",
          featureList: [
            "Daily cardiology answer in America/New_York",
            "Four to six letter hybrid board",
            "Shareable emoji grid",
            "Links into locums pay arcades after play",
          ],
        })}
      />

      <section className="border-b border-slate-100 bg-rose-50/70 py-12 sm:py-16">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Daily heart puzzle</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Cardiology Wordle
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            A Wordle-style puzzle for heart people. Six guesses. Green, yellow, and gray tiles. The answer is always a
            real cardiology term — not a random dictionary word.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The board name is Heartle. A category chip shows before you guess so a 4-letter day like TAVR and a 6-letter
            day like NSTEMI still feel fair. A new word lands every midnight Eastern.
          </p>
        </div>
      </section>

      <section className="container-site grid max-w-6xl gap-12 py-12 sm:py-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CardiologyWordle />
        </div>
        <aside className="space-y-6 lg:col-span-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-slate-950">How to play</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Guess a cardiology term in six tries. Length matches today&apos;s word.</li>
              <li>Green is the right letter in the right spot. Yellow is right letter, wrong spot.</li>
              <li>Gray is not in the word. Duplicate letters score the Wordle way.</li>
              <li>Share the emoji grid when you finish. Come back tomorrow for the next Heartle.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Why locums?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              If you like the language on this board, you already know the work. Locum Career Hub is a cardiologist-only
              recruiting desk — written call, privileging, and a pay range that depends on skill and volume.
            </p>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              <li>
                <Link className="text-brand-700 hover:underline" href="/">
                  Locum Career Hub home
                </Link>
              </li>
              <li>
                <Link className="text-brand-700 hover:underline" href="/interventional-cardiology-locums-pay">
                  Interventional pay arcade
                </Link>
              </li>
              <li>
                <Link className="text-brand-700 hover:underline" href="/ep-cardiology-locums-pay">
                  EP pay arcade
                </Link>
              </li>
              <li>
                <Link className="text-brand-700 hover:underline" href="/non-invasive-cardiology-locums-pay">
                  Non-invasive pay arcade
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="border-t border-slate-100 bg-white py-12 sm:py-16">
        <div className="container-site max-w-3xl">
          <h2 className="font-display text-3xl font-semibold text-slate-950">Cardiology Wordle FAQ</h2>
          <dl className="mt-8 space-y-6">
            {FAQS.map((item) => (
              <div key={item.q}>
                <dt className="text-base font-semibold text-slate-950">{item.q}</dt>
                <dd className="mt-2 text-sm leading-6 text-slate-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
