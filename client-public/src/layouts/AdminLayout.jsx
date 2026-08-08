import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import ScrollToTop from '../components/common/ScrollToTop';

export default function AdminLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <div className="admin-login-layout-container">
        <ScrollToTop />
        <Outlet />
      </div>
    );
  }

  return (
    <div className="admin-layout-container">
      <ScrollToTop />
      <Sidebar />
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
}
