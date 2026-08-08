import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

// Lazy load pages for code-splitting
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
          { path: '*', element: withSuspense(Dashboard) }
        ]
      }
    ]
  }
]);

export default router;
