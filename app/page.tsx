import { ArrowRight, CheckCircle2, Code2, LineChart, Search, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import Image from "next/image";
import { BlogCard } from "@/components/blog/blog-card";
import { FeaturedPost } from "@/components/blog/featured-post";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/shared/button-link";
import { Newsletter } from "@/components/shared/newsletter";
import { SectionHeading } from "@/components/shared/section-heading";
import { fallbackPosts, fallbackProjects, fallbackTestimonials } from "@/lib/constants";
import type { Post, Project, Testimonial } from "@/lib/types";
import { fetchSanity } from "@/sanity/lib";
import { postsQuery, projectsQuery, testimonialsQuery } from "@/sanity/queries";

const skills = ["Technical SEO", "Next.js", "Content Strategy", "WordPress", "Analytics", "Conversion Optimization"];
const services = [
  { icon: Code2, title: "Website Development", text: "Fast, polished websites built with modern architecture and clean UX." },
  { icon: Search, title: "SEO Optimization", text: "Technical audits, content architecture, and search systems that compound." },
  { icon: LineChart, title: "Digital Marketing", text: "Campaigns, funnels, and analytics that connect attention to revenue." }
];
const timeline = [
  ["2019", "Started building websites and learning acquisition channels."],
  ["2021", "Specialized in SEO systems, performance, and content workflows."],
  ["2024", "Combined development and marketing into full-stack growth projects."],
  ["Now", "Helping brands build authority with content, search, and premium web experiences."]
];

export default async function HomePage() {
  const posts = (await fetchSanity<Post[]>(postsQuery)) || fallbackPosts;
  const projects = (await fetchSanity<Project[]>(projectsQuery)) || fallbackProjects;
  const testimonials = (await fetchSanity<Testimonial[]>(testimonialsQuery)) || fallbackTestimonials;
  const featured = posts[0];

  return (
    <>
      <section className="container-page grid min-h-[calc(100vh-5rem)] items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-up">
          <p className="eyebrow">Digital Marketer · SEO Specialist · Web Developer</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold tracking-normal text-ink dark:text-white sm:text-5xl lg:text-6xl">
            Helping Brands Grow Through Digital Marketing & Web Development
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted dark:text-gray-300">
            Sharing insights about SEO, technology, websites, and online growth.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/blog">Read Articles</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">View Projects</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Contact Me <ArrowRight className="ml-2 h-4 w-4" /></ButtonLink>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            {[
              ["120+", "Articles planned"],
              ["35%", "Avg. speed lift"],
              ["10+", "Growth systems"]
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-3xl font-semibold text-ink dark:text-white">{value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-muted dark:text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative group">
          <div className="surface relative mx-auto aspect-[16/9] max-w-xl overflow-hidden rounded-lg border border-black/10 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/10 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:border-gold/30">
            <Image
              src="/arman.jpg"
              alt="Arman Ahamad - Web Developer & SEO Specialist"
              fill
              priority
              quality={95}
              sizes="(min-width: 1280px) 576px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] will-change-transform"
            />
          </div>
          <div className="surface absolute -bottom-6 left-0 right-0 mx-auto w-[88%] rounded-lg p-5 shadow-lg border border-black/5 dark:border-white/5 transition-transform duration-500 group-hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-9 w-9 text-gold" />
              <p className="text-sm font-medium leading-6 text-ink dark:text-white">Premium websites with SEO strategy built into the foundation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section container-page">
        {featured ? <FeaturedPost post={featured} /> : null}
      </section>

      <section className="section container-page">
        <SectionHeading eyebrow="Latest Thinking" title="Articles for builders and growth-focused brands" description="Practical writing across SEO, marketing, development, AI tooling, WordPress, and personal growth." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => <BlogCard key={post._id} post={post} priority={index === 0} />)}
        </div>
      </section>

      <section className="section bg-ink text-white dark:bg-black">
        <div className="container-page">
          <SectionHeading eyebrow="Skills" title="Strategy and execution in one workflow" description="A practical blend of technical depth, content judgment, and conversion-focused design." />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <CheckCircle2 className="h-5 w-5 text-gold" />
                <span className="font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container-page">
        <SectionHeading eyebrow="Services" title="Growth services for premium digital brands" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map(({ icon: Icon, title, text }) => (
            <div key={title} className="surface rounded-lg p-6">
              <Icon className="h-8 w-8 text-gold" />
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink dark:text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted dark:text-gray-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container-page">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Experience</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink dark:text-white">A journey from websites to growth systems</h2>
          </div>
          <div className="grid gap-5">
            {timeline.map(([year, text]) => (
              <div key={year} className="surface rounded-lg p-5">
                <p className="text-sm font-semibold text-gold">{year}</p>
                <p className="mt-2 text-muted dark:text-gray-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container-page">
        <SectionHeading eyebrow="Selected Work" title="Portfolio projects that connect design, content, and growth" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => <ProjectCard key={project._id} project={project} />)}
        </div>
      </section>

      <section className="section container-page">
        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial._id} className="surface rounded-lg p-6">
              <Trophy className="h-7 w-7 text-gold" />
              <p className="mt-5 text-lg leading-8 text-ink dark:text-white">&ldquo;{testimonial.message}&rdquo;</p>
              <footer className="mt-5 text-sm text-muted dark:text-gray-300">{testimonial.name}, {testimonial.company}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section container-page">
        <div className="surface grid gap-8 rounded-lg p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <Sparkles className="h-9 w-9 text-gold" />
            <h2 className="mt-5 font-display text-3xl font-semibold text-ink dark:text-white">Build authority with better ideas and better systems.</h2>
          </div>
          <Newsletter />
        </div>
      </section>
    </>
  );
}
