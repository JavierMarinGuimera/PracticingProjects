import Link from "next/link";

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition hover:text-neutral-950">
            Inicio
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/products" className="transition hover:text-neutral-950">
            Servicios
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="font-medium text-neutral-950" aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  );
}
