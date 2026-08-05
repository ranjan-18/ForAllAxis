import React from 'react';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';

export default function Portfolio() {
  return (
    <section className="section-pad container">
      <SectionHeading subtitle="Our Work" title="Featured Projects" description="A glimpse into some of our best work." />
      <div className="grid grid-2">
        {[1,2,3,4].map(i => (
          <Card key={i} hoverable padding="0" className="overflow-hidden">
            <div style={{ height: '250px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{ color: 'var(--text-secondary)' }}>Project Image {i}</span>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Project Title {i}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Web Development</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
