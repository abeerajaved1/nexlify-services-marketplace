import { useState } from 'react';
import servicesBg from '../assets/Services.png';
import '../styles/Services.css';

// SVG Icons
const CloudIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19c0-1.7-1.3-3-3-3h-5c-1.7 0-3 1.3-3 3"/>
    <path d="M17.5 19c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3h-13c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3"/>
    <path d="M12 13V3"/>
    <path d="m8 7 4-4 4 4"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 16 4-4-4-4"/>
    <path d="m6 8-4 4 4 4"/>
    <path d="m14.5 4-5 16"/>
  </svg>
);

const AIIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4"/>
    <path d="m16.2 7.8 2.9-2.9"/>
    <path d="M18 12h4"/>
    <path d="m16.2 16.2 2.9 2.9"/>
    <path d="M12 18v4"/>
    <path d="m4.9 19.1 2.9-2.9"/>
    <path d="M2 12h4"/>
    <path d="m4.9 4.9 2.9 2.9"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const SupportIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const HandshakeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.5-3.5"/>
    <path d="M14.5 9.5 11 6 6 11l3.5 3.5"/>
    <path d="M5 11l3.5-3.5"/>
    <path d="M4.5 9.5 8 6l3 3"/>
    <path d="M3 14l3.5 3.5"/>
  </svg>
);

const RecruitIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const RocketSmallIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const UsersSmallIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

// Why Choose icons
const ShieldWhyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const RocketWhyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const UserWhyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const GlobeWhyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

function Services() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const coreServices = [
    {
      icon: <CloudIcon />,
      title: 'Cloud & DevOps',
      desc: 'Scalable cloud infrastructure, CI/CD pipelines, automation and modern DevOps practices.',
    },
    {
      icon: <CodeIcon />,
      title: 'Web Development',
      desc: 'Custom web applications with modern stacks, responsive design and seamless performance.',
    },
    {
      icon: <AIIcon />,
      title: 'AI Solutions',
      desc: 'AI-powered automation, machine learning models and intelligent business solutions.',
    },
    {
      icon: <SupportIcon />,
      title: 'Development Support',
      desc: 'Reliable extension of your team for ongoing development and technical support.',
    },
    {
      icon: <HandshakeIcon />,
      title: 'Technical Partnership',
      desc: 'Strategic tech partnerships to co-create, innovate and accelerate your product roadmap.',
    },
    {
      icon: <RecruitIcon />,
      title: 'Recruitment Services',
      desc: 'Top engineering talent to strengthen your team and drive your business forward.',
    },
  ];

  const whyChoose = [
    {
      icon: <ShieldWhyIcon />,
      title: 'Reliable Quality',
      desc: 'We deliver secure, reliable and future-ready solutions.',
    },
    {
      icon: <RocketWhyIcon />,
      title: 'Innovation First',
      desc: 'We use the latest technologies to keep you ahead.',
    },
    {
      icon: <UserWhyIcon />,
      title: 'Client Focused',
      desc: 'Your goals are our priority. We grow together.',
    },
    {
      icon: <GlobeWhyIcon />,
      title: 'Global Perspective',
      desc: 'Serving clients worldwide across multiple industries.',
    },
  ];

  return (
    <main className="services-page">
      {/* ===== HERO SECTION — FULL BACKGROUND IMAGE ===== */}
      <section
        className="services-hero"
        style={{ backgroundImage: `url(${servicesBg})` }}
      >
        <div className="services-hero-overlay">
          <span className="services-badge">WHAT WE OFFER</span>
          <h1 className="services-hero-title">
            Powerful Solutions.<br />
            Real <span className="text-blue">Business Impact.</span>
          </h1>
          <p className="services-hero-desc">
            We deliver innovative services that help businesses build, scale, and succeed in the digital era.
          </p>
          <div className="services-hero-stats">
            <div className="services-stat-item">
              <span className="services-stat-icon"><RocketSmallIcon /></span>
              <div className="services-stat-info">
                <span className="services-stat-num">10+</span>
                <span className="services-stat-label">Years of Experience</span>
              </div>
            </div>
            <div className="services-stat-item">
              <span className="services-stat-icon"><UsersSmallIcon /></span>
              <div className="services-stat-info">
                <span className="services-stat-num">500+</span>
                <span className="services-stat-label">Happy Clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORE SERVICES ===== */}
      <section className="core-services">
        <div className="core-services-container">
          <div className="core-services-header">
            <h2 className="core-services-title">Our Core Services</h2>
            <div className="core-services-underline"></div>
            <p className="core-services-subtitle">End-to-end solutions tailored to your business needs</p>
          </div>

          <div className="core-services-grid">
            {coreServices.map((service, i) => (
              <div
                key={i}
                className={`core-service-card ${hoveredCard === i ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="core-service-icon">{service.icon}</div>
                <h3 className="core-service-name">{service.title}</h3>
                <p className="core-service-desc">{service.desc}</p>
                <a href="#services" className="core-service-link" onClick={(e) => e.preventDefault()}>
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="why-choose">
        <div className="why-choose-container">
          <h2 className="why-choose-title">Why Businesses Choose Axenro</h2>
          <div className="why-choose-grid">
            {whyChoose.map((item, i) => (
              <div key={i} className="why-choose-item">
                <div className="why-choose-icon">{item.icon}</div>
                <h4 className="why-choose-item-title">{item.title}</h4>
                <p className="why-choose-item-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="services-cta-banner">
        <div className="services-cta-container">
          <div className="services-cta-left">
            <h2 className="services-cta-title">Ready to Transform<br />Your Business?</h2>
            <p className="services-cta-desc">Let's discuss how our services can help you achieve your goals.</p>
          </div>
          <a
            href="#contact"
            className="services-cta-btn"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start a Project →
          </a>
        </div>
      </section>
    </main>
  );
}

export default Services;