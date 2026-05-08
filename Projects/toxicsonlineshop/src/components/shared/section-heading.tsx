import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false
}: SectionHeadingProps) => (
  <div
    className={cn(
      "max-w-3xl space-y-4",
      align === "center" && "mx-auto text-center"
    )}
  >
    {eyebrow ? (
      <Badge className={inverse ? "border-white/15 bg-white/10 text-mint" : ""}>
        {eyebrow}
      </Badge>
    ) : null}
    <h2
      className={cn(
        "display-heading text-3xl font-semibold tracking-normal md:text-5xl",
        inverse ? "text-white" : "text-foreground"
      )}
    >
      {title}
    </h2>
    {description ? (
      <p
        className={cn(
          "text-base leading-8 md:text-lg",
          inverse ? "text-white/70" : "text-muted"
        )}
      >
        {description}
      </p>
    ) : null}
  </div>
);
