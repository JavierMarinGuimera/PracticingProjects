import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock, TrendingUp } from "lucide-react";
import { SubscriptionStatus } from "@/components/subscription-status";
import { isSubscribed, requireSessionUser } from "@/lib/auth";
import { getNewsById } from "@/lib/data/store";

export const dynamic = "force-dynamic";

const horizonLabels = {
  "short-term": "Corto plazo",
  "medium-term": "Medio plazo",
  "long-term": "Largo plazo",
};

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const user = await requireSessionUser();
  const item = await getNewsById(params.id);
  if (!item) {
    notFound();
  }

  const subscribed = isSubscribed(user);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/dashboard" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Volver al dashboard
      </Link>

      <article className="rounded-md border border-line bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          <span>{item.source}</span>
          <span>{new Date(item.publishedAt).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" })}</span>
          <span>{horizonLabels[item.horizon]}</span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink">{item.title}</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-700">{item.summary}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <section className="rounded-md border border-line bg-paper p-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Impacto financiero</p>
            <p className="mt-2 leading-7 text-ink">{item.impact}</p>
          </section>
          <section className="rounded-md border border-line bg-paper p-4">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
              {subscribed ? <TrendingUp className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              Implicación de inversión
            </p>
            <p className="mt-2 leading-7 text-ink">
              {subscribed ? item.investmentInsight : "Activa la suscripción para acceder a la lectura completa."}
            </p>
          </section>
        </div>

        {subscribed ? (
          <>
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-ink">Análisis detallado</h2>
              <p className="mt-3 leading-8 text-zinc-700">{item.detailedAnalysis}</p>
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Sectores</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.sectors.map((sector) => (
                    <span key={sector} className="rounded-md border border-line px-2.5 py-1 text-sm text-zinc-700">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Activos</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.assetTypes.map((asset) => (
                    <span key={asset} className="rounded-md border border-line px-2.5 py-1 text-sm text-zinc-700">
                      {asset}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="mt-8">
            <SubscriptionStatus status={user.subscriptionStatus} />
            <Link
              href="/pricing"
              className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Ver plan mensual
            </Link>
          </div>
        )}
      </article>
    </main>
  );
}
