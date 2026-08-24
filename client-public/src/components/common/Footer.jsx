import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaInstagram, FaLinkedinIn, FaTwitter, FaFacebookF } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';
import { COMPANY_INFO, NAV_LINKS, SOCIAL_LINKS } from '../../utils/constants';
import { serviceService } from '../../services';

const Footer = () => {
  const [dynamicServices, setDynamicServices] = useState([]);

  useEffect(() => {
    serviceService.getAll()
      .then(res => {
        const data = res.data?.data || res.data || [];
        const servicesArray = Array.isArray(data) ? data : [];
        setDynamicServices(servicesArray.filter(s => s.isActive !== false));
      })
      .catch(console.error);
  }, []);

  return (
    <footer className="footer-target">
      <div className="footer-top">
        <div className="container">
          <div className="footer-target-grid">
            {/* Column 1: Quick Links */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Our Services */}
            <div className="footer-col">
              <h4>Our Services</h4>
              <ul>
                {dynamicServices.map((service) => (
                  <li key={service.slug}>
                    <Link to={`/services#${service.slug}`}>{service.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Us */}
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul>
                <li>
                  <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${COMPANY_INFO.email}`} target="_blank" rel="noopener noreferrer">
                    <span className="store-icon"><FiMail /></span> {COMPANY_INFO.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}>
                    <span className="store-icon"><FiPhone /></span> {COMPANY_INFO.phone}
                  </a>
                </li>
                <li>
                  <span style={{ display: 'flex', alignItems: 'flex-start', color: '#333', fontSize: '0.85rem' }}>
                    <span className="store-icon"><FiMapPin /></span> {COMPANY_INFO.address}
                  </span>
                </li>
              </ul>
            </div>
            
            {/* Column 4: Legal */}
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/cookie-policy">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skyline / Logo Area */}
        <div className="footer-skyline-area">
           <div className="skyline-logo">
             <img src={logo} alt="ForallAxis Logo" />
             <h3>{COMPANY_INFO.tagline}</h3>
           </div>
           <div className="skyline-illustration"></div>
        </div>
      </div>

      <div className="footer-bottom-dark">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-social-dark">
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href={SOCIAL_LINKS.twitter} aria-label="Twitter"><FaTwitter /></a>
            </div>
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <span>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved.</span>
              <span>Designed with ❤️ by {COMPANY_INFO.name}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
