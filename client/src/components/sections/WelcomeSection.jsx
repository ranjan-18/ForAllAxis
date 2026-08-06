import React from 'react';
import { motion } from 'framer-motion';

const WelcomeSection = () => {
  // Array of placeholder partners/clients for the marquee
  const clients = [
    { name: 'Client 1', logo: 'BrandA' },
    { name: 'Client 2', logo: 'CompanyB' },
    { name: 'Client 3', logo: 'GlobalCorp' },
    { name: 'Client 4', logo: 'TechSolutions' },
    { name: 'Client 5', logo: 'InnovateInc' },
    { name: 'Client 6', logo: 'NextGen' },
    { name: 'Client 7', logo: 'AlphaGroup' },
    { name: 'Client 8', logo: 'OmegaLabs' },
  ];

  // Duplicate the array to create a seamless infinite scroll loop
  const marqueeClients = [...clients, ...clients];

  return (
    <section className="welcome-section section">
      <div className="container">
        
        {/* Scroll Mouse Icon */}
        <div className="scroll-indicator-wrapper">
          <div className="scroll-indicator">
            <div className="scroll-wheel"></div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <motion.div 
            className="welcome-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'left' }}
          >
            <p className="welcome-subtitle" style={{ color: 'var(--accent-red)', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>Welcome To</p>
            <h2 className="welcome-title" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--text-primary)', letterSpacing: '-1px' }}>FORALLAXIS</h2>
            
            <p className="welcome-description" style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              <strong>ForAllAxis</strong> is a next-generation software development lab engineered for the modern digital era. We partner with ambitious brands to transform bold ideas into scalable, high-performance applications. Unburdened by legacy thinking, our agile team leverages cutting-edge technologies—from bespoke Web Development to advanced AI Automation—to deliver rapid, precision-crafted solutions that drive exponential growth and put your business lightyears ahead of the competition.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            {/* Decorative background shape */}
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100%', height: '100%', background: 'linear-gradient(45deg, var(--accent-red), transparent)', borderRadius: '2rem', zIndex: 0, opacity: 0.15, filter: 'blur(40px)' }} />
            
            <div style={{ position: 'relative', zIndex: 1, borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '4px solid #fff' }}>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
                alt="ForAllAxis Team Collaboration" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.4), transparent)' }} />
            </div>
            
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              style={{ position: 'absolute', bottom: '-30px', left: '-30px', background: '#ffffff', padding: '1.25rem 1.75rem', borderRadius: '1.5rem', zIndex: 2, display: 'flex', alignItems: 'center', gap: '1.25rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)' }}
            >
              <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', boxShadow: '0 8px 16px rgba(220, 38, 38, 0.3)' }}>🚀</div>
              <div>
                <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.5rem', lineHeight: 1.2 }}>3+</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Years of Development Exp</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Infinite Logo Marquee */}
      <div className="marquee-container">
        <div className="marquee-content">
          {marqueeClients.map((client, index) => (
            <div key={index} className="marquee-item">
              <div className="marquee-logo-placeholder">
                {client.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
