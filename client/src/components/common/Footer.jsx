import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiArrowUp } from 'react-icons/fi';
import { FaInstagram, FaLinkedinIn, FaTwitter, FaFacebookF } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';
import { COMPANY_INFO, NAV_LINKS, SERVICES } from '../../utils/constants';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="ForAllAxis Logo" />
              <span>For<span className="text-red-500">All</span>Axis</span>
            </Link>
            <p className="footer-tagline">{COMPANY_INFO.tagline}</p>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="#" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className="social-icon" aria-label="Facebook"><FaFacebookF /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links">
            <h4 className="footer-title">Quick Links</h4>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-links">
            <h4 className="footer-title">Our Services</h4>
            <ul>
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link to={`/services#${service.slug}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-contact">
            <h4 className="footer-title">Contact Us</h4>
            <ul>
              <li>
                <FiMail className="contact-icon" />
                <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
              </li>
              <li>
                <FiPhone className="contact-icon" />
                <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
              </li>
              <li>
                <FiMapPin className="contact-icon" />
                <span>{COMPANY_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved.
          </p>
          <p className="designed-by">
            Designed with <span className="text-red-500">❤️</span> by ForAllAxis
          </p>
        </div>
      </div>

      <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
        <FiArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
