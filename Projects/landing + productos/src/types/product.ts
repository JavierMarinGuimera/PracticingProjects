export type ProductCategory =
  | "Automation"
  | "Processing"
  | "Storage"
  | "Control";

export type Product = {
  id: string;
  title: string;
  category: ProductCategory;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};
