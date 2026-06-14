import { ImageResponse } from "next/og";
import { fallbackPosts, siteConfig } from "@/lib/constants";
import type { Post } from "@/lib/types";
import { fetchSanity } from "@/sanity/lib";
import { postBySlugQuery } from "@/sanity/queries";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = (await fetchSanity<Post>(postBySlugQuery, { slug })) || fallbackPosts.find((item) => item.slug.current === slug);

  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#111827", color: "white", padding: "80px" }}>
        <div style={{ color: "#B9894B", fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>
          {post?.category?.name || "Article"}
        </div>
        <div style={{ marginTop: 28, maxWidth: 960, fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>
          {post?.title || "Article"}
        </div>
        <div style={{ marginTop: 36, fontSize: 30, color: "#D1D5DB" }}>{siteConfig.name}</div>
      </div>
    ),
    size
  );
}
