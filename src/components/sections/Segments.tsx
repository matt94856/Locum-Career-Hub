import { SectionHeading } from "@/components/ui/SectionHeading";

const segments = [
  {
    title: "New residency graduates",
    copy: "Explore settings and pacing before you lock into a culture that does not fit.",
    tag: "Post-training",
  },
  {
    title: "Mid-career exhaustion",
    copy: "Reduce chronic overload, escape draining politics, and rebuild boundaries with selective blocks.",
    tag: "Recovery",
  },
  {
    title: "Moonlighting doctors",
    copy: "Add shifts with malpractice clarity and schedules that respect your primary role.",
    tag: "Add-on",
  },
  {
    title: "Semi-retirement physicians",
    copy: "Stay clinical without the guilt of saying no to what matters at home.",
    tag: "Glide path",
  },
];

export function Segments() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Who we serve"
          title="Four moments physicians quietly describe to us"
          subtitle="You may not be searching for locums yet. You might simply want your weeks to feel survivable again. We start there—then explore what actually fits."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 auto-rows-fr md:grid-cols-2">
          {segments.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 ring-1 ring-brand-100">
                {s.tag}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-slate-950">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
