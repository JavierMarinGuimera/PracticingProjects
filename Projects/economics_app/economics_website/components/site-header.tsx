import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { LogoutButton } from "@/components/logout-button";

export async function SiteHeader() {
  const user = await getSessionUser();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-ink">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-ink text-white">
            <BarChart3 className="h-5 w-5" />
          </span>
          <span>Market Pulse AI</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 md:flex">
          {user ? (
            <>
              <Link className="hover:text-ink" href="/dashboard">
                Dashboard
              </Link>
              <Link className="hover:text-ink" href="/history">
                Historial
              </Link>
              <Link className="hover:text-ink" href="/pricing">
                Suscripción
              </Link>
              <Link className="hover:text-ink" href="/profile">
                Perfil
              </Link>
            </>
          ) : (
            <>
              <Link className="hover:text-ink" href="/pricing">
                Pricing
              </Link>
              <Link className="hover:text-ink" href="/login">
                Login
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 sm:inline-flex"
              >
                Abrir feed
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/register"
              className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Probar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
