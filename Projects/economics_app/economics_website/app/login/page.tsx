import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-signal">Login</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink">Vuelve a tu radar financiero</h1>
        <p className="mt-4 max-w-lg leading-7 text-zinc-600">
          Accede al dashboard, historial y detalle de noticias analizadas para priorizar tu investigación.
        </p>
      </section>
      <section className="rounded-md border border-line bg-white p-6 shadow-soft">
        <Suspense>
          <AuthForm mode="login" />
        </Suspense>
        <p className="mt-5 text-center text-sm text-zinc-600">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="font-semibold text-ink hover:underline">
            Regístrate
          </Link>
        </p>
      </section>
    </main>
  );
}
