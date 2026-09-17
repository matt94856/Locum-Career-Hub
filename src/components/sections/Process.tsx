import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    n: "01",
    title: "Tell us what “better” looks like",
    body: "Specialty, states, dates, and what you will not compromise on.",
  },
  {
    n: "02",
    title: "See curated matches",
    body: "We prioritize fit: staffing, documentation load, and culture—not just a rate card.",
  },
  {
    n: "03",
    title: "Credential with confidence",
    body: "Packets, licensing, and privileging with clear owners and timelines.",
  },
  {
    n: "04",
    title: "Start strong, iterate smarter",
    body: "Debrief after the first shifts. Adjust. Repeat the teams you like.",
  },
];

export function Process() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="How it works"
          title="Four quiet steps"
          subtitle="No mystery sites. No spam cadence. Just a clear path from intent to a block that fits."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 auto-rows-fr sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-brand-50/40 p-5 shadow-sm sm:p-6">
              <p className="text-xs font-semibold tracking-widest text-brand-700">{s.n}</p>
              <h3 className="mt-3 font-display text-lg font-semibold text-slate-950">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
