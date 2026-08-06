import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPhoneCall } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { COMPANY_INFO } from '../../utils/constants';

const CTA = () => {
  return (
    <section style={{ position: 'relative', padding: '6rem 0', overflow: 'hidden', background: '#ffffff' }}>
      
      {/* Abstract Glowing Backgrounds */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '100%', zIndex: 0, overflow: 'hidden' }}>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '-50%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, rgba(239,68,68,0) 70%)', borderRadius: '50%', filter: 'blur(60px)' }}
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, rgba(220,38,38,0) 70%)', borderRadius: '50%', filter: 'blur(80px)' }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(239, 68, 68, 0.1)',
            borderRadius: '2rem',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative Top Line */}
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '30%', height: '4px', background: 'linear-gradient(90deg, transparent, var(--accent-red), transparent)' }} />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem 1.5rem', borderRadius: '2rem', color: 'var(--accent-red)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}
          >
            🚀 Let's Innovate
          </motion.div>

          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-1px' }}>
            Ready to Transform Your Business?
          </h2>
          
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
            Partner with us to build extraordinary digital solutions that drive real results. Get a free, no-obligation consultation today.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <NavLink 
              to="/contact" 
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                background: 'var(--accent-red)', color: '#ffffff',
                padding: '1.25rem 2.5rem', borderRadius: '3rem',
                fontSize: '1.125rem', fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(239, 68, 68, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(239, 68, 68, 0.3)';
              }}
            >
              Start Your Project <FiArrowRight size={20} />
            </NavLink>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiPhoneCall /> Or call us directly at: <strong style={{ color: 'var(--accent-red)', letterSpacing: '1px' }}>{COMPANY_INFO.phone}</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
