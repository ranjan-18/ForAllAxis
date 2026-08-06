import React from 'react';
import toast from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';

export const showConfirmToast = (message, onConfirm) => {
  toast((t) => (
    <div style={{ 
      background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(16px)',
      padding: '2rem', borderRadius: '1.25rem', border: '1px solid rgba(239, 68, 68, 0.3)', 
      boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.25)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
      maxWidth: '400px', width: '100%'
    }}>
      <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '50%' }}>
        <FiAlertTriangle size={32} color="#ef4444" />
      </div>
      <p style={{ fontWeight: 600, fontSize: '1.1rem', color: '#f8fafc', textAlign: 'center', margin: 0 }}>
        {message}
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}>
        <button 
          onClick={() => toast.dismiss(t.id)} 
          style={{ flex: 1, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          Cancel
        </button>
        <button 
          onClick={() => { toast.dismiss(t.id); onConfirm(); }} 
          style={{ flex: 1, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600, boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.39)', transition: 'all 0.2s' }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'none'}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  ), { duration: Infinity, position: 'top-center' });
};
