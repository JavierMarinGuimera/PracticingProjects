import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BellRing, Clock3, LineChart, ShieldCheck, Sparkles } from "lucide-react";
import { readDb } from "@/lib/data/store";
import { NewsCard } from "@/components/news-card";

export default async function LandingPage() {
  const db = await readDb();
  const examples = db.news.slice(0, 2);

  return (
    <main>
      <section className="relative min-h-[78vh] overflow-hidden bg-ink">
        <Image
          src="/hero-dashboard.png"
          alt="Dashboard de análisis financiero con noticias, gráficos e indicadores de impacto"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/48 to-black/12" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-md border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white/90 backdrop-blur">
              Feed diario + análisis financiero con IA
            </p>
            <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-6xl">
              Insights de inversión basados en noticias reales
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/82">
              Convierte ruido macro, resultados, bancos centrales y sectores en lectura accionable:
              impacto, horizonte, riesgos y posibles implicaciones de inversión.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-ink transition hover:bg-zinc-100"
              >
                Registrarse <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            ["Lectura diaria", "Un feed preparado para abrir mercado con señales clave.", Clock3],
            ["Impacto financiero", "Cada noticia aterriza posibles efectos por sector y activo.", LineChart],
            ["Riesgo explícito", "El análisis separa oportunidad, horizonte y escenarios adversos.", ShieldCheck],
          ].map(([title, copy, Icon]) => (
            <div key={String(title)} className="rounded-md border border-line bg-white p-5">
              <Icon className="h-5 w-5 text-signal" />
              <h2 className="mt-4 text-lg font-semibold text-ink">{String(title)}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{String(copy)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-signal">
                Ejemplo de contenido
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-ink">
                Noticias con análisis listo para decidir qué mirar después
              </h2>
            </div>
            <Link href="/register" className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
              Probar el feed <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {examples.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            ["“Me ahorra la primera hora de lectura de mercado cada mañana.”", "Analista independiente"],
            ["“La parte de horizonte y riesgo hace que el resumen sea mucho más útil.”", "Portfolio manager"],
            ["“Es una buena base para conectar nuestro pipeline Python de noticias.”", "Founder fintech"],
          ].map(([quote, author]) => (
            <figure key={quote} className="rounded-md border border-line bg-white p-5">
              <Sparkles className="h-5 w-5 text-amberline" />
              <blockquote className="mt-4 text-base font-medium leading-7 text-ink">{quote}</blockquote>
              <figcaption className="mt-4 text-sm text-zinc-500">{author}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-signal">
              <BellRing className="h-4 w-4" />
              MVP listo para validar
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Lanza el producto, valida pricing y conecta tu IA real después.
            </h2>
          </div>
          <Link
            href="/register"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Crear cuenta <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
