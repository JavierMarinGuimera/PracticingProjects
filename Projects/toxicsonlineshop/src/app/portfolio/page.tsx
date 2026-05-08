import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { projects } from "@/content/portfolio";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Portfolio",
  description:
    "Portfolio premium de proyectos digitales mock para TOXICS: webs, landing pages, ecommerce y automatizaciones.",
  path: "/portfolio"
});

const categories = ["Todos", "Marca personal", "Restaurante", "Servicios profesionales", "Fitness"];

export default function PortfolioPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-page">
          <SectionHeading
            eyebrow="Portfolio"
            title="Showcase profesional para negocios con ambición digital."
            description="Casos realistas diseñados para mostrar cómo se traduce una necesidad de negocio en una experiencia digital elegante y funcional."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge className="bg-white text-slate-700" key={category}>
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card
              className={index === 0 ? "overflow-hidden md:col-span-2" : "overflow-hidden"}
              key={project.title}
            >
              <div className={index === 0 ? "grid md:grid-cols-2" : ""}>
                <div className="relative aspect-[16/10]">
                  <Image
                    src={project.image}
                    alt={`Proyecto ${project.title}`}
                    fill
                    className="object-cover"
                    sizes={index === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                    priority={index === 0}
                  />
                </div>
                <div className="p-7 md:p-8">
                  <p className="text-sm font-semibold text-aura">{project.category}</p>
                  <h2 className="mt-3 font-display text-3xl font-semibold text-navy">
                    {project.title}
                  </h2>
                  <p className="mt-4 leading-7 text-muted">{project.description}</p>
                  <p className="mt-6 rounded-full bg-mint/15 px-4 py-2 text-sm font-semibold text-slate-800">
                    {project.result}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-slate-600"
                        key={service}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
