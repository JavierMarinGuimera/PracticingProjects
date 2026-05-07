import type { Metadata } from "next";
import { ProductsCatalogSection } from "@/components/sections/ProductsCatalogSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Catálogo de servicios de reparación automotriz",
  description:
    "Consulta servicios técnicos de reparación automotriz por categoría: turbos, ABS, DSG, centralitas, dirección eléctrica, suspensión y compresores.",
  path: "/products",
});

export default function ProductsPage() {
  return <ProductsCatalogSection />;
}
