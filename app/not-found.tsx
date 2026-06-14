import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-ink dark:text-white">This page is not here.</h1>
      <p className="mt-4 max-w-md text-muted dark:text-gray-300">The page may have moved, or the article slug has not been published yet.</p>
      <Link href="/" className="mt-7 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-ink">Return home</Link>
    </section>
  );
}
