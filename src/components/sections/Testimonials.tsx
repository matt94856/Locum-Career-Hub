import { SectionHeading } from "@/components/ui/SectionHeading";

const quotes = [
  {
    quote:
      "I wanted a schedule that did not steal my evenings from my kids. Locum Career Hub found blocks that actually matched what I asked for—not generic volume dumps.",
    name: "Alyssa M., MD",
    role: "Hospitalist",
    locale: "Southeast US",
  },
  {
    quote:
      "Credentialing was the scary part for me. The team mapped timelines early and stayed ahead of paperwork. I started on the date we planned.",
    name: "Daniel K., DO",
    role: "Emergency Medicine",
    locale: "Southwest US",
  },
  {
    quote:
      "I was burned out on committees and inbox slavery. Locums gave me breathing room to decide my next chapter without quitting medicine.",
    name: "Priya S., MD",
    role: "Internal Medicine",
    locale: "West Coast US",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Testimonials"
          title="Physicians choose us when they want advocacy—not pressure"
          subtitle="These stories are representative of the physicians we serve. Your experience will depend on specialty, market demand, and credentialing timelines."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {quotes.map((t) => (
            <figure
              key={t.name}
              className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-sky-400 to-brand-700" />
              <blockquote className="text-sm leading-relaxed text-slate-700">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm">
                <p className="font-semibold text-slate-950">{t.name}</p>
                <p className="text-slate-600">
                  {t.role} · {t.locale}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
