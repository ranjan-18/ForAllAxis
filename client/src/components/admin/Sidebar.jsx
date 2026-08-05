import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const links = ['Dashboard', 'Projects', 'Services', 'Testimonials', 'Blog', 'Team', 'Contacts'];
  return (
    <div className="glass-dark" style={{ width: '250px', height: '100vh', position: 'sticky', top: 0, padding: '2rem 1rem', borderRight: '1px solid var(--glass-border)' }}>
      <h2 className="gradient-text" style={{ marginBottom: '2rem', textAlign: 'center' }}>ForAllAxis</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map(l => {
          const path = l === 'Dashboard' ? '/admin' : `/admin/${l.toLowerCase()}`;
          return (
            <NavLink key={l} to={path} end={l === 'Dashboard'}
              style={({ isActive }) => ({
                padding: '0.75rem 1rem', borderRadius: '0.5rem',
                background: isActive ? 'var(--accent-blue)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-secondary)', transition: 'all 0.3s'
              })}>
              {l}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
