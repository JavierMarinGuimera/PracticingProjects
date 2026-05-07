import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import type { CategoryPage } from "@/types/category";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { getTelHref, getWhatsAppHref } from "@/lib/contact";

export function CategoryHero({ category }: { category: CategoryPage }) {
  return (
    <section className="bg-neutral-50 py-14 sm:py-18 lg:py-20">
      <Container>
        <Breadcrumbs current={category.title} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Servicio técnico automotriz
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
              {category.h1}
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600">{category.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={getWhatsAppHref(`Hola ${company.name}, quiero consultar sobre ${category.title}.`)}
                target="_blank"
                rel="noreferrer"
                variant="whatsapp"
                icon={<MessageCircle size={18} aria-hidden="true" />}
              >
                Consultar por WhatsApp
              </Button>
              <Button href={getTelHref()} variant="secondary" icon={<Phone size={18} aria-hidden="true" />}>
                Llamar ahora
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200 shadow-xl shadow-neutral-950/10">
            <Image
              src={category.image}
              alt={category.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
