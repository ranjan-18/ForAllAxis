import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function RichTextEditor({ value, onChange }) {
  return (
    <div style={{ background: '#fff', color: '#000', borderRadius: '0.5rem', overflow: 'hidden' }}>
      <ReactQuill theme="snow" value={value} onChange={onChange} style={{ height: '300px' }} />
    </div>
  );
}
