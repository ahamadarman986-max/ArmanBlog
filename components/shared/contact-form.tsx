"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function ContactForm({ defaultProjectType = "" }: { defaultProjectType?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(defaultProjectType || "Website Development");
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setStatus("loading");
    const payload = Object.fromEntries(formData);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("error");
    }
  }

  function handleWhatsAppShare(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert("Please fill out your Name and Message first to send via WhatsApp.");
      return;
    }
    const text = `Hi Arman,\n\nI would like to discuss a project with you.\n\n*Name:* ${name.trim()}\n*Email:* ${email.trim() || "Not provided"}\n*Project Type:* ${projectType}\n\n*Message:* ${message.trim()}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/9779716293191?text=${encoded}`, "_blank");
  }

  return (
    <form action={submit} className="surface grid gap-4 rounded-lg p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Name
          <input 
            name="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            className="focus-ring rounded-lg border border-black/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" 
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input 
            name="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="focus-ring rounded-lg border border-black/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" 
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium">
        Project type
        <select 
          name="projectType" 
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className="focus-ring rounded-lg border border-black/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5"
        >
          <option value="Website Development">Website Development</option>
          <option value="SEO Optimization">SEO Optimization</option>
          <option value="Content Strategy">Content Strategy</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Website Audit">Website Audit</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Message
        <textarea 
          name="message" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required 
          rows={6} 
          className="focus-ring rounded-lg border border-black/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" 
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button 
          type="submit" 
          disabled={status === "loading"} 
          className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-gold disabled:opacity-70 dark:bg-white dark:text-ink"
        >
          <Send className="h-4 w-4" />
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        <button 
          type="button" 
          onClick={handleWhatsAppShare}
          className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#20ba5a] active:scale-95 shadow-sm hover:shadow-md"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
          </svg>
          Send via WhatsApp
        </button>
      </div>
      {status === "success" ? <p className="text-sm text-gold">Thank you! Your message has been sent successfully.</p> : null}
      {status === "error" ? <p className="text-sm text-red-500">Please check the form and try again.</p> : null}
    </form>
  );
}
