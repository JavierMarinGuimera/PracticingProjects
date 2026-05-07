import { Clock3, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const reasons = [
  {
    title: "Arquitectura SEO clara",
    description: "Cada servicio tiene URL, contenido, FAQ, schema y enlaces internos.",
    icon: Sparkles,
  },
  {
    title: "Soporte consultivo",
    description: "El cliente consulta antes de reparar, enviar o sustituir un componente.",
    icon: Headphones,
  },
  {
    title: "Catálogo sin ecommerce",
    description: "Las tarjetas explican servicios y llevan a contacto, no a checkout.",
    icon: ShieldCheck,
  },
  {
    title: "Conversión rápida",
    description: "Teléfono, WhatsApp y formulario aparecen en momentos de alta intención.",
    icon: Clock3,
  },
];

export function WhyChooseUsSection() {
  return (
    <Section className="bg-neutral-950 text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Por qué este enfoque
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Autoridad por categoría. Conversión por contacto.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/65">
            Diseñado para posicionar búsquedas de reparación técnica local y convertirlas en leads,
            sin crear páginas finas para cada referencia.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <Reveal key={reason.title} delay={index * 0.05}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
                  <div className="flex size-11 items-center justify-center rounded-full bg-white text-neutral-950">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{reason.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
