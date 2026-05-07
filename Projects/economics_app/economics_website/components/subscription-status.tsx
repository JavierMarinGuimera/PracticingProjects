import { CheckCircle2, CircleAlert } from "lucide-react";
import type { SubscriptionStatus as Status } from "@/lib/types";

export function SubscriptionStatus({ status }: { status: Status }) {
  const active = status === "active";

  return (
    <div className={`flex items-start gap-3 rounded-md border p-4 ${active ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
      {active ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-700" />
      ) : (
        <CircleAlert className="mt-0.5 h-5 w-5 text-amberline" />
      )}
      <div>
        <p className="font-semibold text-ink">
          {active ? "Suscripción activa" : "Plan gratuito"}
        </p>
        <p className="mt-1 text-sm text-zinc-600">
          {active
            ? "Tienes acceso al análisis completo, historial y detalles de inversión."
            : "Puedes navegar por la app, pero el análisis completo se desbloquea con el plan mensual."}
        </p>
      </div>
    </div>
  );
}
