import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Footer } from './Footer.tsx';
import { Navbar } from './Navbar.tsx';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6f7fb] dark:bg-slate-950">
      <ScrollRestoration />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
