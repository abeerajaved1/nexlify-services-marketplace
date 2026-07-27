import { useState, useEffect } from 'react';
import api from '../axiosInstance';
import blogsBg from '../assets/Blogs.png';
import '../styles/Blogs.css';

// SVG Icons
const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="7" x="3" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="14" rx="1"/>
    <rect width="7" height="7" x="3" y="14" rx="1"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const ZapIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const CloudIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19c0-1.7-1.3-3-3-3h-11a3 3 0 0 1-3-3c0-1.3.8-2.4 2-2.8V10a5 5 0 0 1 5-5 5 5 0 0 1 5 5v.2c1.2.4 2 1.5 2 2.8a3 3 0 0 1-3 3h-1"/>
  </svg>
);

const PenIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const FileTextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const defaultBlogs = [
  {
    _id: '1',
    title: 'AI in Web Development: The Complete Guide',
    description: 'Explore how AI integration transforms modern web solutions — from chatbots to predictive analytics.',
    category: 'AI',
    readTime: '8 min',
    image: null,
    bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
  },
  {
    _id: '2',
    title: 'Building Scalable MERN Applications',
    description: 'Best practices for building production-ready full-stack apps with MongoDB, Express, React & Node.',
    category: 'Web Dev',
    readTime: '12 min',
    image: null,
    bg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
  },
  {
    _id: '3',
    title: 'Content Strategy for Tech Brands',
    description: 'How to create content that ranks, converts, and builds authority in your niche.',
    category: 'Content',
    readTime: '6 min',
    image: null,
    bg: 'linear-gradient(135deg, #374151 0%, #4b5563 100%)',
  },
  {
    _id: '4',
    title: 'AI Automation: From Zero to Production',
    description: 'Step-by-step guide to deploying intelligent automation systems for business processes.',
    category: 'AI Automation',
    readTime: '10 min',
    image: null,
    bg: 'linear-gradient(135deg, #1c1917 0%, #44403c 100%)',
  },
  {
    _id: '5',
    title: 'The Future of Cloud Architecture',
    description: 'Serverless, microservices, and edge computing — where cloud infrastructure is heading next.',
    category: 'Cloud',
    readTime: '7 min',
    image: null,
    bg: 'linear-gradient(135deg, #0c4a6e 0%, #075985 100%)',
  },
  {
    _id: '6',
    title: 'SEO in the Age of AI Search',
    description: 'How generative AI is changing search and what it means for your content strategy.',
    category: 'SEO',
    readTime: '5 min',
    image: null,
    bg: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
  },
];

const categories = [
  { label: 'All', icon: <GridIcon /> },
  { label: 'AI', icon: <SparkleIcon /> },
  { label: 'Web Dev', icon: <GlobeIcon /> },
  { label: 'AI Automation', icon: <ZapIcon /> },
  { label: 'Cloud', icon: <CloudIcon /> },
  { label: 'Content', icon: <PenIcon /> },
  { label: 'SEO', icon: <SearchIcon /> },
];

const getCategoryStyle = (cat) => {
  switch(cat) {
    case 'AI': return { bg: '#2563eb', text: '#ffffff' };
    case 'Web Dev': return { bg: '#2563eb', text: '#ffffff' };
    case 'AI Automation': return { bg: '#2563eb', text: '#ffffff' };
    case 'Cloud': return { bg: '#2563eb', text: '#ffffff' };
    case 'Content': return { bg: '#2563eb', text: '#ffffff' };
    case 'SEO': return { bg: '#2563eb', text: '#ffffff' };
    default: return { bg: '#2563eb', text: '#ffffff' };
  }
};

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get('/api/blogs', { params: { limit: 50 } });
        const apiBlogs = res.data.blogs || [];
        setBlogs(apiBlogs.length > 0 ? apiBlogs : defaultBlogs);
      } catch (err) {
        setBlogs(defaultBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(b => b.category === selectedCategory);

  return (
    <main className="blogs-page">
      {/* ===== HERO SECTION ===== */}
      <section className="blogs-hero">
        <div className="blogs-hero-bg" style={{ backgroundImage: `url(${blogsBg})` }} />
        <div className="blogs-hero-overlay" />
        <div className="blogs-hero-container">
          <div className="blogs-hero-left">
            <span className="blogs-badge">TECHHUSTLE DIGITAL</span>
            <h1 className="blogs-hero-title">
              Insights That Drive<br />
              <span className="text-blue">Digital Evolution.</span>
            </h1>
            <p className="blogs-hero-desc">
              Deep insights on AI, web development, content strategy,<br />
              and digital innovation.
            </p>
            <a href="https://techhustle.digital" target="_blank" rel="noopener noreferrer" className="blogs-hero-link">
              Visit TechHustle.digital <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ===== FILTER TABS ===== */}
      <section className="blogs-filters">
        <div className="blogs-filters-container">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className={`blogs-filter-btn ${selectedCategory === cat.label ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.label)}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ===== BLOGS GRID ===== */}
      <section className="blogs-grid-section">
        <div className="blogs-grid-container">
          {loading ? (
            <div className="blogs-loading">
              <div className="blogs-spinner"></div>
              <p>Loading articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="blogs-empty">
              <p>No articles found in this category yet.</p>
            </div>
          ) : (
            <div className="blogs-grid">
              {filteredBlogs.map((blog) => {
                const catStyle = getCategoryStyle(blog.category);
                return (
                  <div key={blog._id} className="blog-card">
                    <div
                      className="blog-card-image"
                      style={{ background: blog.bg || catStyle.bg }}
                    >
                      {blog.image ? (
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}${blog.image.startsWith('/') ? '' : '/'}${blog.image}`}
                          alt={blog.title}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="blog-card-placeholder">
                          <span className="blog-placeholder-text">{blog.category}</span>
                        </div>
                      )}
                      <span
                        className="blog-category-tag"
                        style={{ background: catStyle.bg, color: catStyle.text }}
                      >
                        {blog.category}
                      </span>
                      <span className="blog-read-time">
                        <ClockIcon /> {blog.readTime}
                      </span>
                    </div>
                    <div className="blog-card-body">
                      <h3 className="blog-card-title">{blog.title}</h3>
                      <p className="blog-card-desc">{blog.description}</p>
                      <a href="#" className="blog-card-link">
                        Read Article <ArrowRight />
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
      <section className="blogs-cta">
        <div className="blogs-cta-container">
          <div className="blogs-cta-icon">
            <FileTextIcon />
          </div>
          <div className="blogs-cta-text">
            <h3>Want More Insights?</h3>
            <p>Explore our full collection of articles on AI, web development, and digital strategy.</p>
          </div>
          <a href="#" className="blogs-cta-btn">
            Explore All Articles <ArrowRight />
          </a>
        </div>
      </section>
    </main>
  );
}