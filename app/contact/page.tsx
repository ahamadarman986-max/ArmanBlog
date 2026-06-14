import type { Metadata } from "next";
import { Facebook, Github, Instagram, Linkedin, Mail, MessageCircle, Phone, Twitter } from "lucide-react";
import { ContactForm } from "@/components/shared/contact-form";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact for website development, SEO optimization, content strategy, and digital marketing projects.",
  alternates: { canonical: `${siteConfig.url}/contact` }
};

export default function ContactPage() {
  return (
    <section className="section container-page">
      <SectionHeading eyebrow="Contact" title="Let's build a sharper online presence" description="Tell me what you are building, where growth is stuck, and what outcome would make the project worth it." />
      <div className="mt-12 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="surface rounded-lg p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-ink dark:text-white">Professional CTA</h2>
          <p className="mt-4 text-sm leading-7 text-muted dark:text-gray-300">
            Use the form for project inquiries, audits, collaborations, or article opportunities. Email delivery is ready to connect inside the contact API route.
          </p>
          <div className="mt-7 grid gap-3">
            {[
              { href: siteConfig.email ? `mailto:${siteConfig.email}` : "", label: siteConfig.email, icon: Mail, color: "text-[#EA4335]" },
              { href: siteConfig.phone ? `tel:${siteConfig.phone}` : "", label: siteConfig.phone, icon: Phone, color: "text-[#34A853]" },
              { href: siteConfig.social.whatsapp, label: "WhatsApp Chat", icon: MessageCircle, color: "text-[#25D366]" },
              { href: siteConfig.social.facebook, label: "Facebook", icon: Facebook, color: "text-[#1877F2]" },
              { href: siteConfig.social.instagram, label: "Instagram", icon: Instagram, color: "text-[#E4405F]" },
              { href: siteConfig.social.linkedin, label: "LinkedIn", icon: Linkedin, color: "text-[#0A66C2]" },
              { href: siteConfig.social.twitter, label: "Twitter / X", icon: Twitter, color: "text-[#1DA1F2]" },
              { href: siteConfig.social.github, label: "GitHub", icon: Github, color: "text-[#24292F] dark:text-white" }
            ].filter((item) => !!item.href).map(({ href, label, icon: Icon, color }) => (
              <a key={label} href={href} className="flex items-center gap-3 text-sm font-medium text-muted transition hover:text-ink dark:text-gray-300 dark:hover:text-white">
                <Icon className={`h-5 w-5 ${color}`} />
                {label}
              </a>
            ))}
          </div>
        </aside>
        <ContactForm />
      </div>
    </section>
  );
}
