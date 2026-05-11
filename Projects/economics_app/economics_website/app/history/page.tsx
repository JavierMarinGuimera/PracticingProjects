import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/news-card";
import { PageHeading } from "@/components/page-heading";
import { isSubscribed, requireSessionUser } from "@/lib/auth";
import { getNewsByDate, getNewsDates } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function HistoryPage({
  searchParams,
}: {
  searchParams?: { date?: string };
}) {
  const user = await requireSessionUser();
  const dates = await getNewsDates();
  const selectedDate = searchParams?.date && dates.includes(searchParams.date) ? searchParams.date : dates[0];
  const news = selectedDate ? await getNewsByDate(selectedDate) : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeading
        eyebrow="Historial"
        title="Consulta análisis de días anteriores"
        description="Recupera el contexto de mercado y revisa cómo evolucionaron las señales por fecha."
      />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-md border border-line bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-ink">Días disponibles</p>
          <div className="space-y-2">
            {dates.map((date) => {
              const active = date === selectedDate;
              return (
                <Link
                  key={date}
                  href={`/history?date=${date}`}
                  className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm transition ${active ? "border-ink bg-ink text-white" : "border-line text-zinc-700 hover:border-zinc-300"}`}
                >
                  {new Date(date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </aside>

        <section className="space-y-5">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} locked={!isSubscribed(user)} />
          ))}
        </section>
      </div>
    </main>
  );
}
