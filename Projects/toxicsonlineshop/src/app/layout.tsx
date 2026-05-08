import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Analytics } from "@/components/layout/analytics";
import { Providers } from "@/components/layout/providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/shared/json-ld";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.professionalName}, ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  metadataBase: new URL(absoluteUrl("/")),
  alternates: { canonical: absoluteUrl("/") },
  applicationName: siteConfig.name,
  creator: siteConfig.professionalName,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.professionalName}`,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: "es_ES",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.professionalName}`,
    description: siteConfig.description
  }
};

const professionalSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${siteConfig.name} - ${siteConfig.professionalName}`,
  description: siteConfig.description,
  url: absoluteUrl("/"),
  email: siteConfig.email,
  telephone: siteConfig.phone,
  areaServed: "España",
  founder: {
    "@type": "Person",
    name: siteConfig.professionalName,
    jobTitle: siteConfig.role
  },
  serviceType: [
    "Desarrollo web",
    "Landing pages",
    "Automatizaciones",
    "WhatsApp Business"
  ]
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${interTight.variable}`}>
      <body>
        <Providers>
          <JsonLd data={professionalSchema} />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
