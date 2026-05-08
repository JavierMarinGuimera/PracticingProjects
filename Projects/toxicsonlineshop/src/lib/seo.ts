import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/config/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export const createMetadata = ({
  title,
  description,
  path = "/",
  image = "/opengraph-image.png",
  noIndex = false
}: SeoInput): Metadata => {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(absoluteUrl("/")),
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "es_ES",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image]
    }
  };
};
