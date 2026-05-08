import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { navigation, siteConfig } from "@/config/site";

export const SiteFooter = () => (
  <footer className="border-t border-border bg-white">
    <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
      <div className="max-w-md space-y-4">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-sm font-black text-white">
            T
          </span>
          <span>
            <span className="block font-display text-base font-extrabold text-navy">
              {siteConfig.name}
            </span>
            <span className="block text-sm text-muted">
              {siteConfig.professionalName} | {siteConfig.role}
            </span>
          </span>
        </Link>
        <p className="text-sm leading-7 text-muted">
          Tecnología limpia, diseño premium y sistemas digitales pensados para
          convertir visitas en oportunidades reales.
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold text-navy">Navegación</h3>
        <div className="grid gap-3">
          {navigation.map((item) => (
            <Link
              className="text-sm text-muted transition hover:text-aura"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold text-navy">Contacto</h3>
        <div className="grid gap-3 text-sm text-muted">
          <a className="flex items-center gap-2 hover:text-aura" href={siteConfig.whatsapp}>
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a className="flex items-center gap-2 hover:text-aura" href={`mailto:${siteConfig.email}`}>
            <Mail className="h-4 w-4" /> {siteConfig.email}
          </a>
          <a className="flex items-center gap-2 hover:text-aura" href={`tel:${siteConfig.phone}`}>
            <Phone className="h-4 w-4" /> {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>
    <div className="border-t border-border py-5">
      <div className="container-page flex flex-col gap-2 text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} TOXICS. Todos los derechos reservados.</p>
        <p>Vercel-ready. SEO, ecommerce y analítica preparados.</p>
      </div>
    </div>
  </footer>
);
