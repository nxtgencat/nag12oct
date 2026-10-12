import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { services } from '../data/content.ts';
import { useDocumentTitle, useLocalStorage } from '../hooks/hooks.ts';
import type { ContactMessage } from '../types/index.ts';
import { uid } from '../utils/helpers.ts';
import { validateContact } from '../utils/validation.ts';
import { SelectInput, TextArea, TextInput } from '../components/ui/fields.tsx';
import { Badge, Button, SectionHeading } from '../components/ui/primitives.tsx';

export function Contact() {
  useDocumentTitle('Contact');
  const [params] = useSearchParams();
  const preselected = params.get('service') ?? '';
  const nameRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useLocalStorage<ContactMessage[]>('stackly-messages', []);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: preselected ? `Project inquiry — ${preselected}` : '',
    message: '',
    service: preselected,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const liveErrors = useMemo(
    () =>
      validateContact({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
    [form],
  );
  const visibleErrors: Record<string, string> = {};
  for (const [k, v] of Object.entries(touched ? liveErrors : {})) {
    if (touched[k]) visibleErrors[k] = v;
  }
  const submitErrors = errors;

  const set = (k: string, v: string): void => {
    setForm((f) => ({ ...f, [k]: v }));
    setTouched((t) => ({ ...t, [k]: true }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const errs = validateContact(form);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errs).length > 0) {
      // focus first invalid — useRef demo
      if (errs.name) nameRef.current?.focus();
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      const entry: ContactMessage = {
        id: uid('msg'),
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        createdAt: new Date().toISOString(),
      };
      setMessages((m) => [entry, ...m].slice(0, 20));
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '', service: '' });
      setErrors({});
      setTouched({});
    }, 700);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Contact · Form validation"
        title="Tell us about your project"
        sub="Validated inline, saved to localStorage. Prefill via ?service=slug from any service page."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle sm:p-8 dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
          {sent && (
            <div role="status" className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-400/30 dark:bg-emerald-500/10">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-300" aria-hidden />
              <div>
                <p className="text-[14.5px] font-bold text-emerald-900 dark:text-emerald-100">Message sent — we reply within 24 hours.</p>
                <p className="text-[13.5px] text-emerald-700 dark:text-emerald-300">
                  {messages.length} message{messages.length === 1 ? '' : 's'} stored in this browser.
                </p>
              </div>
            </div>
          )}

          {preselected && (
            <div className="mb-5">
              <Badge tone="indigo">Requested service: {preselected}</Badge>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
            <TextInput
              ref={nameRef}
              label="Full name"
              placeholder="Aarav Patel"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              error={visibleErrors.name ?? submitErrors.name}
              autoComplete="name"
            />
            <TextInput
              label="Work email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              error={visibleErrors.email ?? submitErrors.email}
              autoComplete="email"
            />
            <TextInput
              label="Subject"
              placeholder="Cloud migration for hospital HMS"
              value={form.subject}
              onChange={(e) => set('subject', e.target.value)}
              error={visibleErrors.subject ?? submitErrors.subject}
              className="sm:col-span-2"
            />
            <SelectInput
              label="Related service"
              value={form.service}
              onChange={(e) => set('service', e.target.value)}
              className="sm:col-span-2"
            >
              <option value="">General inquiry</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </SelectInput>
            <TextArea
              label="Project details"
              placeholder="Goals, timeline, budget range, current stack…"
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              error={visibleErrors.message ?? submitErrors.message}
              hint={`${form.message.trim().length}/10 min characters`}
              className="sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <Button type="submit" loading={sending} className="w-full sm:w-auto" size="lg">
                <Send className="size-4" aria-hidden /> Send message
              </Button>
              <p className="type-caption mt-2.5">
                By sending, you agree to be contacted about your inquiry. Demo: stored locally only.
              </p>
            </div>
          </form>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-transparent bg-slate-950 p-6 text-white dark:border-white/10 dark:bg-slate-900">
            <h2 className="type-subheading">Prefer to talk?</h2>
            <ul className="mt-4 space-y-3.5 text-[14px]">
              <li className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-[10px] bg-white/10">
                  <Mail className="size-4" aria-hidden />
                </span>
                hello@thestackly.com
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-[10px] bg-white/10">
                  <Phone className="size-4" aria-hidden />
                </span>
                +91 44 4969 2400
              </li>
              <li className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-white/10">
                  <MapPin className="size-4" aria-hidden />
                </span>
                Guindy, Chennai 600032
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
            <h2 className="text-[14px] font-extrabold tracking-widest text-slate-500 uppercase dark:text-slate-400">
              Response SLA
            </h2>
            <ul className="mt-3 space-y-2.5 text-[14px] font-medium text-slate-700 dark:text-slate-300">
              {['Reply within 24 hours', 'Scoped quote within 48 hours', 'NDA on request'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
