import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <section className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <div className="max-w-md rounded-2xl border border-border bg-white p-8 text-center shadow-premium">
          <h1 className="font-display text-3xl font-semibold text-navy">
            Clerk no está configurado.
          </h1>
          <p className="mt-3 text-muted">
            Añade las claves de Clerk en `.env` para habilitar el acceso admin.
          </p>
          <Button asChild className="mt-6" variant="aura">
            <Link href="/">Volver</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <SignIn />
    </section>
  );
}
