import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/images/logo.png';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    tx: `${(Math.random() - 0.5) * 400}px`,
    ty: `${(Math.random() - 0.5) * 400}px`,
    delay: Math.random() * 0.5,
    duration: Math.random() * 1.5 + 1
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Particles Background */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {particles.map((p) => (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  left: '50%',
                  top: '50%',
                  borderRadius: '50%',
                  background: '#e11d48',
                  boxShadow: '0 0 6px rgba(225, 29, 72, 0.6)',
                  '--tx': p.tx,
                  '--ty': p.ty,
                  animation: `particleFloat ${p.duration}s ease-out ${p.delay}s forwards`
                }}
              />
            ))}
          </div>

          {/* Glowing background behind logo */}
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(225, 29, 72, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'pulse 2s ease-in-out infinite alternate',
            pointerEvents: 'none',
          }} />

          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.3, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ width: '120px', height: '120px', position: 'relative', zIndex: 10 }}
          >
            <img src={logo} alt="ForAllAxis Logo" style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 30px rgba(225, 29, 72, 0.5))'
            }} />
          </motion.div>

          {/* Animated Text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            style={{
              marginTop: '1.5rem',
              fontSize: '1.8rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <span style={{ color: '#ffffff' }}>For</span>
            <span style={{ color: '#ffffff' }}>All</span>
            <span style={{
              background: 'linear-gradient(135deg, #e11d48, #ff0033)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Axis</span>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
            style={{
              marginTop: '0.75rem',
              fontSize: '0.85rem',
              color: '#71717a',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: 500,
              position: 'relative',
              zIndex: 10,
            }}
          >
            Innovate &middot; Create &middot; Dominate
          </motion.div>

          {/* Expanding Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.6, delay: 1.6, ease: 'easeOut' }}
            style={{
              height: '2px',
              background: 'linear-gradient(135deg, #e11d48, #ff0033)',
              marginTop: '1.5rem',
              borderRadius: '2px',
              position: 'relative',
              zIndex: 10,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
