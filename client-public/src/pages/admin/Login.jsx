import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiActivity, FiTrendingUp, FiShield, FiBell } from 'react-icons/fi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login({ email, password });
      navigate('/admin'); // Redirect to dashboard on success
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="login-grid">
      <Helmet>
        <title>Admin Login | ForallAxis Agency</title>
        <meta name="description" content="Secure administrative login portal for ForallAxis Agency dashboard control panel." />
      </Helmet>

      {/* Left Column: Hero Showcase */}
      <div className="login-hero">
        <div className="login-hero-glow"></div>
        
        {/* Header Branding */}
        <div className="login-hero-header">
          <img src={logo} alt="ForallAxis Logo" style={{ height: '36px' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '1px' }}>
            For<span style={{ color: 'var(--accent-red)' }}>all</span>Axis
          </span>
        </div>

        {/* Hero Visual Middle */}
        <div className="login-hero-content">
          <h1 className="login-hero-title">
            The Engine Behind Creative Excellence.
          </h1>
          <p className="login-hero-subtitle">
            Welcome to the ForallAxis Admin Portal. Manage services, display portfolios, configure testimonials, and review project inquiries in real-time.
          </p>

          {/* Stats Badges */}
          <div className="login-stats-grid">
            <div className="login-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--accent-red)', fontSize: '1.25rem', display: 'flex' }}><FiActivity /></span>
                <span className="login-stat-label">System Health</span>
              </div>
              <div className="login-stat-number">99.9% Uptime</div>
            </div>

            <div className="login-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--accent-red)', fontSize: '1.25rem', display: 'flex' }}><FiTrendingUp /></span>
                <span className="login-stat-label">Projects Tracked</span>
              </div>
              <div className="login-stat-number">50+ Active</div>
            </div>

            <div className="login-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--accent-red)', fontSize: '1.25rem', display: 'flex' }}><FiShield /></span>
                <span className="login-stat-label">Security Protocol</span>
              </div>
              <div className="login-stat-number">AES-256 SSL</div>
            </div>

            <div className="login-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--accent-red)', fontSize: '1.25rem', display: 'flex' }}><FiBell /></span>
                <span className="login-stat-label">Live Inquiries</span>
              </div>
              <div className="login-stat-number">Instant Alerts</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="login-hero-footer">
          <span>&copy; {new Date().getFullYear()} ForallAxis. All rights reserved.</span>
          <span>v2.1.0</span>
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="login-form-container">
        <motion.div 
          className="login-card-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="login-header-form" variants={itemVariants}>
            <h2 className="login-title-form" id="login-heading">Admin Sign In</h2>
            <p className="login-subtitle-form">Access your administrative workspace console.</p>
          </motion.div>

          {/* Form Card */}
          <motion.div variants={itemVariants}>
            <Card className="glass-login" padding="2.5rem">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ 
                    padding: '0.875rem 1rem', 
                    marginBottom: '1.5rem', 
                    backgroundColor: 'rgba(225, 29, 72, 0.08)', 
                    color: 'var(--accent-red)', 
                    borderRadius: 'var(--border-radius-md)', 
                    border: '1px solid rgba(225, 29, 72, 0.2)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  id="login-error-alert"
                >
                  <span>⚠️</span> {error}
                </motion.div>
              )}

              <form onSubmit={handleLogin} aria-labelledby="login-heading">
                <motion.div variants={itemVariants}>
                  <Input 
                    label="Email Address" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    id="admin-email"
                    placeholder="name@forallaxis.com"
                    autoComplete="email"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Input 
                    label="Password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    id="admin-password"
                    placeholder="••••••••"
                    showPasswordToggle={true}
                    autoComplete="current-password"
                  />
                </motion.div>

                <motion.div className="login-form-options" variants={itemVariants}>
                  <label className="login-checkbox-label" htmlFor="remember-me">
                    <input type="checkbox" id="remember-me" className="login-checkbox" />
                    Remember this device
                  </label>
                  <a 
                    href="#forgot" 
                    className="login-forgot-link" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      alert("Please contact the primary system administrator or security officer to request a password reset/credentials change."); 
                    }}
                    id="forgot-password-link"
                  >
                    Forgot Password?
                  </a>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    fullWidth 
                    className="login-btn-pulse"
                    disabled={loading}
                    id="submit-login-btn"
                  >
                    {loading ? 'Authenticating Workspace...' : 'Secure Sign In'}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>

          <motion.p className="login-footer-help" variants={itemVariants}>
            Looking for public site? <a href="/">Go to Home</a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
