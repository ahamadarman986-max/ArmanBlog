import type { Category, Post, Project, Testimonial } from "@/lib/types";

export const siteConfig = {
  name: "Digital Growth Studio",
  title: "Digital Marketer, SEO Specialist, and Web Developer",
  description:
    "Premium personal brand website for SEO insights, web development projects, and digital marketing strategy.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  author: "Arman Ahamad",
  email: "ahamadarman986@gmail.com",
  phone: "+977 9716293191",
  social: {
    facebook: "https://www.facebook.com/arman.ahamad.295829",
    instagram: "https://www.instagram.com/armanahamad8898?igsh=NGt0b3JxZGxka2dt",
    whatsapp: "https://web.whatsapp.com/",
    linkedin: "",
    twitter: "",
    github: ""
  }
};

export const categories: Category[] = [
  { _id: "seo", name: "SEO", slug: { current: "seo" }, description: "Search strategy and technical SEO." },
  { _id: "digital-marketing", name: "Digital Marketing", slug: { current: "digital-marketing" }, description: "Growth campaigns and funnels." },
  { _id: "web-development", name: "Web Development", slug: { current: "web-development" }, description: "Modern websites and tooling." },
  { _id: "ai-tools", name: "AI Tools", slug: { current: "ai-tools" }, description: "Practical automation workflows." },
  { _id: "wordpress", name: "WordPress", slug: { current: "wordpress" }, description: "WordPress strategy and performance." },
  { _id: "personal-growth", name: "Personal Growth", slug: { current: "personal-growth" }, description: "Systems for better work." }
];

export const fallbackPosts: Post[] = [
  {
    _id: "post-1",
    title: "How Technical SEO Creates Compounding Growth",
    slug: { current: "technical-seo-compounding-growth" },
    excerpt:
      "A practical framework for building search visibility through crawlability, content architecture, and site performance.",
    publishedAt: "2026-01-12",
    readingTime: 7,
    tags: ["SEO", "Performance", "Content"],
    category: categories[0],
    author: { _id: "author", name: siteConfig.author, bio: siteConfig.title },
    featuredImage: {
      asset: { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80" },
      alt: "Analytics dashboard on a laptop"
    }
  },
  {
    _id: "post-2",
    title: "Building Fast Marketing Websites With Next.js",
    slug: { current: "fast-marketing-websites-nextjs" },
    excerpt:
      "The developer-friendly stack I use for premium websites that load fast, rank well, and convert visitors into clients.",
    publishedAt: "2026-02-08",
    readingTime: 6,
    tags: ["Next.js", "Web Development", "UX"],
    category: categories[2],
    author: { _id: "author", name: siteConfig.author, bio: siteConfig.title },
    featuredImage: {
      asset: { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80" },
      alt: "Developer workspace with code"
    }
  },
  {
    _id: "post-3",
    title: "A Content Strategy System for Authority Sites",
    slug: { current: "content-strategy-authority-sites" },
    excerpt:
      "Turn expertise into a repeatable publishing engine with topic clusters, editorial workflows, and measurable outcomes.",
    publishedAt: "2026-03-17",
    readingTime: 8,
    tags: ["Content Strategy", "Marketing", "Authority"],
    category: categories[1],
    author: { _id: "author", name: siteConfig.author, bio: siteConfig.title },
    featuredImage: {
      asset: { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80" },
      alt: "Marketing team planning content"
    }
  }
];

export const fallbackProjects: Project[] = [
  {
    _id: "project-1",
    title: "SaaS Growth Landing Page",
    description: "A conversion-focused Next.js website with technical SEO, analytics events, and high-speed landing pages.",
    technologies: ["Next.js", "Tailwind", "SEO", "Analytics"],
    projectType: "web-development",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    image: {
      asset: { url: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80" },
      alt: "SaaS website dashboard"
    }
  },
  {
    _id: "project-2",
    title: "Local SEO Revenue Engine",
    description: "A complete local search campaign with technical fixes, content clusters, GBP optimization, and reporting.",
    technologies: ["Technical SEO", "Content", "Local SEO"],
    projectType: "seo-projects",
    liveUrl: "https://example.com",
    image: {
      asset: { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80" },
      alt: "SEO performance dashboard"
    }
  },
  {
    _id: "project-3",
    title: "B2B Content Funnel",
    description: "A full-funnel content and email system that turns organic traffic into qualified consultation requests.",
    technologies: ["Content Strategy", "Email", "CRO"],
    projectType: "marketing-projects",
    liveUrl: "https://example.com",
    image: {
      asset: { url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80" },
      alt: "Marketing campaign planning"
    }
  }
];

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: "testimonial-1",
    name: "Aisha Carter",
    company: "Founder, BrightOps",
    message:
      "The strategy connected our website, SEO, and conversion path into one clear growth system. We saw better leads within weeks."
  },
  {
    _id: "testimonial-2",
    name: "Marcus Lee",
    company: "CMO, Northstar Labs",
    message:
      "A rare blend of technical execution and marketing judgment. The new site is fast, elegant, and genuinely easier to grow."
  }
];
