import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/article-body";
import { BlogCard } from "@/components/blog/blog-card";
import { ShareButtons } from "@/components/blog/share-buttons";
import dynamic from "next/dynamic";

const CommentBox = dynamic(() => import("@/components/blog/comment-box").then((mod) => mod.CommentBox), {
  ssr: false,
  loading: () => <div className="h-48 animate-pulse bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10" />
});
import { Newsletter } from "@/components/shared/newsletter";
import { JsonLd } from "@/components/seo/json-ld";
import { fallbackPosts, siteConfig } from "@/lib/constants";
import type { Post } from "@/lib/types";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { fetchSanity, urlForImage } from "@/sanity/lib";
import { postBySlugQuery, relatedPostsQuery } from "@/sanity/queries";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  return (await fetchSanity<Post>(postBySlugQuery, { slug })) || fallbackPosts.find((post) => post.slug.current === slug) || null;
}

export async function generateStaticParams() {
  const posts = (await fetchSanity<Post[]>(`*[_type == "post"]{slug}`)) || fallbackPosts;
  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  const image = urlForImage(post.ogImage || post.featuredImage);
  const url = absoluteUrl(`/blog/${post.slug.current}`);

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: image ? [{ url: image, alt: post.ogImage?.alt || post.featuredImage?.alt || post.title }] : undefined,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const related =
    (await fetchSanity<Post[]>(relatedPostsQuery, { slug, categoryId: post.category?._id })) ||
    fallbackPosts.filter((item) => item.slug.current !== slug).slice(0, 3);
  const image = urlForImage(post.featuredImage);
  const url = absoluteUrl(`/blog/${post.slug.current}`);

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: { "@type": "Person", name: post.author?.name || siteConfig.author },
          image: image ? [image] : undefined,
          mainEntityOfPage: url
        }}
      />
      <header className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">{post.category?.name || "Article"}</p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-normal text-ink dark:text-white sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted dark:text-gray-300">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-muted dark:text-gray-400">
            <span>{post.author?.name || siteConfig.author}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span>·</span>
            <span>{post.readingTime || 5} min read</span>
          </div>
        </div>
        {image ? (
          <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-lg bg-gray-100 dark:bg-white/5">
            <Image src={image} alt={post.featuredImage?.alt || post.title} fill priority className="object-cover" sizes="(min-width: 1024px) 896px, 100vw" />
          </div>
        ) : null}
      </header>
      <div className="container-page grid gap-10 pb-20 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-lg border border-black/10 p-5 text-sm dark:border-white/10">
            <p className="font-semibold text-ink dark:text-white">Table of contents</p>
            <div className="mt-4 grid gap-2 text-muted dark:text-gray-300">
              <a href="#article">Article</a>
              <a href="#share">Share</a>
              <a href="#comments">Comments</a>
              <a href="#related">Related posts</a>
            </div>
          </div>
        </aside>
        <div className="mx-auto w-full max-w-3xl">
          <section id="article">
            <ArticleBody body={post.body} />
          </section>
          <section id="share" className="mt-10 border-y border-black/10 py-6 dark:border-white/10">
            <ShareButtons title={post.title} url={url} />
          </section>
          <section className="mt-10">
            <Newsletter />
          </section>
          <section id="comments" className="mt-10">
            <CommentBox slug={post.slug.current} />
          </section>
        </div>
      </div>
      <section id="related" className="section bg-ivory dark:bg-white/[0.03]">
        <div className="container-page">
          <h2 className="font-display text-3xl font-semibold text-ink dark:text-white">Related posts</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((item) => <BlogCard key={item._id} post={item} />)}
          </div>
        </div>
      </section>
    </article>
  );
}
