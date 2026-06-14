"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="eyebrow">Error</p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-ink dark:text-white">Something went wrong.</h1>
      <div className="mt-7 flex gap-3">
        <button onClick={reset} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-ink">Try again</button>
        <Link href="/" className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold dark:border-white/10">Go home</Link>
      </div>
    </section>
  );
}
