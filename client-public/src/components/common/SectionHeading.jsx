import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({
  subtitle,
  title,
  description,
  align = 'center', // 'left' or 'center'
  light = false, // for dark backgrounds
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const themeClass = light ? 'heading-light' : 'heading-dark';

  return (
    <motion.div
      className={`section-heading ${alignClass} ${themeClass}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      {subtitle && (
        <span className="section-subtitle">
          {subtitle}
        </span>
      )}
      
      <h2 className="section-title">
        {title}
      </h2>
      
      <div className={`section-line ${align === 'center' ? 'mx-auto' : ''}`}></div>
      
      {description && (
        <p className="section-description">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
