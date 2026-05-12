import { LANDING_PAGES } from "@/lib/landings";
import { GuideCardLink } from "@/components/ui/GuideCardLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InternalTopicGrid() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Explore"
          title="Guides for what physicians type into search at 11 p.m."
          subtitle="Problem-aware pages sit alongside high-intent guides—clean structure, short sections, and next steps that respect your attention."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
          {LANDING_PAGES.map((p) => (
            <div key={p.slug} className="min-w-0">
              <GuideCardLink href={`/${p.slug}`} title={p.h1} description={p.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
