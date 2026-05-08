import { Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/features/contact/contact-form";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contacto",
  description:
    "Contacta con TOXICS para solicitar un proyecto web, landing page, automatización o configuración de WhatsApp Business.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <section className="section-padding">
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Contacto"
            title="Cuéntame qué quieres construir."
            description="Envíame una idea general del proyecto y te responderé con una dirección clara: alcance, tiempos, inversión y próximos pasos."
          />
          <div className="mt-8 grid gap-3">
            {([
              [MessageCircle, "WhatsApp", siteConfig.whatsapp, "Respuesta directa"],
              [Mail, "Email", `mailto:${siteConfig.email}`, siteConfig.email],
              [Phone, "Teléfono", `tel:${siteConfig.phone}`, siteConfig.phone]
            ] satisfies Array<[LucideIcon, string, string, string]>).map(([Icon, label, href, text]) => (
              <a
                className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 transition hover:border-aura/25 hover:shadow-premium"
                href={href}
                key={label}
              >
                <Icon className="h-5 w-5 text-aura" />
                <span>
                  <span className="block font-semibold text-navy">{label}</span>
                  <span className="block text-sm text-muted">{text}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <Card className="p-6 md:p-8">
          <ContactForm />
        </Card>
      </div>
    </section>
  );
}
