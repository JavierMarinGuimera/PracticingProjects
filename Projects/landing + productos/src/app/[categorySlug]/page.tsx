import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryHero } from "@/components/CategoryHero";
import { FAQ } from "@/components/FAQ";
import { ServiceContent } from "@/components/ServiceContent";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { company } from "@/data/company";
import { getCategoryBySlug, serviceCategories } from "@/data/categories";
import { siteConfig } from "@/config/site";

type CategoryRouteParams = {
  categorySlug: string;
};

export function generateStaticParams(): CategoryRouteParams[] {
  return serviceCategories.map((category) => ({
    categorySlug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CategoryRouteParams>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {};
  }

  const url = `${siteConfig.url}/${category.slug}`;

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: category.image,
          width: 1200,
          height: 630,
          alt: category.imageAlt,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: category.metaTitle,
      description: category.metaDescription,
      images: [category.image],
    },
  };
}

function StructuredData({ category }: { category: NonNullable<ReturnType<typeof getCategoryBySlug>> }) {
  const pageUrl = `${siteConfig.url}/${category.slug}`;
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: company.legalName,
    url: siteConfig.url,
    telephone: company.phoneDisplay,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: "Barcelona",
      addressRegion: "Barcelona",
      addressCountry: "ES",
    },
    areaServed: ["Barcelona", "Sabadell", "Terrassa", "Hospitalet", "Girona", "Tarragona"],
    openingHours: company.hours,
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: category.title,
    description: category.metaDescription,
    serviceType: category.title,
    url: pageUrl,
    provider: {
      "@id": `${siteConfig.url}/#localbusiness`,
    },
    areaServed: ["Barcelona", "Sabadell", "Terrassa", "Hospitalet", "Girona", "Tarragona"],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: category.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: `${siteConfig.url}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.title,
        item: pageUrl,
      },
    ],
  };

  const schemas = [
    { key: "localbusiness", data: localBusiness },
    { key: "service", data: service },
    { key: "faq", data: faq },
    { key: "breadcrumb", data: breadcrumb },
  ];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema.key}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.data) }}
        />
      ))}
    </>
  );
}

export default async function CategoryPage({ params }: { params: Promise<CategoryRouteParams> }) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <StructuredData category={category} />
      <CategoryHero category={category} />
      <ServiceContent category={category} />
      <WhatsAppCTA serviceName={category.title} />
      <FAQ items={category.faq} />
    </>
  );
}
