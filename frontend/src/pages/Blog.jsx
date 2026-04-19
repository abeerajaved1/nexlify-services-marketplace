// src/pages/Blog.jsx
import '../styles/Blog.css';

export default function BlogSoon() {
  return (
    <main className="blog-soon-page">
      <section className="soon-hero">
        <div className="content-container">
          <div className="announce-glass elegant-frame">
            <h1 className="main-heading">
              <span className="status-tag">— Arriving Soon</span>
            </h1>

            <p className="short-teaser">
              Deep insights on AI, modern web, content, and digital evolution.
            </p>

            <div className="topic-tags">
              <span className="tag">AI Innovation</span>
              <span className="tag">Web Craft</span>
              <span className="tag">Content Strategy</span>
              <span className="tag">Digital Growth</span>
            </div>

            <a href="/contact" className="preview-cta">
              Request Early Access
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}