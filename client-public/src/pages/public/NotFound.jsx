import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function NotFound() {
  return (
    <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', textAlign: 'center' }}>
      <h1 className="gradient-text" style={{ fontSize: '5rem' }}>404</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Page not found.</p>
      <Link to="/"><Button>Back to Home</Button></Link>
    </div>
  );
}
