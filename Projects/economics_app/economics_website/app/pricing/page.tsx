import { Check } from "lucide-react";
import { CheckoutButton } from "@/components/checkout-button";
import { PageHeading } from "@/components/page-heading";
import { SubscriptionStatus } from "@/components/subscription-status";
import { isSubscribed, requireSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function PricingPage({
  searchParams,
}: {
  searchParams?: { checkout?: string };
}) {
  const user = await requireSessionUser();
  const subscribed = isSubscribed(user);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeading
        eyebrow="Suscripción"
        title="Un plan simple para acceder al análisis completo"
        description="El MVP incluye checkout Stripe real si configuras las variables de entorno; sin ellas, activa un pago mock para probar el flujo."
      />

      {searchParams?.checkout === "mock-success" ? (
        <div className="mb-6 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          Suscripción mock activada correctamente.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="rounded-md border border-line bg-white p-6">
          <SubscriptionStatus status={user.subscriptionStatus} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Feed diario de noticias analizadas",
              "Historial por fecha",
              "Detalle completo por noticia",
              "Impacto, sectores, activos y horizonte",
              "Endpoint preparado para Python",
              "Checkout Stripe configurable",
            ].map((feature) => (
              <div key={feature} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
                <p className="text-sm leading-6 text-zinc-700">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-md border border-ink bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-signal">Plan mensual</p>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-5xl font-semibold text-ink">29€</span>
            <span className="pb-2 text-sm text-zinc-500">/ mes</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-zinc-600">
            Para inversores, analistas y equipos pequeños que necesitan priorizar señales financieras.
          </p>
          <div className="mt-6">
            <CheckoutButton disabled={subscribed} />
          </div>
          <p className="mt-4 text-xs leading-5 text-zinc-500">
            Stripe se usa en producción configurando `STRIPE_SECRET_KEY` y `STRIPE_PRICE_ID`.
          </p>
        </aside>
      </div>
    </main>
  );
}
