import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';
import { careerService  } from '../../services';

export default function CareersPreview() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    careerService.getAll().then(res => setCareers(res.data.data)).catch(console.error);
  }, []);

  return (
    <section className="section-pad container">
      <SectionHeading subtitle="Join Us" title="Open Positions" />
      <div className="grid grid-3">
        {careers.length > 0 ? careers.map(c => (
          <Card key={c._id} padding="0">
             <div style={{ height: '150px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <h2 style={{ color: 'var(--text-muted)' }}>{c.type}</h2>
             </div>
             <div style={{ padding: '1.5rem' }}>
               <span style={{ fontSize: '0.75rem', color: 'var(--accent-red)', fontWeight: 600, textTransform: 'uppercase' }}>{c.department} • {c.location}</span>
               <h3 style={{ margin: '0.5rem 0' }}>{c.title}</h3>
               <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>{c.description.substring(0, 100)}...</p>
               <div style={{ display: 'flex', gap: '0.5rem' }}>
                 <Link to={`/careers/${c.slug}`} className="btn btn-sm btn-outline">View Details</Link>
                 <Link to={`/careers/${c.slug}`} className="btn btn-sm btn-primary">Apply Now</Link>
               </div>
             </div>
          </Card>
        )) : <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>No open positions at the moment. Check back soon!</p>}
      </div>
    </section>
  );
}
