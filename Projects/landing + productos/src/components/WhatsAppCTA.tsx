import { MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";
import { getTelHref, getWhatsAppHref } from "@/lib/contact";

export function WhatsAppCTA({ serviceName }: { serviceName: string }) {
  return (
    <section className="bg-neutral-950 py-12 text-white sm:py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Diagnóstico antes de sustituir
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Consulta disponibilidad para {serviceName}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">
            Envíanos referencia, síntomas y códigos de avería. Te orientamos por WhatsApp o teléfono
            sin carrito, checkout ni compra online.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={getWhatsAppHref(`Hola ${company.name}, necesito información sobre ${serviceName}.`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <MessageCircle size={18} aria-hidden="true" />
            WhatsApp
          </a>
          <a
            href={getTelHref()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Phone size={18} aria-hidden="true" />
            Teléfono
          </a>
        </div>
      </div>
    </section>
  );
}
