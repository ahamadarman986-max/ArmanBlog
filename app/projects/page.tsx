import type { Metadata } from "next";
import { ProjectFilter } from "@/components/projects/project-filter";
import { SectionHeading } from "@/components/shared/section-heading";
import { fallbackProjects, siteConfig } from "@/lib/constants";
import type { Project } from "@/lib/types";
import { fetchSanity } from "@/sanity/lib";
import { projectsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Projects",
  description: "Portfolio projects across web development, SEO, and digital marketing.",
  alternates: { canonical: `${siteConfig.url}/projects` }
};

export default async function ProjectsPage() {
  const projects = (await fetchSanity<Project[]>(projectsQuery)) || fallbackProjects;

  return (
    <section className="section container-page">
      <SectionHeading eyebrow="Portfolio" title="Projects built for credibility, performance, and growth" description="Filter by web development, SEO projects, and marketing systems." />
      <div className="mt-10">
        <ProjectFilter projects={projects} />
      </div>
    </section>
  );
}
