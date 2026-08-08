import React from 'react';
import { Helmet } from 'react-helmet-async';
import ServicesSection from '../../components/sections/Services';

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Our Services | ForallAxis</title>
        <meta name="description" content="Explore our end-to-end services including Web Development, Mobile Apps, AI Automation, Graphic Design, Video Editing, and Logo Design." />
        <meta property="og:title" content="Our Services | ForallAxis" />
        <meta property="og:description" content="Explore our end-to-end services including Web Development, Mobile Apps, AI Automation, Graphic Design, Video Editing, and Logo Design." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div style={{ paddingTop: '8rem' }}>
        <ServicesSection />
      </div>
    </>
  );
}
