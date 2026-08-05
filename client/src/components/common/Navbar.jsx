import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import logo from '../../assets/images/logo.png';
import { NAV_LINKS } from '../../utils/constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <NavLink to="/" className="navbar-logo">
          <img src={logo} alt="ForAllAxis" />
          <span>For<span className="text-red">All</span>Axis</span>
        </NavLink>

        <nav className="nav-links desktop-only">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="nav-cta desktop-only">
          <NavLink to="/contact" className="btn btn-primary">
            Get Quote <FiArrowUpRight className="icon" />
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
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink to="/contact" className="btn btn-primary mobile-cta" onClick={() => setIsMobileMenuOpen(false)}>
            Get Quote <FiArrowUpRight className="icon" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
