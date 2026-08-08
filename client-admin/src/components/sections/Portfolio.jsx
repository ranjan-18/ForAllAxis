import React, { useState, useEffect } from 'react';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';
import { projectService  } from '../../services';
import { FiExternalLink } from 'react-icons/fi';

const imageMap = {
  'E-Commerce Platform Redesign': 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop',
  'HealthTech Patient Portal': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop'
};

const defaultImage = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    projectService.getAll()
      .then(res => {
        // Show only featured projects on the home page, or fallback to all if none featured
        let data = res.data.data;
        const featured = data.filter(p => p.featured);
        if (featured.length > 0) data = featured;
        setProjects(data.slice(0, 4));
      })
      .catch(console.error);
  }, []);

  return (
    <section className="section-pad container">
      <SectionHeading subtitle="Our Work" title="Featured Projects" description="A glimpse into some of our best work. We transform complex problems into elegant digital solutions." />
      <div className="grid grid-2" style={{ gap: '2rem' }}>
        {projects.map((project, i) => {
          // Use DB thumbnail if available, else map by title, else default
          const imageUrl = project.thumbnail ? project.thumbnail : (imageMap[project.title] || defaultImage);
          
          return (
            <Card key={project._id || i} hoverable padding="0" className="overflow-hidden" style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Image Container */}
              <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
                <div 
                  className="portfolio-img"
                  style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              
              {/* Content Container */}
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 700 }}>{project.title}</h3>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      <span style={{ color: 'var(--accent-red)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>
                        {project.category.replace('-', ' ')}
                      </span>
                      {project.client && (
                        <>
                          <span style={{ color: 'var(--text-secondary)' }}>•</span>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{project.client}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Live Link Button */}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', borderRadius: '2rem', borderColor: 'var(--text-primary)', color: 'var(--text-primary)', background: 'transparent', transition: 'all 0.3s ease' }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-red)';
                        e.currentTarget.style.background = 'var(--accent-red)';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'var(--text-primary)';
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                    >
                      Live Link <FiExternalLink />
                    </a>
                  )}
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, flex: 1 }}>
                  {project.shortDescription}
                </p>
                
                {/* Tech Stack Tags */}
                {project.technologies && project.technologies.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} style={{ padding: '0.25rem 0.75rem', background: 'var(--bg-secondary)', borderRadius: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
