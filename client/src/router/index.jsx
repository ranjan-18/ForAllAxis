import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

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

const Login = lazy(() => import('../pages/admin/Login'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const ManageProjects = lazy(() => import('../pages/admin/ManageProjects'));
const ManageServices = lazy(() => import('../pages/admin/ManageServices'));
const ManageTestimonials = lazy(() => import('../pages/admin/ManageTestimonials'));
const ManageCareers = lazy(() => import('../pages/admin/ManageCareers'));
const ManageApplications = lazy(() => import('../pages/admin/ManageApplications'));
const ManageTeam = lazy(() => import('../pages/admin/ManageTeam'));
const ContactSubmissions = lazy(() => import('../pages/admin/ContactSubmissions'));
const ManageProjectInquiries = lazy(() => import('../pages/admin/ManageProjectInquiries'));

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
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'login', element: withSuspense(Login) },
      {
        path: '',
        element: <ProtectedRoute />,
        children: [
          { index: true, element: withSuspense(Dashboard) },
          { path: 'projects', element: withSuspense(ManageProjects) },
          { path: 'services', element: withSuspense(ManageServices) },
          { path: 'testimonials', element: withSuspense(ManageTestimonials) },
          { path: 'careers', element: withSuspense(ManageCareers) },
          { path: 'applications', element: withSuspense(ManageApplications) },
          { path: 'team', element: withSuspense(ManageTeam) },
          { path: 'contacts', element: withSuspense(ContactSubmissions) },
          { path: 'project-inquiries', element: withSuspense(ManageProjectInquiries) },
        ]
      }
    ]
  }
]);

export default router;
