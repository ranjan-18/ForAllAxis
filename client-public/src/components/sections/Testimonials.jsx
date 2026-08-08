import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import { testimonialService  } from '../../services';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    testimonialService.getAll()
      .then(res => {
        const data = res.data.data.map(t => ({
          ...t,
          name: t.clientName,
          title: t.clientTitle,
          text: t.content,
          avatar: t.image || 'https://i.pravatar.cc/150'
        }));
        setTestimonials(data);
      })
      .catch(console.error);
  }, []);

  // Auto-advance logic
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials]);

  // For a 3-card view
  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];
    if (testimonials.length <= 3) return testimonials;
    
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(activeIndex + i) % testimonials.length]);
    }
    return items;
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="testimonials-section section-padding" style={{ background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Background Elements */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '300px', height: '300px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '50%', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '50%', filter: 'blur(100px)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          subtitle="Client Success Stories"
          title="Don't Just Take Our Word For It"
          description="Read how we have transformed businesses, accelerated growth, and delivered outstanding digital solutions to our partners worldwide."
          align="center"
          light={false}
        />

        <div style={{ marginTop: '4rem', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((testimonial, i) => (
                <motion.div
                  key={`${testimonial._id}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(239, 68, 68, 0.1)',
                    borderRadius: '1.5rem',
                    padding: '2.5rem',
                    boxShadow: '0 10px 40px -10px rgba(239, 68, 68, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                  }}
                >
                  <FaQuoteLeft style={{ position: 'absolute', top: '2rem', right: '2rem', fontSize: '3rem', color: 'rgba(239, 68, 68, 0.05)' }} />
                  
                  <div style={{ display: 'flex', gap: '0.25rem', color: '#f59e0b', marginBottom: '1.5rem' }}>
                    {[...Array(testimonial.rating || 5)].map((_, idx) => (
                      <FaStar key={idx} />
                    ))}
                  </div>
                  
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic', flex: 1, marginBottom: '2rem' }}>
                    "{testimonial.text}"
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(239, 68, 68, 0.2)' }}>
                      <img src={testimonial.avatar} alt={testimonial.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{testimonial.name}</h4>
                      <span style={{ color: 'var(--accent-red)', fontSize: '0.875rem', fontWeight: 600 }}>
                        {testimonial.title}, {testimonial.company}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {testimonials.length > 3 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '3rem' }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    width: index === activeIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: index === activeIndex ? 'var(--accent-red)' : 'rgba(239, 68, 68, 0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
