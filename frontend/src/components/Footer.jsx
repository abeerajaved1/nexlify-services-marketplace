import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/Footer.css';

// Social Icons
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

// Service Icons
const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/>
  </svg>
);

const MonitorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="3" rx="2"/>
    <line x1="8" x2="16" y1="21" y2="21"/>
    <line x1="12" x2="12" y1="17" y2="21"/>
  </svg>
);

const CloudIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19c0-1.7-1.3-3-3-3h-11a3 3 0 0 1-3-3c0-1.3.8-2.4 2-2.8V10a5 5 0 0 1 5-5 5 5 0 0 1 5 5v.2c1.2.4 2 1.5 2 2.8a3 3 0 0 1-3 3h-1"/>
  </svg>
);

// Contact Icons
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

const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#2563eb" stroke="none">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const services = [
  { icon: <CodeIcon />, label: 'Development Support', href: '/services' },
  { icon: <UsersIcon />, label: 'Technical Partnership', href: '/services' },
  { icon: <UserIcon />, label: 'Recruitment Services', href: '/services' },
  { icon: <SparkleIcon />, label: 'AI Solutions', href: '/services' },
  { icon: <MonitorIcon />, label: 'Web Development', href: '/services' },
  { icon: <CloudIcon />, label: 'Cloud & DevOps', href: '/services' },
];

const company = [
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Careers', href: '#' },
  { label: 'Contact Us', href: '/contact' },
];

const socials = [
  { icon: <LinkedInIcon />, href: 'https://linkedin.com/company/axenro', label: 'LinkedIn' },
  { icon: <GitHubIcon />, href: 'https://github.com/axenro', label: 'GitHub' },
  { icon: <FacebookIcon />, href: 'https://facebook.com/axenro', label: 'Facebook' },
  { icon: <WhatsAppIcon />, href: 'https://wa.me/923280355038', label: 'WhatsApp' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-top-line" />
      <div className="site-footer-container">
        <div className="site-footer-grid">
          {/* Brand Column */}
          <div className="site-footer-brand">
            <div className="site-footer-logo">
              <img src={logo} alt="Axenro" />
              {/* <span>AXENRO</span> */}
            </div>
            <p className="site-footer-tagline">
              <strong>Accelerating Innovation.</strong><br />
              <strong>Delivering Growth.</strong>
            </p>
            <p className="site-footer-desc">
              We empower businesses with AI-driven solutions and modern technology to build a smarter tomorrow.
            </p>
            <div className="site-footer-socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="site-footer-social-link" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="site-footer-column">
            <h4 className="site-footer-heading">SERVICES</h4>
            <div className="site-footer-heading-line" />
            <ul className="site-footer-list">
              {services.map((s) => (
                <li key={s.label}>
                  <Link to={s.href} className="site-footer-link">
                    <span className="site-footer-link-icon">{s.icon}</span>
                    <span>{s.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="site-footer-column">
            <h4 className="site-footer-heading">COMPANY</h4>
            <div className="site-footer-heading-line" />
            <ul className="site-footer-list">
              {company.map((c) => (
                <li key={c.label}>
                  <Link to={c.href} className="site-footer-link">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch Column */}
          <div className="site-footer-column">
            <h4 className="site-footer-heading">GET IN TOUCH</h4>
            <div className="site-footer-heading-line" />
            <div className="site-footer-contact-list">
              <a href="mailto:contact@axenro.com" className="site-footer-contact-item">
                <div className="site-footer-contact-icon"><MailIcon /></div>
                <div className="site-footer-contact-info">
                  <span className="site-footer-contact-label">Email</span>
                  <span className="site-footer-contact-value">contact@axenro.com</span>
                </div>
              </a>
              <a href="https://wa.me/923280355038" target="_blank" rel="noopener noreferrer" className="site-footer-contact-item">
                <div className="site-footer-contact-icon"><PhoneIcon /></div>
                <div className="site-footer-contact-info">
                  <span className="site-footer-contact-label">WhatsApp</span>
                  <span className="site-footer-contact-value">+92 328 0355038</span>
                </div>
              </a>
              <div className="site-footer-contact-item">
                <div className="site-footer-contact-icon"><MapPinIcon /></div>
                <div className="site-footer-contact-info">
                  <span className="site-footer-contact-label">Location</span>
                  <span className="site-footer-contact-value">Global - Serving Worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="site-footer-bottom">
        <div className="site-footer-bottom-container">
          <span className="site-footer-copyright">&copy; {currentYear} Axenro. All rights reserved.</span>
          <span className="site-footer-built">
            Built with <HeartIcon /> in Pakistan
          </span>
          <div className="site-footer-legal">
            <Link to="#">Privacy Policy</Link>
            <span className="site-footer-legal-divider">|</span>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}