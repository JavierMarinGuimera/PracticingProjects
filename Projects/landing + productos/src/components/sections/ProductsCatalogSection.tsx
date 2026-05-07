"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { productCategories } from "@/data/categories";
import { products } from "@/data/products";
import type { ActiveCategory } from "@/components/ui/CategoryFilter";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";

export function ProductsCatalogSection() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("All");
  const filteredProducts = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  return (
    <section className="bg-neutral-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Catálogo de servicios
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
              Reparaciones técnicas para diagnóstico y consulta.
            </h1>
            <p className="mt-5 text-lg leading-8 text-neutral-600">
              Filtra por categoría, compara servicios y solicita información por WhatsApp. No hay
              carrito, checkout ni compra online: es un catálogo para generar consultas técnicas.
            </p>
          </div>
          <CategoryFilter
            categories={productCategories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <nav aria-label="Páginas SEO de servicios" className="mt-8 flex flex-wrap gap-2">
          {productCategories.map((category) => (
            <Link
              key={category.value}
              href={`/${category.value}`}
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-950"
            >
              {category.label}
            </Link>
          ))}
        </nav>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>
      </Container>
    </section>
  );
}
