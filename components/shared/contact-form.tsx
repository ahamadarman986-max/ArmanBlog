"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function ContactForm({ defaultProjectType = "" }: { defaultProjectType?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(formData: FormData) {
    setStatus("loading");
    const payload = Object.fromEntries(formData);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });
    setStatus(response.ok ? "success" : "error");
  }

  return (
    <form action={submit} className="surface grid gap-4 rounded-lg p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Name
          <input name="name" required className="focus-ring rounded-lg border border-black/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input name="email" type="email" required className="focus-ring rounded-lg border border-black/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium">
        Project type
        <select name="projectType" defaultValue={defaultProjectType} className="focus-ring rounded-lg border border-black/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5">
          <option value="Website Development">Website Development</option>
          <option value="SEO Optimization">SEO Optimization</option>
          <option value="Content Strategy">Content Strategy</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Website Audit">Website Audit</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Message
        <textarea name="message" required rows={6} className="focus-ring rounded-lg border border-black/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" />
      </label>
      <button disabled={status === "loading"} className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-gold disabled:opacity-70 dark:bg-white dark:text-ink">
        <Send className="h-4 w-4" />
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" ? <p className="text-sm text-gold">Message received. Email provider integration can be connected in the API route.</p> : null}
      {status === "error" ? <p className="text-sm text-red-500">Please check the form and try again.</p> : null}
    </form>
  );
}
