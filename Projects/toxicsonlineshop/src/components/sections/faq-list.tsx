export const FaqList = ({
  items
}: {
  items: { question: string; answer: string }[];
}) => (
  <div className="grid gap-3">
    {items.map((item) => (
      <details
        className="group rounded-2xl border border-border bg-white p-5 shadow-sm"
        key={item.question}
      >
        <summary className="cursor-pointer list-none font-semibold text-navy">
          <span className="flex items-center justify-between gap-4">
            {item.question}
            <span className="text-aura transition group-open:rotate-45">+</span>
          </span>
        </summary>
        <p className="mt-4 leading-7 text-muted">{item.answer}</p>
      </details>
    ))}
  </div>
);
