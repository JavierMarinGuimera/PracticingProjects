import type { Metadata } from "next";
import { ProductsCatalogSection } from "@/components/sections/ProductsCatalogSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Products",
  description:
    "Browse Reman industrial products by category and request information by WhatsApp or phone.",
  path: "/products",
});

export default function ProductsPage() {
  return <ProductsCatalogSection />;
}
