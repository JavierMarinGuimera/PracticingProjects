import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { getProductInquiryMessage, getWhatsAppHref } from "@/lib/contact";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
          {product.category}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-neutral-950">
          {product.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{product.description}</p>
        <a
          href={getWhatsAppHref(getProductInquiryMessage(product.title))}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
          aria-label={`Request information about ${product.title} on WhatsApp`}
        >
          Request info
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
