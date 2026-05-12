import { SITE } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    description: SITE.tagline,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneTel,
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
    image: `${SITE.url}/og-default.png`,
    url: SITE.url,
    telephone: SITE.phoneTel,
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: [
      "Physician recruiting",
      "Locum tenens staffing",
      "Healthcare staffing consulting",
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    author: {
      "@type": "Organization",
      name: SITE.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logo.svg`,
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
