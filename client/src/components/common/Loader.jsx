import React from 'react';

export default function Loader({ fullPage }) {
  const spinner = <div style={{
    width: '40px', height: '40px', borderRadius: '50%',
    border: '3px solid var(--glass-border)', borderTopColor: 'var(--accent-blue)',
    animation: 'spin 1s linear infinite'
  }}></div>;

  if (fullPage) return <div className="flex-center" style={{ height: '100vh', width: '100vw', background: 'var(--bg-primary)' }}><style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>{spinner}</div>;
  return spinner;
}
