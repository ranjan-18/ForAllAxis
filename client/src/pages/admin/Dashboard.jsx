import React from 'react';
import DashboardCard from '../../components/admin/DashboardCard';

export default function Dashboard() {
  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Dashboard Overview</h2>
      <div className="grid grid-3">
        <DashboardCard label="Total Projects" value="24" />
        <DashboardCard label="Blog Posts" value="12" />
        <DashboardCard label="Contacts" value="5" />
      </div>
    </div>
  );
}
