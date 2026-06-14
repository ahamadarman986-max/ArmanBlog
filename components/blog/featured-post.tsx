import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib";

export function FeaturedPost({ post }: { post: Post }) {
  const image = urlForImage(post.featuredImage);

  return (
    <article className="surface grid overflow-hidden rounded-lg lg:grid-cols-[1.15fr_0.85fr]">
      <div className="relative min-h-[320px] bg-gray-100 dark:bg-white/5">
        {image ? (
          <Image src={image} alt={post.featuredImage?.alt || post.title} fill priority className="object-cover" sizes="(min-width: 1024px) 56vw, 100vw" />
        ) : null}
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <p className="eyebrow">Featured Article</p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-normal text-ink dark:text-white sm:text-4xl">{post.title}</h2>
        <p className="mt-4 text-sm text-muted dark:text-gray-300">{post.category?.name} · {formatDate(post.publishedAt)} · {post.readingTime || 5} min read</p>
        <p className="mt-5 text-base leading-7 text-muted dark:text-gray-300">{post.excerpt}</p>
        <Link href={`/blog/${post.slug.current}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold">
          Read article <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
