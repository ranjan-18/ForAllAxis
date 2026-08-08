import React from 'react';
import { FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { COMPANY_INFO } from '../../utils/constants';

const FloatingContact = () => {
  return (
    <div className="floating-contact">
      <a 
        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(COMPANY_INFO.whatsappMsg)}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-btn whatsapp" 
        aria-label="WhatsApp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <a 
        href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`} 
        className="floating-btn phone" 
        aria-label="Phone"
        title="Call Us"
      >
        <FiPhone />
      </a>
      <a 
        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${COMPANY_INFO.email}`} 
        target="_blank"
        rel="noopener noreferrer"
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
