import React from 'react';
import Card from '../common/Card';

export default function DashboardCard({ label, value }) {
  return (
    <Card>
      <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{label}</h4>
      <div style={{ fontSize: '2rem', fontWeight: 700 }}>{value}</div>
    </Card>
  );
}
