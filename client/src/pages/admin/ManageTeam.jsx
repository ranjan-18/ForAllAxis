import React from 'react';
import DataTable from '../../components/admin/DataTable';

export default function ManageTeam() {
  return <div><h2>Manage Team</h2><DataTable headers={['Name', 'Role', 'Actions']} rows={[['Jane Doe', 'CEO', 'Edit']]} /></div>;
}
