import Link from "next/link";
import { LANDING_PAGES } from "@/lib/landings";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InternalTopicGrid() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Explore"
          title="SEO hubs for the searches physicians actually type"
          subtitle="Each page is structured for semantic clarity, internal linking, and recruiter-led conversion—without the dated staffing-site feel."
        />

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {LANDING_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="mb-4 break-inside-avoid rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-card"
            >
              <p className="text-sm font-semibold text-slate-950">{p.h1}</p>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.description}</p>
              <p className="mt-3 text-xs font-semibold text-brand-700">Read guide →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
