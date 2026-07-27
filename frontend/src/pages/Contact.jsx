import { useState } from 'react';
import api from '../axiosInstance';
import '../styles/Contact.css';

// SVG Icons
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const SendPlaneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4 20-7z"/>
    <path d="M22 2 11 13"/>
  </svg>
);

const FormUserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const FormMailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const FormGridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="7" x="3" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="14" rx="1"/>
    <rect width="7" height="7" x="3" y="14" rx="1"/>
  </svg>
);

const FormMessageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const ZapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const HeadphonesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 14v3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3"/>
    <path d="M17 14v3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3"/>
    <path d="M3 14a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6"/>
    <path d="M12 8V6a2 2 0 0 1 4 0v2"/>
  </svg>
);

const contactMethods = [
  {
    icon: <MailIcon />,
    label: 'Email Us',
    value: 'contact@axenro.com',
    href: 'mailto:contact@axenro.com'
  },
  {
    icon: <PhoneIcon />,
    label: 'WhatsApp',
    value: '+92 328-0355038',
    href: 'https://wa.me/923280355038?text=Hi%2C%20I%27m%20interested%20in%20Axenro%20services.%20Can%20we%20discuss%3F'
  },
  {
    icon: <MapPinIcon />,
    label: 'Location',
    value: 'Global - Serving Worldwide',
    href: '#'
  }
];

const trustItems = [
  { icon: <ZapIcon />, title: 'Quick Response', desc: 'We reply within 24 hours' },
  { icon: <ShieldIcon />, title: 'Trusted Partner', desc: 'Reliable solutions, always' },
  { icon: <GlobeIcon />, title: 'Global Reach', desc: 'Serving clients worldwide' },
  { icon: <HeadphonesIcon />, title: 'Expert Support', desc: 'Here to help you grow' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitting(true);
    try {
      await api.post('/api/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-section">
        <div className="contact-container">
          {/* Left Column */}
          <div className="contact-left">
            <span className="contact-badge">CONTACT</span>
            <h1 className="contact-title">
              Let&apos;s Build Something<br />
              Amazing <span className="contact-text-blue">Together.</span>
            </h1>
            <p className="contact-desc">
              Have questions or ready to transform your business with AI automation? We&apos;d love to hear from you.
            </p>

            <div className="contact-methods">
              {contactMethods.map((method, idx) => (
                <a
                  key={idx}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="contact-method-card"
                >
                  <div className="contact-method-icon">{method.icon}</div>
                  <div className="contact-method-info">
                    <span className="contact-method-label">{method.label}</span>
                    <span className="contact-method-value">{method.value}</span>
                  </div>
                  <div className="contact-method-arrow"><ArrowRightIcon /></div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-right">
            <div className="contact-form-card">
              <div className="contact-form-header">
                <div className="contact-form-plane">
                  <SendPlaneIcon />
                </div>
                <h2>Send Us a Message</h2>
              </div>

              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h3>Message Sent!</h3>
                  <p>We&apos;ll get back to you within 24 hours.</p>
                  <button className="contact-success-btn" onClick={() => setSubmitted(false)}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <div className="contact-input-wrap">
                        <span className="contact-input-icon"><FormUserIcon /></span>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="contact-form-group">
                      <div className="contact-input-wrap">
                        <span className="contact-input-icon"><FormMailIcon /></span>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email *"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <div className="contact-input-wrap contact-select-wrap">
                      <span className="contact-input-icon"><FormGridIcon /></span>
                      <select name="service" value={formData.service} onChange={handleChange}>
                        <option value="">Select Service (optional)</option>
                        <option value="AI Solutions">AI Solutions</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Cloud & DevOps">Cloud & DevOps</option>
                        <option value="Development Support">Development Support</option>
                        <option value="Technical Partnership">Technical Partnership</option>
                        <option value="Recruitment Services">Recruitment Services</option>
                      </select>
                      <span className="contact-select-arrow"><ChevronDownIcon /></span>
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <div className="contact-input-wrap contact-textarea-wrap">
                      <span className="contact-input-icon"><FormMessageIcon /></span>
                      <textarea
                        name="message"
                        placeholder="Your Message *"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="contact-submit-btn" disabled={submitting}>
                    {submitting ? 'Sending...' : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m22 2-7 20-4-9-9-4 20-7z"/>
                          <path d="M22 2 11 13"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="contact-trust">
        <div className="contact-trust-container">
          {trustItems.map((item, idx) => (
            <div key={idx} className="contact-trust-item">
              <div className="contact-trust-icon">{item.icon}</div>
              <div className="contact-trust-text">
                <span className="contact-trust-title">{item.title}</span>
                <span className="contact-trust-desc">{item.desc}</span>
              </div>
              {idx < trustItems.length - 1 && <div className="contact-trust-divider" />}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}