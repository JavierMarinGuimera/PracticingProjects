import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pedido confirmado",
  description: "Confirmación de compra de servicio digital en TOXICS.",
  path: "/shop/success",
  noIndex: true
});

export default function CheckoutSuccessPage() {
  return (
    <section className="section-padding">
      <div className="container-page max-w-2xl">
        <Card className="p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-aura" />
          <h1 className="mt-6 font-display text-4xl font-semibold text-navy">
            Pedido recibido.
          </h1>
          <p className="mt-4 leading-7 text-muted">
            Gracias por confiar en TOXICS. El pago se procesa con Stripe y me
            pondré en contacto contigo para arrancar el servicio.
          </p>
          <Button asChild className="mt-7" variant="aura">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </Card>
      </div>
    </section>
  );
}
