import React, { useState, useRef } from 'react';
import { FiUploadCloud, FiLoader, FiX, FiImage } from 'react-icons/fi';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function ImageUpload({ value, onChange, folder = 'forallaxis', label = 'Upload Image' }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      return toast.error('Please upload an image file');
    }

    if (file.size > 5 * 1024 * 1024) {
      return toast.error('Image must be less than 5MB');
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    setUploading(true);
    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onChange(res.data.data.url);
      toast.success('Image uploaded successfully', { position: 'top-center' });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label>{label}</label>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        ref={fileInputRef}
      />
      
      {value ? (
        <div style={{ position: 'relative', width: '100%', maxWidth: '300px', borderRadius: '1rem', overflow: 'hidden', border: '2px solid rgba(239, 68, 68, 0.2)', boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.1)' }}>
          <img src={value} alt="Preview" style={{ display: 'block', width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
          <button 
            type="button" 
            onClick={handleRemove}
            style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(239, 68, 68, 0.95)', color: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', transition: 'transform 0.2s' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <FiX size={18} />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => !uploading && fileInputRef.current?.click()}
          style={{ 
            border: '2px dashed rgba(239, 68, 68, 0.3)', borderRadius: '1rem', padding: '3rem 2rem', 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
            background: 'rgba(239, 68, 68, 0.02)', cursor: uploading ? 'wait' : 'pointer', transition: 'all 0.3s',
            color: 'var(--text-secondary)'
          }}
          onMouseOver={(e) => !uploading && (e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.8)', e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)')}
          onMouseOut={(e) => !uploading && (e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)', e.currentTarget.style.background = 'rgba(239, 68, 68, 0.02)')}
        >
          {uploading ? (
            <>
              <FiLoader className="spin" size={24} style={{ color: 'var(--accent-red)' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Uploading...</span>
            </>
          ) : (
            <>
              <FiUploadCloud size={28} style={{ color: 'var(--text-secondary)' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Click to browse device</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>(Max 5MB)</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
