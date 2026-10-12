import { Link } from 'react-router-dom';
import { Button } from '../components/ui/primitives.tsx';
import { useDocumentTitle } from '../hooks/hooks.ts';

export function NotFound() {
  useDocumentTitle('Not found');
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      <p className="type-label text-indigo-600">404</p>
      <h1 className="type-heading mt-2 text-slate-900 dark:text-white">Page not found</h1>
      <p className="type-muted mt-3">
        The page you&apos;re looking for moved or never existed. Try the navigation above.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/">
          <Button>Go home</Button>
        </Link>
        <Link to="/services">
          <Button variant="secondary">Browse services</Button>
        </Link>
      </div>
    </div>
  );
}
