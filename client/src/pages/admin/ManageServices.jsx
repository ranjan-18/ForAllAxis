import React from 'react';
import DataTable from '../../components/admin/DataTable';

export default function ManageServices() {
  return <div><h2>Manage Services</h2><DataTable headers={['Title', 'Actions']} rows={[['Web Dev', 'Edit']]} /></div>;
}
