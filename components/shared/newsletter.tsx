"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type NewsletterProps = {
  variant?: "default" | "footer";
};

export function Newsletter({ variant = "default" }: NewsletterProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function subscribe(formData: FormData) {
    setStatus("loading");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: formData.get("email") }),
      headers: { "Content-Type": "application/json" }
    });
    setStatus(response.ok ? "success" : "error");
  }

  return (
    <div className={cn(variant === "default" && "surface rounded-lg p-6 sm:p-8")}>
      <p className={cn("font-display text-2xl font-semibold", variant === "footer" ? "text-white" : "text-ink dark:text-white")}>
        Join the growth letter
      </p>
      <p className={cn("mt-3 text-sm leading-6", variant === "footer" ? "text-gray-300" : "text-muted dark:text-gray-300")}>
        Practical SEO, web development, and digital marketing notes. No fluff.
      </p>
      <form action={subscribe} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`newsletter-email-${variant}`}>Email address</label>
        <input
          id={`newsletter-email-${variant}`}
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="focus-ring min-h-12 flex-1 rounded-full border border-black/10 bg-white px-4 text-sm text-ink dark:border-white/10 dark:bg-white/10 dark:text-white"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-5 text-sm font-semibold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70 dark:hover:bg-white dark:hover:text-ink"
        >
          <Send className="h-4 w-4" />
          {status === "loading" ? "Joining..." : "Subscribe"}
        </button>
      </form>
      {status === "success" ? <p className="mt-3 text-sm text-gold">You are on the list.</p> : null}
      {status === "error" ? <p className="mt-3 text-sm text-red-500">Something went wrong. Please try again.</p> : null}
    </div>
  );
}
