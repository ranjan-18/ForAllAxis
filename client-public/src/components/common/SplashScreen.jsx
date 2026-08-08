import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/images/logo.png';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Background Accent */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(225, 29, 72, 0.05) 0%, rgba(255,255,255,0) 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1
            }}
          />

          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ width: '100px', height: '100px', position: 'relative', zIndex: 10, marginBottom: '1rem' }}
          >
            <img src={logo} alt="ForallAxis Logo" style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }} />
          </motion.div>

          {/* Staggered Text Reveal */}
          <div style={{ display: 'flex', overflow: 'hidden', zIndex: 10 }}>
            {['F','o','r','a','l','l'].map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + (i * 0.05), ease: "easeOut" }}
                style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.02em' }}
              >
                {letter}
              </motion.span>
            ))}
            {['A','x','i','s'].map((letter, i) => (
              <motion.span
                key={`red-${i}`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + (i * 0.05), ease: "easeOut" }}
                style={{ fontSize: '2rem', fontWeight: 800, color: '#e11d48', letterSpacing: '0.02em' }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Expanding Line Accent */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 120, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeInOut" }}
            style={{
              height: '2px',
              background: '#e11d48',
              marginTop: '1rem',
              borderRadius: '2px',
              zIndex: 10
            }}
          />

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
            style={{
              marginTop: '1.25rem',
              fontSize: '0.85rem',
              color: '#64748b',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: 600,
              zIndex: 10
            }}
          >
            Digital Excellence
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
