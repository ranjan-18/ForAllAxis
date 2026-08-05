import React from 'react';
import SectionHeading from '../../components/common/SectionHeading';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Contact() {
  return (
    <div className="section-pad container">
      <SectionHeading subtitle="Get In Touch" title="Contact Us" />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Input label="Name" placeholder="Your Name" />
        <Input label="Email" type="email" placeholder="Your Email" />
        <Input label="Message" textarea placeholder="How can we help?" />
        <Button fullWidth>Send Message</Button>
      </div>
    </div>
  );
}
