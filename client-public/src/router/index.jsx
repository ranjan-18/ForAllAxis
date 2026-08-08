import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';

// Lazy load pages for code-splitting
const Home = lazy(() => import('../pages/public/Home'));
const About = lazy(() => import('../pages/public/About'));
const Services = lazy(() => import('../pages/public/Services'));
const Portfolio = lazy(() => import('../pages/public/Portfolio'));
const PortfolioDetail = lazy(() => import('../pages/public/PortfolioDetail'));
const Careers = lazy(() => import('../pages/public/Careers'));
const CareerJob = lazy(() => import('../pages/public/CareerJob'));
const Contact = lazy(() => import('../pages/public/Contact'));
const StartProject = lazy(() => import('../pages/public/StartProject'));
const NotFound = lazy(() => import('../pages/public/NotFound'));

// Reusable suspense wrapper
const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: 'var(--accent-red)', fontSize: '1.25rem', fontWeight: 600 }}>
    Loading...
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: 'about', element: withSuspense(About) },
      { path: 'services', element: withSuspense(Services) },
      { path: 'portfolio', element: withSuspense(Portfolio) },
      { path: 'portfolio/:slug', element: withSuspense(PortfolioDetail) },
      { path: 'careers', element: withSuspense(Careers) },
      { path: 'careers/:slug', element: withSuspense(CareerJob) },
      { path: 'contact', element: withSuspense(Contact) },
      { path: 'start-project', element: withSuspense(StartProject) },
      { path: '*', element: withSuspense(NotFound) }
    ]
  }
]);

export default router;
