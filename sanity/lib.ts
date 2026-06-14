import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import type { ImageAsset } from "@/lib/types";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      token: process.env.SANITY_API_READ_TOKEN
    })
  : null;

const builder = projectId
  ? imageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(image?: ImageAsset) {
  if (image?.asset?.url) {
    return image.asset.url;
  }

  if (!builder || !image?.asset?._ref) {
    return undefined;
  }

  return builder.image(image).auto("format").fit("max").url();
}

export async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}) {
  if (!sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Sanity fetch failed", error);
    return null;
  }
}
