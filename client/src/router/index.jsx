import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Services from '../pages/public/Services';
import Portfolio from '../pages/public/Portfolio';
import PortfolioDetail from '../pages/public/PortfolioDetail';
import Blog from '../pages/public/Blog';
import BlogPost from '../pages/public/BlogPost';
import Contact from '../pages/public/Contact';
import NotFound from '../pages/public/NotFound';

import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import ManageProjects from '../pages/admin/ManageProjects';
import ManageServices from '../pages/admin/ManageServices';
import ManageTestimonials from '../pages/admin/ManageTestimonials';
import ManageBlog from '../pages/admin/ManageBlog';
import ManageTeam from '../pages/admin/ManageTeam';
import ContactSubmissions from '../pages/admin/ContactSubmissions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'portfolio/:slug', element: <PortfolioDetail /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'login', element: <Login /> },
      {
        path: '',
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'projects', element: <ManageProjects /> },
          { path: 'services', element: <ManageServices /> },
          { path: 'testimonials', element: <ManageTestimonials /> },
          { path: 'blog', element: <ManageBlog /> },
          { path: 'team', element: <ManageTeam /> },
          { path: 'contacts', element: <ContactSubmissions /> },
        ]
      }
    ]
  }
]);

export default router;
