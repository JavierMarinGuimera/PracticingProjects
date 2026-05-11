import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-signal">Registro</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink">Crea tu cuenta y entra al feed diario</h1>
        <p className="mt-4 max-w-lg leading-7 text-zinc-600">
          Empieza con acceso gratuito y activa el plan mensual cuando quieras desbloquear el análisis completo.
        </p>
      </section>
      <section className="rounded-md border border-line bg-white p-6 shadow-soft">
        <AuthForm mode="register" />
        <p className="mt-5 text-center text-sm text-zinc-600">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-ink hover:underline">
            Inicia sesión
          </Link>
        </p>
      </section>
    </main>
  );
}
