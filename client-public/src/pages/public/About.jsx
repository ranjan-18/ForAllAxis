import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionHeading from '../../components/common/SectionHeading';
import Team from '../../components/sections/Team';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About ForallAxis | Software Development & AI Automation Lab</title>
        <meta name="description" content="Learn about ForallAxis, a software development and creative design agency. We build scalable web applications, robust AI solutions, and premium branding." />
        <meta property="og:title" content="About ForallAxis | Software Development & AI Automation Lab" />
        <meta property="og:description" content="Learn about ForallAxis, a software development and creative design agency. We build scalable web applications, robust AI solutions, and premium branding." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="section-pad container" style={{ paddingTop: '8rem' }}>
        <SectionHeading subtitle="Who We Are" title="About ForallAxis" />
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 4rem', color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8 }}>
          <p>
            At ForallAxis, we bridge the gap between visionary ideas and digital reality. As a premier full-service software development and creative design agency, we specialize in crafting high-performance web applications, striking brand identities, and custom AI automation. We empower startups and brands with cutting-edge technology and intuitive design, driving growth and scalable digital success.
          </p>
        </div>
        <Team />
      </div>
    </>
  );
}
