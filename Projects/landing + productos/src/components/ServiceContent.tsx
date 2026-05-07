import Link from "next/link";
import type { CategoryPage } from "@/types/category";
import { getCategoryBySlug } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/ProductGrid";

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold tracking-tight text-neutral-950">{title}</h2>
      <ul className="mt-4 grid gap-3 text-sm leading-6 text-neutral-600">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-600" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ServiceContent({ category }: { category: CategoryPage }) {
  const related = category.related
    .map((slug) => getCategoryBySlug(slug))
    .filter(Boolean) as CategoryPage[];

  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-5 lg:grid-cols-2">
          <ListBlock title="Síntomas habituales" items={category.symptoms} />
          <ListBlock title="Averías frecuentes" items={category.commonFailures} />
          <ListBlock title="Marcas soportadas" items={category.brands} />
          <ListBlock title="Modelos y referencias habituales" items={category.models} />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
              Proceso de reparación
            </h2>
            <ol className="mt-5 grid gap-4">
              {category.process.map((step, index) => (
                <li key={step} className="flex gap-4 text-sm leading-6 text-neutral-600">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">Garantía</h2>
            <p className="mt-4 text-sm leading-6 text-neutral-600">{category.warranty}</p>
            <h3 className="mt-7 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">
              Cobertura local
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Servicio para Barcelona, Sabadell, Terrassa, Hospitalet, Girona y Tarragona, con
              coordinación para talleres y particulares.
            </p>
          </section>
        </div>

        <section className="mt-14">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Catálogo relacionado
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Servicios y referencias de {category.title}
            </h2>
          </div>
          <ProductGrid category={category.slug} />
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
            Servicios relacionados
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="rounded-2xl border border-neutral-200 bg-white p-5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
              >
                {item.title}
                <span className="mt-2 block text-sm font-normal leading-6 text-neutral-600">
                  {item.description}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </section>
  );
}
