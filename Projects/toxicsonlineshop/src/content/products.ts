export type Product = {
  slug: string;
  name: string;
  description: string;
  price: number;
  includes: string[];
  delivery: string;
};

export const products: Product[] = [
  {
    slug: "landing-page",
    name: "Landing Page",
    description:
      "Página de conversión premium para validar una oferta, captar leads o lanzar una campaña.",
    price: 49000,
    includes: [
      "Diseño responsive",
      "Copy base orientado a conversión",
      "Formulario de contacto",
      "SEO inicial"
    ],
    delivery: "Entrega estimada: 7-10 días"
  },
  {
    slug: "basic-website",
    name: "Basic Website",
    description:
      "Web profesional de hasta 5 secciones para negocios que necesitan presencia digital sólida.",
    price: 95000,
    includes: [
      "Arquitectura Next.js",
      "Diseño premium mobile-first",
      "SEO técnico básico",
      "Deploy en Vercel"
    ],
    delivery: "Entrega estimada: 2-3 semanas"
  },
  {
    slug: "whatsapp-setup",
    name: "WhatsApp Setup",
    description:
      "Configuración profesional de WhatsApp Business para vender y atender mejor.",
    price: 19000,
    includes: [
      "Perfil optimizado",
      "Mensajes rápidos",
      "Catálogo inicial",
      "Enlaces y estructura comercial"
    ],
    delivery: "Entrega estimada: 3-5 días"
  }
];

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
