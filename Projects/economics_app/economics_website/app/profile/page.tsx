import { PageHeading } from "@/components/page-heading";
import { SubscriptionStatus } from "@/components/subscription-status";
import { requireSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await requireSessionUser();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeading
        eyebrow="Perfil"
        title="Datos de tu cuenta"
        description="Información básica del usuario y estado actual de suscripción."
      />

      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <section className="rounded-md border border-line bg-white p-6">
          <dl className="space-y-5">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Email</dt>
              <dd className="mt-1 text-lg font-medium text-ink">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Creado</dt>
              <dd className="mt-1 text-zinc-700">
                {new Date(user.createdAt).toLocaleString("es-ES", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-zinc-500">ID de usuario</dt>
              <dd className="mt-1 break-all font-mono text-sm text-zinc-700">{user.id}</dd>
            </div>
          </dl>
        </section>

        <aside>
          <SubscriptionStatus status={user.subscriptionStatus} />
        </aside>
      </div>
    </main>
  );
}
