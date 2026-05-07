"use client";

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
              Product catalog
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
              Explore industrial products built for quote-ready conversations.
            </h1>
            <p className="mt-5 text-lg leading-8 text-neutral-600">
              Filter by category, compare the essentials, and request more information directly
              through WhatsApp. No cart, no checkout, no account required.
            </p>
          </div>
          <CategoryFilter
            categories={productCategories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>
      </Container>
    </section>
  );
}
