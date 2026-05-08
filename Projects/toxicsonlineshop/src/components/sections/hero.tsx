import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const Hero = () => (
  <section className="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
    <div className="container-page grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
      <Reveal>
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-aura/15 bg-white/75 px-3 py-1 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-aura" />
            {siteConfig.professionalName} | {siteConfig.role}
          </div>
          <h1 className="display-heading max-w-5xl text-5xl font-semibold leading-[1.02] text-navy md:text-7xl">
            Soluciones digitales y tecnológicas para negocios y particulares
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted md:text-xl">
            Diseño y construyo webs, sistemas de captación y automatizaciones
            con una experiencia premium, rápida y clara. Tecnología bien pensada
            para que tu negocio inspire confianza desde el primer clic.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="aura">
              <Link href="/contact">
                Solicitar proyecto <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">Ver servicios</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
            {["Next.js y SEO técnico", "Checkout con Stripe", "Lead flow automatizado"].map(
              (item) => (
                <span className="flex items-center gap-2" key={item}>
                  <CheckCircle2 className="h-4 w-4 text-aura" /> {item}
                </span>
              )
            )}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-aura/16 via-cyan/12 to-mint/16 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/78 p-4 shadow-premium backdrop-blur">
            <div className="rounded-[1.5rem] bg-navy p-5 text-white dark-grid">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs text-white/50">TOXICS Operating System</p>
                  <p className="mt-1 font-display text-xl font-semibold">
                    Digital growth stack
                  </p>
                </div>
                <span className="rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-mint">
                  Live
                </span>
              </div>
              <div className="grid gap-3 py-5">
                {[
                  ["Web performance", "98"],
                  ["Lead quality", "High"],
                  ["Automation load", "32h saved"],
                  ["Conversion readiness", "Ready"]
                ].map(([label, value]) => (
                  <div
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 p-4"
                    key={label}
                  >
                    <span className="text-sm text-white/65">{label}</span>
                    <span className="font-display text-lg font-semibold text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-white p-4 text-navy">
                <p className="text-xs font-semibold text-aura">Next milestone</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Convertir una presencia digital dispersa en un sistema
                  medible: web, captación, compra y seguimiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
