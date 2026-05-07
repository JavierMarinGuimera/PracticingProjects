import type { CategorySlug } from "@/types/category";

export type ProductCategory = CategorySlug;

export type Product = {
  id: string;
  title: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};
