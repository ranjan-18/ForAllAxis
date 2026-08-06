import React, { useState, useEffect } from 'react';
import { contactService  } from '../../services';
import { FiTrash2 } from 'react-icons/fi';
import { showConfirmToast } from '../../utils/confirmToast';
import toast from 'react-hot-toast';

export default function ContactSubmissions() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    try {
      const res = await contactService.getAll();
      const allContacts = res.data.data || res.data || [];
      const regularContacts = allContacts.filter(c => !c.subject || !c.subject.includes('New Project Inquiry:'));
      setContacts(regularContacts);
    } catch (err) { console.error(err); }
  };

  const handleDelete = (id) => {
    showConfirmToast('Are you sure you want to delete this message?', async () => {
      try {
        await contactService.delete(id);
        toast.success('Message successfully deleted!');
        fetchContacts();
      } catch (err) { 
        console.error(err); 
        toast.error('Failed to delete message');
      }
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Contact Submissions</h2>
      </div>
      
      <div style={{ background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(239, 68, 68, 0.05)', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>Name / Contact</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>Message</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c._id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'all 0.2s' }}>
                <td style={{ padding: '1.5rem', verticalAlign: 'top' }}>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{c.email}</div>
                  {c.phone && <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>📞 {c.phone}</div>}
                </td>
                <td style={{ padding: '1.5rem', verticalAlign: 'top', maxWidth: '400px' }}>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {c.message}
                  </p>
                </td>
                <td style={{ padding: '1.5rem', verticalAlign: 'top', textAlign: 'right' }}>
                  <button type="button" onClick={() => handleDelete(c._id)} style={{ background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.2)', color: 'var(--accent-red)', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FiTrash2 /> <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="3" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
