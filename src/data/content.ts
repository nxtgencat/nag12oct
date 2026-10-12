import type { Project, Service, Testimonial } from '../types/index.ts';

export const services: Service[] = [
  {
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    short: 'AWS, Azure, CI/CD pipelines and Kubernetes that scale.',
    description:
      'We design, migrate and operate cloud-native platforms. From landing zones to GitOps pipelines, you get observable, cost-efficient infrastructure with 99.95% uptime targets.',
    icon: 'Cloud',
    benefits: [
      'Cloud migration in weeks, not quarters',
      '40% average infra cost reduction',
      'GitOps, IaC and zero-downtime deploys',
      '24/7 monitoring, alerting & SLOs',
    ],
    deliverables: ['Architecture blueprint', 'Terraform modules', 'CI/CD pipelines', 'Runbooks & SLO dashboards'],
    priceFrom: 4900,
    duration: '4–8 weeks',
    color: '#4f46e5',
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    short: 'Audits, hardening, SOC setup and compliance.',
    description:
      'End-to-end security: audits, penetration testing, hardening, SIEM/SOC setup and ISO 27001 / SOC 2 readiness. We secure today so you can innovate tomorrow.',
    icon: 'ShieldCheck',
    benefits: [
      'Full audit + prioritized remediation plan',
      'Pen-testing & vulnerability management',
      'Zero-trust identity & endpoint hardening',
      'ISO 27001 / SOC 2 compliance support',
    ],
    deliverables: ['Risk report', 'Hardened baselines', 'SIEM dashboards', 'Compliance pack'],
    priceFrom: 3900,
    duration: '3–6 weeks',
    color: '#059669',
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    short: 'React, dashboards, portals and e-commerce.',
    description:
      'High-performance React applications, design systems, portals and storefronts. Accessible, SEO-ready, and built for conversion with clean, typed code.',
    icon: 'Code2',
    benefits: [
      'React + TypeScript, 95+ Lighthouse',
      'Reusable design system & docs',
      'Accessible (WCAG 2.2 AA) by default',
      'CMS / headless commerce ready',
    ],
    deliverables: ['UX + UI kit', 'Production web app', 'Storybook docs', 'Analytics setup'],
    priceFrom: 5900,
    duration: '5–10 weeks',
    color: '#0284c7',
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile Apps',
    short: 'iOS & Android from one React Native codebase.',
    description:
      'Native-quality iOS and Android apps from a single codebase. Offline-first, push, deep links, store releases and OTA updates handled for you.',
    icon: 'Smartphone',
    benefits: [
      'One codebase, two stores',
      'Offline-first & push notifications',
      'App-store release management',
      'Crash-free rate > 99.5%',
    ],
    deliverables: ['Clickable prototype', 'iOS + Android builds', 'Store listings', 'OTA pipeline'],
    priceFrom: 7900,
    duration: '8–14 weeks',
    color: '#7c3aed',
  },
  {
    slug: 'ai-data',
    title: 'AI & Data',
    short: 'RAG copilots, dashboards and ML pipelines.',
    description:
      'Practical AI: support copilots over your docs, churn models, forecasting and analytics platforms. Evaluated, grounded, and safe for production.',
    icon: 'BrainCircuit',
    benefits: [
      'RAG copilots grounded in your data',
      'Eval harnesses & guardrails',
      'Warehouse + BI dashboards',
      'Human-in-the-loop workflows',
    ],
    deliverables: ['Data model', 'Pilot copilot', 'Eval report', 'MLOps pipeline'],
    priceFrom: 8900,
    duration: '6–12 weeks',
    color: '#db2777',
  },
  {
    slug: 'it-consulting',
    title: 'IT Consulting',
    short: 'Roadmaps, team augmentation, rescue sprints.',
    description:
      'Senior architects embedded in your team. Roadmaps, vendor reviews, rescue sprints for stalled projects, and hiring support that actually ships.',
    icon: 'Briefcase',
    benefits: [
      '90-day actionable roadmap',
      'Senior-only talent, no juniors-alone',
      'Rescue sprints for at-risk builds',
      'Vendor & build-vs-buy analysis',
    ],
    deliverables: ['Discovery report', '90-day roadmap', 'TCO model', 'Hiring scorecards'],
    priceFrom: 2900,
    duration: '2–4 weeks',
    color: '#ea580c',
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'MediCare Hospital Cloud',
    category: 'Cloud & DevOps',
    client: 'MediCare Group',
    year: 2025,
    description:
      'Migrated 42 services to Kubernetes with GitOps, cutting deploy time from 2 hours to 9 minutes and infra spend by 38%.',
    tags: ['Kubernetes', 'Terraform', 'GitHub Actions'],
    image: 'from-indigo-600 to-violet-600',
    rating: 5,
    duration: '8 weeks',
    outcome: '-38% infra cost',
  },
  {
    id: 2,
    title: 'FinShield Zero-Trust Rollout',
    category: 'Cybersecurity',
    client: 'FinShield Bank',
    year: 2025,
    description:
      'Zero-trust identity, endpoint hardening and SOC dashboards across 1,200 seats. Passed SOC 2 Type I with zero exceptions.',
    tags: ['Zero Trust', 'SIEM', 'SOC 2'],
    image: 'from-emerald-600 to-teal-600',
    rating: 5,
    duration: '6 weeks',
    outcome: 'SOC 2 in 1 pass',
  },
  {
    id: 3,
    title: 'Voyago Booking Platform',
    category: 'Web Development',
    client: 'Voyago Travel',
    year: 2024,
    description:
      'React booking platform with 5-step checkout, 98 Lighthouse, +31% conversion. Design system with 60+ components.',
    tags: ['React', 'Design System', 'Stripe'],
    image: 'from-sky-600 to-cyan-600',
    rating: 5,
    duration: '10 weeks',
    outcome: '+31% conversion',
  },
  {
    id: 4,
    title: 'FreshKart Grocery App',
    category: 'Mobile Apps',
    client: 'FreshKart',
    year: 2024,
    description:
      'Offline-first grocery app, 4.8★ on both stores, 210k downloads in 6 months with OTA updates and instant search.',
    tags: ['React Native', 'Offline', 'Algolia'],
    image: 'from-violet-600 to-fuchsia-600',
    rating: 4,
    duration: '12 weeks',
    outcome: '210k downloads',
  },
  {
    id: 5,
    title: 'InsightAI Support Copilot',
    category: 'AI & Data',
    client: 'Insight SaaS',
    year: 2025,
    description:
      'RAG copilot over 12k docs resolving 46% of tickets autonomously with citations, evals and human escalation.',
    tags: ['RAG', 'Evals', 'Vector DB'],
    image: 'from-pink-600 to-rose-600',
    rating: 5,
    duration: '9 weeks',
    outcome: '46% auto-resolved',
  },
  {
    id: 6,
    title: 'EduSpark Digital Campus',
    category: 'Web Development',
    client: 'EduSpark',
    year: 2023,
    description:
      'LMS portal for 40k students with live classes, payments and analytics. WCAG AA, 6 languages, 99.9% uptime.',
    tags: ['LMS', 'WebRTC', 'i18n'],
    image: 'from-amber-500 to-orange-600',
    rating: 4,
    duration: '11 weeks',
    outcome: '40k learners',
  },
  {
    id: 7,
    title: 'LogiTrack Fleet Rescue',
    category: 'IT Consulting',
    client: 'LogiTrack',
    year: 2024,
    description:
      'Rescued a stalled IoT platform in a 4-week sprint, then delivered a 90-day roadmap now 80% shipped.',
    tags: ['Rescue Sprint', 'IoT', 'Roadmap'],
    image: 'from-slate-700 to-slate-900',
    rating: 5,
    duration: '4 weeks',
    outcome: 'Shipped in 28 days',
  },
  {
    id: 8,
    title: 'StyleHub Commerce Rebuild',
    category: 'Web Development',
    client: 'StyleHub',
    year: 2025,
    description:
      'Headless commerce rebuild, sub-second LCP, +22% AOV with new search, bundles and one-page checkout.',
    tags: ['Headless', 'Shopify', 'Search'],
    image: 'from-indigo-500 to-sky-500',
    rating: 4,
    duration: '8 weeks',
    outcome: '+22% AOV',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'Stackly migrated us without a minute of downtime. Their runbooks are so good our internal team now self-serves everything.',
    name: 'Dr. Ananya Rao',
    role: 'CTO',
    company: 'MediCare Group',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'The security audit found things two previous vendors missed. We passed SOC 2 on the first attempt — unheard of.',
    name: 'Marcus Bell',
    role: 'VP Engineering',
    company: 'FinShield',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Conversion up 31% after the rebuild. The design system alone saved us months on every follow-up feature.',
    name: 'Sara Iqbal',
    role: 'Founder',
    company: 'Voyago',
    rating: 5,
  },
];

export const categories = [
  'All',
  'Cloud & DevOps',
  'Cybersecurity',
  'Web Development',
  'Mobile Apps',
  'AI & Data',
  'IT Consulting',
];

export const stats = [
  { value: '240+', label: 'Projects delivered' },
  { value: '98%', label: 'Client retention' },
  { value: '40+', label: 'Certified engineers' },
  { value: '12 yrs', label: 'In business' },
];
