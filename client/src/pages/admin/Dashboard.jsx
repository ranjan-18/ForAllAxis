import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiLayers, FiFileText, FiMessageSquare, FiUsers, FiStar, FiTrendingUp } from 'react-icons/fi';
import { projectService, serviceService, applicationService, contactService, careerService, teamService, testimonialService } from '../../services';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0, services: 0, applications: 0, contacts: 0, careers: 0, team: 0, testimonials: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, servRes, appRes, contRes, carRes, teamRes, testRes] = await Promise.all([
          projectService.getAll(),
          serviceService.getAll(),
          applicationService.getAll(),
          contactService.getAll(),
          careerService.getAll(),
          teamService.getAll(),
          testimonialService.getAll()
        ]);

        setStats({
          projects: projRes.data?.data?.length || 0,
          services: servRes.data?.data?.length || 0,
          applications: appRes.data?.data?.length || 0,
          contacts: contRes.data?.data?.length || 0,
          careers: carRes.data?.data?.length || 0,
          team: teamRes.data?.data?.length || 0,
          testimonials: testRes.data?.data?.length || 0,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Projects', value: stats.projects, icon: <FiBriefcase />, link: '/admin/projects', color: '#3b82f6' },
    { label: 'Active Services', value: stats.services, icon: <FiLayers />, link: '/admin/services', color: '#10b981' },
    { label: 'Job Applications', value: stats.applications, icon: <FiFileText />, link: '/admin/applications', color: '#f59e0b' },
    { label: 'Unread Messages', value: stats.contacts, icon: <FiMessageSquare />, link: '/admin/contacts', color: '#ef4444' },
    { label: 'Open Positions', value: stats.careers, icon: <FiTrendingUp />, link: '/admin/careers', color: '#8b5cf6' },
    { label: 'Team Members', value: stats.team, icon: <FiUsers />, link: '/admin/team', color: '#ec4899' },
    { label: 'Client Reviews', value: stats.testimonials, icon: <FiStar />, link: '/admin/testimonials', color: '#06b6d4' }
  ];

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading overview...</div>;
  }

  return (
    <div>
      <div style={{ 
        marginBottom: '3rem', 
        padding: '2.5rem', 
        borderRadius: '1.5rem', 
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(153, 27, 27, 0.95))', 
        color: '#fff',
        boxShadow: '0 20px 40px -10px rgba(239, 68, 68, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background shapes */}
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '250px', height: '250px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-50px', right: '150px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(20px)' }} />
        
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em', color: '#fff' }}>Welcome back, Admin! 👋</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', lineHeight: 1.6, margin: 0 }}>
              Here's what's happening across ForAllAxis today. Monitor your projects, manage services, and track all incoming leads in one centralized hub.
            </p>
          </div>
          <div style={{ padding: '1rem 2rem', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, opacity: 0.9 }}>System Status</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' }} /> All Systems Go
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-3" style={{ gap: '1.5rem' }}>
        {cards.map((card, idx) => (
          <Link key={idx} to={card.link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              background: 'var(--bg-card)', 
              borderRadius: '1rem', 
              padding: '1.5rem',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.05)';
              e.currentTarget.style.borderColor = card.color;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ 
                  background: `${card.color}15`, 
                  color: card.color, 
                  padding: '1rem', 
                  borderRadius: '0.75rem', 
                  fontSize: '1.5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {card.icon}
                </div>
              </div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>{card.value}</h3>
              <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{card.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
