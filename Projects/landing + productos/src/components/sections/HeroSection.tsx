import Image from "next/image";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";
import { getTelHref, getWhatsAppHref } from "@/lib/contact";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";

const heroImage = "/photo-hero-section.jpg";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-neutral-950 py-16 sm:py-20">
      <Image
        src={heroImage}
        alt="Taller técnico de reparación automotriz con componentes en diagnóstico."
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.28),transparent_32rem)]" />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
            {company.legalName}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Reparación técnica automotriz con diagnóstico especializado.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Consulta servicios de reparación para turbos, ABS, DSG, centralitas, dirección
            eléctrica y otros componentes. Sin ecommerce: diagnóstico, orientación y contacto
            directo por WhatsApp.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={getTelHref()} variant="primary" icon={<Phone size={18} aria-hidden="true" />}>
              Llamar ahora
            </Button>
            <Button
              href={getWhatsAppHref("Hola your_site, quiero información sobre una reparación.")}
              target="_blank"
              rel="noreferrer"
              variant="whatsapp"
              icon={<MessageCircle size={18} aria-hidden="true" />}
            >
              Consultar por WhatsApp
            </Button>
            <Button href="#contact" variant="secondary" icon={<ArrowRight size={18} aria-hidden="true" />}>
              Solicitar información
            </Button>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-3">
            <StatCard value="24h" label="Respuesta habitual" />
            <StatCard value="120+" label="Reparaciones gestionadas" />
            <StatCard value="8" label="Categorías SEO" />
          </div>
        </div>
      </Container>
    </section>
  );
}
