import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "dark" | "whatsapp" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-neutral-950 shadow-sm hover:bg-neutral-100 focus-visible:outline-white",
  secondary:
    "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/15 focus-visible:outline-white",
  dark:
    "bg-neutral-950 text-white shadow-sm hover:bg-neutral-800 focus-visible:outline-neutral-950",
  whatsapp:
    "bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline-emerald-500",
  ghost:
    "border border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-neutral-950",
};

export function Button({
  children,
  className,
  variant = "dark",
  icon,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
}) {
  return (
    <a
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </a>
  );
}
