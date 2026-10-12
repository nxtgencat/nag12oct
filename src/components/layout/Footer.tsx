import { ArrowUpRight, AtSign, Boxes, Globe, Mail, MapPin, Rss } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-[10px] bg-white text-slate-900">
                <Boxes className="size-5" aria-hidden />
              </span>
              <span className="leading-none">
                <span className="block text-[17px] font-extrabold tracking-tight text-white">
                  Stackly
                </span>
                <span className="block text-[10.5px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
                  IT Solutions
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-slate-400">
              Innovating today, securing tomorrow — your trusted partner in IT solutions.
            </p>
            <div className="mt-5 flex gap-2">
              {[Globe, AtSign, Rss, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Social link"
                  className="grid size-9 place-items-center rounded-[10px] bg-white/8 text-slate-300 transition hover:bg-white/15 hover:text-white"
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Company">
            <h3 className="type-label text-slate-400">Company</h3>
            <ul className="mt-4 space-y-2.5 text-[14px] font-medium">
              {[
                ['About us', '/about'],
                ['Our work', '/work'],
                ['Careers', '/about'],
                ['Contact', '/contact'],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h3 className="type-label text-slate-400">Services</h3>
            <ul className="mt-4 space-y-2.5 text-[14px] font-medium">
              {[
                ['Cloud & DevOps', '/services/cloud-devops'],
                ['Cybersecurity', '/services/cybersecurity'],
                ['Web Development', '/services/web-development'],
                ['AI & Data', '/services/ai-data'],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="group inline-flex items-center gap-1 transition hover:text-white">
                    {label}
                    <ArrowUpRight
                      className="size-3.5 opacity-0 transition group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="type-label text-slate-400">Head office</h3>
            <p className="mt-4 flex items-start gap-2 text-[14px] leading-relaxed">
              <MapPin className="mt-0.5 size-4 shrink-0 text-slate-500" aria-hidden />
              4th Floor, Prestige Towers, Guindy,
              <br />
              Chennai 600032, India
            </p>
            <p className="mt-3 text-[14px] font-semibold text-white">hello@thestackly.com</p>
            <p className="text-[13px] text-slate-400">Mon–Sat, 9:30am – 7pm IST</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-[12.5px] text-slate-500 sm:flex-row sm:items-center">
          <p>© 2026 Stackly IT Solutions. Built as React Training Final Project — Task 15.</p>
          <p>
            React • Router • Redux • Hooks • CRUD • Validation •{' '}
            <span className="text-slate-300">Responsive</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
