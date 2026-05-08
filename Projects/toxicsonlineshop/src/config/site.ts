export const siteConfig = {
  name: "TOXICS",
  professionalName: "Javier Marín",
  role: "Desarrollador Web",
  tagline: "Soluciones digitales y tecnológicas para negocios y particulares",
  description:
    "Desarrollo web, landing pages, automatizaciones y WhatsApp Business para negocios que quieren una presencia digital rápida, elegante y orientada a resultados.",
  locale: "es-ES",
  city: "España",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hola@toxics.dev",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+34 600 000 000",
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/34600000000",
  links: {
    home: "/",
    about: "/about",
    services: "/services",
    portfolio: "/portfolio",
    shop: "/shop",
    contact: "/contact"
  }
};

export const navigation = [
  { label: "Servicios", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Sobre mí", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "Contacto", href: "/contact" }
];
