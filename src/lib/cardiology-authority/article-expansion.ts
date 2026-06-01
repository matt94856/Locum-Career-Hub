import type { ContentSection } from "@/lib/cardiology-seo/types";

/** Shared long-form sections appended to informational articles for depth (Phase 3). */
export function expandArticleSections(slug: string, base: ContentSection[]): ContentSection[] {
  const shared: ContentSection[] = [
    {
      h2: "How Locum Career Hub helps cardiologists",
      paragraphs: [
        "Locum Career Hub is a cardiologist-only recruiting and matching service—not a hospital employer. We connect MD/DO cardiologists with programs that document call, cath lab scope, privileging timelines, and malpractice before you start.",
        "If we do not have a realistic match for your subspecialty and states, we tell you directly—typically within one business day of your inquiry.",
      ],
    },
    {
      h2: "ACC, AHA, and ABIM context",
      paragraphs: [
        "The American College of Cardiology (ACC) and American Heart Association (AHA) publish clinical guidance and workforce commentary that shape hospital expectations for board-certified cardiologists. The American Board of Internal Medicine (ABIM) cardiovascular disease certification remains the standard credential hospitals reference for general and many subspecialty locum roles.",
        "Use society resources to understand clinical scope; use written contracts to understand locum expectations— they are not interchangeable.",
      ],
    },
    {
      h2: "Internal links for your next step",
      paragraphs: [
        "Browse the cardiology locum jobs hub for subspecialty pillars, state salary guides, and programmatic state pages under /jobs/{state}. Compare locum vs permanent packages using total compensation—not headline weekly rates alone.",
      ],
    },
  ];

  const bySlug: Record<string, ContentSection[]> = {
    "how-much-do-locum-cardiologists-make": [
      {
        h2: "Weekly rates vs daily rates",
        paragraphs: [
          "Cardiology locum contracts may quote weekly gross, daily rates, or hybrid models with call premiums. Normalize offers to the same time unit and include stipends, malpractice, and credentialing costs.",
          "Interventional and EP blocks with overnight STEMI or arrhythmia call often sit above consult-only general roles—confirm activation counts, not just rate adjectives like competitive.",
        ],
      },
      {
        h2: "Geography is not the only variable",
        paragraphs: [
          "Florida, Texas, and California show high cardiology locum volume, but rural community hospitals may pay differently than metro STEMI centers with heavy nights. Match geography to lifestyle and licensing footprint.",
        ],
      },
    ],
    "locum-cardiologist-salary-guide": [
      {
        h2: "Building your comparison spreadsheet",
        paragraphs: [
          "Track weekly gross, estimated taxes as 1099, travel costs, malpractice tail obligations, and benefits you forgo from W-2 employment. Add call nights and post-call recovery honestly.",
        ],
      },
    ],
    "credentialing-for-locum-cardiologists": [
      {
        h2: "Documents to keep current",
        paragraphs: [
          "Medical license verifications, DEA where applicable, board certificates, malpractice declarations, procedural logs for cath and EP roles, and CME summaries should live in a credentialing folder updated quarterly.",
        ],
      },
    ],
  };

  return [...base, ...(bySlug[slug] ?? []), ...shared];
}
