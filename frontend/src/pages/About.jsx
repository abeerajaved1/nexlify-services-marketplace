import aboutImage from '../assets/About.png';
import '../styles/About.css';

// SVG Icons
const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const DocIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const GlobeSmallIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

function About() {
  const features = [
    {
      icon: <RocketIcon />,
      title: 'Innovation First',
      desc: 'Using cutting-edge AI and modern technologies to solve real business challenges.'
    },
    {
      icon: <ShieldIcon />,
      title: 'Trusted Delivery',
      desc: 'Quality, security, and reliability are built into everything we deliver.'
    },
    {
      icon: <UsersIcon />,
      title: 'Client Focus',
      desc: 'Your goals drive our process. We partner with you for long-term success.'
    },
    {
      icon: <GlobeIcon />,
      title: 'Global Reach',
      desc: 'Empowering startups and enterprises across multiple industries worldwide.'
    },
  ];

  const pillars = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>
      ),
      bg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      title: 'Innovation',
      desc: 'We embrace AI, automation, and cloud technologies to build future-ready solutions.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      ),
      bg: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      title: 'Quality',
      desc: 'Reliable, secure, and scalable solutions engineered with excellence.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      bg: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      title: 'Partnership',
      desc: 'We work as an extension of your team to achieve measurable growth.'
    },
  ];

  return (
    <main className="about-page">
      {/* ===== TOP SECTION ===== */}
      <section className="about-top">
        <div className="about-top-container">
          {/* Left: Text + Image */}
          <div className="about-top-left">
            <div className="about-top-text">
              <span className="about-badge">WHO WE ARE</span>
              <h2 className="about-top-title">
                Building Intelligent<br />
                <span className="text-blue">Digital Experiences.</span>
              </h2>
              <p className="about-top-desc">
                Axenro delivers AI-powered software, web platforms, cloud solutions, 
                and digital transformation services that help businesses innovate, 
                automate, and grow with confidence.
              </p>
            </div>

            <div className="about-image-wrap">
              <img src={aboutImage} alt="Axenro Team" className="about-image" />
              {/* Floating stat cards */}
              <div className="float-stat float-stat-left">
                <div className="float-stat-icon blue">
                  <DocIcon />
                </div>
                <div className="float-stat-text">
                  <span className="float-stat-num">250+</span>
                  <span className="float-stat-label">Projects</span>
                </div>
              </div>
              <div className="float-stat float-stat-right">
                <div className="float-stat-icon blue">
                  <GlobeSmallIcon />
                </div>
                <div className="float-stat-text">
                  <span className="float-stat-num">20+</span>
                  <span className="float-stat-label">Countries</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 2x2 Feature Cards */}
          <div className="about-top-right">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon-wrap">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <div className="feature-underline"></div>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM SECTION: 3 Pillars ===== */}
      <section className="about-bottom">
        <div className="about-bottom-container">
          {pillars.map((p, i) => (
            <div key={i} className="pillar-card">
              <div className="pillar-icon" style={{ background: p.bg }}>
                {p.icon}
              </div>
              <div className="pillar-content">
                <h3 className="pillar-title">{p.title}</h3>
                <div className="pillar-underline"></div>
                <p className="pillar-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default About;