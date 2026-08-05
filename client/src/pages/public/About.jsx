import React from 'react';
import SectionHeading from '../../components/common/SectionHeading';
import Team from '../../components/sections/Team';

export default function About() {
  return (
    <div className="section-pad container">
      <SectionHeading subtitle="Who We Are" title="About ForAllAxis" />
      <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem', color: 'var(--text-secondary)' }}>
        We are a passionate team of designers, developers, and strategists.
      </p>
      <Team />
    </div>
  );
}
