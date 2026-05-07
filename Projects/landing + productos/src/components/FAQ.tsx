import type { FAQItem } from "@/types/category";

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">FAQ</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-8 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
          {items.map((item) => (
            <details key={item.question} className="group p-5 open:bg-neutral-50">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-950">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
