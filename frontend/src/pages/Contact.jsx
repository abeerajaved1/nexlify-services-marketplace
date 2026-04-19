// src/pages/Contact.jsx
import { useState } from 'react';
import ContactForm from '../components/ContactForm';
import contactGif from '../assets/Contact.gif';
import '../styles/Contact.css';

function Contact() {
  const [mode, setMode] = useState('email'); // 'email' or 'whatsapp'

  const whatsappNumber = '+923280355038';
  const whatsappMessage = encodeURIComponent("Hi, I'm interested in your services. Can we discuss?");

  const toggleMode = () => {
    setMode(mode === 'email' ? 'whatsapp' : 'email');
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch, We'll get back to you within 24 hours.</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="mobile-toggle-area">
          <button 
            className="switch-mode-btn glass-btn"
            onClick={toggleMode}
          >
            {mode === 'email' 
              ? 'Prefer WhatsApp? Click here →' 
              : '← Back to Email Form'}
          </button>
        </div>

        <div className="split-layout">
          {/* GIF - always visible on left/top */}
          <div className="gif-panel">
            <img 
              src={contactGif} 
              alt="Contact animation" 
              className="contact-gif" 
            />
          </div>

          {/* Content area - form or whatsapp replaces here */}
          <div className="form-panel">
            {/* Email Form - shown only in email mode */}
            <div className={`content-box glass-panel ${mode === 'email' ? 'visible' : 'hidden'}`}>
              <ContactForm />
            </div>

            {/* WhatsApp Content - shown only in whatsapp mode */}
            <div className={`content-box glass-panel ${mode === 'whatsapp' ? 'visible' : 'hidden'}`}>
              <h2>Chat with Us on WhatsApp</h2>
              <p className="subtitle">Fastest response – usually within minutes!</p>

              <div className="whatsapp-box">
                <div className="number-display">
                  <span className="icon">WhatsApp</span>
                  {/* <strong>{whatsappNumber}</strong> */}
                </div>
                <p className="hint">Tap below to start chat instantly</p>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-big-btn"
              >
                Open WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;