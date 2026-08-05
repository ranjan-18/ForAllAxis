import React from 'react';
import DataTable from '../../components/admin/DataTable';

export default function ContactSubmissions() {
  return <div><h2>Contact Submissions</h2><DataTable headers={['Name', 'Email', 'Actions']} rows={[['Test', 'test@test.com', 'View']]} /></div>;
}
