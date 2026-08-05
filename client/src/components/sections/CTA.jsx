import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { COMPANY_INFO } from '../../utils/constants';

const CTA = () => {
  return (
    <section className="cta-section gradient-red">
      {/* Background Particles */}
      <div className="cta-particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="container">
        <motion.div
          className="cta-content text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="cta-title">Ready to Transform Your Business?</h2>
          <p className="cta-desc">
            Let's build something extraordinary together. Get a free consultation today.
          </p>
          
          <div className="cta-actions">
            <NavLink to="/contact" className="btn btn-secondary cta-btn btn-lg">
              Start Your Project <FiArrowRight className="icon" />
            </NavLink>
          </div>
          
          <p className="cta-phone">
            Or call us at: <strong>{COMPANY_INFO.phone}</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
