import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page py-24">
      <div className="max-w-xl rounded-2xl border border-border bg-white p-8 shadow-premium">
        <p className="text-sm font-semibold text-aura">404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-navy">
          Esta página no existe.
        </h1>
        <p className="mt-4 leading-7 text-muted">
          Puede que el enlace haya cambiado. Vuelve al inicio o solicita ayuda directamente.
        </p>
        <Button asChild className="mt-6" variant="aura">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </section>
  );
}
