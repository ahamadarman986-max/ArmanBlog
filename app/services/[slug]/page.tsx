import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileSearch, Globe2, LineChart, Megaphone, PenTool } from "lucide-react";
import { ContactForm } from "@/components/shared/contact-form";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/constants";
import { servicesData } from "@/lib/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

const iconMap = {
  Globe2,
  FileSearch,
  PenTool,
  Megaphone,
  LineChart
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service not found" };
  }

  return {
    title: `${service.title} | Services`,
    description: service.description,
    alternates: { canonical: `${siteConfig.url}/services/${slug}` }
  };
}

function getFormProjectType(slug: string) {
  if (slug === "website-audits") return "Website Audit";
  const service = servicesData.find((s) => s.slug === slug);
  return service ? service.title : "";
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug) || null;

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.iconName];
  const formProjectType = getFormProjectType(slug);

  return (
    <article className="container-page py-12">
      {/* Breadcrumb / Back Link */}
      <Link
        href="/services"
        className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-gold dark:text-gray-300 dark:hover:text-gold"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all services
      </Link>

      {/* Header / Hero */}
      <header className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.4fr] items-center pb-12 border-b border-black/10 dark:border-white/10">
        <div>
          <p className="eyebrow">Service details</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-normal text-ink dark:text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted dark:text-gray-300 max-w-3xl">
            {service.details}
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="surface flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-2xl border border-black/10 dark:border-white/10 shadow-lg shadow-gold/5">
            <Icon className="h-12 w-12 sm:h-16 sm:w-16 text-gold animate-pulse" />
          </div>
        </div>
      </header>

      {/* Benefits and Process Grid */}
      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        {/* Left: Benefits */}
        <section className="space-y-6">
          <h2 className="font-display text-3xl font-semibold text-ink dark:text-white">
            Key Outcomes & Benefits
          </h2>
          <p className="text-sm leading-6 text-muted dark:text-gray-400">
            What you can expect when we collaborate on this growth vector:
          </p>
          <div className="grid gap-4">
            {service.benefits.map((benefit, idx) => {
              const [title, desc] = benefit.split(": ");
              return (
                <div key={idx} className="surface flex items-start gap-4 rounded-lg p-5">
                  <CheckCircle2 className="h-6 w-6 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-ink dark:text-white text-base">{title}</h3>
                    {desc && <p className="mt-1 text-sm text-muted dark:text-gray-300 leading-6">{desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right: Process */}
        <section className="space-y-6">
          <h2 className="font-display text-3xl font-semibold text-ink dark:text-white">
            Our Delivery Process
          </h2>
          <p className="text-sm leading-6 text-muted dark:text-gray-400">
            A systematic, outcome-oriented sequence to guarantee execution:
          </p>
          <div className="relative border-l-2 border-gold/20 ml-4 pl-6 space-y-8">
            {service.process.map((stepItem, idx) => (
              <div key={idx} className="relative">
                {/* Step circle marker */}
                <div className="absolute -left-[35px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white ring-4 ring-white dark:ring-graphite">
                  {stepItem.step}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink dark:text-white">
                    {stepItem.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted dark:text-gray-300">
                    {stepItem.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Inquiry Form Call to Action */}
      <section className="mt-16 border-t border-black/10 dark:border-white/10 pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Get started"
              title="Let's initiate this project"
              description={`Fill out the inquiry form to book a strategy kickoff for ${service.title}. I will analyze your domain and suggest next steps.`}
            />
          </div>
          <ContactForm defaultProjectType={formProjectType} />
        </div>
      </section>
    </article>
  );
}
