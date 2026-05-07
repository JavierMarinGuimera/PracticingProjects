import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function FeaturedProductsSection() {
  const featured = products.filter((product) => product.featured).slice(0, 3);

  return (
    <Section className="bg-white">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Featured products
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
              Catalog-ready products for serious buyers.
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-neutral-200 px-5 text-sm font-semibold text-neutral-950 transition hover:border-neutral-300 hover:bg-neutral-50"
          >
            View all products
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featured.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.06}>
              <ProductCard product={product} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
