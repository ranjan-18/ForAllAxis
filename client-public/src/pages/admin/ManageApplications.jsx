import React, { useState, useEffect } from 'react';
import { applicationService } from '../../services';
import { FiEdit2, FiTrash2, FiX, FiExternalLink } from 'react-icons/fi';
import { showConfirmToast } from '../../utils/confirmToast';
import toast from 'react-hot-toast';

export default function ManageApplications() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', college: '', status: 'pending', portfolioUrl: '', githubUrl: '', resumeUrl: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await applicationService.getAll();
      setItems(res.data.data || res.data || []);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        // Assume update exists, or at least status update
        await applicationService.updateStatus(editingId, formData.status);
        toast.success('Application updated');
      }
      handleCancelEdit();
      fetchItems();
    } catch (err) { 
      toast.error('Failed to update');
      console.error(err); 
    } 
    finally { setLoading(false); }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setFormData({ name: '', email: '', phone: '', college: '', status: 'pending', portfolioUrl: '', githubUrl: '', resumeUrl: '' });
    setEditingId(null);
    setIsFormVisible(false);
  };

  const handleDelete = (id) => {
    showConfirmToast('Are you sure you want to delete this application?', async () => {
      try {
        await applicationService.delete(id);
        toast.success('Application successfully deleted!');
        fetchItems();
      } catch (err) { 
        console.error(err); 
        toast.error('Failed to delete application');
      }
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Manage Applications</h2>
      </div>
      
      {isFormVisible ? (
        <div style={{ 
          background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '1rem', 
          border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', 
          position: 'relative' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-red)', margin: 0 }}>
              Applicant Details
            </h3>
            <button type="button" onClick={handleCancelEdit} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', borderRadius: '2rem' }}>
              <FiX size={18} /> Close & Go Back
            </button>
          </div>
          
          <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="grid grid-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Full Name</label>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{formData.name || 'N/A'}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email Address</label>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{formData.email || 'N/A'}</div>
              </div>
            </div>
            
            <div className="grid grid-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Phone Number</label>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{formData.phone || 'N/A'}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>College / University</label>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{formData.college || 'N/A'}</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {formData.portfolioUrl && (
                <a href={formData.portfolioUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  View Portfolio <FiExternalLink size={16} />
                </a>
              )}
              {formData.githubUrl && (
                <a href={formData.githubUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                  View GitHub/LinkedIn <FiExternalLink size={16} />
                </a>
              )}
              {formData.resumeUrl ? (
                <a href={formData.resumeUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--accent-red)', color: '#fff', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)' }}>
                  View Resume <FiExternalLink size={16} />
                </a>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.75rem 1.5rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>No resume uploaded</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map(item => (
            <div key={item._id} style={{ 
              background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--glass-border)', padding: '1.5rem 2rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' 
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'none' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{item.name}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>{item.email}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Applying for: <span style={{ color: 'var(--accent-red)', opacity: 0.9 }}>{item.career?.title || 'Unknown Role'}</span>
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => handleDelete(item._id)} 
                  title="Delete Application"
                  style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', cursor: 'pointer', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }} 
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.transform = 'scale(1.1)' }} 
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'; e.currentTarget.style.transform = 'scale(1)' }}
                >
                  <FiTrash2 size={18} />
                </button>
                <button 
                  type="button" 
                  onClick={() => handleEdit(item)} 
                  className="btn btn-primary" 
                  style={{ padding: '0.75rem 2rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)', background: 'var(--bg-card)', borderRadius: '1rem', border: '2px dashed var(--glass-border)' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>No applications found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
