import type { ContentSection } from "@/lib/seo/specialty-state-content";

type Props = {
  sections: ContentSection[];
  className?: string;
};

export function ContentSections({ sections, className = "" }: Props) {
  return (
    <div className={`space-y-10 ${className}`.trim()}>
      {sections.map((section) => (
        <section key={section.h2}>
          <h2 className="font-display text-2xl font-semibold text-slate-950">{section.h2}</h2>
          <div className="mt-4 space-y-4">
            {section.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-slate-700 sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
