import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-12 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none transition focus:border-aura/50 focus:ring-4 focus:ring-aura/10",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";
