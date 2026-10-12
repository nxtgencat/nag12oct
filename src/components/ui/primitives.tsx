import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/helpers.ts';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled ?? loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 cursor-pointer select-none',
        'rounded-[10px] focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-55',
        size === 'sm' && 'h-9 px-4 text-[13.5px]',
        size === 'md' && 'h-11 px-5 text-[14.5px]',
        size === 'lg' && 'h-[52px] px-7 text-[15.5px]',
        variant === 'primary' &&
          'bg-indigo-600 text-white shadow-[0_8px_20px_-8px_rgb(79_70_229/0.6)] hover:bg-indigo-700 hover:shadow-[0_10px_24px_-8px_rgb(79_70_229/0.7)] active:bg-indigo-800',
        variant === 'secondary' &&
          'bg-white text-slate-900 border border-slate-200 shadow-subtle hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 dark:bg-white/10 dark:text-white dark:border-white/15 dark:shadow-none dark:hover:border-white/25 dark:hover:bg-white/15 dark:active:bg-white/20',
        variant === 'ghost' &&
          'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 dark:text-slate-200 dark:hover:bg-white/10 dark:active:bg-white/15',
        variant === 'dark' &&
          'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 shadow-medium',
        variant === 'danger' && 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800',
        loading && 'opacity-70',
        className,
      )}
    >
      {loading && (
        <span
          aria-hidden
          className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
        />
      )}
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = 'slate',
  className,
}: {
  children: ReactNode;
  tone?: 'slate' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'cyan';
  className?: string;
}) {
  const tones: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/10 dark:text-slate-200 dark:border-white/15',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-200 dark:border-indigo-400/30',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-400/30',
    amber: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-400/30',
    rose: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-400/30',
    cyan: 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-200 dark:border-cyan-400/30',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[12px] font-semibold tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'left',
  dark = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <p
        className={cn(
          'type-label mb-3 flex items-center gap-2',
          align === 'center' && 'justify-center',
          dark ? 'text-cyan-300' : 'text-indigo-600',
        )}
      >
        <span
          aria-hidden
          className={cn('inline-block h-[2px] w-6 rounded-full', dark ? 'bg-cyan-300' : 'bg-indigo-600')}
        />
        {eyebrow}
      </p>
      <h2 className={cn('type-heading', dark ? 'text-white' : 'text-slate-900 dark:text-white')}>{title}</h2>
      {sub && (
        <p className={cn('type-muted mt-3 text-[15.5px]', dark ? 'text-slate-300!' : 'dark:text-slate-400' )}>{sub}</p>
      )}
    </div>
  );
}
