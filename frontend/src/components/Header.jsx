// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom'; // ← added useLocation for active link
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import '../styles/Header.css';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // to detect current path

  // Throttled scroll handler (~80ms delay)
  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      if (timeoutId) return; // skip if already queued

      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 50);
        timeoutId = null;
      }, 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <Link to="/" className="logo-wrapper" aria-label="Home">
          <img src={logo} alt="Company Logo" className="logo-img" />
        </Link>

        <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li>
            <Link
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={location.pathname === '/about' ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={location.pathname === '/services' ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/portfolio"
              className={location.pathname === '/portfolio' ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className={location.pathname === '/blog' ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={location.pathname === '/contact' ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>

        <button
          className="hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>
    </header>
  );
}

export default Header;