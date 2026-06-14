import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlForImage(value);
      if (!src) {
        return null;
      }
      return (
        <figure>
          <Image src={src} alt={value.alt || ""} width={1200} height={720} className="rounded-lg" />
          {value.alt ? <figcaption>{value.alt}</figcaption> : null}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre className="overflow-x-auto rounded-lg bg-ink p-5 text-sm text-white">
        <code>{value.code}</code>
      </pre>
    )
  }
};

export function ArticleBody({ body }: { body?: PortableTextBlock[] }) {
  if (!body?.length) {
    return (
      <div className="prose-premium">
        <p>
          Connect Sanity and publish this article body from the CMS. The page layout, metadata, social sharing, and related
          content areas are already wired for production content.
        </p>
      </div>
    );
  }

  return (
    <div className="prose-premium">
      <PortableText value={body} components={components} />
    </div>
  );
}
