import {
  Bot,
  Code2,
  Globe2,
  MessageCircle,
  type LucideIcon
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  longDescription: string;
  price: string;
  priceFrom: number;
  icon: LucideIcon;
  benefits: string[];
  useCases: string[];
  deliverables: string[];
  faq: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "desarrollo-web",
    title: "Desarrollo Web",
    eyebrow: "Webs corporativas y plataformas",
    description:
      "Sitios web modernos, escalables y rápidos para negocios que necesitan una presencia digital sólida.",
    longDescription:
      "Diseño y desarrollo una web a medida para tu marca, con arquitectura limpia, rendimiento, SEO técnico y una experiencia preparada para convertir visitas en oportunidades reales.",
    price: "Desde 1.200 €",
    priceFrom: 120000,
    icon: Code2,
    benefits: [
      "Arquitectura escalable con Next.js",
      "Diseño premium adaptado a tu negocio",
      "SEO técnico y Core Web Vitals",
      "Preparada para crecer con nuevas secciones"
    ],
    useCases: [
      "Web corporativa para pymes",
      "Sitio profesional para marca personal",
      "Catálogo de servicios",
      "Web con panel privado o integración externa"
    ],
    deliverables: [
      "Diseño responsive",
      "Desarrollo frontend y backend",
      "Configuración SEO inicial",
      "Deploy en Vercel"
    ],
    faq: [
      {
        question: "¿Cuánto tarda una web profesional?",
        answer:
          "Un proyecto estándar suele estar entre 3 y 6 semanas, dependiendo del alcance, contenido e integraciones."
      },
      {
        question: "¿Puedo escalarla después?",
        answer:
          "Sí. La base se plantea para añadir blog, ecommerce, paneles, integraciones o automatizaciones sin rehacerlo todo."
      }
    ]
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    eyebrow: "Conversión y campañas",
    description:
      "Páginas de aterrizaje con copy, diseño y medición pensadas para captar leads cualificados.",
    longDescription:
      "Construyo landing pages rápidas y persuasivas para campañas, lanzamientos o servicios concretos, combinando estructura de conversión, estética premium y analítica desde el primer día.",
    price: "Desde 490 €",
    priceFrom: 49000,
    icon: Globe2,
    benefits: [
      "Copywriting orientado a conversión",
      "Diseño mobile-first",
      "Formulario de captación validado",
      "Integración con analítica y eventos"
    ],
    useCases: [
      "Campañas de Meta Ads o Google Ads",
      "Validación de un nuevo servicio",
      "Captación local",
      "Página para reserva o solicitud de presupuesto"
    ],
    deliverables: [
      "Landing responsive",
      "Formulario conectado",
      "SEO básico",
      "Configuración de analítica"
    ],
    faq: [
      {
        question: "¿Incluye textos?",
        answer:
          "Sí, incluye estructura y copy base para que la página tenga una narrativa clara y enfocada a la acción."
      },
      {
        question: "¿Sirve para anuncios?",
        answer:
          "Sí. Se prepara con velocidad, medición y llamadas a la acción para campañas pagadas."
      }
    ]
  },
  {
    slug: "automatizaciones",
    title: "Automatizaciones",
    eyebrow: "Procesos y ahorro de tiempo",
    description:
      "Automatizo tareas repetitivas entre formularios, hojas de cálculo, CRM, emails y herramientas internas.",
    longDescription:
      "Analizo tu flujo de trabajo y conecto herramientas para reducir tareas manuales, errores y tiempos muertos, manteniendo el sistema simple y fácil de operar.",
    price: "Desde 350 €",
    priceFrom: 35000,
    icon: Bot,
    benefits: [
      "Menos tareas manuales",
      "Procesos trazables",
      "Notificaciones automáticas",
      "Integración con herramientas existentes"
    ],
    useCases: [
      "Enviar leads a CRM",
      "Confirmaciones automáticas por email",
      "Actualización de hojas de cálculo",
      "Alertas internas para pedidos o reservas"
    ],
    deliverables: [
      "Mapa del proceso",
      "Automatización configurada",
      "Pruebas reales",
      "Documentación breve de uso"
    ],
    faq: [
      {
        question: "¿Necesito cambiar mis herramientas?",
        answer:
          "Normalmente no. La idea es conectar lo que ya usas y mejorar el flujo sin añadir complejidad innecesaria."
      },
      {
        question: "¿Se puede empezar pequeño?",
        answer:
          "Sí. Recomiendo automatizar primero el cuello de botella más repetitivo y escalar desde ahí."
      }
    ]
  },
  {
    slug: "whatsapp-business",
    title: "WhatsApp Business",
    eyebrow: "Atención y ventas",
    description:
      "Configuración profesional de WhatsApp Business para mejorar respuestas, catálogo y captación.",
    longDescription:
      "Dejo WhatsApp Business preparado para vender y atender mejor: perfil, mensajes rápidos, etiquetas, catálogo, enlaces y una estructura clara para que el canal funcione como parte de tu negocio.",
    price: "Desde 190 €",
    priceFrom: 19000,
    icon: MessageCircle,
    benefits: [
      "Perfil profesional optimizado",
      "Mensajes rápidos y respuestas frecuentes",
      "Catálogo y enlaces de contacto",
      "Mejor seguimiento de conversaciones"
    ],
    useCases: [
      "Restaurantes con reservas",
      "Servicios locales",
      "Freelancers con captación directa",
      "Negocios que venden por conversación"
    ],
    deliverables: [
      "Configuración del perfil",
      "Plantillas de respuesta",
      "Catálogo inicial",
      "Guía de uso"
    ],
    faq: [
      {
        question: "¿Es la API oficial?",
        answer:
          "Este servicio cubre WhatsApp Business App. Si necesitas API oficial, lo planteamos como proyecto a medida."
      },
      {
        question: "¿Incluye catálogo?",
        answer:
          "Sí, incluye una primera estructura de catálogo o servicios para que el canal quede listo para operar."
      }
    ]
  }
];

export const getServiceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);

export const relatedServices = (slug: string) =>
  services.filter((service) => service.slug !== slug).slice(0, 3);
