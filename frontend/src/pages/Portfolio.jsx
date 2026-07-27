import { useState, useEffect } from 'react';
import api from '../axiosInstance';
import portfolioPdf from '../assets/Axenro_Company_Portfolio.pdf';
import '../styles/Portfolio.css';

// SVG Icons
const DocIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="7" x="3" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="14" rx="1"/>
    <rect width="7" height="7" x="3" y="14" rx="1"/>
  </svg>
);

const BrainIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const ZapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const PenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  </svg>
);

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7"/>
    <path d="M7 7h10v10"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { label: 'All', icon: <GridIcon /> },
    { label: 'AI & ML', icon: <BrainIcon /> },
    { label: 'Web Apps', icon: <GlobeIcon /> },
    { label: 'Automation', icon: <ZapIcon /> },
    { label: 'Content', icon: <PenIcon /> },
  ];

  const defaultProjects = [
    {
      _id: '1',
      title: 'AI Content Generator',
      description: 'NLP-powered platform for content generation with real-time optimization.',
      category: 'AI & ML',
      year: '2024',
      image: null,
      link: '#',
      bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
    },
    {
      _id: '2',
      title: 'E-Commerce Platform',
      description: 'Full-stack MERN e-commerce solution with payment integration & admin panel.',
      category: 'Web Apps',
      year: '2024',
      image: null,
      link: '#',
      bg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    },
    {
      _id: '3',
      title: 'Predictive Analytics',
      description: 'ML model for sales forecasting with 95% accuracy and insights.',
      category: 'AI & ML',
      year: '2024',
      image: null,
      link: '#',
      bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    },
    {
      _id: '4',
      title: 'Workflow Automation',
      description: 'Automated workflows that streamline processes and boost productivity.',
      category: 'Automation',
      year: '2023',
      image: null,
      link: '#',
      bg: '#f8fafc',
    },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/api/projects', { params: { limit: 50 } });
        const apiProjects = res.data.projects || [];
        setProjects(apiProjects.length > 0 ? apiProjects : defaultProjects);
      } catch (err) {
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const getCategoryStyle = (cat) => {
    switch(cat) {
      case 'AI & ML': return { bg: '#eff6ff', text: '#2563eb' };
      case 'Web Apps': return { bg: '#eff6ff', text: '#2563eb' };
      case 'Automation': return { bg: '#fff7ed', text: '#ea580c' };
      case 'Content': return { bg: '#f0fdf4', text: '#16a34a' };
      default: return { bg: '#eff6ff', text: '#2563eb' };
    }
  };

  return (
    <main className="portfolio-page">
      {/* ===== HERO SECTION ===== */}
      <section className="portfolio-hero">
        <div className="portfolio-hero-container">
          {/* Left: Text */}
          <div className="portfolio-hero-left">
            <span className="portfolio-badge">OUR WORK</span>
            <h1 className="portfolio-hero-title">
              Innovative Solutions.<br />
              Proven <span className="text-blue">Results.</span>
            </h1>
            <p className="portfolio-hero-desc">
              Explore a selection of projects where we turned ideas into powerful digital experiences.
            </p>
          </div>

          {/* Right: Download Card + Stats */}
          <div className="portfolio-hero-right">
            <div className="portfolio-download-card">
              <div className="portfolio-download-icon">
                <DocIcon />
              </div>
              <div className="portfolio-download-content">
                <h3>Download Our Portfolio</h3>
                <p>Complete service catalog, tech stack, and process overview.</p>
                <a href={portfolioPdf} download className="portfolio-download-link">
                  Download PDF →
                </a>
              </div>
            </div>

            <div className="portfolio-stats-row">
              <div className="portfolio-stat-item">
                <span className="portfolio-stat-icon-box"><BriefcaseIcon /></span>
                <div className="portfolio-stat-info">
                  <span className="portfolio-stat-num">50+</span>
                  <span className="portfolio-stat-label">Projects</span>
                </div>
              </div>
              <div className="portfolio-stat-divider"></div>
              <div className="portfolio-stat-item">
                <span className="portfolio-stat-icon-box"><UsersIcon /></span>
                <div className="portfolio-stat-info">
                  <span className="portfolio-stat-num">30+</span>
                  <span className="portfolio-stat-label">Clients</span>
                </div>
              </div>
              <div className="portfolio-stat-divider"></div>
              <div className="portfolio-stat-item">
                <span className="portfolio-stat-icon-box"><TrophyIcon /></span>
                <div className="portfolio-stat-info">
                  <span className="portfolio-stat-num">10+</span>
                  <span className="portfolio-stat-label">Industries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FILTER TABS ===== */}
      <section className="portfolio-filters">
        <div className="portfolio-filters-container">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className={`portfolio-filter-btn ${selectedCategory === cat.label ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.label)}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ===== PROJECTS GRID ===== */}
      <section className="portfolio-projects">
        <div className="portfolio-projects-container">
          {loading ? (
            <div className="portfolio-loading">
              <div className="portfolio-spinner"></div>
              <p>Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="portfolio-empty">
              <p>No projects found in this category yet.</p>
            </div>
          ) : (
            <div className="portfolio-grid">
              {filteredProjects.map((project) => {
                const catStyle = getCategoryStyle(project.category);
                return (
                  <div key={project._id} className="portfolio-project-card">
                    <div
                      className="project-card-image"
                      style={{ background: project.bg || catStyle.bg }}
                    >
                      {project.image ? (
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}${project.image.startsWith('/') ? '' : '/'}${project.image}`}
                          alt={project.title}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="project-card-placeholder">
                          <span className="project-placeholder-text">{project.title}</span>
                        </div>
                      )}
                      <span className="project-year-badge">{project.year}</span>
                    </div>
                    <div className="project-card-body">
                      <span
                        className="project-category-tag"
                        style={{ background: catStyle.bg, color: catStyle.text }}
                      >
                        {project.category}
                      </span>
                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-desc">{project.description}</p>
                      <a href={project.link} className="project-card-link">
                        View Project <ArrowUpRight />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="portfolio-cta">
        {/* <div className="portfolio-cta-container">
          <div className="portfolio-cta-icon">
            <RocketIcon />
          </div>
          <div className="portfolio-cta-text">
            <h3>Have a project in mind?</h3>
            <p>Let's build something amazing together.</p>
          </div>
          <a
            href="#contact"
            className="portfolio-cta-btn"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start a Project →
          </a>
        </div> */}
      </section>
    </main>
  );
}