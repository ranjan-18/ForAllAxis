import React, { useState, useEffect } from 'react';
import { serviceService } from '../../services';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import ImageUpload from '../../components/admin/ImageUpload';
import { showConfirmToast } from '../../utils/confirmToast';
import toast from 'react-hot-toast';

export default function ManageServices() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ title: '', shortDescription: '', description: '', icon: '', image: '', order: 0 });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await serviceService.getAll();
      setItems(res.data.data || res.data || []);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await serviceService.update(editingId, formData);
        toast.success('Service successfully updated!');
      } else {
        await serviceService.create(formData);
        toast.success('Service successfully created!');
      }
      handleCancelEdit();
      fetchItems();
    } catch (err) { 
      console.error(err); 
      toast.error('Failed to save service');
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
    setFormData({ title: '', shortDescription: '', description: '', icon: '', image: '', order: 0 });
    setEditingId(null);
    setIsFormVisible(false);
  };

  const handleDelete = (id) => {
    showConfirmToast('Are you sure you want to delete this service?', async () => {
      try {
        await serviceService.delete(id);
        toast.success('Service successfully deleted!');
        fetchItems();
      } catch (err) { 
        console.error(err); 
        toast.error('Failed to delete service');
      }
    });
  };



  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Manage Services</h2>
        {!isFormVisible && (
          <button onClick={() => setIsFormVisible(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '2rem' }}>
            <FiPlus /> Add New Service
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
            {editingId ? 'Edit Service' : 'Create New Service'}
          </h3>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            

      <div className="grid grid-2" style={{ gap: '1rem' }}>
        <div><label>Title</label><input className="input-field" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
        <div><label>Icon Class</label><input className="input-field" placeholder="e.g. FiMonitor" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})} /></div>
      </div>
      <div><label>Short Description</label><input className="input-field" value={formData.shortDescription || ''} onChange={e => setFormData({...formData, shortDescription: e.target.value})} required /></div>
      <div><label>Full Description</label><textarea className="input-field" rows="3" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} required /></div>
      <div className="grid grid-2" style={{ gap: '1rem' }}>
        <div><label>Display Order</label><input type="number" className="input-field" value={formData.order || 0} onChange={e => setFormData({...formData, order: Number(e.target.value)})} /></div>
        <ImageUpload label="Service Cover Image" folder="forallaxis/services" value={formData.image || ''} onChange={(url) => setFormData({...formData, image: url})} />
      </div>
    

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0.75rem 2rem' }}>
                {loading ? 'Saving...' : (editingId ? 'Update Service' : 'Save Service')}
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
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>Title</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>Short Desc</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>Order</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'all 0.2s' }}>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{item.title}</td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{item.shortDescription.substring(0, 40)}...</td>
                      <td style={{ padding: '1rem 1.5rem' }}><span style={{ padding: '0.25rem 0.5rem', background: '#f1f5f9', borderRadius: '4px', fontWeight: 600 }}>{item.order}</span></td>
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
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
