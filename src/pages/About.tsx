import { ArrowDown, Award, Eye, HeartHandshake, Lightbulb, RefreshCw, ShieldCheck, Users } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { stats } from '../data/content.ts';
import type { TeamMember } from '../types/index.ts';
import { useDocumentTitle, useFetch } from '../hooks/hooks.ts';
import { initialsOf } from '../utils/helpers.ts';
import { Badge, SectionHeading } from '../components/ui/primitives.tsx';
import { ErrorState, LoadingState } from '../components/ui/states.tsx';

const fallbackTeam: TeamMember[] = [
  { id: 1, name: 'Kamalraj M', role: 'Engineering Lead', email: 'kamal@stackly.com', phone: '1-770-736-8031', company: 'Stackly', initials: 'KM' },
  { id: 2, name: 'Priya Sharma', role: 'Cloud Architect', email: 'priya@stackly.com', phone: '010-692-6593', company: 'Stackly', initials: 'PS' },
  { id: 3, name: 'Arjun Mehta', role: 'Security Engineer', email: 'arjun@stackly.com', phone: '1-463-123-4447', company: 'Stackly', initials: 'AM' },
  { id: 4, name: 'Divya Nair', role: 'Design Lead', email: 'divya@stackly.com', phone: '493-170-9623', company: 'Stackly', initials: 'DN' },
  { id: 5, name: 'Rahul Verma', role: 'AI Engineer', email: 'rahul@stackly.com', phone: '(254)954-1289', company: 'Stackly', initials: 'RV' },
  { id: 6, name: 'Sneha Kulkarni', role: 'Mobile Lead', email: 'sneha@stackly.com', phone: '1-477-935-8478', company: 'Stackly', initials: 'SK' },
];

const roles = ['Engineering Lead', 'Cloud Architect', 'Security Engineer', 'Design Lead', 'AI Engineer', 'Mobile Lead'];

interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: { name: string };
}

