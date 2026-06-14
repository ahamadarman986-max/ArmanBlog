import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { fallbackProjects, fallbackTestimonials, siteConfig } from "@/lib/constants";
import type { Project, Testimonial } from "@/lib/types";
import { fetchSanity } from "@/sanity/lib";
import { projectsQuery, testimonialsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "About",
  description: "Personal story, learning journey, skills, mission, and experience.",
  alternates: { canonical: `${siteConfig.url}/about` }
};

const skills = [
  "Technical SEO Auditing",
  "Search Intent Analysis",
  "Semantic Content Architecture",
  "Front-End Engineering",
  "Headless CMS Architecture",
  "Conversion Rate Optimization (CRO)",
  "Site Speed Optimization",
  "Analytics & Event Tracking"
];

const technologies = [
  "React",
  "Next.js (App Router)",
  "TypeScript",
  "Tailwind CSS",
  "Sanity CMS",
  "WordPress",
  "Node.js",
  "Google Search Console",
  "Google Analytics 4",
  "Screaming Frog SEO Spider",
  "Git & GitHub",
  "Vercel"
];

const interests = [
  "Semantic Search Engine Crawlers & Indexing Algorithms",
  "Performance-Centric Jamstack & Headless Web Architectures",
  "Search Intent Alignment & Topical Authority Mapping",
  "Behavioral UX Design and Conversion Flow Psychology"
];

const currentFocus = [
  "Designing high-speed Next.js React templates optimized for Core Web Vitals.",
  "Constructing scalable, component-driven headless CMS setups with Sanity.",
  "Developing data-driven content blueprints to lift search index rates for clients."
];

const professionalGoals = [
  "Build web applications that deliver top-tier accessibility and sub-second load times.",
  "Help growth companies establish sustainable, compounding search visibility.",
  "Bridge the gap between frontend development and modern SEO acquisition structures."
];

export default async function AboutPage() {
  const projects = (await fetchSanity<Project[]>(projectsQuery)) || fallbackProjects;
  const testimonials = (await fetchSanity<Testimonial[]>(testimonialsQuery)) || fallbackTestimonials;

  return (
    <section className="section container-page">
      <SectionHeading eyebrow="About" title="A practical builder with a marketer's eye" description="I care about the whole digital system: how a website feels, how fast it loads, how search engines understand it, and how visitors become clients." />
      
      <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left Column: Mission & Professional Goals */}
        <div className="flex flex-col gap-6">
          <div className="surface rounded-lg p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-ink dark:text-white">Mission Statement</h2>
            <p className="mt-4 text-base leading-8 text-muted dark:text-gray-300 font-normal">
              My mission is to help ambitious brands build a high-performance digital presence that establishes organic trust, matches search intent, and drives measurable business growth.
            </p>
            <p className="mt-4 text-base leading-8 text-muted dark:text-gray-300 font-normal">
              I specialize in uniting technical front-end development with search optimization to turn static websites into functional growth channels.
            </p>
          </div>

          <div className="surface rounded-lg p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-ink dark:text-white">Professional Goals</h2>
            <ul className="mt-4 space-y-3">
              {professionalGoals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm leading-6 text-muted dark:text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Interests & Current Focus Areas */}
        <div className="flex flex-col gap-6">
          <div className="surface rounded-lg p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-ink dark:text-white">Areas of Interest</h2>
            <ul className="mt-4 space-y-4">
              {interests.map((interest, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="font-display text-lg font-bold text-gold mt-[-3px]">{`0${idx + 1}`}</span>
                  <p className="text-sm leading-6 text-muted dark:text-gray-300">{interest}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface rounded-lg p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-ink dark:text-white">Current Focus Areas</h2>
            <ul className="mt-4 space-y-4">
              {currentFocus.map((focus, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0 mt-2" />
                  <p className="text-sm leading-6 text-muted dark:text-gray-300">{focus}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-16 border-t border-black/10 dark:border-white/10 pt-16">
        <h2 className="font-display text-3xl font-semibold text-ink dark:text-white">Current Skills</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <div key={skill} className="surface flex items-center gap-3 rounded-lg p-4">
              <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
              <span className="text-sm font-semibold text-ink dark:text-white">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tools & Technologies */}
      <div className="mt-16 border-t border-black/10 dark:border-white/10 pt-16">
        <h2 className="font-display text-3xl font-semibold text-ink dark:text-white">Tools & Technologies</h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="focus-ring inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-ink dark:border-white/10 dark:bg-white/5 dark:text-white transition hover:border-gold hover:text-gold"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Selected Portfolio Work */}
      <div className="mt-16 border-t border-black/10 dark:border-white/10 pt-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="font-display text-3xl font-semibold text-ink dark:text-white">Recent Work & Contributions</h2>
          <Link href="/projects" className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-gold transition hover:text-ink dark:hover:text-white">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-16 border-t border-black/10 dark:border-white/10 pt-16">
        <h2 className="font-display text-3xl font-semibold text-ink dark:text-white">What client partners say</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {testimonials.slice(0, 2).map((testimonial) => (
            <blockquote key={testimonial._id} className="surface rounded-lg p-6">
              <Trophy className="h-7 w-7 text-gold" />
              <p className="mt-5 text-lg leading-8 text-ink dark:text-white">&ldquo;{testimonial.message}&rdquo;</p>
              <footer className="mt-5 text-sm text-muted dark:text-gray-300">{testimonial.name}, {testimonial.company}</footer>
            </blockquote>
          ))}
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="surface mt-16 flex flex-col gap-5 rounded-lg p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="eyebrow font-semibold">Ready to scale?</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink dark:text-white">{"Let's discuss your next digital platform."}</h2>
        </div>
        <Link href="/contact" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-gold dark:bg-white dark:text-ink">
          Work with me <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
