import { SITE } from "@/lib/site";

/** Absolute logo URL for structured data (prefer on-site asset over remote GitHub). */
export const SCHEMA_LOGO_URL = `${SITE.url}/logo.svg` as const;

/** Topics and entities this organization is positioned to help with (semantic + AI retrieval signals). */
const KNOWS_ABOUT = [
  "Cardiologist locum tenens",
  "Cardiology locum jobs",
  "Interventional cardiology locum jobs",
  "Electrophysiology locum jobs",
  "Heart failure cardiology locums",
  "General cardiology locum jobs",
  "Cardiologist locums pay",
  "IMLC for physicians",
  "Physician credentialing",
  "Physician burnout",
  "Flexible physician careers",
  "Locum tenens",
  "Physician recruiting",
  "Cardiologist staffing agency",
  "Medical malpractice insurance for locums",
  "Physician compensation and 1099 income",
] as const;

const SAME_AS = [
  SITE.url,
  `${SITE.url}/about`,
  `${SITE.url}/llms.txt`,
  `${SITE.url}/ai-catalog.json`,
] as const;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "MedicalOrganization"],
    name: SITE.name,
    alternateName: ["LocumCareerHub", "Locum Career Hub cardiologist recruiting"],
    url: SITE.url,
    logo: SCHEMA_LOGO_URL,
    image: SCHEMA_LOGO_URL,
    description: SITE.tagline,
    slogan: "Cardiologist-only locum tenens recruiting",
    foundingDate: "2025",
    areaServed: { "@type": "Country", name: "United States" },
    knowsAbout: KNOWS_ABOUT.map((name) => ({ "@type": "Thing", name })),
    sameAs: [...SAME_AS],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneTel,
        email: SITE.email,
        contactType: "customer support",
        areaServed: "US",
        availableLanguage: ["English"],
      },
    ],
    publishingPrinciples: `${SITE.url}/editorial-policy`,
    ethicsPolicy: `${SITE.url}/content-review-policy`,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.tagline,
    inLanguage: "en-US",
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    image: SCHEMA_LOGO_URL,
    url: SITE.url,
    telephone: SITE.phoneTel,
    email: SITE.email,
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: [
      "Cardiologist locum tenens recruiting",
      "Cardiology physician staffing",
      "Physician career consulting for cardiologists",
      "Locum tenens credentialing support",
      "Cardiologist decision tools and calculators",
    ],
    knowsAbout: KNOWS_ABOUT.map((name) => ({ "@type": "Thing", name })),
    description: SITE.tagline,
    sameAs: [...SAME_AS],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function personJsonLd(input: {
  name: string;
  jobTitle?: string;
  description?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    ...(input.jobTitle ? { jobTitle: input.jobTitle } : {}),
    ...(input.description ? { description: input.description } : {}),
    ...(input.url ? { url: input.url } : {}),
    worksFor: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function aboutPageJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: input.name,
    description: input.description,
    url: `${SITE.url}${input.path}`,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    mainEntity: organizationJsonLd(),
  };
}

/** YMYL cardiology articles with author, reviewer, and dateModified (Phase 5–6). */
export function authorityArticleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  keywords?: string[];
  author: { name: string; jobTitle?: string };
  reviewer?: { name: string; credentials?: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      "@type": "Person",
      name: input.author.name,
      ...(input.author.jobTitle ? { jobTitle: input.author.jobTitle } : {}),
    },
    ...(input.reviewer
      ? {
          reviewedBy: {
            "@type": "Organization",
            name: input.reviewer.name,
            ...(input.reviewer.credentials ? { description: input.reviewer.credentials } : {}),
          },
        }
      : {}),
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: SCHEMA_LOGO_URL },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}${input.path}` },
    keywords: input.keywords?.join(", "),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  keywords?: string[];
  author?: { name: string; jobTitle?: string; description?: string };
}) {
  const authorNode = input.author
    ? {
        "@type": "Person",
        name: input.author.name,
        ...(input.author.jobTitle ? { jobTitle: input.author.jobTitle } : {}),
        ...(input.author.description ? { description: input.author.description } : {}),
      }
    : {
        "@type": "Organization",
        name: SITE.name,
      };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    author: authorNode,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: SCHEMA_LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${input.slug}`,
    },
    keywords: input.keywords?.join(", "),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

/** Medical/clinical career intent pages — helps Google + AI systems classify topical authority. */
export function medicalWebPageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  keywords?: string[];
  aboutTopics?: string[];
  speakableCssSelectors?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: input.name,
    description: input.description,
    url: `${SITE.url}${input.path}`,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
    ...(input.aboutTopics?.length
      ? {
          about: input.aboutTopics.map((t) => ({
            "@type": "Thing",
            name: t,
          })),
        }
      : {}),
    ...(input.speakableCssSelectors?.length
      ? {
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: input.speakableCssSelectors,
          },
        }
      : {
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["#direct-answer", "[data-speakable='true']"],
          },
        }),
  };
}

/** Interactive physician tools (salary estimator, calculators). */
export function webApplicationJsonLd(input: {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
  featureList?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: input.name,
    description: input.description,
    url: `${SITE.url}${input.path}`,
    applicationCategory: input.applicationCategory ?? "HealthApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    ...(input.featureList?.length ? { featureList: input.featureList } : {}),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    isAccessibleForFree: true,
  };
}

/** Citeable pay / survey datasets for AI and journalist grounding. */
export function datasetJsonLd(input: {
  name: string;
  description: string;
  path: string;
  dateModified: string;
  keywords?: string[];
  variableMeasured?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: input.name,
    description: input.description,
    url: `${SITE.url}${input.path}`,
    dateModified: input.dateModified,
    license: `${SITE.url}/editorial-policy`,
    creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    isAccessibleForFree: true,
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
    ...(input.variableMeasured?.length
      ? { variableMeasured: input.variableMeasured.map((name) => ({ "@type": "PropertyValue", name })) }
      : {}),
    measurementTechnique: "Directional educational benchmarks and anonymized physician survey aggregates",
  };
}
