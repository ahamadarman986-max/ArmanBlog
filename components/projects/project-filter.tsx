"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters = [
  { label: "All", value: "all" },
  { label: "Web Development", value: "web-development" },
  { label: "SEO Projects", value: "seo-projects" },
  { label: "Marketing Projects", value: "marketing-projects" }
];

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("all");
  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((project) => project.projectType === active)),
    [active, projects]
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActive(filter.value)}
            className={cn(
              "focus-ring rounded-full border px-4 py-2 text-sm font-semibold transition",
              active === filter.value
                ? "border-gold bg-gold text-white"
                : "border-black/10 bg-white text-ink hover:border-gold dark:border-white/10 dark:bg-white/5 dark:text-white"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => <ProjectCard key={project._id} project={project} />)}
      </div>
    </div>
  );
}
