import React, { useState, useEffect } from 'react';
import { contactService } from '../../services';
import { FiTrash2, FiMail, FiPhone } from 'react-icons/fi';
import { showConfirmToast } from '../../utils/confirmToast';
import toast from 'react-hot-toast';

export default function ManageProjectInquiries() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => { fetchInquiries(); }, []);

  const fetchInquiries = async () => {
    try {
      const res = await contactService.getAll();
      const allContacts = res.data.data || res.data || [];
      // Filter only those that are Project Inquiries
      const filtered = allContacts.filter(c => c.subject && c.subject.includes('New Project Inquiry:'));
      setInquiries(filtered);
    } catch (err) { console.error(err); }
  };

  const handleDelete = (id) => {
    showConfirmToast('Are you sure you want to delete this project inquiry?', async () => {
      try {
        await contactService.delete(id);
        toast.success('Inquiry successfully deleted!');
        fetchInquiries();
      } catch (err) { 
        console.error(err); 
        toast.error('Failed to delete inquiry');
      }
    });
  };

  // Helper function to parse the formatted message string
  const parseMessage = (msg) => {
    const lines = msg.split('\n');
    let projectType = 'Unknown';
    let budget = 'Unknown';
    let details = msg;

    try {
      if (msg.includes('Project Type:') && msg.includes('Project Details:')) {
        projectType = lines.find(l => l.startsWith('Project Type:'))?.replace('Project Type:', '').trim() || 'Unknown';
        budget = lines.find(l => l.startsWith('Budget Range:'))?.replace('Budget Range:', '').trim() || 'Unknown';
        
        const detailsIndex = lines.findIndex(l => l.startsWith('Project Details:'));
        if (detailsIndex !== -1) {
          details = lines.slice(detailsIndex + 1).join('\n').trim();
        }
      }
    } catch (e) {
      console.warn("Failed to parse inquiry message");
    }

    return { projectType, budget, details };
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Project Inquiries</h2>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {inquiries.map(item => {
          const { projectType, budget, details } = parseMessage(item.message);
          
          return (
            <div key={item._id} style={{ 
              background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--glass-border)', padding: '1.5rem 2rem',
              display: 'flex', justifyContent: 'space-between', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
              gap: '2rem', alignItems: 'flex-start'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'none' }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{item.name}</h3>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
                    background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6'
                  }}>
                    {projectType}
                  </span>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 700,
                    background: 'rgba(16, 185, 129, 0.1)', color: '#10b981'
                  }}>
                    Budget: ₹{budget}
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                  <a href={`mailto:${item.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
                    <FiMail /> {item.email}
                  </a>
                  {item.phone && (
                    <a href={`tel:${item.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
                      <FiPhone /> {item.phone}
                    </a>
                  )}
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Project Details</h4>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {details}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => handleDelete(item._id)} 
                  title="Delete Inquiry"
                  style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', cursor: 'pointer', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }} 
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.transform = 'scale(1.1)' }} 
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'; e.currentTarget.style.transform = 'scale(1)' }}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
        
        {inquiries.length === 0 && (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)', background: 'var(--bg-card)', borderRadius: '1rem', border: '2px dashed var(--glass-border)' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>No project inquiries found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
