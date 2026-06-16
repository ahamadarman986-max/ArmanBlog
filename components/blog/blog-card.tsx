import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib";

type BlogCardProps = {
  post: Post;
  priority?: boolean;
};

export function BlogCard({ post, priority = false }: BlogCardProps) {
  const image = urlForImage(post.featuredImage);

  return (
    <article className="surface group overflow-hidden rounded-lg">
      <Link href={`/blog/${post.slug.current}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-white/5">
          {image ? (
            <Image
              src={image}
              alt={post.featuredImage?.alt || post.title}
              fill
              priority={priority}
              className="object-cover transition duration-500 group-hover:scale-105 will-change-transform"
              sizes="(min-width: 1280px) 380px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          ) : null}
        </div>
      </Link>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted dark:text-gray-400">
          {post.category?.name ? <span className="rounded-full bg-gold/10 px-3 py-1 text-gold">{post.category.name}</span> : null}
          <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {formatDate(post.publishedAt)}</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readingTime || 5} min</span>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold tracking-normal text-ink transition group-hover:text-gold dark:text-white">
          <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted dark:text-gray-300">{post.excerpt}</p>
      </div>
    </article>
  );
}
