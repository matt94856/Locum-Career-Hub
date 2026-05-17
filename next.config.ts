import type { NextConfig } from "next";
import { SPECIALTIES } from "./src/lib/specialties";
import { US_STATES } from "./src/lib/states";

function specialtyToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stateNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const locumSpecialtyRedirects = SPECIALTIES.map((name) => {
  const slug = specialtyToSlug(name);
  return {
    source: `/locum-${slug}-jobs`,
    destination: `/specialties/${slug}`,
    permanent: true as const,
  };
});

const locumJobsLegacyRedirects = US_STATES.map((stateName) => {
  const s = stateNameToSlug(stateName);
  return {
    source: `/locum-jobs-${s}`,
    destination: `/locum-tenens-jobs/${s}`,
    permanent: true as const,
  };
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      { source: "/locum-tenens-florida", destination: "/locum-tenens-jobs/florida", permanent: true },
      { source: "/locum-tenens-texas", destination: "/locum-tenens-jobs/texas", permanent: true },
      { source: "/locum-tenens-california", destination: "/locum-tenens-jobs/california", permanent: true },
      ...locumSpecialtyRedirects,
      ...locumJobsLegacyRedirects,
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
