import { LANDING_PAGES } from "@/lib/landings";
import { landingSerpOverride } from "@/lib/serp-ctr";
import { GuideCardLink } from "@/components/ui/GuideCardLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

const TIER1_LANDING_SLUGS = new Set([
  "national-locum-tenens-jobs-guide",
  "cardiologist-travel-locums",
  "interventional-cardiologist-locum-jobs",
  "moonlighting-physician-jobs",
  "leaving-employed-cardiology",
  "physician-burnout-alternatives",
  "flexible-physician-careers",
]);

function sortedLandings() {
  return [...LANDING_PAGES].sort((a, b) => {
    const aTier = TIER1_LANDING_SLUGS.has(a.slug) ? 0 : 1;
    const bTier = TIER1_LANDING_SLUGS.has(b.slug) ? 0 : 1;
    return aTier - bTier;
  });
}

export function InternalTopicGrid() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Explore"
          title="Guides for what cardiologists type into search at 11 p.m."
          subtitle="Problem-aware pages sit alongside high-intent cardiology guides—clean structure, short sections, and next steps that respect your attention."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
          {sortedLandings().map((p) => {
            const serp = landingSerpOverride(p.slug);
            return (
              <div key={p.slug} className="min-w-0">
                <GuideCardLink
                  href={`/${p.slug}`}
                  title={serp?.title ?? p.h1}
                  description={serp?.description ?? p.description}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
