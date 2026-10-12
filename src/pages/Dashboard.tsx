import { Pencil, Plus, Search, Trash2, UserRound, X } from 'lucide-react';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.tsx';
import { services } from '../data/content.ts';
import { useDocumentTitle } from '../hooks/hooks.ts';
import type { AppDispatch, RootState } from '../store/store.ts';
import { addRequest, deleteRequest, seedRequests, setStatus, updateRequest } from '../store/store.ts';
import type { RequestStatus, ServiceRequest } from '../types/index.ts';
import { formatDate, uid, cn } from '../utils/helpers.ts';
import { validateRequest } from '../utils/validation.ts';
import { SelectInput, TextArea, TextInput } from '../components/ui/fields.tsx';
import { Badge, Button, SectionHeading } from '../components/ui/primitives.tsx';
import { EmptyState } from '../components/ui/states.tsx';

// useReducer demo: dashboard view state (filter + sort + query)
interface ViewState {
  status: 'all' | RequestStatus;
  sort: 'newest' | 'oldest' | 'name';
  query: string;
}
type ViewAction =
  | { type: 'status'; value: ViewState['status'] }
  | { type: 'sort'; value: ViewState['sort'] }
  | { type: 'query'; value: string }
  | { type: 'reset' };

function viewReducer(state: ViewState, action: ViewAction): ViewState {
  switch (action.type) {
    case 'status':
      return { ...state, status: action.value };
    case 'sort':
      return { ...state, sort: action.value };
    case 'query':
      return { ...state, query: action.value };
    case 'reset':
      return { status: 'all', sort: 'newest', query: '' };
    default:
      return state;
  }
}

const emptyForm = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  message: '',
};

const budgets = ['< $5k', '$5k – $10k', '$10k – $25k', '$25k+'];
const statuses: Array<'all' | RequestStatus> = ['all', 'new', 'in-review', 'approved', 'completed'];

const statusTone: Record<RequestStatus, 'slate' | 'amber' | 'indigo' | 'emerald'> = {
  new: 'slate',
  'in-review': 'amber',
  approved: 'indigo',
  completed: 'emerald',
};

