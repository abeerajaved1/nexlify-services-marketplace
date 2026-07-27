import '../styles/ServiceCard.css';

function ServiceCard({ title, description, image }) {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';

  const imageUrl = image
    ? `${API_BASE}${image.startsWith('/') ? '' : '/'}${image}`
    : 'https://placehold.co/320x200?text=Axenro&font=roboto';

  return (
    <div className="service-card">
      <div className="card-image">
        <img
          src={imageUrl}
          alt={title}
          onError={(e) => {
            e.target.src = 'https://placehold.co/320x200?text=Axenro&font=roboto';
          }}
        />
      </div>

      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>

        <div className="rating">
          ★★★★☆ <span>(4.5)</span>
        </div>

        <a
          href="#contact"
          className="service-btn"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Contact for this Service
        </a>
      </div>
    </div>
  );
}

export default ServiceCard;