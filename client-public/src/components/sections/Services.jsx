import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMonitor, FiCpu, FiPenTool, FiFilm, FiHexagon, FiSmartphone, FiArrowRight } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { serviceService  } from '../../services';

// Mapping string icons to react-icons
const IconMap = {
  FiMonitor: FiMonitor,
  FiCpu: FiCpu,
  FiPenTool: FiPenTool,
  FiFilm: FiFilm,
  FiHexagon: FiHexagon,
  FiSmartphone: FiSmartphone,
};

// Real Unsplash images mapped by common service titles
const imageMap = {
  'Web Development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
  'UI/UX Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
  'App Development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
  'Digital Marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  'SEO Optimization': 'https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=800&auto=format&fit=crop',
  'Cloud Solutions': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
  'Video Editing': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
  'AI Automation': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop'
};

const defaultImage = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop';

const Services = () => {
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    serviceService.getAll()
      .then(res => {
        const data = res.data?.data || res.data || [];
        const servicesArray = Array.isArray(data) ? data : [];
        setServices(servicesArray.filter(s => s.isActive !== false));
      })
      .catch(console.error);
  }, []);

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
    <section className="services-section section-padding ">
      <div className="container">
        <SectionHeading
          subtitle="What We Offer"
          title="Our Premium Services"
          description="We provide end-to-end digital solutions designed to elevate your brand, engage your audience, and drive business growth."
          align="center"
          light={false}
        />

        <motion.div
          className="services-grid grid grid-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'grid', gap: '2rem' }}
        >
          {services.map((service, index) => {
            const IconComponent = IconMap[service.icon] || FiHexagon;
            const rawImageUrl = service.image || imageMap[service.title] || defaultImage;
            const imageUrl = rawImageUrl.replace('http://', 'https://');
            
            return (
              <motion.div 
                key={service._id || index} 
                className="service-card glass-dark" 
                variants={itemVariants}
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  const img = e.currentTarget.querySelector('.service-img');
                  if(img) img.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  const img = e.currentTarget.querySelector('.service-img');
                  if(img) img.style.transform = 'scale(1)';
                }}
              >
                {/* Image Section */}
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <div 
                    className="service-img"
                    style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(15,23,42,1), transparent)'
                  }} />
                  <div className="service-icon" style={{
                    position: 'absolute', bottom: '1rem', left: '1.5rem',
                    background: 'var(--accent-red)', color: '#fff',
                    padding: '0.75rem', borderRadius: '0.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(239,68,68,0.4)'
                  }}>
                    <IconComponent size={24} />
                  </div>
                </div>

                {/* Content Section */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 className="service-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#000000' }}>
                    {service.title}
                  </h3>
                  <p className="service-desc" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>
                    {service.shortDescription}
                  </p>
                  <a 
                    href={`/services#${service.title.toLowerCase().replace(/ /g, '-')}`}
                    style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-red-light)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', textDecoration: 'none' }}
                  >
                    Explore Service <FiArrowRight />
                  </a>
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
