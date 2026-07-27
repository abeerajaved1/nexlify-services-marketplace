import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero-illustration.png';
import '../styles/Home.css';

// SVG Icons
const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 12;
      const y = (clientY / window.innerHeight - 0.5) * 12;
      const el = heroRef.current;
      if (el) {
        el.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { icon: <UsersIcon />, number: '250+', label: 'Happy Clients' },
    { icon: <RocketIcon />, number: '500+', label: 'Projects Delivered' },
    { icon: <TrophyIcon />, number: '10+', label: 'Years of Excellence' },
    { icon: <GlobeIcon />, number: '20+', label: 'Countries Served' },
  ];

  return (
    <main className="home">
      <section 
        className="hero" 
        ref={heroRef}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero-overlay">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            AI & DIGITAL INNOVATION
          </div>

          <h1 className="hero-title">
            Accelerating <span className="text-blue">Innovation.</span>
            <br />
            Delivering <span className="text-blue">Growth.</span>
          </h1>

          <p className="hero-description">
            Axenro empowers businesses worldwide with <span className="text-blue">AI-driven</span> solutions, 
            modern <span className="text-blue">technology</span> and creative <span className="text-blue">strategies</span> that 
            drive measurable results and long-term success.
          </p>

          <div className="hero-cta-group">
            <Link 
              to="#services" 
              className="cta-button primary" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Services <span className="arrow">→</span>
            </Link>
            <Link 
              to="#contact" 
              className="cta-button secondary" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Us <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="hero-stats">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <span className="stat-icon">{stat.icon}</span>
              <div className="stat-info">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;