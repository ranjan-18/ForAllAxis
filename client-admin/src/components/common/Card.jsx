import React from 'react';

export default function Card({ children, className = '', hoverable = false, padding = '2rem', ...props }) {
  return (
    <div className={`glass ${className}`} style={{
      padding, borderRadius: '1rem', transition: 'transform 0.3s, border-color 0.3s',
      cursor: hoverable ? 'pointer' : 'default',
    }} {...props}
    onMouseEnter={(e) => hoverable && (e.currentTarget.style.transform = 'translateY(-5px)')}
    onMouseLeave={(e) => hoverable && (e.currentTarget.style.transform = 'translateY(0)')}>
      {children}
    </div>
  );
}
