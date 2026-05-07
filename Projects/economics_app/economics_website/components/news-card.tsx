import Link from "next/link";
import { Lock, TrendingUp } from "lucide-react";
import type { NewsItem } from "@/lib/types";

type NewsCardProps = {
  item: NewsItem;
  locked?: boolean;
};

const horizonLabels = {
  "short-term": "Corto plazo",
  "medium-term": "Medio plazo",
  "long-term": "Largo plazo",
};

const riskStyles = {
  low: "border-emerald-200 bg-emerald-50 text-emerald-800",
  medium: "border-amber-200 bg-amber-50 text-amber-800",
  high: "border-red-200 bg-red-50 text-red-800",
};

export function NewsCard({ item, locked = false }: NewsCardProps) {
  return (
    <article className="rounded-md border border-line bg-white p-5 shadow-sm transition hover:border-zinc-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <span>{item.source}</span>
            <span>{new Date(item.publishedAt).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <h2 className="mt-2 text-xl font-semibold leading-tight text-ink">
            <Link href={`/news/${item.id}`} className="hover:underline">
              {item.title}
            </Link>
          </h2>
        </div>
        <span className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-semibold ${riskStyles[item.riskLevel]}`}>
          Riesgo {item.riskLevel}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-600">{item.summary}</p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-md border border-line bg-paper p-3">
          <p className="text-xs font-semibold uppercase text-zinc-500">Impacto</p>
          <p className="mt-1 text-sm text-ink">{item.impact}</p>
        </div>
        <div className="rounded-md border border-line bg-paper p-3 md:col-span-2">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase text-zinc-500">
            {locked ? <Lock className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
            Implicación de inversión
          </p>
          <p className="mt-1 text-sm text-ink">
            {locked ? "Disponible con suscripción activa." : item.investmentInsight}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-zinc-600">
          {horizonLabels[item.horizon]}
        </span>
        {item.sectors.slice(0, 3).map((sector) => (
          <span key={sector} className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-zinc-600">
            {sector}
          </span>
        ))}
      </div>
    </article>
  );
}
