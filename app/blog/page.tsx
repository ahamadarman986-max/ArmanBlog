import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogFilters } from "@/components/blog/blog-filters";
import { FeaturedPost } from "@/components/blog/featured-post";
import { SectionHeading } from "@/components/shared/section-heading";
import { categories as fallbackCategories, fallbackPosts, siteConfig } from "@/lib/constants";
import type { Category, Post } from "@/lib/types";
import { fetchSanity } from "@/sanity/lib";
import { categoriesQuery, postsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: "SEO, digital marketing, web development, AI tools, WordPress, and personal growth articles.",
  alternates: { canonical: `${siteConfig.url}/blog` }
};

type BlogPageProps = {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const posts = (await fetchSanity<Post[]>(postsQuery)) || fallbackPosts;
  const categories = (await fetchSanity<Category[]>(categoriesQuery)) || fallbackCategories;
  const query = params.q?.toLowerCase() || "";
  const selectedCategory = params.category || "";
  const page = Number(params.page || "1");
  const pageSize = 6;

  const filtered = posts.filter((post) => {
    const matchesQuery = !query || `${post.title} ${post.excerpt} ${post.tags?.join(" ")}`.toLowerCase().includes(query);
    const matchesCategory = !selectedCategory || post.category?.slug.current === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const featured = filtered[0] || posts[0];
  const pagedPosts = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  return (
    <section className="section container-page">
      <SectionHeading eyebrow="Blog" title="Search-driven strategy, modern websites, and practical growth systems" description="Browse articles by topic, search for specific playbooks, and build a sharper operating system for online authority." />
      <div className="mt-10">
        <BlogFilters categories={categories} activeCategory={selectedCategory} activeQuery={params.q || ""} />
      </div>
      {featured ? (
        <div className="mt-10">
          <FeaturedPost post={featured} />
        </div>
      ) : null}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pagedPosts.map((post, index) => <BlogCard key={post._id} post={post} priority={index === 0} />)}
      </div>
      <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
          <a
            key={item}
            href={`/blog?page=${item}${selectedCategory ? `&category=${selectedCategory}` : ""}${query ? `&q=${query}` : ""}`}
            className={`focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${item === page ? "border-gold bg-gold text-white" : "border-black/10 dark:border-white/10"}`}
          >
            {item}
          </a>
        ))}
      </nav>
    </section>
  );
}
