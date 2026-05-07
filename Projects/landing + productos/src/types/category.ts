export type CategorySlug =
  | "reparacion-turbos"
  | "reparacion-modulos-abs"
  | "reparacion-mecatronica-dsg"
  | "direccion-electrica"
  | "centralitas-motor"
  | "compresores-aire-acondicionado"
  | "suspension-neumatica"
  | "cambio-cvt-mercedes";

export type FAQItem = {
  question: string;
  answer: string;
};

export type CategoryPage = {
  slug: CategorySlug;
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  h1: string;
  intro: string;
  image: string;
  imageAlt: string;
  symptoms: string[];
  commonFailures: string[];
  brands: string[];
  models: string[];
  process: string[];
  warranty: string;
  faq: FAQItem[];
  related: CategorySlug[];
};
