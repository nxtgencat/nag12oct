import {
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cloud,
  Code2,
  ShieldCheck,
  Smartphone,
  Wallet,
} from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { services } from '../data/content.ts';
import { useDocumentTitle } from '../hooks/hooks.ts';
import { formatCurrency, cn } from '../utils/helpers.ts';
import { Badge, Button, SectionHeading } from '../components/ui/primitives.tsx';
import { EmptyState } from '../components/ui/states.tsx';

export const serviceIcons: Record<string, typeof Cloud> = {
  Cloud,
  ShieldCheck,
  Code2,
  Smartphone,
  BrainCircuit,
  Briefcase,
};

// Parent layout for nested routing: /services (index) + /services/:slug (child)
export function ServicesLayout() {
  useDocumentTitle('Services');
  return (
    <div>
      <section className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6">
          <SectionHeading
            eyebrow="Services · Nested routing"
            title="What we can build for you"
            sub="Parent route /services with nested children — pick a practice on the left, detail renders in the outlet."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">
            <nav
              aria-label="Services"
              className="flex gap-2 overflow-x-auto pb-1 no-scrollbar lg:flex-col lg:overflow-visible"
            >
              <NavLink
                to="/services"
                end
                className={({ isActive }) =>
                  cn(
                    'flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-3 text-[14px] font-bold transition lg:w-full',
                    isActive
                      ? 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/15 dark:text-indigo-200'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/5',
                  )
                }
              >
                All services
              </NavLink>
              {services.map((s) => {
                const Icon = serviceIcons[s.icon] ?? Code2;
                return (
                  <NavLink
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className={({ isActive }) =>
                      cn(
                        'flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-3 text-[14px] font-bold transition lg:w-full',
                        isActive
                          ? 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/15 dark:text-indigo-200'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/5',
                      )
                    }
                  >
                    <Icon className="size-4" aria-hidden />
                    <span className="whitespace-nowrap lg:whitespace-normal">{s.title}</span>
                  </NavLink>
                );
              })}
            </nav>
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-[#f8fafc] p-5 sm:p-7 dark:border-white/10 dark:bg-white/5">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ServicesIndex() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s) => {
          const Icon = serviceIcons[s.icon] ?? Code2;
          return (
            <article
              key={s.slug}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle transition hover:shadow-medium dark:border-white/10 dark:bg-slate-900 dark:shadow-none"
            >
              <span
                className="grid size-10 place-items-center rounded-xl text-white"
                style={{ background: s.color }}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-3 text-[15.5px] font-bold text-slate-900 dark:text-white">{s.title}</h3>
              <p className="type-muted mt-1 text-[13.5px]">{s.short}</p>
              <div className="mt-3 flex items-center justify-between text-[13px]">
                <span className="font-bold text-slate-900 dark:text-white">from {formatCurrency(s.priceFrom)}</span>
                <span className="font-semibold text-slate-500">{s.duration}</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4 w-full"
                onClick={() => navigate(`/services/${s.slug}`)}
              >
                View details
              </Button>
            </article>
          );
        })}
      </div>
      <p className="type-caption mt-5 flex items-center gap-1.5">
        <ChevronRight className="size-4" aria-hidden />
        Tip: the URL changes to /services/:slug — that&apos;s nested routing with useParams.
      </p>
    </div>
  );
}

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = services.find((s) => s.slug === slug);

  useDocumentTitle(service ? service.title : 'Service');

  if (!service) {
    return (
      <EmptyState
        title="Service not found"
        body={`No service matches “${slug}”. Check the list and try again.`}
        action={<Button onClick={() => navigate('/services')}>Back to services</Button>}
      />
    );
  }

  const Icon = serviceIcons[service.icon] ?? Code2;

  return (
    <article className="animate-rise">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span
            className="grid size-12 place-items-center rounded-2xl text-white shadow-subtle"
            style={{ background: service.color }}
          >
            <Icon className="size-6" aria-hidden />
          </span>
          <div>
            <h2 className="text-[22px] font-extrabold tracking-tight text-slate-900 dark:text-white">
              {service.title}
            </h2>
            <p className="text-[13px] font-semibold text-slate-500">
              /services/{service.slug} · via useParams
            </p>
          </div>
        </div>
        <Badge tone="indigo">from {formatCurrency(service.priceFrom)}</Badge>
      </div>

      <p className="type-body mt-4 text-slate-700 dark:text-slate-300">{service.description}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
          <h3 className="text-[13px] font-extrabold tracking-widest text-slate-500 uppercase">
            Benefits
          </h3>
          <ul className="mt-2.5 space-y-2">
            {service.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[14px] font-medium text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
          <h3 className="text-[13px] font-extrabold tracking-widest text-slate-500 uppercase">
            Deliverables
          </h3>
          <ul className="mt-2.5 space-y-2">
            {service.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2 text-[14px] font-medium text-slate-700 dark:text-slate-300">
                <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-indigo-500" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5 text-[13px] font-semibold text-slate-600">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 border border-slate-200 dark:bg-slate-900 dark:border-white/10">
          <Clock className="size-4" aria-hidden /> {service.duration}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 border border-slate-200 dark:bg-slate-900 dark:border-white/10">
          <Wallet className="size-4" aria-hidden /> Fixed quote in 48h
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={() => navigate(`/contact?service=${service.slug}`)}>
          Request this service
        </Button>
        <Link
          to="/work"
          className="inline-flex h-11 items-center rounded-[10px] px-4 text-[14px] font-bold text-indigo-700 transition hover:bg-indigo-50"
        >
          See related work →
        </Link>
      </div>
    </article>
  );
}
