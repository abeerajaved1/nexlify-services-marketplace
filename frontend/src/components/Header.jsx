import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/Header.css';

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services', hasDropdown: true },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Blog', path: '/blogs' },
  { label: 'Contact', path: '/contact' },
];

const serviceDropdownItems = [
  { label: 'AI Solutions', path: '/services' },
  { label: 'Web Development', path: '/services' },
  { label: 'Cloud & DevOps', path: '/services' },
  { label: 'Development Support', path: '/services' },
  { label: 'Technical Partnership', path: '/services' },
  { label: 'Recruitment Services', path: '/services' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
      <div className="site-header-inner">
        <Link to="/" className="site-header-logo">
          <img src={logo} alt="Axenro" />
        </Link>

        <nav className="site-header-nav">
          <ul className="site-header-nav-list">
            {navItems.map((item) => (
              <li key={item.label} className={item.hasDropdown ? 'site-header-has-dropdown' : ''}>
                {item.hasDropdown ? (
                  <div
                    className="site-header-dropdown-trigger"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className={`site-header-nav-link ${isActive(item.path) ? 'site-header-active' : ''}`}
                    >
                      {item.label}
                      <span className="site-header-chevron"><ChevronDownIcon /></span>
                    </Link>
                    {servicesOpen && (
                      <div className="site-header-dropdown">
                        {serviceDropdownItems.map((s) => (
                          <Link key={s.label} to={s.path} className="site-header-dropdown-item">
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`site-header-nav-link ${isActive(item.path) ? 'site-header-active' : ''}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/contact" className="site-header-cta">
          Get Started <ArrowRightIcon />
        </Link>

        <button
          className="site-header-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`site-header-bar ${mobileOpen ? 'site-header-bar-open' : ''}`} />
          <span className={`site-header-bar ${mobileOpen ? 'site-header-bar-open' : ''}`} />
          <span className={`site-header-bar ${mobileOpen ? 'site-header-bar-open' : ''}`} />
        </button>
      </div>

      <div className={`site-header-mobile ${mobileOpen ? 'site-header-mobile-open' : ''}`}>
        <ul className="site-header-mobile-list">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className={`site-header-mobile-link ${isActive(item.path) ? 'site-header-mobile-active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
                {item.hasDropdown && <span className="site-header-mobile-chevron"><ChevronDownIcon /></span>}
              </Link>
              {item.hasDropdown && (
                <div className="site-header-mobile-dropdown">
                  {serviceDropdownItems.map((s) => (
                    <Link key={s.label} to={s.path} className="site-header-mobile-dropdown-item" onClick={() => setMobileOpen(false)}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        <Link to="/contact" className="site-header-mobile-cta" onClick={() => setMobileOpen(false)}>
          Get Started <ArrowRightIcon />
        </Link>
      </div>
    </header>
  );
}