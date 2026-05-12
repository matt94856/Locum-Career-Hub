import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, professionalServiceJsonLd, websiteJsonLd } from "@/lib/schema";
import { SITE } from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Physician Locum Tenens Recruiting`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.tagline,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Physician Locum Tenens Recruiting`,
    description: SITE.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Physician Locum Tenens Recruiting`,
    description: SITE.tagline,
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-white pb-24 font-sans antialiased sm:pb-0">
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
