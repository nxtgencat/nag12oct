import { Inbox, Loader2, SearchX, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from './primitives.tsx';

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-3 py-14">
      <Loader2 className="size-8 animate-spin text-indigo-600" aria-hidden />
      <p className="type-muted">{label}</p>
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
  icon = 'inbox',
}: {
  title: string;
  body?: string;
  action?: ReactNode;
  icon?: 'inbox' | 'search';
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-white/15 dark:bg-slate-900">
      <span className="mb-4 grid size-12 place-items-center rounded-full bg-slate-100 dark:bg-white/10">
        {icon === 'search' ? (
          <SearchX className="size-6 text-slate-500 dark:text-slate-400" aria-hidden />
        ) : (
          <Inbox className="size-6 text-slate-500 dark:text-slate-400" aria-hidden />
        )}
      </span>
      <h3 className="type-subheading text-slate-900 dark:text-white">{title}</h3>
      {body && <p className="type-muted mt-2 max-w-sm">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-2xl border border-rose-200 bg-rose-50 px-6 py-12 text-center dark:border-rose-500/30 dark:bg-rose-500/10"
    >
      <TriangleAlert className="mb-3 size-8 text-rose-600 dark:text-rose-400" aria-hidden />
      <h3 className="type-subheading text-rose-900 dark:text-rose-200">Something went wrong</h3>
      <p className="mt-2 max-w-md text-[14px] text-rose-700 dark:text-rose-300">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
