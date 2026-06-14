import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { urlForImage } from "@/sanity/lib";

export function ProjectCard({ project }: { project: Project }) {
  const image = urlForImage(project.image);

  return (
    <article className="surface overflow-hidden rounded-lg">
      <div className="relative aspect-[16/10] bg-gray-100 dark:bg-white/5">
        {image ? <Image src={image} alt={project.image?.alt || project.title} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" /> : null}
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-semibold text-ink dark:text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted dark:text-gray-300">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">{tech}</span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a href={project.liveUrl} className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
              Live demo <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
          {project.githubUrl ? (
            <a href={project.githubUrl} className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-gold dark:text-gray-300">
              Source <Github className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
