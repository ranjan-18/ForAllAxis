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

        <motion.div 
          className="welcome-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="welcome-subtitle">Welcome To</p>
          <h2 className="welcome-title">FORALLAXIS</h2>
          
          <p className="welcome-description">
            <strong>ForAllAxis</strong> is a next-generation software development lab engineered for the modern digital era. We partner with ambitious brands to transform bold ideas into scalable, high-performance applications. Unburdened by legacy thinking, our agile team leverages cutting-edge technologies—from bespoke Web Development to advanced AI Automation—to deliver rapid, precision-crafted solutions that drive exponential growth and put your business lightyears ahead of the competition.
          </p>
        </motion.div>
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
