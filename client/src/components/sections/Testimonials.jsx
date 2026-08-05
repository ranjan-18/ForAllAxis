import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "CEO",
    company: "TechNova",
    text: "ForAllAxis transformed our digital presence. The new website is not only stunning but has increased our conversion rate by 40%. Their team is professional and highly skilled.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Marketing Director",
    company: "GlobalReach",
    text: "The AI automation solutions provided by ForAllAxis have saved our team countless hours. We're now working smarter, not harder. A game changer for our business operations.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    id: 3,
    name: "Emma Davis",
    title: "Founder",
    company: "Lumina Designs",
    text: "Incredible attention to detail! The graphic design and branding package gave us exactly the premium look we were aiming for. Highly recommended digital agency.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=emma"
  },
  {
    id: 4,
    name: "David Smith",
    title: "Operations Manager",
    company: "LogistiCorp",
    text: "The custom app development exceeded our expectations. It's user-friendly, robust, and exactly what our field team needed to stay connected and productive.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=david"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // For a 3-card view, we compute the visible items
  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(TESTIMONIALS_DATA[(activeIndex + i) % TESTIMONIALS_DATA.length]);
    }
    return items;
  };

  return (
    <section className="testimonials-section section-padding bg-dark">
      <div className="container">
        <SectionHeading
          subtitle="What Our Clients Say"
          title="Don't Just Take Our Word For It"
          description="Read success stories from businesses that partnered with ForAllAxis to accelerate their growth."
          align="center"
          light={true}
        />

        <div className="testimonials-carousel">
          <div className="testimonials-grid">
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((testimonial, i) => (
                <motion.div
                  key={`${testimonial.id}-${i}`}
                  className="testimonial-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="quote-icon">
                    <FaQuoteLeft />
                  </div>
                  <div className="testimonial-stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.title}, {testimonial.company}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="carousel-dots">
            {TESTIMONIALS_DATA.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
