import type { CategorySlug } from "@/types/category";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

export function ProductGrid({
  category,
  limit,
}: {
  category?: CategorySlug;
  limit?: number;
}) {
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;
  const visibleProducts = typeof limit === "number" ? filteredProducts.slice(0, limit) : filteredProducts;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {visibleProducts.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 2} />
      ))}
    </div>
  );
}
