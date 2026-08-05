import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiAward, FiUsers, FiClock, FiSmile } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import heroBg from '../../assets/images/hero-bg.jpg';

const Hero = () => {
  const stats = [
    { label: 'Projects Delivered', value: '150+', icon: <FiAward /> },
    { label: 'Client Satisfaction', value: '98%', icon: <FiSmile /> },
    { label: 'Years Experience', value: '5+', icon: <FiClock /> },
    { label: 'Happy Clients', value: '50+', icon: <FiUsers /> },
  ];

  // Generate random particles that float upwards
  const particles = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    tx: `${(Math.random() - 0.5) * 400}px`,
    ty: `${(Math.random() - 0.5) * 400 - 200}px`, // float upwards generally
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2
  })), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-glow"></div>
        {/* Animated Particles */}
        <div className="hero-particles">
          {particles.map((p) => (
            <div 
              key={p.id} 
              className="splash-particle" 
              style={{
                position: 'absolute',
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                borderRadius: '50%',
                background: '#e11d48',
                boxShadow: '0 0 8px rgba(225, 29, 72, 0.8)',
                '--tx': p.tx,
                '--ty': p.ty,
                animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <span className="badge-icon">🚀</span>
            <span className="badge-text">The Best Digital Agency In India</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            We Don't Just Build Websites — We Build <span className="text-red-italic">Empires</span>
          </motion.h1>

          <motion.div className="hero-line" variants={itemVariants}></motion.div>

          <motion.p className="hero-description" variants={itemVariants}>
            We specialize in crafting stunning digital experiences, automating your business with AI, and delivering creative solutions that drive real results.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <NavLink to="/contact" className="btn btn-primary btn-lg">
              Grow My Business <FiArrowUpRight className="icon" />
            </NavLink>
            <NavLink to="/services" className="btn btn-secondary btn-lg">
              Our Services
            </NavLink>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="hero-stat">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Floating social icons */}
      <div className="hero-floating-socials">
        <a href="#" className="floating-social-icon" aria-label="WhatsApp">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
        <a href="#" className="floating-social-icon" aria-label="Phone">
          <i className="fa-solid fa-phone"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
