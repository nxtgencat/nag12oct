import { Bell, Boxes, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.tsx';
import { cn } from '../../utils/helpers.ts';
import { Button } from '../ui/primitives.tsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
  { to: '/dashboard', label: 'Dashboard' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open ]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-all duration-200',
        scrolled
          ? 'border-slate-200 bg-white/85 shadow-subtle backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85'
          : 'border-transparent bg-white/60 backdrop-blur-md dark:bg-slate-950/60',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Stackly home">
          <span className="grid size-9 place-items-center rounded-[10px] bg-slate-900 text-white shadow-subtle dark:bg-white dark:text-slate-900">
            <Boxes className="size-5" aria-hidden />
          </span>
          <span className="leading-none">
            <span className="block text-[17px] font-extrabold tracking-tight text-slate-900 dark:text-white">
              Stackly
            </span>
            <span className="block text-[10.5px] font-semibold tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
              IT Solutions
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3.5 py-2 text-[14px] font-semibold transition-colors',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark preview' : 'Switch to light preview'}
            className="grid size-10 place-items-center rounded-[10px] border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-white/15 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
          >
            {theme === 'light' ? (
              <Moon className="size-[18px]" aria-hidden />
            ) : (
              <Sun className="size-[18px]" aria-hidden />
            )}
          </button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/work')}>
            <Bell className="size-4" aria-hidden /> Case studies
          </Button>
          <Button size="sm" onClick={() => navigate('/contact')}>
            Get a quote
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid size-10 place-items-center rounded-[10px] border border-slate-200 bg-white text-slate-600 dark:border-white/15 dark:bg-white/10 dark:text-slate-200"
          >
            {theme === 'light' ? (
              <Moon className="size-[18px]" aria-hidden />
            ) : (
              <Sun className="size-[18px]" aria-hidden />
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-[10px] bg-slate-900 text-white"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="animate-rise border-t border-slate-200 bg-white px-4 pt-2 pb-5 lg:hidden dark:border-white/10 dark:bg-slate-950"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'block rounded-xl px-4 py-3 text-[15px] font-semibold',
                  isActive ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Button className="mt-3 w-full" onClick={() => { setOpen(false); navigate('/contact'); }}>
            Get a quote
          </Button>
        </nav>
      )}
    </header>
  );
}
