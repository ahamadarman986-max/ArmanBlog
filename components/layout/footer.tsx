import { Facebook, Github, Instagram, Linkedin, Mail, MessageCircle, Twitter } from "lucide-react";
import Link from "next/link";
import { Newsletter } from "@/components/shared/newsletter";
import { siteConfig } from "@/lib/constants";

const footerLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-ink text-white dark:border-white/10 dark:bg-black">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-display text-2xl font-semibold">{siteConfig.name}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-gray-300">
            Strategy, SEO, and high-performance web development for brands that want a stronger online identity.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: siteConfig.social.facebook, icon: Facebook, label: "Facebook" },
              { href: siteConfig.social.instagram, icon: Instagram, label: "Instagram" },
              { href: siteConfig.social.whatsapp, icon: MessageCircle, label: "WhatsApp" },
              { href: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: siteConfig.social.twitter, icon: Twitter, label: "Twitter" },
              { href: siteConfig.social.github, icon: Github, label: "GitHub" },
              { href: siteConfig.email ? `mailto:${siteConfig.email}` : "", icon: Mail, label: "Email" }
            ].filter((item) => !!item.href).map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} aria-label={label} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-300 transition hover:border-gold hover:text-gold">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Explore</p>
          <div className="mt-5 grid gap-3 text-sm text-gray-300">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-gold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <Newsletter variant="footer" />
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col gap-2 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.author}. All rights reserved.</p>
          <p>Built with Next.js 15, Sanity, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
