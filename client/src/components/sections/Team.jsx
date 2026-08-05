import React from 'react';
import SectionHeading from '../common/SectionHeading';

export default function Team() {
  return (
    <section className="section-pad container">
      <SectionHeading subtitle="Our People" title="Meet The Team" />
      <div className="grid grid-3">
        {[1,2,3].map(i => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'var(--bg-secondary)', margin: '0 auto 1rem' }} />
            <h4>Team Member {i}</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Senior Role</p>
          </div>
        ))}
      </div>
    </section>
  );
}
