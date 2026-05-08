import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigation, siteConfig } from "@/config/site";

export const SiteHeader = () => (
  <header className="sticky top-0 z-50 border-b border-white/70 bg-white/78 backdrop-blur-xl">
    <div className="container-page flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center gap-3" aria-label="TOXICS home">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-sm font-black text-white shadow-[0_14px_34px_rgba(7,17,31,0.18)]">
          T
        </span>
        <span className="leading-tight">
          <span className="block font-display text-sm font-extrabold tracking-normal text-navy">
            {siteConfig.name}
          </span>
          <span className="block text-xs text-muted">{siteConfig.role}</span>
        </span>
      </Link>

      <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
        {navigation.map((item) => (
          <Link
            className="text-sm font-medium text-slate-600 transition hover:text-navy"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="hidden items-center gap-3 md:flex">
        <Button asChild variant="outline" size="sm">
          <Link href="/contact">Solicitar proyecto</Link>
        </Button>
        <Button asChild variant="aura" size="sm">
          <Link href="/shop">
            Comprar servicio <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Button asChild variant="ghost" size="icon" className="md:hidden">
        <Link href="/contact" aria-label="Abrir contacto">
          <Menu className="h-5 w-5" />
        </Link>
      </Button>
    </div>
  </header>
);
