import React, { useState, useEffect } from 'react';
import SectionHeading from '../common/SectionHeading';
import { teamService } from '../../services';

export default function Team() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    teamService.getAll()
      .then(res => setTeam(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <section className="section-pad container">
      <SectionHeading subtitle="Our People" title="Meet The Team" />
      <div className="grid grid-3">
        {team.map(member => (
          <div key={member._id} style={{ textAlign: 'center' }}>
            <div 
              style={{ 
                width: '150px', 
                height: '150px', 
                borderRadius: '50%', 
                background: 'var(--bg-secondary)', 
                margin: '0 auto 1rem',
                backgroundImage: `url(${member.image || 'https://i.pravatar.cc/150'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }} 
            />
            <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>{member.name}</h4>
            <p style={{ color: 'var(--accent-red)', margin: 0, fontWeight: 500 }}>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
