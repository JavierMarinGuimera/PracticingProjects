import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper, ShieldCheck, TrendingUp } from "lucide-react";
import { NewsCard } from "@/components/news-card";
import { PageHeading } from "@/components/page-heading";
import { SubscriptionStatus } from "@/components/subscription-status";
import { isSubscribed, requireSessionUser } from "@/lib/auth";
import { getLatestNewsDate, getNewsByDate } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireSessionUser();
  const date = (await getLatestNewsDate()) ?? new Date().toISOString().slice(0, 10);
  const news = await getNewsByDate(date);
  const subscribed = isSubscribed(user);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeading
        eyebrow="Dashboard"
        title="Feed diario de noticias económicas analizadas"
        description={`Lectura para ${new Date(date).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}.`}
      />

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-md border border-line bg-white p-4">
          <Newspaper className="h-5 w-5 text-signal" />
          <p className="mt-3 text-2xl font-semibold text-ink">{news.length}</p>
          <p className="text-sm text-zinc-600">Noticias analizadas</p>
        </div>
        <div className="rounded-md border border-line bg-white p-4">
          <TrendingUp className="h-5 w-5 text-signal" />
          <p className="mt-3 text-2xl font-semibold text-ink">
            {news.filter((item) => item.riskLevel === "high").length}
          </p>
          <p className="text-sm text-zinc-600">Alta volatilidad</p>
        </div>
        <div className="rounded-md border border-line bg-white p-4">
          <CalendarDays className="h-5 w-5 text-signal" />
          <p className="mt-3 text-2xl font-semibold text-ink">3</p>
          <p className="text-sm text-zinc-600">Días en historial</p>
        </div>
        <div className="rounded-md border border-line bg-white p-4">
          <ShieldCheck className="h-5 w-5 text-signal" />
          <p className="mt-3 text-2xl font-semibold text-ink">
            {subscribed ? "Activo" : "Free"}
          </p>
          <p className="text-sm text-zinc-600">Estado de acceso</p>
        </div>
      </div>

      {!subscribed ? (
        <div className="mb-8">
          <SubscriptionStatus status={user.subscriptionStatus} />
          <Link
            href="/pricing"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-ink"
          >
            Desbloquear análisis completo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}

      <div className="grid gap-5">
        {news.map((item) => (
          <NewsCard key={item.id} item={item} locked={!subscribed} />
        ))}
      </div>
    </main>
  );
}
