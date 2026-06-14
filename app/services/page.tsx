import type { Metadata } from "next";
import { ArrowRight, FileSearch, Globe2, LineChart, Megaphone, PenTool } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/constants";
import { servicesData } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Website development, SEO optimization, content strategy, digital marketing, and website audits.",
  alternates: { canonical: `${siteConfig.url}/services` }
};

const iconMap = {
  Globe2,
  FileSearch,
  PenTool,
  Megaphone,
  LineChart
};

export default function ServicesPage() {
  return (
    <section className="section container-page">
      <SectionHeading eyebrow="Services" title="Professional services for stronger digital growth" description="Choose a focused engagement or combine strategy, content, and development into a complete growth system." />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {servicesData.map((service) => {
          const Icon = iconMap[service.iconName];
          return (
            <article key={service.slug} className="surface group flex flex-col justify-between rounded-lg p-6 sm:p-8">
              <div>
                <Icon className="h-8 w-8 text-gold" />
                <h2 className="mt-5 font-display text-2xl font-semibold text-ink dark:text-white">{service.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted dark:text-gray-300">{service.description}</p>
              </div>
              <div className="mt-6">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition hover:text-ink dark:hover:text-white"
                >
                  Learn more <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      <div className="surface mt-12 flex flex-col gap-5 rounded-lg p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="eyebrow">Ready to build</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink dark:text-white">Turn your website into a growth asset.</h2>
        </div>
        <Link href="/contact" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-gold dark:bg-white dark:text-ink">
          Start a project <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
