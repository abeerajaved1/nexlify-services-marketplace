// src/pages/Portfolio.jsx
import { useState, useEffect } from 'react';
import api from '../axiosInstance';
import '../styles/Portfolio.css';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All'); // default open

  const categories = ['All', 'AI', 'AI Automation', 'Web', 'Content Writing'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/api/projects', { params: { limit: 50 } });
        setProjects(res.data.projects || []);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const sortedProjects = [...filteredProjects].sort((a, b) => b.year - a.year);

  return (
    <main className="portfolio-modern">
      <section className="portfolio-header">
        <div className="container">
          <h1>Portfolio</h1>
          <p className="header-subtitle">
            Showcasing innovation across AI, web development, content, and automation
          </p>
        </div>
      </section>

      <section className="portfolio-main">
        <div className="container">
          {/* Category Filter */}
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'AI Automation' ? 'Model Training' : cat}
                {cat !== 'All' && filteredProjects.length > 0 && (
                  <span className="count-badge">{filteredProjects.length}</span>
                )}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="loading">Loading projects...</div>
          ) : sortedProjects.length === 0 ? (
            <div className="empty-state">
              <p>No projects found in this category yet.</p>
            </div>
          ) : (
            <div className="projects-grid">
              {sortedProjects.map(project => (
                <div key={project._id} className="project-card glass-hover">
                  {project.image && (
                    <div className="project-media">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${project.image.startsWith('/') ? '' : '/'}${project.image}`}
                        alt={project.title}
                        onError={e => {
                          console.log("Image failed:", project.image);
                          e.target.src = 'https://placehold.co/600x400?text=Failed+to+load';
                        }}
                      />
                    </div>
                  )}

                  <div className="project-body">
                    <div className="project-meta">
                      <span className="project-year">{project.year}</span>
                      <span className="project-category">
                        {project.category === 'AI Automation' ? 'Model Training' : project.category}
                      </span>
                    </div>

                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}