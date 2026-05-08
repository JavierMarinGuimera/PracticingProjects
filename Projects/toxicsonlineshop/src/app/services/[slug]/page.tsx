import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FaqList } from "@/components/sections/faq-list";
import { ServiceCard } from "@/components/sections/service-card";
import { JsonLd } from "@/components/shared/json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  getServiceBySlug,
  relatedServices,
  services
} from "@/content/services";
import { createMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const generateStaticParams = () =>
  services.map((service) => ({ slug: service.slug }));

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return createMetadata({
      title: "Servicio no encontrado",
      description: "Servicio no encontrado",
      path: "/services",
      noIndex: true
    });
  }

  return createMetadata({
    title: service.title,
    description: service.longDescription,
    path: `/services/${service.slug}`
  });
};

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.longDescription,
    provider: { "@type": "ProfessionalService", name: "TOXICS" },
    areaServed: "España",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: service.priceFrom / 100,
      url: absoluteUrl(`/services/${service.slug}`)
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="section-padding">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.45fr]">
          <div>
            <Badge>{service.eyebrow}</Badge>
            <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-aura/10 text-aura">
              <Icon className="h-6 w-6" />
            </div>
            <h1 className="mt-6 display-heading text-5xl font-semibold leading-tight text-navy md:text-7xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              {service.longDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="aura" size="lg">
                <Link href="/contact">
                  Solicitar proyecto <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/shop">Comprar servicio fijo</Link>
              </Button>
            </div>
          </div>
          <Card className="h-fit p-6">
            <p className="text-sm font-semibold text-aura">Inversión</p>
            <p className="mt-3 font-display text-4xl font-semibold text-navy">
              {service.price}
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">
              Precio orientativo. El alcance final depende del número de
              pantallas, contenido e integraciones.
            </p>
          </Card>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <SectionHeading
            eyebrow="Beneficios"
            title="Qué mejora en tu negocio."
            description="Un servicio pensado para resolver problemas concretos, no para añadir capas innecesarias."
          />
          <div className="grid gap-3 lg:col-span-2">
            {service.benefits.map((benefit) => (
              <div className="flex gap-3 rounded-2xl border border-border p-5" key={benefit}>
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-aura" />
                <span className="leading-7 text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Casos de uso"
              title="Dónde encaja mejor."
              description="Estos son escenarios habituales donde este servicio aporta valor rápido."
            />
            <div className="mt-8 grid gap-3">
              {service.useCases.map((item) => (
                <Card className="p-5 text-slate-700" key={item}>{item}</Card>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Entregables"
              title="Qué te llevas."
              description="Una entrega usable, documentada y preparada para operar."
            />
            <div className="mt-8 grid gap-3">
              {service.deliverables.map((item) => (
                <Card className="p-5 text-slate-700" key={item}>{item}</Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Preguntas frecuentes."
            description="Dudas habituales antes de contratar este servicio."
          />
          <FaqList items={service.faq} />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <SectionHeading
            eyebrow="Servicios relacionados"
            title="También puede encajar."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {relatedServices(service.slug).map((item) => (
              <ServiceCard service={item} key={item.slug} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
