import React from 'react';

export default function Input({ label, type = 'text', error, icon, textarea, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
      {label && <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {textarea ? (
          <textarea className="input-field" style={{ minHeight: '120px', resize: 'vertical' }} {...props} />
        ) : (
          <input type={type} className="input-field" {...props} />
        )}
      </div>
      {error && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{error}</span>}
    </div>
  );
}
