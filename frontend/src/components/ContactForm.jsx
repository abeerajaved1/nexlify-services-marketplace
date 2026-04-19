// src/components/ContactForm.jsx
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
      setStatus('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (error) {
      setStatus('Error sending message. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name *"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email *"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <select name="service" value={formData.service} onChange={handleChange}>
        <option value="">Select Service (optional)</option>
        <option value="Content Writing">Content Writing</option>
        <option value="Web Development">Web Development</option>
        <option value="AI Solutions">AI Solutions</option>
        <option value="Model Training">Model Training</option>
        <option value="AI Automation">AI Automation</option>
      </select>
      <textarea
        name="message"
        placeholder="Your Message *"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {status && <p className={`status ${status.includes('success') ? 'success' : 'error'}`}>{status}</p>}
    </form>
  );
}

export default ContactForm;