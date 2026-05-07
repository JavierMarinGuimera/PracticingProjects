import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceCategories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function ServiceCategoriesSection() {
  return (
    <Section className="bg-neutral-50" id="servicios">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Categorías de reparación
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            Páginas de servicio pensadas para consultas técnicas.
          </h2>
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            Cada categoría concentra síntomas, averías frecuentes, marcas, modelos y proceso de
            reparación para posicionar intención de servicio, no referencias individuales.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
            >
              <span className="text-base font-semibold text-neutral-950">{category.title}</span>
              <span className="mt-3 block text-sm leading-6 text-neutral-600">
                {category.description}
              </span>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
                Ver servicio
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
