import React, { useState } from 'react';
import SectionHeading from '../../components/common/SectionHeading';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { contactService } from '../../services';
import toast from 'react-hot-toast';

export default function StartProject() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Web Development',
    budget: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please fill in all required fields', { position: 'top-center' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address', { position: 'top-center' });
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Phone number must be exactly 10 digits', { position: 'top-center' });
      return;
    }

    if (formData.message.trim().length < 10) {
      toast.error('Please provide a bit more detail about your project (at least 10 characters)', { position: 'top-center' });
      return;
    }
    
    setLoading(true);
    try {
      // Concatenate the project details into the message for the backend
      const formattedMessage = `Project Type: ${formData.projectType}\nBudget Range: ${formData.budget}\n\nProject Details:\n${formData.message}`;
      
      const payload = { 
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formattedMessage,
        subject: `New Project Inquiry: ${formData.projectType}` 
      };
      
      await contactService.submit(payload);
      toast.success('Your project inquiry has been submitted successfully!', { position: 'top-center', duration: 4000 });
      setFormData({ name: '', email: '', phone: '', projectType: 'Web Development', budget: '', message: '' });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to submit inquiry', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: value });
  };

  return (
    <div className="section-pad container" style={{ paddingTop: '8rem' }}>
      <SectionHeading subtitle="Let's Build Something Great" title="Start a Project" />
      <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
        Fill out the form below to tell us about your project requirements. Our team will review your details and get back to you within 24 hours to schedule a discovery call.
      </p>

      <div className="card glass-dark" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--accent-red)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>Your Information</h3>
            <div className="grid grid-2" style={{ gap: '1.5rem' }}>
              <Input 
                label="Full Name *" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <Input 
                label="Email Address *" 
                type="email" 
                placeholder="john@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <Input 
                label="Phone Number (10 Digits) *" 
                type="tel" 
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handlePhoneChange}
                maxLength="10"
              />
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--accent-red)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>Project Details</h3>
            <div className="grid grid-2" style={{ gap: '1.5rem' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>What do you need help with? *</label>
                <select className="input-field" value={formData.projectType} onChange={e => setFormData({...formData, projectType: e.target.value})}>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="Branding & Logo Design">Branding & Logo Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <Input 
                label="Estimated Budget (₹ INR) *" 
                type="number" 
                placeholder="e.g. 50000" 
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                min="0"
              />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <Input 
                label="Project Description *" 
                textarea 
                placeholder="Tell us about your project goals, features you need, timeline, and any specific requirements..." 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                style={{ minHeight: '150px' }}
              />
            </div>
          </div>

          <Button type="submit" size="lg" disabled={loading} style={{ marginTop: '1rem', padding: '1.25rem' }}>
            {loading ? 'Submitting Inquiry...' : 'Submit Project Inquiry'}
          </Button>
        </form>
      </div>
    </div>
  );
}
