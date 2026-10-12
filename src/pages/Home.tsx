import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  Cloud,
  Code2,
  Quote,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.tsx';
import { projects, services, stats, testimonials } from '../data/content.ts';
import { useDocumentTitle } from '../hooks/hooks.ts';
import { formatCurrency } from '../utils/helpers.ts';
import { Badge, Button, SectionHeading } from '../components/ui/primitives.tsx';

const iconMap: Record<string, typeof Cloud> = {
  Cloud,
  ShieldCheck,
  Code2,
  Smartphone,
  BrainCircuit,
  Briefcase,
};

export function Home() {
  useDocumentTitle('Home');
  const navigate = useNavigate();
  const { userName } = useApp();
  const featured = projects.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div aria-hidden className="bg-grid-dark absolute inset-0" />
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-600/30 blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6 lg:pt-24 lg:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="animate-rise flex flex-wrap items-center gap-2">
                <Badge tone="cyan" className="border-white/15 bg-white/10 text-cyan-200">
                  <Sparkles className="size-3.5" aria-hidden /> React Training Final — Task 15
                </Badge>
                <Badge tone="slate" className="border-white/15 bg-white/8 text-slate-200">
                  Trusted since 2014
                </Badge>
              </div>
              <h1 className="type-display animate-rise animate-rise-1 mt-5">
                Innovating today,
                <br />
                securing <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">tomorrow.</span>
              </h1>
              <p className="animate-rise animate-rise-2 mt-5 max-w-xl text-[16.5px] leading-relaxed text-slate-300">
                Your trusted partner in IT solutions — cloud, cybersecurity, web, mobile and AI,
                delivered by senior engineers. {userName !== 'Guest' ? `Welcome back, ${userName}. ` : ''}
                Tell us your goal; we ship the roadmap in days.
              </p>
              <div className="animate-rise animate-rise-3 mt-7 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => navigate('/contact')}>
                  Start a project <ArrowRight className="size-4" aria-hidden />
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="border-white/15 bg-white/10 text-white shadow-none hover:bg-white/15 hover:text-white"
                  onClick={() => navigate('/work')}
                >
                  View case studies
                </Button>
              </div>
              <dl className="animate-rise animate-rise-4 mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-white/10 pt-7 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="order-2 mt-1 block text-[12.5px] text-slate-400">{s.label}</dt>
                    <dd className="text-[22px] font-extrabold tracking-tight text-white">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Hero card */}
            <div className="animate-rise animate-rise-2 relative">
              <div className="rounded-3xl border border-white/12 bg-white/[0.07] p-6 shadow-elevated backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <p className="type-label text-slate-300">This week at Stackly</p>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[12px] font-bold text-emerald-300">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" /> Live
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    ['FinShield SOC 2 — passed, zero exceptions', 'Cybersecurity · 6 wks'],
                    ['Voyago checkout +31% conversion', 'Web · 10 wks'],
                    ['MediCare k8s deploy: 2h → 9 min', 'Cloud · 8 wks'],
                  ].map(([t, m]) => (
                    <div key={t} className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-3.5">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-300" aria-hidden />
                      <div>
                        <p className="text-[14px] font-semibold text-white">{t}</p>
                        <p className="text-[12.5px] text-slate-400">{m}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-[1px]">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-950/90 px-4 py-3">
                    <div>
                      <p className="text-[13px] font-bold text-white">Free 30-min discovery call</p>
                      <p className="text-[12px] text-slate-400">Roadmap + estimate included</p>
                    </div>
                    <Link
                      to="/contact"
                      className="rounded-[10px] bg-white px-3.5 py-2 text-[13px] font-bold text-slate-900 transition hover:bg-slate-200"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Services"
            title="Six practices, one accountable team"
            sub="Nested routes ahead — open any service for scope, deliverables and pricing."
          />
          <Link
            to="/services"
            className="group inline-flex items-center gap-1.5 text-[14px] font-bold text-indigo-600 hover:text-indigo-800"
          >
            All services
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Code2;
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                style={{ animationDelay: `${i * 0.06}s` }}
                className="animate-rise group rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle transition-all duration-150 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-medium dark:border-white/10 dark:bg-slate-900 dark:shadow-none dark:hover:border-indigo-400/30"
              >
                <span
                  className="grid size-11 place-items-center rounded-xl text-white"
                  style={{ background: s.color }}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[16.5px] font-bold tracking-tight text-slate-900 group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-300">
                  {s.title}
                </h3>
                <p className="type-muted mt-1.5">{s.short}</p>
                <p className="mt-4 flex items-center justify-between text-[13px] font-bold">
                  <span className="text-slate-900 dark:text-white">from {formatCurrency(s.priceFrom)}</span>
                  <span className="inline-flex items-center gap-1 text-indigo-600">
                    Explore <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Outcomes our clients can measure"
            sub="Filter by category, search, save favourites (Redux) and open details via useParams."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featured.map((p) => (
              <article
                key={p.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fafc] shadow-subtle transition hover:shadow-medium dark:border-white/10 dark:bg-white/5 dark:shadow-none"
              >
                <div className={`flex h-36 items-end bg-gradient-to-br p-4 ${p.image}`}>
                  <Badge tone="slate" className="border-white/30 bg-white/90">
                    {p.category}
                  </Badge>
                </div>
                <div className="p-5">
                  <h3 className="text-[16px] font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="type-muted mt-1.5 line-clamp-2">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[13px] font-bold text-emerald-700">
                      <CheckCircle2 className="size-4" aria-hidden /> {p.outcome}
                    </span>
                    <Link
                      to={`/work/${p.id}`}
                      className="text-[13.5px] font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      Case study →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="Why teams stay with Stackly"
          sub="98% retention across 240+ engagements."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
              <Quote className="size-6 text-indigo-300 dark:text-indigo-400" aria-hidden />
              <blockquote className="mt-3 text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 border-t border-slate-100 pt-4 dark:border-white/10">
                <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </div>
                <p className="mt-2 text-[14px] font-bold text-slate-900 dark:text-white">{t.name}</p>
                <p className="text-[12.5px] text-slate-500">
                  {t.role} · {t.company}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-transparent bg-slate-950 px-8 py-10 text-center sm:px-12 lg:flex-row lg:text-left dark:border-white/10 dark:bg-slate-900">
          <div>
            <h2 className="type-heading text-white">Have a project in mind?</h2>
            <p className="type-muted mt-2 text-slate-300">
              Get a scoped proposal with timeline & fixed quote in 48 hours.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => navigate('/dashboard')}>
              Manage requests
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="border-white/15 bg-white/10 text-white hover:bg-white/15"
              onClick={() => navigate('/contact')}
            >
              Talk to us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
