import { ArrowLeft, Bookmark, BookmarkCheck, CheckCircle2, Search, Star } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { categories, projects } from '../data/content.ts';
import { useDebounce, useDocumentTitle } from '../hooks/hooks.ts';
import type { AppDispatch, RootState } from '../store/store.ts';
import { toggleSaved } from '../store/store.ts';
import { cn } from '../utils/helpers.ts';
import { Badge, Button } from '../components/ui/primitives.tsx';
import { EmptyState } from '../components/ui/states.tsx';

export function WorkList() {
  useDocumentTitle('Work');
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const savedIds = useSelector((s: RootState) => s.saved.savedIds);

  const q = params.get('q') ?? '';
  const category = params.get('category') ?? 'All';
  const debouncedQ = useDebounce(q, 300);

  const filtered = useMemo(() => {
    const needle = debouncedQ.trim().toLowerCase();
    return projects.filter((p) => {
      const inCategory = category === 'All' || p.category === category;
      const inQuery =
        !needle ||
        p.title.toLowerCase().includes(needle) ||
        p.client.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.toLowerCase().includes(needle));
      return inCategory && inQuery;
    });
  }, [category, debouncedQ]);

  const set = (patch: Record<string, string>): void => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    setParams(next, { preventScrollReset: true });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="type-label text-indigo-600">Work · useSearchParams + Redux</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <h1 className="type-heading text-slate-900 dark:text-white">Case studies</h1>
        <p className="type-caption">
          {filtered.length} of {projects.length} · {savedIds.length} saved (Redux)
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle lg:flex-row lg:items-center dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
        <label className="relative flex-1">
          <span className="sr-only">Search projects</span>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            value={q}
            onChange={(e) => set({ q: e.target.value })}
            placeholder="Search title, client or tag… (debounced)"
            className="h-11 w-full rounded-[10px] border border-slate-200 bg-[#f8fafc] pr-4 pl-10 text-[14px] outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-white/15 dark:bg-white/5 dark:text-slate-100 dark:focus:bg-slate-900 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/25"
          />
        </label>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar" role="tablist" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => set({ category: c === 'All' ? '' : c })}
              className={cn(
                'shrink-0 cursor-pointer rounded-full px-3.5 py-2 text-[13px] font-bold transition',
                category === c
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon="search"
            title="No projects match"
            body="Try a different keyword or category — or clear the filters."
            action={
              <Button variant="secondary" size="sm" onClick={() => setParams({}, { preventScrollReset: true })}>
                Clear filters
              </Button>
            }
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => {
            const saved = savedIds.includes(p.id);
            return (
              <article
                key={p.id}
                style={{ animationDelay: `${Math.min(i, 6) * 0.05}s` }}
                className="animate-rise overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-subtle transition hover:-translate-y-0.5 hover:shadow-medium dark:border-white/10 dark:bg-slate-900 dark:shadow-none"
              >
                <div className={`relative flex h-36 items-end bg-gradient-to-br p-4 ${p.image}`}>
                  <Badge tone="slate" className="border-white/30 bg-white/92">
                    {p.category}
                  </Badge>
                  <button
                    type="button"
                    onClick={() => dispatch(toggleSaved(p.id))}
                    aria-pressed={saved}
                    aria-label={saved ? `Unsave ${p.title}` : `Save ${p.title}`}
                    className="absolute top-3 right-3 grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 shadow-subtle transition hover:bg-white"
                  >
                    {saved ? (
                      <BookmarkCheck className="size-4 text-indigo-600" aria-hidden />
                    ) : (
                      <Bookmark className="size-4 text-slate-600" aria-hidden />
                    )}
                  </button>
                </div>
                <div className="p-5">
                  <p className="type-caption font-semibold">
                    {p.client} · {p.year} · {p.duration}
                  </p>
                  <h2 className="mt-1 text-[16px] font-bold text-slate-900 dark:text-white">{p.title}</h2>
                  <p className="type-muted mt-1.5 line-clamp-2 text-[13.5px]">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-[11.5px] font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
                    <span className="inline-flex items-center gap-1 text-[13px] font-bold text-emerald-700">
                      <CheckCircle2 className="size-4" aria-hidden /> {p.outcome}
                    </span>
                    <Link
                      to={`/work/${p.id}`}
                      className="text-[13.5px] font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      Open →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function WorkDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const savedIds = useSelector((s: RootState) => s.saved.savedIds);

  const project = projects.find((p) => String(p.id) === String(id));
  useDocumentTitle(project ? project.title : 'Work');

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <EmptyState
          title="Case study not found"
          body={`No project with id “${id}”.`}
          action={<Button onClick={() => navigate('/work')}>Back to work</Button>}
        />
      </div>
    );
  }

  const saved = savedIds.includes(project.id);
  const related = projects.filter((p) => p.category === project.category && p.id !== project.id).slice(0, 2);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex cursor-pointer items-center gap-1.5 text-[13.5px] font-bold text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      >
        <ArrowLeft className="size-4" aria-hidden /> Back
      </button>

      <div className={`mt-4 rounded-3xl bg-gradient-to-br p-8 sm:p-10 ${project.image}`}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="slate" className="border-white/30 bg-white/92">{project.category}</Badge>
          <Badge tone="slate" className="border-white/30 bg-white/75">{project.year}</Badge>
        </div>
        <h1 className="type-display mt-4 text-white">{project.title}</h1>
        <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-white/85">
          {project.description}
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
          <h2 className="type-subheading text-slate-900 dark:text-white">Engagement snapshot</h2>
          <dl className="mt-4 grid grid-cols-2 gap-4">
            {[
              ['Client', project.client],
              ['Duration', project.duration],
              ['Outcome', project.outcome],
              ['Rating', `${'★'.repeat(project.rating)} (${project.rating}/5)`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-slate-50 p-3.5 dark:bg-white/5">
                <dt className="type-caption font-bold tracking-wider uppercase">{k}</dt>
                <dd className="mt-1 text-[14.5px] font-bold text-slate-900 dark:text-white">{v}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-6 text-[14px] font-extrabold tracking-widest text-slate-500 uppercase">
            Stack
          </h3>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <Badge key={t} tone="indigo">{t}</Badge>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => navigate(`/contact?service=${encodeURIComponent(project.category)}`)}>
              Start similar project
            </Button>
            <Button variant="secondary" onClick={() => dispatch(toggleSaved(project.id))}>
              {saved ? (
                <>
                  <BookmarkCheck className="size-4" aria-hidden /> Saved
                </>
              ) : (
                <>
                  <Bookmark className="size-4" aria-hidden /> Save (Redux)
                </>
              )}
            </Button>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
          <h2 className="text-[14px] font-extrabold tracking-widest text-slate-500 uppercase">
            More {project.category}
          </h2>
          {related.length === 0 ? (
            <p className="type-muted mt-3">No related case studies yet.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    to={`/work/${r.id}`}
                    className="block rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/50 dark:border-white/10 dark:hover:border-indigo-400/30 dark:hover:bg-indigo-500/10"
                  >
                    <p className="text-[14px] font-bold text-slate-900 dark:text-white">{r.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-[12.5px] font-semibold text-emerald-700">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
                      {r.outcome}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link to="/work" className="mt-4 inline-block text-[13.5px] font-bold text-indigo-600 hover:text-indigo-800">
            Browse all →
          </Link>
        </aside>
      </div>
    </div>
  );
}
