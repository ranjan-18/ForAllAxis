import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Input({ label, type = 'text', error, icon, textarea, showPasswordToggle, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPasswordToggle && showPassword ? 'text' : type;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
      {label && <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {textarea ? (
          <textarea className="input-field" style={{ minHeight: '120px', resize: 'vertical' }} {...props} />
        ) : (
          <>
            <input 
              type={inputType} 
              className={`input-field ${error ? 'input-error' : ''}`} 
              {...props} 
              style={{ 
                paddingRight: showPasswordToggle && type === 'password' ? '2.5rem' : undefined, 
                ...props.style 
              }} 
            />
            {type === 'password' && showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  fontSize: '1.1rem',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-red)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            )}
          </>
        )}
      </div>
      {error && <span style={{ color: 'var(--accent-red)', fontSize: '0.75rem' }}>{error}</span>}
    </div>
  );
}
