import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiMenu, FiX, FiArrowUpRight, FiChevronDown } from 'react-icons/fi';
import logo from '../../assets/images/logo.png';
import { NAV_LINKS } from '../../utils/constants';
import { serviceService } from '../../services';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    serviceService.getAll()
      .then(res => {
        const data = res.data?.data || res.data || [];
        const servicesArray = Array.isArray(data) ? data : [];
        setServices(servicesArray.filter(s => s.isActive !== false));
      })
      .catch(console.error);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <NavLink to="/" className="navbar-logo">
          <img src={logo} alt="ForallAxis" />
          <span>For<span className="text-red">all</span>Axis</span>
        </NavLink>

        <nav className="nav-links desktop-only">
          {NAV_LINKS.map((link) => {
            if (link.name === 'Services') {
              return (
                <div 
                  key={link.name} 
                  className="nav-dropdown-container"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                  style={{ position: 'relative' }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {link.name} <FiChevronDown />
                  </NavLink>
                  {showDropdown && (
                    <div className="nav-dropdown glass-dark" style={{
                      position: 'absolute', top: '100%', left: 0,
                      background: 'var(--bg-card)', padding: '1rem',
                      borderRadius: '0.5rem', minWidth: '200px',
                      display: 'flex', flexDirection: 'column', gap: '0.5rem',
                      border: '1px solid var(--glass-border)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      zIndex: 100
                    }}>
                      {services.map(s => (
                        <Link 
                          key={s._id} 
                          to={`/services#${s.slug}`}
                          className="dropdown-link"
                          style={{
                            color: 'var(--text-primary)', textDecoration: 'none',
                            padding: '0.5rem', borderRadius: '0.25rem',
                            transition: 'background 0.2s', fontSize: '0.9rem'
                          }}
                          onMouseOver={(e) => e.target.style.color = 'var(--accent-red)'}
                          onMouseOut={(e) => e.target.style.color = 'var(--text-primary)'}
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="nav-cta desktop-only">
          <NavLink to="/start-project" className="btn btn-primary">
            Start a Project <FiArrowUpRight className="icon" />
          </NavLink>
        </div>

        <button className="hamburger mobile-only" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-container">
          {NAV_LINKS.map((link) => (
            <React.Fragment key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
              {link.name === 'Services' && (
                <div style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {services.map(s => (
                    <Link 
                      key={s._id}
                      to={`/services#${s.slug}`}
                      style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
          <NavLink to="/start-project" className="btn btn-primary mobile-cta" onClick={() => setIsMobileMenuOpen(false)}>
            Start a Project <FiArrowUpRight className="icon" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
