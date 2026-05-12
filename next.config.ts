import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/logo.svg",
        permanent: true,
      },
      { source: "/locum-tenens-florida", destination: "/locum-tenens-jobs/florida", permanent: true },
      { source: "/locum-tenens-texas", destination: "/locum-tenens-jobs/texas", permanent: true },
      { source: "/locum-tenens-california", destination: "/locum-tenens-jobs/california", permanent: true },
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
