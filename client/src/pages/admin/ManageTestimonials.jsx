import React from 'react';
import DataTable from '../../components/admin/DataTable';

export default function ManageTestimonials() {
  return <div><h2>Manage Testimonials</h2><DataTable headers={['Client', 'Actions']} rows={[['John Doe', 'Edit']]} /></div>;
}
