import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { FiMonitor, FiPenTool, FiSmartphone, FiArrowUpRight, FiCpu, FiVideo } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import tallImg from '../../assets/images/about-tall.jpg';
import squareImg from '../../assets/images/about-square.jpg';

const AboutPreview = () => {
  const boxRef = useRef(null);
  const isInView = useInView(boxRef, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, 100, { 
        duration: 2, 
        ease: "easeOut",
        delay: 0.5
      });
      return animation.stop;
    }
  }, [isInView, count]);

  const servicesList = [
    {
      id: 1,
      title: 'Web & App Development',
      desc: 'We build fast, responsive websites and powerful mobile applications tailored to your business needs.',
      icon: <FiMonitor />
    },
    {
      id: 2,
      title: 'AI Automation',
      desc: 'Streamline your workflows and boost efficiency with our cutting-edge AI-driven automation solutions.',
      icon: <FiCpu />
    },
    {
      id: 3,
      title: 'Graphic & Logo Design',
      desc: 'Crafting stunning visual identities and graphics that make your brand stand out in a crowded market.',
      icon: <FiPenTool />
    },
    {
      id: 4,
      title: 'Video Editing',
      desc: 'Transform raw footage into captivating, professional videos that tell your unique brand story.',
      icon: <FiVideo />
    }
  ];

  return (
    <section className="about-preview section">
      <div className="container">
        
        {/* Header Section */}
        <div className="about-header">
          <div className="about-title-wrapper">
            <span className="about-bg-text">ABOUT US</span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="about-title"
            >
              Build Your Brand On A Solid Foundation
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="about-desc"
          >
            As a premier <strong>software development lab</strong>, we engineer scalable, high-performance digital solutions tailored to your unique business needs. Driven by modern technologies and innovative problem-solving, our team of expert developers and designers set the benchmark for robust architecture, flawless user experiences, and sustainable digital growth.
          </motion.p>
        </div>

        <div className="about-grid">
          {/* Left Collage */}
          <div className="about-collage">
            <motion.div 
              className="collage-item collage-tall"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src={tallImg} alt="Our Team" />
            </motion.div>
            
            <div className="collage-right-col">
              <motion.div 
                className="collage-item collage-square"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img src={squareImg} alt="Digital Growth" />
              </motion.div>
              
              <motion.div 
                ref={boxRef}
                className="collage-item collage-box"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="box-content">
                  <motion.div 
                    className="box-number"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <motion.span>{rounded}</motion.span><span>%</span>
                  </motion.div>
                  <motion.span 
                    className="box-text"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    Client Satisfaction
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Timeline */}
          <div className="about-timeline-wrapper">
            <div className="about-timeline">
              {servicesList.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className="timeline-item"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="timeline-icon">
                    {item.icon}
                  </div>
                  <div className="timeline-content">
                    <h4 className="timeline-title">{item.title}</h4>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="about-action"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <NavLink to="/about" className="btn btn-primary">
                Learn More <FiArrowUpRight className="icon" />
              </NavLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
