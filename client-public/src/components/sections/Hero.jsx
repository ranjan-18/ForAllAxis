import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiAward, FiUsers, FiClock, FiSmile } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import heroBg from '../../assets/images/hero-bg.jpg';

const Hero = () => {
 

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <span className="badge-text">Premium Digital Lab</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Elevating Your <span style={{ color: '#e11d48' }}>Digital</span> Presence
          </motion.h1>

          <motion.div className="hero-line" variants={itemVariants}></motion.div>

          <motion.p className="hero-description" variants={itemVariants}>
            We specialize in crafting elegant digital experiences and intelligent solutions that drive measurable results for forward-thinking brands.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <NavLink to="/contact" className="btn btn-primary btn-lg">
              Start Project <FiArrowUpRight className="icon" />
            </NavLink>
            <NavLink to="/services" className="btn btn-secondary btn-lg">
              Our Services
            </NavLink>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
       
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
