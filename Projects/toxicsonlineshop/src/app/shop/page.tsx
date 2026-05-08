import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { ShopClient } from "@/features/checkout/shop-client";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Shop",
  description:
    "Compra servicios digitales de precio cerrado: landing page, basic website y configuración de WhatsApp Business.",
  path: "/shop"
});

export default function ShopPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-page">
          <SectionHeading
            eyebrow="Shop"
            title="Servicios digitales de precio cerrado."
            description="Compra directa para necesidades claras. Si tu proyecto tiene más alcance, solicita una propuesta a medida."
          />
          <div className="mt-10">
            <ShopClient />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page rounded-[2rem] bg-navy p-8 text-white md:p-10 dark-grid">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-mint">Proyecto a medida</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">
                ¿Necesitas integración, panel admin o automatizaciones avanzadas?
              </h2>
            </div>
            <Button asChild variant="light" size="lg">
              <Link href="/contact">
                Pedir presupuesto <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
