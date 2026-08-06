import React from 'react';
import SectionHeading from '../../components/common/SectionHeading';
import Team from '../../components/sections/Team';

export default function About() {
  return (
    <div className="section-pad container" style={{ paddingTop: '8rem' }}>
      <SectionHeading subtitle="Who We Are" title="About ForAllAxis" />
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 4rem', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
        <p style={{ marginBottom: '1rem' }}>
          At ForAllAxis, we bridge the gap between visionary ideas and digital reality. As a premier software and design agency, we specialize in crafting high-performance web applications, striking brand identities, and scalable enterprise solutions. 
        </p>
        <p>
          Our mission is to empower forward-thinking businesses with cutting-edge technology and intuitive design, transforming complex challenges into seamless user experiences that drive measurable growth and leave a lasting impact.
        </p>
      </div>
      <Team />
    </div>
  );
}
