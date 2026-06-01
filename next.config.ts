import type { NextConfig } from "next";
import { buildCardiologyLocumsLegacyRedirects } from "./src/lib/cardiology-seo/legacy-redirects-build";
import { buildCardiologyLocumJobsUrlRedirects, cardiologyGeneralPathRedirect } from "./src/lib/seo/cardiology-locum-jobs-redirects-build";
import { US_STATES } from "./src/lib/states";

/** Legacy multi-specialty slugs → general cardiology (keep in sync with `specialty-seo.ts`). */
const REMOVED_SPECIALTY_SLUGS = [
  "hospitalist-medicine",
  "emergency-medicine",
  "anesthesiology-and-crna",
  "family-medicine",
  "internal-medicine",
  "psychiatry",
  "radiology",
  "surgery-and-orthopedics",
  "ob-gyn",
  "pediatrics",
  "cardiology",
  "urgent-care",
  "telehealth",
] as const;

function stateNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const US_STATE_SLUGS = US_STATES.map((name) => stateNameToSlug(name));
const CARDIOLOGY_GENERAL = cardiologyGeneralPathRedirect();

const removedSpecialtyHubRedirects = REMOVED_SPECIALTY_SLUGS.map((slug) => ({
  source: `/specialties/${slug}`,
  destination: CARDIOLOGY_GENERAL,
  permanent: true as const,
}));

const removedStateSpecialtyRedirects = US_STATE_SLUGS.flatMap((state) =>
  REMOVED_SPECIALTY_SLUGS.map((specialtySlug) => ({
    source: `/locum-tenens-jobs/${state}/${specialtySlug}`,
    destination: `/locum-tenens-jobs/${state}/general-cardiology`,
    permanent: true as const,
  })),
);

const locumJobsLegacyRedirects = US_STATES.map((stateName) => {
  const s = stateNameToSlug(stateName);
  return {
    source: `/locum-jobs-${s}`,
    destination: `/locum-tenens-jobs/${s}`,
    permanent: true as const,
  };
});

const removedLandingRedirects = [
  { source: "/hospitalist-locum-jobs", destination: CARDIOLOGY_GENERAL, permanent: true as const },
  { source: "/emergency-medicine-locum-jobs", destination: CARDIOLOGY_GENERAL, permanent: true as const },
  { source: "/crna-locum-jobs", destination: CARDIOLOGY_GENERAL, permanent: true as const },
  { source: "/leaving-hospital-medicine", destination: "/leaving-employed-cardiology", permanent: true as const },
];

/** Short SEO URLs → canonical money pages under /cardiology-locum-jobs/ */
const MONEY_PAGE_SLUGS = [
  "locum-cardiologist-jobs",
  "cardiology-locum-tenens-jobs",
  "interventional-cardiology-locum-jobs",
  "non-invasive-cardiology-locum-jobs",
  "electrophysiology-locum-jobs",
  "structural-heart-locum-jobs",
  "heart-failure-cardiology-locum-jobs",
  "general-cardiology-locum-jobs",
  "pediatric-cardiology-locum-jobs",
  "inpatient-cardiology-locum-jobs",
  "outpatient-cardiology-locum-jobs",
  "telecardiology-jobs",
  "cardiology-moonlighting-jobs",
] as const;

const moneyPageRootRedirects = MONEY_PAGE_SLUGS.map((slug) => ({
  source: `/${slug}`,
  destination: `/cardiology-locum-jobs/${slug}`,
  permanent: true as const,
}));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      { source: "/locum-tenens-florida", destination: "/locum-tenens-jobs/florida", permanent: true },
      { source: "/locum-tenens-texas", destination: "/locum-tenens-jobs/texas", permanent: true },
      { source: "/locum-tenens-california", destination: "/locum-tenens-jobs/california", permanent: true },
      ...buildCardiologyLocumJobsUrlRedirects(),
      ...locumJobsLegacyRedirects,
      ...removedSpecialtyHubRedirects,
      ...removedStateSpecialtyRedirects,
      ...removedLandingRedirects,
      ...moneyPageRootRedirects,
      ...buildCardiologyLocumsLegacyRedirects(US_STATE_SLUGS),
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
