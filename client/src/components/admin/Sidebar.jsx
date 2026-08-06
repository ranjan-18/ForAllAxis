import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiGrid, FiBriefcase, FiLayers, FiStar, FiUsers, FiFileText, FiMessageSquare, FiLogOut, FiFolder } from 'react-icons/fi';
import logo from '../../assets/images/logo.png';

export default function Sidebar() {
  const { logout } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FiGrid /> },
    { name: 'Projects', path: '/admin/projects', icon: <FiBriefcase /> },
    { name: 'Services', path: '/admin/services', icon: <FiLayers /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <FiStar /> },
    { name: 'Careers', path: '/admin/careers', icon: <FiBriefcase /> },
    { name: 'Applications', path: '/admin/applications', icon: <FiFileText /> },
    { name: 'Team', path: '/admin/team', icon: <FiUsers /> },
    { name: 'Contacts', path: '/admin/contacts', icon: <FiMessageSquare /> },
    { name: 'Project Inquiries', path: '/admin/project-inquiries', icon: <FiFolder /> },
  ];

  return (
    <div style={{ 
      width: '260px', height: '100vh', position: 'sticky', top: 0, 
      padding: '2rem 1.5rem', borderRight: '1px solid rgba(239, 68, 68, 0.1)', 
      background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column', zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', justifyContent: 'center' }}>
        <img src={logo} alt="ForAllAxis" style={{ height: '32px' }} />
        <span style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
          For<span style={{ color: 'var(--accent-red)' }}>All</span>Axis
        </span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map(item => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            end={item.name === 'Dashboard'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '0.875rem 1rem', borderRadius: '0.75rem',
              background: isActive ? 'var(--accent-red)' : 'transparent',
              color: isActive ? '#fff' : 'var(--text-secondary)', 
              fontWeight: isActive ? 600 : 500,
              transition: 'all 0.2s ease-in-out',
              boxShadow: isActive ? '0 10px 25px -5px rgba(239, 68, 68, 0.4)' : 'none'
            })}
          >
            <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        <button 
          onClick={logout} 
          style={{ 
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid rgba(239, 68, 68, 0.2)',
            background: 'rgba(239, 68, 68, 0.05)', color: 'var(--accent-red)', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'var(--accent-red)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)';
            e.currentTarget.style.color = 'var(--accent-red)';
          }}
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}
