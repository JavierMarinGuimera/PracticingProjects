import type { ReactNode } from "react";

export function ContactLink({
  href,
  label,
  value,
  icon,
}: {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex min-h-20 items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white transition group-hover:bg-cyan-600">
        {icon}
      </span>
      <span>
        <span className="block text-sm text-neutral-500">{label}</span>
        <span className="block text-base font-semibold text-neutral-950">{value}</span>
      </span>
    </a>
  );
}