export function About() {
  useDocumentTitle('About');
  const teamRef = useRef<HTMLDivElement>(null);

  // API Integration via custom hook (useEffect + useRef inside). Falls back to local team on failure.
  const { data, loading, error, reload } = useFetch<ApiUser[]>(
    'https://jsonplaceholder.typicode.com/users',
    [],
  );

  const team: TeamMember[] = (data && data.length > 0
    ? data.slice(0, 6).map((u, i) => ({
        id: u.id,
        name: u.name,
        role: roles[i % roles.length],
        email: u.email,
        phone: u.phone,
        company: 'Stackly',
        initials: initialsOf(u.name),
      }))
    : fallbackTeam
  ).slice(0, 6);

  const scrollToTeam = (): void => {
    teamRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // useRef demo: focus first card for keyboard users after scroll
    window.setTimeout(() => {
      teamRef.current?.querySelector<HTMLElement>('article')?.focus();
    }, 500);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div aria-hidden className="bg-grid-dark absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6">
          <Badge tone="cyan" className="border-white/15 bg-white/10 text-cyan-200">
            About Stackly
          </Badge>
          <h1 className="type-display mt-4 max-w-3xl">
            A senior-only team obsessed with shipping.
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-slate-300">
            Since 2014 we&apos;ve helped hospitals, banks, retailers and startups modernize with
            cloud, security, web, mobile and AI. No hand-offs to juniors, no bloated decks —
            just working software, every sprint.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-[22px] font-extrabold text-white">{s.value}</p>
                <p className="text-[12.5px] text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={scrollToTeam}
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-[10px] bg-white px-4 py-2.5 text-[14px] font-bold text-slate-900 transition hover:bg-slate-200"
          >
            Meet the team <ArrowDown className="size-4" aria-hidden />
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="Values"
          title="How we work"
          sub="Four principles that show up in every pull request and post-mortem."
        />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: HeartHandshake, t: 'Trust first', d: 'Fixed quotes, weekly demos, open burn-downs. No surprises.' },
            { icon: ShieldCheck, t: 'Secure by default', d: 'Threat models, least privilege and audits in every build.' },
            { icon: Lightbulb, t: 'Practical innovation', d: 'AI and cloud where they pay back — never tech for its own sake.' },
            { icon: Users, t: 'Senior-only', d: 'Every squad led by a 8+ year engineer. Mentorship built in.' },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
              <v.icon className="size-6 text-indigo-600 dark:text-indigo-400" aria-hidden />
              <h3 className="mt-3 text-[15.5px] font-bold text-slate-900 dark:text-white">{v.t}</h3>
              <p className="type-muted mt-1.5">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={teamRef} className="scroll-mt-20 border-y border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeading
              eyebrow="Team · Live API"
              title="Leadership, fetched live"
              sub="Demonstrates useEffect + custom hook useFetch. Data: jsonplaceholder users; local fallback if offline."
            />
            <button
              type="button"
              onClick={reload}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-slate-200 bg-white px-3.5 py-2 text-[13.5px] font-bold text-slate-700 shadow-subtle transition hover:bg-slate-50"
            >
              <RefreshCw className="size-4" aria-hidden /> Reload
            </button>
          </div>

          {loading ? (
            <LoadingState label="Fetching team…" />
          ) : (
            <>
              {error && (
                <div className="mt-6">
                  <ErrorState message={`${error} — showing cached team instead.`} onRetry={reload} />
                </div>
              )}
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <article
                    key={m.id}
                    tabIndex={-1}
                    className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5 shadow-subtle outline-none transition focus-visible:ring-4 focus-visible:ring-indigo-200 hover:shadow-medium dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        aria-hidden
                        className="grid size-12 shrink-0 place-items-center rounded-full bg-slate-900 text-[15px] font-extrabold text-white"
                      >
                        {m.initials}
                      </span>
                      <div>
                        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white">{m.name}</h3>
                        <p className="text-[13px] font-semibold text-indigo-600 dark:text-indigo-300">{m.role}</p>
                      </div>
                    </div>
                    <dl className="mt-4 space-y-1.5 text-[13px] text-slate-600 dark:text-slate-300">
                      <div className="flex gap-2">
                        <dt className="w-14 shrink-0 font-semibold text-slate-500 dark:text-slate-400">Email</dt>
                        <dd className="truncate">{m.email}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-14 shrink-0 font-semibold text-slate-500 dark:text-slate-400">Phone</dt>
                        <dd>{m.phone}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading eyebrow="Journey" title="Milestones" />
        <ol className="mt-7 space-y-0">
          {[
            ['2014', 'Founded in Chennai', 'Two engineers, one laptop each, first hospital portal.'],
            ['2018', 'Cloud practice launches', 'AWS partner; 50th migration shipped.'],
            ['2021', 'Security & AI units', 'SOC builds + first RAG copilot in production.'],
            ['2026', '240+ projects', '98% retention. Training the next batch of React devs.'],
          ].map(([year, title, body], i) => (
            <li key={year} className="relative flex gap-5 pb-8 last:pb-0">
              {i < 3 && (
                <span aria-hidden className="absolute top-10 left-[22px] h-[calc(100%-2rem)] w-[2px] bg-slate-200" />
              )}
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-indigo-600 text-[12px] font-extrabold text-white">
                {year.slice(2)}
              </span>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle flex-1 dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
                <p className="type-caption font-bold tracking-widest uppercase">{year}</p>
                <h3 className="mt-1 text-[15.5px] font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="type-muted mt-1">{body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-400/25 dark:bg-indigo-500/10">
          <Award className="size-6 text-indigo-600 dark:text-indigo-300" aria-hidden />
          <p className="text-[14.5px] font-semibold text-indigo-900 dark:text-indigo-100">
            Want the full story? Read our case studies or{' '}
            <Link to="/contact" className="inline-flex items-center gap-1 underline underline-offset-2">
              <Eye className="size-4" aria-hidden /> talk to the team
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
