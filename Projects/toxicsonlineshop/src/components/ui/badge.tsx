import { cn } from "@/lib/utils";

export const Badge = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border border-aura/15 bg-aura/10 px-3 py-1 text-xs font-semibold text-aura",
      className
    )}
  >
    {children}
  </span>
);
