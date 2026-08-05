import React from 'react';
import { motion } from 'framer-motion';
import { FiMonitor, FiCpu, FiPenTool, FiFilm, FiHexagon, FiSmartphone, FiArrowRight } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { SERVICES } from '../../utils/constants';

// Mapping string icons to react-icons
const IconMap = {
  FiMonitor: FiMonitor,
  FiCpu: FiCpu,
  FiPenTool: FiPenTool,
  FiFilm: FiFilm,
  FiHexagon: FiHexagon,
  FiSmartphone: FiSmartphone,
};

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="services-section section-padding bg-dark">
      <div className="container">
        <SectionHeading
          subtitle="What We Offer"
          title="Our Premium Services"
          description="We provide end-to-end digital solutions designed to elevate your brand, engage your audience, and drive business growth."
          align="center"
          light={true}
        />

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {SERVICES.map((service, index) => {
            const IconComponent = IconMap[service.icon];
            return (
              <motion.div key={index} className="service-card" variants={itemVariants}>
                <div className="service-icon">
                  {IconComponent && <IconComponent size={28} />}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.shortDesc}</p>
                <div className="service-arrow">
                  <FiArrowRight size={20} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
