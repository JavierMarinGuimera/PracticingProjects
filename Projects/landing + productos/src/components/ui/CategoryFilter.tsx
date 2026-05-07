"use client";

import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types/product";

export type ActiveCategory = ProductCategory | "All";
export type CategoryFilterOption = {
  label: string;
  value: ProductCategory;
};

export function CategoryFilter({
  categories,
  activeCategory,
  onChange,
}: {
  categories: CategoryFilterOption[];
  activeCategory: ActiveCategory;
  onChange: (category: ActiveCategory) => void;
}) {
  const options = [{ label: "Todos", value: "All" as const }, ...categories];

  return (
    <div className="flex flex-wrap gap-2" aria-label="Product categories">
      {options.map((category) => {
        const active = category.value === activeCategory;

        return (
          <button
            key={category.value}
            type="button"
            onClick={() => onChange(category.value)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950",
              active
                ? "border-neutral-950 bg-neutral-950 text-white"
                : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50",
            )}
            aria-pressed={active}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
