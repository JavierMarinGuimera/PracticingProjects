"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="container-page py-24">
      <div className="max-w-xl rounded-2xl border border-border bg-white p-8 shadow-premium">
        <p className="text-sm font-semibold text-aura">Algo no ha ido bien</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-navy">
          La página no pudo cargarse.
        </h1>
        <p className="mt-4 text-muted">
          Puedes intentarlo de nuevo o volver a contactar directamente.
        </p>
        <Button className="mt-6" onClick={reset}>
          Reintentar
        </Button>
      </div>
    </section>
  );
}
