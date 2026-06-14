"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/lib/constants";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-graphite/80">
      <nav className="container-page flex h-20 items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="font-display text-xl font-semibold tracking-normal text-ink dark:text-white">
          {siteConfig.name}
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-muted transition hover:text-gold dark:text-gray-300">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link href="/contact" className="focus-ring rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-gold dark:bg-white dark:text-ink">
            Work With Me
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 lg:hidden dark:border-white/10"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-black/10 bg-white px-4 py-5 dark:border-white/10 dark:bg-graphite lg:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-base font-medium text-ink dark:text-white">
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-2">
              <ThemeToggle />
              <Link href="/contact" onClick={() => setOpen(false)} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-ink">
                Work With Me
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
