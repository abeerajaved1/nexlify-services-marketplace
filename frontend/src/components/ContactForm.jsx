import { useState } from 'react';
import api from '../axiosInstance';
import '../styles/ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      await api.post('/api/contact', formData);
      setStatus("Message sent successfully! We will get back to you soon.");
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (error) {
      setStatus('Error sending message. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="cf-form" onSubmit={handleSubmit}>
      <div className="cf-group">
        <input
          type="text"
          name="name"
          placeholder="Your Name *"
          value={formData.name}
          onChange={handleChange}
          required
          className="cf-input"
        />
      </div>
      <div className="cf-group">
        <input
          type="email"
          name="email"
          placeholder="Your Email *"
          value={formData.email}
          onChange={handleChange}
          required
          className="cf-input"
        />
      </div>
      <div className="cf-group">
        <select 
          name="service" 
          value={formData.service} 
          onChange={handleChange}
          className="cf-select"
        >
          <option value="">Select Service (optional)</option>
          <option value="Development Support">Development Support</option>
          <option value="Technical Partnership">Technical Partnership</option>
          <option value="Recruitment Services">Recruitment Services</option>
          <option value="AI Solutions">AI Solutions</option>
          <option value="Web Development">Web Development</option>
          <option value="Cloud & DevOps">Cloud & DevOps</option>
        </select>
      </div>
      <div className="cf-group">
        <textarea
          name="message"
          placeholder="Your Message *"
          value={formData.message}
          onChange={handleChange}
          required
          className="cf-textarea"
        />
      </div>
      <button type="submit" disabled={loading} className="cf-btn">
        <span className="cf-btn-text">{loading ? 'Sending...' : 'Send Message'}</span>
      </button>
      {status && (
        <p className={`cf-status ${status.includes('success') ? 'cf-success' : 'cf-error'}`}>
          {status}
        </p>
      )}
    </form>
  );
}

export default ContactForm;