import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/sections/service-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Servicios",
  description:
    "Servicios premium de desarrollo web, landing pages, automatizaciones y WhatsApp Business para negocios y profesionales.",
  path: "/services"
});

export default function ServicesPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-page">
          <SectionHeading
            eyebrow="Servicios digitales"
            title="Soluciones cerradas para avanzar rápido y proyectos a medida cuando necesitas más."
            description="Cada servicio combina diseño, tecnología, conversión y una entrega pensada para que puedas usarla desde el primer día."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard service={service} key={service.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page rounded-[2rem] bg-white p-8 shadow-premium md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-aura">Proyecto complejo</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-navy">
                ¿Tu caso necesita estrategia, integraciones o varias fases?
              </h2>
            </div>
            <Button asChild variant="aura" size="lg">
              <Link href="/contact">
                Solicitar propuesta <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
