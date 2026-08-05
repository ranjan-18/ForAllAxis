import React from 'react';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';

export default function BlogPreview() {
  return (
    <section className="section-pad container">
      <SectionHeading subtitle="Insights" title="Latest Articles" />
      <div className="grid grid-3">
        {[1,2,3].map(i => (
          <Card key={i} padding="0">
             <div style={{ height: '200px', background: 'var(--bg-secondary)' }} />
             <div style={{ padding: '1.5rem' }}>
               <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 600 }}>Design</span>
               <h3 style={{ margin: '0.5rem 0' }}>Article Title {i}</h3>
               <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Brief excerpt of the blog post...</p>
             </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
