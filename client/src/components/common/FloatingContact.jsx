import React from 'react';
import { FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingContact = () => {
  return (
    <div className="floating-contact">
      <a 
        href="https://wa.me/919999999999" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-btn whatsapp" 
        aria-label="WhatsApp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <a 
        href="tel:+919999999999" 
        className="floating-btn phone" 
        aria-label="Phone"
        title="Call Us"
      >
        <FiPhone />
      </a>
      <a 
        href="mailto:hello@forallaxis.com" 
        className="floating-btn email" 
        aria-label="Email"
        title="Email Us"
      >
        <FiMail />
      </a>
    </div>
  );
};

export default FloatingContact;
