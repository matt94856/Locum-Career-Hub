import { SectionHeading } from "@/components/ui/SectionHeading";

const segments = [
  {
    title: "New residency graduates",
    copy: "Sample practice settings, accelerate income, and avoid locking into the wrong culture too early.",
    tag: "Post-training",
  },
  {
    title: "Mid-career burnout",
    copy: "Reduce inbox weight, escape toxic admin, and rebuild boundaries with selective blocks.",
    tag: "Recovery",
  },
  {
    title: "Moonlighting doctors",
    copy: "Stack shifts compliantly with malpractice clarity and schedules that respect your primary role.",
    tag: "Add-on",
  },
  {
    title: "Semi-retirement physicians",
    copy: "Stay sharp with flexible coverage—without the guilt of saying no to what matters at home.",
    tag: "Glide path",
  },
];

export function Segments() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Who we serve"
          title="A career hub designed for physicians at four pivotal moments"
          subtitle="The emotional truth is simple: you want freedom without sacrificing the craft you trained for. We help you get there with modern recruiting—transparent, fast, and respectful."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {segments.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition hover:shadow-card"
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
