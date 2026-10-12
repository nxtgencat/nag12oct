import type {
  InputHTMLAttributes,
  Ref,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { cn } from '../../utils/helpers.ts';

function labelCls(error?: string): string {
  return cn(
    'mb-1.5 block text-[13px] font-semibold',
    error ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-200',
  );
}

const inputBase =
  'w-full rounded-[10px] border bg-white px-3.5 text-[14.5px] text-slate-900 placeholder:text-slate-400 transition-all duration-150 shadow-subtle dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-none';

function tone(error?: string): string {
  return error
    ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 dark:border-rose-500/50 dark:focus:border-rose-400 dark:focus:ring-rose-500/20'
    : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 hover:border-slate-300 dark:border-white/15 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/25 dark:hover:border-white/25';
}

interface FieldWrap {
  label: string;
  error?: string;
  hint?: string;
}

export function TextInput({
  label,
  error,
  hint,
  className,
  ref,
  ...rest
}: FieldWrap & InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }) {
  return (
    <div className={className}>
      <label className={labelCls(error)}>
        {label}
        <input
          ref={ref}
          {...rest}
          aria-invalid={Boolean(error)}
          className={cn(inputBase, tone(error), 'mt-1.5 h-11 outline-none')}
        />
      </label>
      {error ? (
        <p role="alert" className="mt-1 text-[12.5px] font-medium text-rose-600 dark:text-rose-400">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-[12.5px] text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextArea({
  label,
  error,
  hint,
  className,
  ...rest
}: FieldWrap & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      <label className={labelCls(error)}>
        {label}
        <textarea
          {...rest}
          aria-invalid={Boolean(error)}
          className={cn(inputBase, tone(error), 'mt-1.5 min-h-[112px] py-3 outline-none resize-y')}
        />
      </label>
      {error ? (
        <p role="alert" className="mt-1 text-[12.5px] font-medium text-rose-600 dark:text-rose-400">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-[12.5px] text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

export function SelectInput({
  label,
  error,
  className,
  children,
  ...rest
}: FieldWrap & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={className}>
      <label className={labelCls(error)}>
        {label}
        <select
          {...rest}
          aria-invalid={Boolean(error)}
          className={cn(inputBase, tone(error), 'mt-1.5 h-11 outline-none appearance-none pr-9')}
        >
          {children}
        </select>
      </label>
      {error && (
        <p role="alert" className="mt-1 text-[12.5px] font-medium text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
