import { useState, useEffect } from 'react';
import api from '../../axiosInstance.js';
import ProjectForm from '../components/ProjectForm';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import '../../styles/Manager.css';

function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [page, search]);

  // Auto-clear success message after 3 seconds
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/projects', {
        params: { page, search, limit: 10 },
      });
      const data = res.data || {};
      const projectList = Array.isArray(data.projects) ? data.projects : [];
      setProjects(projectList);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Failed to load projects:', err);
      setError(err.response?.data?.message || 'Failed to load projects.');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    setError(null);
    setSuccessMsg(null);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('year', data.year);
      formData.append('link', data.link || '');
      if (data.imageUrl) formData.append('imageUrl', data.imageUrl);
      if (data.image?.[0]) formData.append('image', data.image[0]);

      if (editingId) {
        await api.put(`/api/projects/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccessMsg('Project updated successfully!');
      } else {
        await api.post('/api/projects', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccessMsg('Project added successfully!');
      }

      fetchProjects();
      setEditingId(null);
    } catch (err) {
      console.error('Save failed:', err);
      setError('Failed to save project: ' + (err.response?.data?.message || err.message));
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;
    try {
      await api.delete(`/api/projects/${id}`);
      setSuccessMsg('Project deleted successfully!');
      fetchProjects();
    } catch (err) {
      setError('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const getCategoryStyle = (category) => {
    const styles = {
      'AI': { bg: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', border: 'rgba(139, 92, 246, 0.3)' },
      'AI Automation': { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
      'Web': { bg: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' },
      'Content Writing': { bg: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', border: 'rgba(244, 63, 94, 0.3)' },
    };
    return styles[category] || { bg: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8', border: 'rgba(148, 163, 184, 0.3)' };
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          <div className="manager-header">
            <div>
              <h1>Manage Projects</h1>
              <p>Track and manage your portfolio projects.</p>
            </div>
            <button 
              className="btn-primary add-service-btn"
              onClick={() => {
                setEditingId(null);
                document.getElementById('project-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="M12 5v14"/>
              </svg>
              Add Project
            </button>
          </div>

          <div className="manager-search-wrapper">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="Search projects by title or category..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="manager-search"
            />
            {search && (
              <button className="search-clear" onClick={() => { setSearch(''); setPage(1); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
            )}
          </div>

          {error && (
            <div className="manager-error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {successMsg && (
            <div className="manager-success">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              {successMsg}
            </div>
          )}

          <div id="project-form" className="form-section">
            <ProjectForm
              onSubmit={handleSubmit}
              defaultValues={editingId ? projects.find(p => p._id === editingId) || {} : {}}
              isEditing={!!editingId}
              onCancel={() => setEditingId(null)}
            />
          </div>

          <div className="table-section">
            {loading ? (
              <div className="manager-loader">
                <div className="loader-spinner"></div>
                <p>Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    <path d="M10 9H8"/>
                    <path d="M16 13H8"/>
                    <path d="M16 17H8"/>
                  </svg>
                </div>
                <h3>No projects found</h3>
                <p>{search ? 'Try adjusting your search terms.' : 'Add your first project using the form above.'}</p>
              </div>
            ) : (
              <>
                <div className="table-container">
                  <table className="manager-table">
                    <thead>
                      <tr>
                        <th style={{ width: '80px' }}>Image</th>
                        <th>Project</th>
                        <th style={{ width: '140px' }}>Category</th>
                        <th style={{ width: '80px' }}>Year</th>
                        <th>Description</th>
                        <th style={{ width: '100px' }}>Link</th>
                        <th style={{ width: '100px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project, index) => {
                        const catStyle = getCategoryStyle(project.category);
                        return (
                          <tr key={project._id} style={{ animationDelay: `${index * 0.05}s` }}>
                            <td>
                              <div className="service-image-cell project-image-cell">
                                {project.image ? (
                                  <img
                                    src={`http://localhost:5000${project.image}`}
                                    alt={project.title}
                                    onError={(e) => {
                                      e.target.src = 'https://placehold.co/80x80/1e293b/475569?text=Error';
                                    }}
                                  />
                                ) : (
                                  <div className="image-placeholder">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                                      <circle cx="9" cy="9" r="2"/>
                                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td>
                              <span className="service-name">{project.title}</span>
                            </td>
                            <td>
                              <span 
                                className="category-badge"
                                style={{ 
                                  background: catStyle.bg, 
                                  color: catStyle.color,
                                  borderColor: catStyle.border 
                                }}
                              >
                                {project.category}
                              </span>
                            </td>
                            <td>
                              <span className="year-badge">{project.year}</span>
                            </td>
                            <td>
                              <p className="service-desc">{project.description?.substring(0, 100) || '—'}</p>
                            </td>
                            <td>
                              {project.link ? (
                                <a 
                                  href={project.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="project-link"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                    <polyline points="15 3 21 3 21 9"/>
                                    <line x1="10" x2="21" y1="14" y2="3"/>
                                  </svg>
                                  View
                                </a>
                              ) : (
                                <span className="no-link">—</span>
                              )}
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button 
                                  onClick={() => setEditingId(project._id)}
                                  className="action-btn edit"
                                  title="Edit project"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                                    <path d="m15 5 4 4"/>
                                  </svg>
                                </button>
                                <button 
                                  onClick={() => deleteProject(project._id)}
                                  className="action-btn delete"
                                  title="Delete project"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18"/>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                    <line x1="10" x2="10" y1="11" y2="17"/>
                                    <line x1="14" x2="14" y1="11" y2="17"/>
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="manager-pagination">
                    <button 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="pagination-btn"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                      </svg>
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        disabled={page === i + 1}
                        className={`pagination-btn ${page === i + 1 ? 'active' : ''}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="pagination-btn"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProjectsManager;