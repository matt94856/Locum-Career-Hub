import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, professionalServiceJsonLd, websiteJsonLd } from "@/lib/schema";
import { openGraphImages, twitterImageUrls } from "@/lib/social-metadata";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MarketingPixels } from "@/components/analytics/MarketingPixels";
import { SITE } from "@/lib/site";

/** Raster icons in `public/` — Google Search uses PNG/ICO, not SVG. */
const FAVICON_ICO = "/favicon.ico" as const;
const FAVICON_48 = "/icon-48.png" as const;

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Cardiologist locum recruiting`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.tagline,
  applicationName: SITE.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Cardiologist locum recruiting`,
    description: SITE.tagline,
    images: openGraphImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Cardiologist locum recruiting`,
    description: SITE.tagline,
    images: twitterImageUrls(),
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "48x48" },
      { url: FAVICON_ICO, sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: FAVICON_48, sizes: "48x48", type: "image/png" },
    ],
    shortcut: [{ url: FAVICON_ICO }],
    apple: [
      { url: "/apple-icon", type: "image/png", sizes: "180x180" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-white pb-24 font-sans antialiased sm:pb-0">
        <GoogleAnalytics />
        <MarketingPixels />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={professionalServiceJsonLd()} />

        <SiteHeader />
        {children}
        <SiteFooter />
        <StickyMobileCta />
      </body>
    </html>
  );
}
