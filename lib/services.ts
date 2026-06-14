export interface Service {
  slug: string;
  title: string;
  iconName: "Globe2" | "FileSearch" | "PenTool" | "Megaphone" | "LineChart";
  description: string;
  details: string;
  benefits: string[];
  process: { step: string; title: string; text: string }[];
}

export const servicesData: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    iconName: "Globe2",
    description: "Premium, responsive websites built with Next.js, Sanity, accessibility, and performance baked in.",
    details: "Your website is your digital storefront and your most important marketing asset. We build blazing-fast, custom websites using Next.js and React that deliver flawless user experiences, scale effortlessly, and are fully editable via Sanity CMS.",
    benefits: [
      "Blazing Fast Performance: Optimized Core Web Vitals to rank higher on Google and keep visitors engaged.",
      "Custom Sanity Integration: Fully editable layouts and content fields tailored to your operational workflow.",
      "Responsive & Accessible: Built to look gorgeous on mobile, tablet, and desktop following WCAG standards."
    ],
    process: [
      { step: "01", title: "Discovery & Blueprinting", text: "We analyze your audience, map out the user journeys, and outline the technical design system." },
      { step: "02", title: "Development & CMS Wiring", text: "We write clean, semantic code and build a tailored Sanity editor for your marketing team." },
      { step: "03", title: "QA & Deployment", text: "We run rigorous checks for speed, responsiveness, and SEO tags before pushing to a global CDN." }
    ]
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    iconName: "FileSearch",
    description: "Technical SEO, keyword strategy, site architecture, internal linking, and performance improvements.",
    details: "Organic search is the only marketing channel that compounds value over time. We implement search strategies that position your brand in front of users ready to take action, auditing technical issues, mapping keywords, and structuring site architecture.",
    benefits: [
      "Technical Crawlability: Repair indexation, schema markup, sitemap structures, and core web vitals.",
      "Intent-Based Keyword Mapping: Target keywords that bring qualified prospects, not just empty traffic.",
      "Internal Link Architecture: Distribute authority across pages to elevate your most profitable articles and services."
    ],
    process: [
      { step: "01", title: "Technical Audit", text: "We crawl your site with industrial tooling to identify errors, speed bottlenecks, and search penalties." },
      { step: "02", title: "Strategy Mapping", text: "We research competitors, compile keyword opportunities, and create a structured site architecture plan." },
      { step: "03", title: "Implementation & Tracking", text: "We edit schemas, fix code, restructure internal link matrices, and set up tracking funnels." }
    ]
  },
  {
    slug: "content-strategy",
    title: "Content Strategy",
    iconName: "PenTool",
    description: "Topic clusters, editorial calendars, article briefs, and content systems designed to build authority.",
    details: "Without a system, content is just noise. We build authority content engines that define your brand as a market leader, crafting structured topic clusters, content briefs, and editorial plans that capture organic search share.",
    benefits: [
      "Topic Clustering: Group related articles around core pillars to establish topical authority in search engines.",
      "Comprehensive Article Briefs: Give writers structured briefs with search intent, keywords, and structural outlines.",
      "Repeatable Editorial Workflows: Establish production calendars that keep your team publishing consistently."
    ],
    process: [
      { step: "01", title: "Authority Assessment", text: "We evaluate your current content inventory, identify topical gaps, and review competitor content." },
      { step: "02", title: "Cluster Mapping", text: "We organize keywords into semantic clusters around core product/service offerings." },
      { step: "03", title: "Calendar & Brief Delivery", text: "We hand off structured, search-optimized brief templates and a calendar geared for the next 90 days." }
    ]
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    iconName: "Megaphone",
    description: "Campaign planning, funnel optimization, analytics, landing pages, and conversion-focused messaging.",
    details: "Traffic without conversion is a waste. We connect your traffic channels to a high-converting funnel, optimizing landing page UX, refining value propositions, and aligning tracking analytics to track campaigns down to revenue.",
    benefits: [
      "Conversion Rate Optimization (CRO): Redesign landing pages to maximize actions and reduce drop-offs.",
      "Full-Funnel Analytics: Map traffic from source to signup to understand which channels are actually profitable.",
      "Compelling Copywriting: Write copy that connects customer pain points to your solution's direct features."
    ],
    process: [
      { step: "01", title: "Funnel Analysis", text: "We audit your conversion path, identifying leaks, friction points, and drop-offs." },
      { step: "02", title: "Landing Page Redesign", text: "We build and test premium, fast landing pages geared directly for high-intent traffic." },
      { step: "03", title: "Tracking & Optimization", text: "We configure analytics dashboards, run campaign tests, and scale winning strategies." }
    ]
  },
  {
    slug: "website-audits",
    title: "Website Audits",
    iconName: "LineChart",
    description: "A practical audit covering speed, UX, SEO, content gaps, analytics, and conversion opportunities.",
    details: "Before investing in traffic, fix your foundation. Our Website Audits provide an actionable checklist covering performance, SEO health, UX weaknesses, content opportunities, and analytics issues.",
    benefits: [
      "Actionable Checklist: No generic reports. You get a prioritized list of developer-ready changes.",
      "SEO Health Report: Full transparency on technical bugs, crawl barriers, and keyword overlaps.",
      "Performance & Speed Assessment: Detailed diagnostics explaining exactly why your site is slow and how to fix it."
    ],
    process: [
      { step: "01", title: "Crawl & Benchmarking", text: "We run deep crawls and compile speed metrics across standard device types." },
      { step: "02", title: "Gap & Health Review", text: "We manually analyze your UX structure, content alignment, and conversion flows." },
      { step: "03", title: "Audit & Handoff Meeting", text: "We deliver a prioritized checklist and walk through the solutions with your team." }
    ]
  }
];
