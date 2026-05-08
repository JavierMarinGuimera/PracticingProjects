import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Clock3,
  ShieldCheck,
  Zap,
  type LucideIcon
} from "lucide-react";
import { FaqList } from "@/components/sections/faq-list";
import { Hero } from "@/components/sections/hero";
import { ServiceCard } from "@/components/sections/service-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { faqs, processSteps, testimonials } from "@/content/home";
import { projects } from "@/content/portfolio";
import { services } from "@/content/services";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section-padding bg-white">
        <div className="container-page grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <SectionHeading
            eyebrow="Marca personal con criterio técnico"
            title="TOXICS une diseño premium, código limpio y foco comercial."
            description="Trabajo con negocios que necesitan algo más que una web bonita: una base digital rápida, confiable y preparada para captar, vender y escalar."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["95+", "objetivo Lighthouse"],
              ["4", "líneas de servicio"],
              ["1", "interlocutor técnico"]
            ].map(([value, label]) => (
              <Card className="p-6" key={label}>
                <p className="font-display text-4xl font-semibold text-navy">{value}</p>
                <p className="mt-2 text-sm text-muted">{label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Servicios"
              title="Catálogo digital para construir presencia, captación y operación."
              description="Elige un servicio cerrado o solicita una propuesta a medida si tu proyecto necesita más estrategia o integración."
            />
            <Button asChild variant="outline">
              <Link href="/services">Ver todos</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Reveal delay={index * 0.04} key={service.slug}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy text-white dark-grid">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Por qué trabajar conmigo"
            title="Premium no significa complejo. Significa claro, rápido y bien ejecutado."
            description="Cada decisión de diseño, contenido y arquitectura está orientada a confianza, rendimiento y conversión."
            inverse
          />
          <div className="grid gap-4 md:grid-cols-2">
            {([
              [ShieldCheck, "Confianza", "Estructuras transparentes, entregables claros y comunicación directa."],
              [Zap, "Velocidad", "Webs ligeras, optimizadas y preparadas para Core Web Vitals."],
              [BarChart3, "Medición", "Analytics y eventos para entender qué convierte y qué mejorar."],
              [Clock3, "Eficiencia", "Automatizaciones que eliminan tareas repetitivas y reducen fricción."]
            ] satisfies Array<[LucideIcon, string, string]>).map(([Icon, title, text]) => (
              <div className="rounded-2xl border border-white/10 bg-white/6 p-6" key={title}>
                <Icon className="h-5 w-5 text-mint" />
                <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Proceso"
            title="Un flujo simple para avanzar sin ruido."
            description="Del diagnóstico al lanzamiento con decisiones claras y entregas tangibles."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <Card className="p-6" key={step.title}>
                <span className="text-sm font-semibold text-aura">0{index + 1}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Portfolio"
              title="Proyectos con estética cuidada y utilidad real."
              description="Casos mock realistas para mostrar el tipo de soluciones que TOXICS está preparado para entregar."
            />
            <Button asChild variant="outline">
              <Link href="/portfolio">Ver portfolio</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {projects.slice(0, 2).map((project) => (
              <Card className="overflow-hidden" key={project.title}>
                <div className="relative aspect-[16/9]">
                  <Image src={project.image} alt="" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-aura">{project.category}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-navy">
                    {project.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted">{project.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Prueba social"
            title="Una experiencia profesional de principio a fin."
            description="Comunicación clara, criterio técnico y foco en lo que el negocio necesita realmente."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card className="p-6" key={testimonial.author}>
                <p className="leading-7 text-slate-700">“{testimonial.quote}”</p>
                <p className="mt-5 font-semibold text-navy">{testimonial.author}</p>
                <p className="text-sm text-muted">{testimonial.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Respuestas rápidas antes de empezar."
            description="Si tu caso no encaja en un servicio cerrado, lo vemos como proyecto a medida."
          />
          <FaqList items={faqs} />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page overflow-hidden rounded-[2rem] bg-navy p-8 text-white shadow-premium md:p-12 dark-grid">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-mint">Siguiente paso</p>
            <h2 className="mt-4 display-heading text-3xl font-semibold md:text-5xl">
              Construyamos una base digital que se sienta tan bien como funciona.
            </h2>
            <p className="mt-5 text-white/70">
              Cuéntame qué necesitas y te responderé con una dirección clara:
              alcance, tiempos, inversión y próximos pasos.
            </p>
            <Button asChild className="mt-8" variant="light" size="lg">
              <Link href="/contact">
                Solicitar proyecto <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
