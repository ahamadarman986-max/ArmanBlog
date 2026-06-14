"use client";

import { Linkedin, Link as LinkIcon, Twitter } from "lucide-react";
import { useState } from "react";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:border-gold hover:text-gold dark:border-white/10" href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} aria-label="Share on Twitter">
        <Twitter className="h-4 w-4" />
      </a>
      <a className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:border-gold hover:text-gold dark:border-white/10" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} aria-label="Share on LinkedIn">
        <Linkedin className="h-4 w-4" />
      </a>
      <button type="button" onClick={copyLink} className="focus-ring inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:border-gold hover:text-gold dark:border-white/10">
        <LinkIcon className="h-4 w-4" />
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
