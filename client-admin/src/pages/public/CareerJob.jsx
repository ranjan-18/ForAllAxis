import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { careerService  } from '../../services';
import { applicationService  } from '../../services';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CareerJob() {
  const { slug } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Application Form State
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', portfolioUrl: '', githubUrl: '', college: '', resumeUrl: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeType, setResumeType] = useState('link'); // 'link' or 'file'
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    careerService.getBySlug(slug)
      .then(res => setCareer(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleFileChange = (e) => setResumeFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      let submissionData;
      if (resumeType === 'file' && resumeFile) {
        submissionData = new FormData();
        submissionData.append('career', career._id);
        submissionData.append('name', formData.name);
        submissionData.append('email', formData.email);
        submissionData.append('phone', formData.phone);
        if (formData.portfolioUrl) submissionData.append('portfolioUrl', formData.portfolioUrl);
        if (formData.githubUrl) submissionData.append('githubUrl', formData.githubUrl);
        if (formData.college) submissionData.append('college', formData.college);
        submissionData.append('resumeFile', resumeFile);
        submissionData.append('resumeUrl', 'pending-upload'); 
      } else {
        if (resumeType === 'link' && !formData.resumeUrl) throw new Error('Please provide a resume link.');
        if (resumeType === 'file' && !resumeFile) throw new Error('Please upload a resume file.');
        submissionData = { ...formData, career: career._id };
      }
      await applicationService.create(submissionData);
      setSuccess(true);
      toast.success('Application submitted successfully!');
    } catch (err) {
      toast.error('Failed to submit application');
      setError(err.response?.data?.message || err.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="section-pad container text-center">Loading...</div>;
  if (!career) return <div className="section-pad container text-center"><h2>Job not found</h2><Link to="/careers" className="btn btn-primary mt-4">Back to Careers</Link></div>;

  return (
    <>
      <Helmet>
        <title>{`${career.title} - Career | ForallAxis`}</title>
        <meta name="description" content={`Apply for the ${career.title} position in the ${career.department} department at ForallAxis. ${career.location} - ${career.type} role.`} />
        <meta property="og:title" content={`${career.title} - Career | ForallAxis`} />
        <meta property="og:description" content={`Apply for the ${career.title} position in the ${career.department} department at ForallAxis. ${career.location} - ${career.type} role.`} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="section-pad container" style={{ paddingTop: '8rem' }}>
        <Link to="/careers" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--text-secondary)' }}>&larr; Back to all open positions</Link>
      
      <div className="grid grid-2" style={{ gap: '4rem', alignItems: 'flex-start' }}>
        <div className="card" style={{ padding: '3rem' }}>
          <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--accent-red)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {career.department} • {career.location} • {career.type}
            </span>
            <h1 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>{career.title}</h1>
          </div>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Role Description</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{career.description}</p>
          </div>
        </div>

        <div className="card glass-dark" style={{ padding: '3rem', position: 'sticky', top: '100px' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FiCheckCircle size={80} color="var(--accent-green)" style={{ marginBottom: '1.5rem', display: 'block' }} />
              <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '2.25rem', fontWeight: 800 }}>Congratulations!</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Your application for the <strong style={{color: 'var(--text-primary)'}}>{career.title}</strong> role has been successfully submitted. Our team will review your application and get back to you soon.
              </p>
            </div>
          ) : (
            <>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Apply for this role</h2>
              {error && <div style={{ color: 'var(--accent-red)', background: 'rgba(225,29,72,0.1)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid rgba(225,29,72,0.2)' }}>{error}</div>}
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                <div className="grid grid-2" style={{ gap: '1rem' }}>
                  <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
                  <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                
                <Input label="College / University" name="college" value={formData.college} onChange={handleChange} required />
                
                <div className="grid grid-2" style={{ gap: '1rem' }}>
                  <Input label="GitHub URL" name="githubUrl" value={formData.githubUrl} onChange={handleChange} />
                  <Input label="Portfolio / LinkedIn" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} />
                </div>
                
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Resume / CV</label>
                    <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: '0.5rem' }}>
                      <button type="button" onClick={() => setResumeType('link')} style={{ padding: '0.25rem 0.75rem', borderRadius: '0.25rem', border: 'none', background: resumeType === 'link' ? 'var(--bg-card)' : 'transparent', color: resumeType === 'link' ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s' }}>Link</button>
                      <button type="button" onClick={() => setResumeType('file')} style={{ padding: '0.25rem 0.75rem', borderRadius: '0.25rem', border: 'none', background: resumeType === 'file' ? 'var(--bg-card)' : 'transparent', color: resumeType === 'file' ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s' }}>Upload</button>
                    </div>
                  </div>
                  
                  {resumeType === 'link' ? (
                    <input type="text" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} placeholder="Google Drive, Dropbox, etc." className="input-field" required />
                  ) : (
                    <input type="file" name="resumeFile" onChange={handleFileChange} accept=".pdf,.doc,.docx" className="input-field" required />
                  )}
                </div>
                
                <Button type="submit" disabled={submitting} size="lg" style={{ marginTop: '1rem', width: '100%' }}>
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
