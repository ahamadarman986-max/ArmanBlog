"use client";

import { Search } from "lucide-react";
import type { Category } from "@/lib/types";

type BlogFiltersProps = {
  categories: Category[];
  activeCategory?: string;
  activeQuery?: string;
};

export function BlogFilters({ categories, activeCategory = "", activeQuery = "" }: BlogFiltersProps) {
  return (
    <form className="surface grid gap-3 rounded-lg p-3 md:grid-cols-[1fr_auto]" action="/blog">
      <label className="relative block">
        <span className="sr-only">Search articles</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          name="q"
          type="search"
          placeholder="Search articles..."
          defaultValue={activeQuery}
          className="focus-ring h-12 w-full rounded-full border border-black/10 bg-white pl-11 pr-4 text-sm dark:border-white/10 dark:bg-white/5"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          name="category"
          value=""
          className={`focus-ring rounded-full border px-4 py-2 text-sm font-medium transition ${
            activeCategory === ""
              ? "border-gold bg-gold text-white font-semibold"
              : "border-black/10 text-muted hover:border-gold hover:text-gold dark:border-white/10"
          }`}
        >
          All
        </button>
        {categories.map((category) => {
          const isActive = category.slug.current === activeCategory;
          return (
            <button
              key={category._id}
              type="submit"
              name="category"
              value={category.slug.current}
              className={`focus-ring rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-gold bg-gold text-white font-semibold"
                  : "border-black/10 text-muted hover:border-gold hover:text-gold dark:border-white/10"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </form>
  );
}
