import React from 'react';
import DataTable from '../../components/admin/DataTable';

export default function ManageBlog() {
  return <div><h2>Manage Blog</h2><DataTable headers={['Title', 'Date', 'Actions']} rows={[['React Guide', '2023', 'Edit']]} /></div>;
}
