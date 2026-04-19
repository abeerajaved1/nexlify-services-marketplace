// src/components/ServiceCard.jsx (updated for theme)
import { Link } from 'react-router-dom';
import '../styles/ServiceCard.css';

console.log("VITE_API_BASE_URL value:", import.meta.env.VITE_API_BASE_URL);

function ServiceCard({ title, description, image }) {
  // Use environment variable with fallback
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const imageUrl = image
    ? `${API_BASE}${image.startsWith('/') ? '' : '/'}${image}`
    : 'https://placehold.co/320x200?text=No+Image&font=roboto';

  return (
    <div className="service-card">
      <div className="card-image">
        <img
          src={imageUrl}
          alt={title}
          onError={(e) => {
            console.log('Image failed to load →', imageUrl);
            e.target.src = 'https://placehold.co/320x200?text=Image+Error&font=roboto';
          }}
        />
      </div>

      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>

        <div className="rating">
          ★★★★☆ <span>(4.5)</span>
        </div>

        <Link
          to="/contact"
          className="service-btn"
          state={{ service: title }}
        >
          Contact for this Service
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;