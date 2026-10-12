import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout.tsx';
import { About } from './pages/About.tsx';
import { Contact } from './pages/Contact.tsx';
import { Dashboard } from './pages/Dashboard.tsx';
import { Home } from './pages/Home.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { ServiceDetail, ServicesIndex, ServicesLayout } from './pages/Services.tsx';
import { WorkDetail, WorkList } from './pages/Work.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      {
        path: 'services',
        element: <ServicesLayout />,
        children: [
          { index: true, element: <ServicesIndex /> },
          { path: ':slug', element: <ServiceDetail /> },
        ],
      },
      { path: 'work', element: <WorkList /> },
      { path: 'work/:id', element: <WorkDetail /> },
      { path: 'contact', element: <Contact /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
