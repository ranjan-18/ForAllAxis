import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionHeading from '../../components/common/SectionHeading';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { contactService } from '../../services';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic presence validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please fill in all required fields', { position: 'top-center' });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address', { position: 'top-center' });
      return;
    }

    // Phone validation (exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Phone number must be exactly 10 digits', { position: 'top-center' });
      return;
    }

    // Message validation
    if (formData.message.trim().length < 10) {
      toast.error('Message must be at least 10 characters', { position: 'top-center' });
      return;
    }
    
    setLoading(true);
    try {
      const payload = { ...formData, subject: 'General Inquiry' };
      await contactService.submit(payload);
      toast.success('Message sent successfully!', { position: 'top-center' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to send message', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    // Only allow numbers and limit to 10 characters
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: value });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | ForallAxis</title>
        <meta name="description" content="Get in touch with ForallAxis. Send us a message or schedule a call to talk about your software development, design, or AI automation needs." />
        <meta property="og:title" content="Contact Us | ForallAxis" />
        <meta property="og:description" content="Get in touch with ForallAxis. Send us a message or schedule a call to talk about your software development, design, or AI automation needs." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="section-pad container" style={{ paddingTop: '8rem' }}>
        <SectionHeading subtitle="Get In Touch" title="Contact Us" />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2" style={{ gap: '1rem' }}>
            <Input 
              label="Name" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <Input 
              label="Contact No" 
              type="tel" 
              placeholder="10-digit Phone Number" 
              value={formData.phone}
              onChange={handlePhoneChange}
              maxLength="10"
            />
          </div>
          <Input 
            label="Email" 
            type="email" 
            placeholder="Your Email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <Input 
            label="Message" 
            textarea 
            placeholder="How can we help?" 
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </div>
    </>
  );
}
