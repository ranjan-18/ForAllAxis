import React, { useState, useEffect } from 'react';
import { testimonialService } from '../../services';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import ImageUpload from '../../components/admin/ImageUpload';
import { showConfirmToast } from '../../utils/confirmToast';
import toast from 'react-hot-toast';

export default function ManageTestimonials() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ clientName: '', company: '', clientTitle: '', content: '', rating: 5, image: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await testimonialService.getAll();
      setItems(res.data.data || res.data || []);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await testimonialService.update(editingId, formData);
        toast.success('Testimonial successfully updated!');
      } else {
        await testimonialService.create(formData);
        toast.success('Testimonial successfully created!');
      }
      handleCancelEdit();
      fetchItems();
    } catch (err) { 
      console.error(err); 
      toast.error('Failed to save testimonial');
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
    setFormData({ clientName: '', company: '', clientTitle: '', content: '', rating: 5, image: '' });
    setEditingId(null);
    setIsFormVisible(false);
  };

  const handleDelete = (id) => {
    showConfirmToast('Are you sure you want to delete this testimonial?', async () => {
      try {
        await testimonialService.delete(id);
        toast.success('Testimonial successfully deleted!');
        fetchItems();
      } catch (err) { 
        console.error(err); 
        toast.error('Failed to delete testimonial');
      }
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Manage Testimonials</h2>
        {!isFormVisible && (
          <button onClick={() => setIsFormVisible(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '2rem' }}>
            <FiPlus /> Add New Testimonial
          </button>
        )}
      </div>
      
      {isFormVisible && (
        <div style={{ 
          background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', 
          border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', 
          marginBottom: '3rem', position: 'relative' 
        }}>
          <button type="button" onClick={handleCancelEdit} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <FiX size={24} />
          </button>
          
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--accent-red)' }}>
            {editingId ? 'Edit Testimonial' : 'Create New Testimonial'}
          </h3>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div className="grid grid-2" style={{ gap: '1rem' }}>
              <div><label>Client Name</label><input className="input-field" value={formData.clientName || ''} onChange={e => setFormData({...formData, clientName: e.target.value})} required /></div>
              <div><label>Company</label><input className="input-field" value={formData.company || ''} onChange={e => setFormData({...formData, company: e.target.value})} /></div>
            </div>
            
            <div className="grid grid-2" style={{ gap: '1rem' }}>
              <div><label>Client Title</label><input className="input-field" value={formData.clientTitle || ''} onChange={e => setFormData({...formData, clientTitle: e.target.value})} /></div>
              <div><label>Rating (1-5)</label><input type="number" min="1" max="5" className="input-field" value={formData.rating || 5} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} required /></div>
            </div>
            
            <div><label>Testimonial Content</label><textarea className="input-field" rows="4" value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} required /></div>
            
            <div>
              <ImageUpload label="Client Avatar" folder="forallaxis/testimonials" value={formData.image || ''} onChange={(url) => setFormData({...formData, image: url})} />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0.75rem 2rem' }}>
                {loading ? 'Saving...' : (editingId ? 'Update Testimonial' : 'Save Testimonial')}
              </button>
              <button type="button" onClick={handleCancelEdit} className="btn btn-outline" style={{ padding: '0.75rem 2rem' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(239, 68, 68, 0.05)', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>Client</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>Company</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>Rating</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'all 0.2s' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{item.clientName}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{item.company}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-red)', borderRadius: '1rem', fontSize: '0.875rem' }}>
                    {item.rating} / 5
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <button type="button" onClick={() => handleEdit(item)} style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: '#3b82f6', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', marginRight: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FiEdit2 /> <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Edit</span>
                  </button>
                  <button type="button" onClick={() => handleDelete(item._id)} style={{ background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.2)', color: 'var(--accent-red)', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FiTrash2 /> <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No testimonials found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
