import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiFolder, FiHeart, FiClock, FiUsers } from 'react-icons/fi';

const StatCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function: easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Stats = () => {
  const stats = [
    { value: 150, suffix: '+', label: 'Projects Delivered', icon: <FiFolder /> },
    { value: 98, suffix: '%', label: 'Client Satisfaction', icon: <FiHeart /> },
    { value: 5, suffix: '+', label: 'Years Experience', icon: <FiClock /> },
    { value: 50, suffix: '+', label: 'Happy Clients', icon: <FiUsers /> },
  ];

  return (
    <section className="stats-section gradient-red">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="stat-icon-wrapper">{stat.icon}</div>
              <h2 className="stat-value">
                <StatCounter end={stat.value} suffix={stat.suffix} />
              </h2>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
