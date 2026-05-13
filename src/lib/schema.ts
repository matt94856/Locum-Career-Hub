import { SITE } from "@/lib/site";

/** Absolute logo URL for structured data (prefer on-site asset over remote GitHub). */
export const SCHEMA_LOGO_URL = `${SITE.url}/logo.svg` as const;

/** Topics and entities this organization is positioned to help with (semantic + AI retrieval signals). */
const KNOWS_ABOUT = [
  "Physician burnout",
  "Flexible physician careers",
  "Locum tenens",
  "Locum tenens jobs",
  "Physician recruiting",
  "Physician staffing agency",
  "Physician work-life balance",
  "Moonlighting and side income for physicians",
  "Hospital medicine staffing",
  "Emergency medicine staffing",
  "Anesthesia and CRNA locums",
  "Radiology locum jobs",
  "Psychiatry locum jobs",
  "Cardiology locum jobs",
  "Physician credentialing",
  "Medical malpractice insurance for locums",
  "Physician compensation and 1099 income",
] as const;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: SCHEMA_LOGO_URL,
    description: SITE.tagline,
    knowsAbout: KNOWS_ABOUT.map((name) => ({ "@type": "Thing", name })),
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
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.tagline,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/physician-opportunities?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
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
      "Physician career consulting",
      "Physician recruiting",
      "Locum tenens staffing",
      "Locum tenens jobs",
      "Physician staffing agency",
      "Flexible physician work arrangements",
      "Physician credentialing support",
    ],
    knowsAbout: [
      { "@type": "Thing", name: "Physician burnout" },
      { "@type": "Thing", name: "Flexible physician careers" },
      { "@type": "Thing", name: "Locum tenens" },
      { "@type": "Thing", name: "Physician work-life balance" },
    ],
    description: SITE.tagline,
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
  };
}

/** Interactive physician tools (salary estimator, calculators). */
export function webApplicationJsonLd(input: {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: input.name,
    description: input.description,
    url: `${SITE.url}${input.path}`,
    applicationCategory: input.applicationCategory ?? "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
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
  };
}
