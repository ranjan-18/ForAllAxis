import React from 'react';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/common/Button';

export default function ManageProjects() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2>Manage Projects</h2>
        <Button size="sm">Add Project</Button>
      </div>
      <DataTable headers={['Title', 'Category', 'Actions']} rows={[['Project Alpha', 'Web', 'Edit / Delete']]} />
    </div>
  );
}
