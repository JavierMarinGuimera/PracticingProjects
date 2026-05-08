import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-36 w-full resize-y rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-aura/50 focus:ring-4 focus:ring-aura/10",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
