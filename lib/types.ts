import type { PortableTextBlock } from "@portabletext/types";

export type Slug = {
  current: string;
};

export type ImageAsset = {
  asset?: {
    _ref?: string;
    url?: string;
  };
  alt?: string;
};

export type Category = {
  _id: string;
  name: string;
  slug: Slug;
  description?: string;
};

export type Author = {
  _id: string;
  name: string;
  image?: ImageAsset;
  bio?: string;
  socialLinks?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
};

export type Post = {
  _id: string;
  title: string;
  slug: Slug;
  excerpt: string;
  featuredImage?: ImageAsset;
  body?: PortableTextBlock[];
  author?: Author;
  category?: Category;
  tags?: string[];
  publishedAt: string;
  readingTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: ImageAsset;
};

export type Project = {
  _id: string;
  title: string;
  image?: ImageAsset;
  description: string;
  technologies: string[];
  projectType: "web-development" | "seo-projects" | "marketing-projects";
  liveUrl?: string;
  githubUrl?: string;
};

export type Testimonial = {
  _id: string;
  name: string;
  company: string;
  message: string;
  image?: ImageAsset;
};