const demoSeed: ServiceRequest[] = [
  {
    id: 'seed_1',
    name: 'Meera Krishnan',
    email: 'meera@medicare.example',
    company: 'MediCare Group',
    service: 'cloud-devops',
    budget: '$10k – $25k',
    message: 'Migrate hospital HMS to Kubernetes with zero downtime and cost controls.',
    status: 'in-review',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'seed_2',
    name: 'Daniel Osei',
    email: 'daniel@finshield.example',
    company: 'FinShield',
    service: 'cybersecurity',
    budget: '$5k – $10k',
    message: 'SOC 2 readiness + pen-test before our Series B diligence.',
    status: 'new',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export function Dashboard() {
  useDocumentTitle('Dashboard');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const items = useSelector((s: RootState) => s.requests.items);
  const { userName, setUserName } = useApp();

  const [view, dispatchView] = useReducer(viewReducer, {
    status: 'all',
    sort: 'newest',
    query: '',
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceRequest | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [profileDraft, setProfileDraft] = useState(userName);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(seedRequests(demoSeed));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const needle = view.query.trim().toLowerCase();
    const list = items.filter((r) => {
      const okStatus = view.status === 'all' || r.status === view.status;
      const okQuery =
        !needle ||
        r.name.toLowerCase().includes(needle) ||
        r.company.toLowerCase().includes(needle) ||
        r.service.toLowerCase().includes(needle);
      return okStatus && okQuery;
    });
    return [...list].sort((a, b) => {
      if (view.sort === 'name') return a.name.localeCompare(b.name);
      if (view.sort === 'oldest')
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [items, view]);

  const openCreate = (): void => {
    setEditing(null);
    setForm({ ...emptyForm, name: userName === 'Guest' ? '' : userName });
    setErrors({});
    setDialogOpen(true);
  };

  const openEdit = (r: ServiceRequest): void => {
    setEditing(r);
    setForm({
      name: r.name,
      email: r.email,
      company: r.company,
      service: r.service,
      budget: r.budget,
      message: r.message,
    });
    setErrors({});
    setDialogOpen(true);
  };

  const save = (e: React.FormEvent): void => {
    e.preventDefault();
    const errs = validateRequest(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (editing) {
      dispatch(updateRequest({ ...editing, ...form }));
    } else {
      dispatch(
        addRequest({
          id: uid('req'),
          ...form,
          status: 'new',
          createdAt: new Date().toISOString(),
        }),
      );
    }
    setDialogOpen(false);
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const s of statuses.slice(1)) c[s] = items.filter((r) => r.status === s).length;
    return c;
  }, [items]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Dashboard · CRUD + Redux + useReducer + useContext"
        title="Service requests"
        sub="Create, read, update, delete and triage requests. State lives in Redux + localStorage; filters in useReducer; profile name in Context."
      />

      {/* Profile (useContext) */}
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle sm:flex-row sm:items-center dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-indigo-600 text-white">
          <UserRound className="size-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14.5px] font-bold text-slate-900 dark:text-white">
            Signed in as {userName} · {items.length} request{items.length === 1 ? '' : 's'}
          </p>
          <p className="type-caption">Change the display name — it syncs via Context + localStorage.</p>
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (profileDraft.trim()) setUserName(profileDraft.trim());
          }}
        >
          <input
            value={profileDraft}
            onChange={(e) => setProfileDraft(e.target.value)}
            aria-label="Display name"
            placeholder="Your name"
            className="h-10 w-44 rounded-[10px] border border-slate-200 px-3 text-[14px] outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-white/15 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/25"
          />
          <Button type="submit" size="sm" variant="secondary">
            Save
          </Button>
        </form>
      </div>

      {/* Toolbar */}
      <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle lg:flex-row lg:items-center dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
        <label className="relative flex-1">
          <span className="sr-only">Search requests</span>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            value={view.query}
            onChange={(e) => dispatchView({ type: 'query', value: e.target.value })}
            placeholder="Search name, company, service…"
            className="h-10 w-full rounded-[10px] border border-slate-200 bg-slate-50 pr-3 pl-10 text-[14px] outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-white/15 dark:bg-white/5 dark:text-slate-100 dark:focus:bg-slate-900 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/25"
          />
        </label>
        <div className="flex flex-wrap items-center gap-1.5">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => dispatchView({ type: 'status', value: s })}
              aria-pressed={view.status === s}
              className={cn(
                'cursor-pointer rounded-full px-3 py-1.5 text-[12.5px] font-bold transition',
                view.status === s ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15',
              )}
            >
              {s === 'all' ? 'All' : s} · {counts[s] ?? 0}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <select
            value={view.sort}
            onChange={(e) => dispatchView({ type: 'sort', value: e.target.value as ViewState['sort'] })}
            aria-label="Sort requests"
            className="h-10 rounded-[10px] border border-slate-200 bg-white px-2.5 text-[13.5px] font-semibold outline-none focus:border-indigo-500 dark:border-white/15 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-400"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name A–Z</option>
          </select>
          <Button size="sm" className="h-10" onClick={openCreate}>
            <Plus className="size-4" aria-hidden /> New
          </Button>
        </div>
      </div>

      {(view.query || view.status !== 'all') && (
        <button
          type="button"
          onClick={() => dispatchView({ type: 'reset' })}
          className="mt-3 cursor-pointer text-[13px] font-bold text-indigo-600 hover:text-indigo-800"
        >
          Clear filters ({filtered.length} shown)
        </button>
      )}

      {/* Table / cards — conditional rendering */}
      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title={items.length === 0 ? 'No requests yet' : 'No matches'}
            body={
              items.length === 0
                ? 'Create your first service request to see CRUD in action.'
                : 'Adjust the search or status filter.'
            }
            action={
              <div className="flex gap-2">
                <Button size="sm" onClick={openCreate}>
                  <Plus className="size-4" aria-hidden /> New request
                </Button>
                {items.length > 0 && (
                  <Button size="sm" variant="secondary" onClick={() => dispatchView({ type: 'reset' })}>
                    Reset
                  </Button>
                )}
              </div>
            }
          />
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-subtle dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
          <div className="hidden grid-cols-[1.4fr_1fr_0.9fr_0.8fr_0.7fr_auto] gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[11.5px] font-extrabold tracking-widest text-slate-500 uppercase lg:grid dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            <span>Request</span>
            <span>Company</span>
            <span>Service</span>
            <span>Status</span>
            <span>Created</span>
            <span className="text-right">Actions</span>
          </div>
          <ul className="divide-y divide-slate-100 dark:divide-white/10">
            {filtered.map((r) => (
              <li
                key={r.id}
                className="grid gap-2 px-5 py-4 transition hover:bg-slate-50/70 lg:grid-cols-[1.4fr_1fr_0.9fr_0.8fr_0.7fr_auto] lg:items-center lg:gap-3 dark:hover:bg-white/5"
              >
                <div>
                  <p className="text-[14.5px] font-bold text-slate-900 dark:text-white">{r.name}</p>
                  <p className="truncate text-[12.5px] text-slate-500 dark:text-slate-400">{r.email} · {r.budget}</p>
                  <p className="mt-1 line-clamp-1 text-[13px] text-slate-600 dark:text-slate-300">{r.message}</p>
                </div>
                <p className="text-[13.5px] font-semibold text-slate-700 dark:text-slate-200">{r.company}</p>
                <p className="text-[13px] font-medium text-slate-600 dark:text-slate-300">
                  {services.find((s) => s.slug === r.service)?.title ?? r.service}
                </p>
                <div>
                  <select
                    value={r.status}
                    onChange={(e) =>
                      dispatch(setStatus({ id: r.id, status: e.target.value as RequestStatus }))
                    }
                    aria-label={`Status for ${r.name}`}
                    className="h-8 rounded-full border border-slate-200 bg-white px-2 text-[12.5px] font-bold outline-none focus:border-indigo-500 dark:border-white/15 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-400"
                  >
                    {statuses.slice(1).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="mt-1.5 lg:hidden">
                    <Badge tone={statusTone[r.status]}>{r.status}</Badge>
                  </div>
                </div>
                <p className="type-caption">{formatDate(r.createdAt)}</p>
                <div className="flex justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEdit(r)}
                    aria-label={`Edit ${r.name}`}
                    className="grid size-9 cursor-pointer place-items-center rounded-[10px] border border-slate-200 text-slate-600 transition hover:bg-white hover:text-indigo-700 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-indigo-300"
                  >
                    <Pencil className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(r.id)}
                    aria-label={`Delete ${r.name}`}
                    className="grid size-9 cursor-pointer place-items-center rounded-[10px] border border-slate-200 text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:border-white/15 dark:text-slate-300 dark:hover:border-rose-400/30 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="type-caption mt-4">
        Full CRUD: add via dialog (validation), edit inline, triage status, delete with confirm.
        Or <button type="button" onClick={() => navigate('/contact')} className="cursor-pointer font-bold text-indigo-600 underline underline-offset-2">use the contact form</button>.
      </p>

      {/* Create/Edit dialog */}
      {dialogOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={editing ? 'Edit request' : 'New request'}
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDialogOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setDialogOpen(false);
          }}
        >
          <form
            onSubmit={save}
            noValidate
            className="animate-rise w-full max-w-2xl rounded-2xl bg-white p-6 shadow-elevated sm:p-8 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[19px] font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {editing ? 'Edit request' : 'New service request'}
                </h2>
                <p className="type-caption mt-1">Validated with the same rules as the contact form.</p>
              </div>
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                aria-label="Close dialog"
                className="grid size-9 cursor-pointer place-items-center rounded-[10px] bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <TextInput label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
              <TextInput label="Work email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
              <TextInput label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} error={errors.company} />
              <SelectInput label="Service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} error={errors.service}>
                <option value="">Choose…</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </SelectInput>
              <SelectInput label="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} error={errors.budget} className="sm:col-span-2">
                <option value="">Select range…</option>
                {budgets.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </SelectInput>
              <TextArea label="Requirements" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} error={errors.message} className="sm:col-span-2" />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editing ? 'Save changes' : 'Create request'}</Button>
            </div>
          </form>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-label="Confirm delete"
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setConfirmDelete(null);
          }}
        >
          <div className="animate-rise w-full max-w-sm rounded-2xl bg-white p-6 shadow-elevated dark:bg-slate-900">
            <h2 className="text-[16.5px] font-extrabold text-slate-900 dark:text-white">Delete this request?</h2>
            <p className="type-muted mt-1.5">This removes it from Redux + localStorage. This can&apos;t be undone.</p>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(null)}>
                Keep
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  dispatch(deleteRequest(confirmDelete));
                  setConfirmDelete(null);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
