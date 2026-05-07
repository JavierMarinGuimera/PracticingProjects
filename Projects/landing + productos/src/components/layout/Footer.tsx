import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navigation } from "@/config/navigation";
import { company } from "@/data/company";
import { getTelHref } from "@/lib/contact";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-white">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-neutral-950">
                Y
              </span>
              <span className="font-semibold tracking-tight">{company.legalName}</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/65">
              {company.description}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Pages</h2>
            <nav className="mt-4 grid gap-3" aria-label="Footer navigation">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Contact</h2>
            <div className="mt-4 grid gap-3 text-sm text-white/65">
              <a href={getTelHref()} className="flex items-center gap-2 transition hover:text-white">
                <Phone size={16} aria-hidden="true" />
                {company.phoneDisplay}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-2 transition hover:text-white"
              >
                <Mail size={16} aria-hidden="true" />
                {company.email}
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={16} aria-hidden="true" />
                {company.address}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
          <p>Reusable Next.js catalog template.</p>
        </div>
      </Container>
    </footer>
  );
}
