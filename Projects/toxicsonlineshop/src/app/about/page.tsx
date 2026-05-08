import {
  Code2,
  Layers3,
  Rocket,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Sobre mí",
  description:
    "Conoce a Javier Marín, desarrollador web detrás de TOXICS: filosofía de trabajo, stack tecnológico y enfoque para proyectos digitales premium.",
  path: "/about"
});

const stack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "PostgreSQL",
  "Prisma",
  "Stripe",
  "Clerk",
  "Resend",
  "Vercel"
];

const timeline = [
  ["01", "Diagnóstico técnico y de negocio", "Antes de construir, identifico la oferta, audiencia, objetivos y restricciones reales."],
  ["02", "Diseño con intención", "La interfaz se plantea para ser elegante, clara y útil, no para rellenar espacio."],
  ["03", "Implementación limpia", "Código modular, componentes reutilizables, SEO técnico y rendimiento como base."],
  ["04", "Lanzamiento medible", "Deploy, analítica, formularios, eventos y un sistema preparado para evolucionar."]
];

export default function AboutPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge>Sobre TOXICS</Badge>
            <h1 className="mt-6 display-heading text-5xl font-semibold leading-tight text-navy md:text-7xl">
              Tecnología con criterio, diseño con calma y foco en resultados.
            </h1>
          </div>
          <div className="space-y-5 text-lg leading-8 text-muted">
            <p>
              Soy {siteConfig.professionalName}, desarrollador web. TOXICS es mi
              marca personal para crear soluciones digitales que se sienten
              premium sin perder claridad operativa.
            </p>
            <p>
              Trabajo con pequeños negocios, profesionales y emprendedores que
              necesitan una presencia digital confiable: webs rápidas, landing
              pages que convierten, automatizaciones y canales de contacto bien
              estructurados.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid gap-6 md:grid-cols-4">
          {([
            [Code2, "Desarrollo", "Arquitectura moderna y mantenible."],
            [Layers3, "Diseño", "Interfaz minimal, jerarquía clara y responsive."],
            [Rocket, "Crecimiento", "SEO, analítica y conversión desde el inicio."],
            [ShieldCheck, "Confianza", "Procesos transparentes y entregas cuidadas."]
          ] satisfies Array<[LucideIcon, string, string]>).map(([Icon, title, text]) => (
            <Card className="p-6" key={title}>
              <Icon className="h-5 w-5 text-aura" />
              <h2 className="mt-5 font-display text-xl font-semibold text-navy">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Stack tecnológico"
            title="Herramientas modernas para construir rápido y escalar bien."
            description="Uso un stack orientado a rendimiento, seguridad, mantenibilidad y despliegue fiable."
          />
          <div className="flex flex-wrap gap-3">
            {stack.map((item) => (
              <span
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy text-white dark-grid">
        <div className="container-page grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Filosofía"
            title="Construir solo lo necesario, pero construirlo muy bien."
            description="El objetivo no es tener más secciones, más efectos o más herramientas. El objetivo es que cada pieza cumpla una función."
            inverse
          />
          <div className="grid gap-4">
            {timeline.map(([number, title, text]) => (
              <div className="rounded-2xl border border-white/10 bg-white/6 p-6" key={number}>
                <span className="text-sm font-semibold text-mint">{number}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
