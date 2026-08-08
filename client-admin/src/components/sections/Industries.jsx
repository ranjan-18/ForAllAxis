import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import { FiArrowRight } from 'react-icons/fi';

const industriesData = [
  {
    id: 'healthcare',
    title: 'Healthcare & MedTech',
    description: 'We build HIPAA-compliant platforms, telemedicine apps, and AI-driven diagnostic tools to revolutionize patient care.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop',
    icon: '🏥'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Retail',
    description: 'Scalable online stores, headless commerce solutions, and personalized shopping experiences that drive conversions.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop',
    icon: '🛍️'
  },
  {
    id: 'finance',
    title: 'Finance & FinTech',
    description: 'Secure payment gateways, blockchain integrations, and wealth management dashboards with enterprise-grade security.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
    icon: '📈'
  },
  {
    id: 'realestate',
    title: 'Real Estate & PropTech',
    description: 'Immersive 3D property tours, dynamic listing platforms, and CRM systems tailored for modern real estate agents.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop',
    icon: '🏢'
  },
  {
    id: 'tech',
    title: 'Technology & SaaS',
    description: 'Cloud-native SaaS applications, high-performance APIs, and AI integrations for forward-thinking tech companies.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
    icon: '🚀'
  },
  {
    id: 'education',
    title: 'Education & School ERP',
    description: 'Comprehensive school management systems, e-learning platforms, and student portals that streamline educational administration.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    icon: '🎓'
  }
];

const Industries = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="section-pad container">
      <SectionHeading 
        subtitle="Who We Serve" 
        title="Industries We Transform" 
        description="We deliver tailored, high-impact digital solutions across diverse sectors, empowering businesses to lead in their respective markets."
      />
      
      <motion.div 
        className="grid grid-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {industriesData.map((industry) => (
          <motion.div 
            key={industry.id} 
            className="industry-card"
            variants={itemVariants}
            style={{
              position: 'relative',
              borderRadius: 'var(--border-radius-lg)',
              overflow: 'hidden',
              height: '350px',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              const overlay = e.currentTarget.querySelector('.industry-overlay');
              const content = e.currentTarget.querySelector('.industry-content');
              const bg = e.currentTarget.querySelector('.industry-bg');
              const titleBox = e.currentTarget.querySelector('.industry-title-box');
              
              if(overlay) overlay.style.background = 'rgba(15, 23, 42, 0.5)';
              if(content) {
                content.style.transform = 'translateY(0)';
                content.style.opacity = '1';
              }
              if(bg) bg.style.transform = 'scale(1.1)';
              if(titleBox) {
                titleBox.style.transform = 'translateY(-20px)';
                titleBox.style.opacity = '0';
              }
            }}
            onMouseOut={(e) => {
              const overlay = e.currentTarget.querySelector('.industry-overlay');
              const content = e.currentTarget.querySelector('.industry-content');
              const bg = e.currentTarget.querySelector('.industry-bg');
              const titleBox = e.currentTarget.querySelector('.industry-title-box');
              
              if(overlay) overlay.style.background = 'rgba(15, 23, 42, 0)';
              if(content) {
                content.style.transform = 'translateY(20px)';
                content.style.opacity = '0';
              }
              if(bg) bg.style.transform = 'scale(1)';
              if(titleBox) {
                titleBox.style.transform = 'translateY(0)';
                titleBox.style.opacity = '1';
              }
            }}
          >
            {/* Background Image */}
            <div 
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${industry.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s ease'
              }}
              className="industry-bg"
            />
            
            {/* Gradient Overlay */}
            <div 
              className="industry-overlay"
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(15, 23, 42, 0)',
                transition: 'background 0.4s ease',
                backdropFilter: 'blur(1px)'
              }}
            />

            {/* Static Title Box (Top Left) */}
            <div
              className="industry-title-box"
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                zIndex: 2,
                transition: 'transform 0.4s ease, opacity 0.4s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'var(--accent-red)',
                padding: '0.5rem 1.25rem',
                borderRadius: '2rem',
                boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)',
                border: 'none'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{industry.icon}</span>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', margin: 0 }}>
                {industry.title}
              </h3>
            </div>

            {/* Hover Content (Bottom) */}
            <div 
              style={{
                position: 'absolute', inset: 0,
                padding: '2rem', display: 'flex', flexDirection: 'column',
                justifyContent: 'flex-end', zIndex: 2, color: '#fff'
              }}
            >
              <div 
                className="industry-content"
                style={{
                  transform: 'translateY(20px)',
                  transition: 'transform 0.4s ease, opacity 0.4s ease',
                  opacity: 0,
                  background: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(10px)',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{industry.icon}</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{industry.title}</h3>
                </div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                  {industry.description}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-red-light)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>
                  Learn More <FiArrowRight />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Industries;
