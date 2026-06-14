import type { MetadataRoute } from "next";
import { fallbackPosts, siteConfig } from "@/lib/constants";
import type { Post } from "@/lib/types";
import { fetchSanity } from "@/sanity/lib";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await fetchSanity<Post[]>(`*[_type == "post"]{slug,publishedAt}`)) || fallbackPosts;
  const routes = ["", "/about", "/blog", "/projects", "/services", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date()
  }));

  return [
    ...routes,
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt)
    }))
  ];
}
