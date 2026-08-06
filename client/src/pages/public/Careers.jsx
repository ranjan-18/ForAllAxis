import React from 'react';
import CareersPreview from '../../components/sections/CareersPreview';
import SectionHeading from '../../components/common/SectionHeading';
import Card from '../../components/common/Card';

export default function Careers() {
  return (
    <div>
      <div className="section-pad container text-center" style={{ background: 'var(--bg-secondary)', padding: '6rem 2rem 4rem', borderRadius: '0 0 var(--border-radius-xl) var(--border-radius-xl)' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Join Our Team</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Transforming ideas into digital reality. Be a part of a fast-growing, innovative team that values creativity and execution.
        </p>
        <div style={{ maxWidth: '900px', margin: '0 auto', overflow: 'hidden', borderRadius: 'var(--border-radius-lg)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Our diverse team collaborating" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </div>

      <section className="section-pad container">
        <SectionHeading subtitle="Why Us" title="Benefits & Perks" />
        <div className="grid grid-4">
          <Card className="text-center hover-lift">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--accent-red)' }}>Remote First</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Work from anywhere in the world.</p>
          </Card>
          <Card className="text-center hover-lift">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--accent-red)' }}>Equity Options</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Own a piece of what you help build from day one.</p>
          </Card>
          <Card className="text-center hover-lift">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--accent-red)' }}>High Impact</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>No corporate red tape. Your work directly matters here.</p>
          </Card>
          <Card className="text-center hover-lift">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--accent-red)' }}>Great Culture</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Regular team meetups, events, and a supportive environment.</p>
          </Card>
        </div>
      </section>

      <CareersPreview />

      <section className="section-pad container text-center">
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Don't see a fit?</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>We're always looking for talented individuals. Send us your resume!</p>
        <a href="mailto:hello@forallaxis.com" className="btn btn-primary btn-lg">Email Resume</a>
      </section>
    </div>
  );
}
