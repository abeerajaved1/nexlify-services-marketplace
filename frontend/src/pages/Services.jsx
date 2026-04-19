// src/pages/Services.jsx
import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import '../styles/Services.css';
import api from '../axiosInstance';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/api/services');
        setServices(res.data.services || []);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const total = services.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [total]);

  if (loading) return <div className="loading">Loading services...</div>;
  if (total === 0) return <p className="no-services">No services available at the moment.</p>;

  // Decide layout based on screen size
  const isWideScreen = window.innerWidth >= 1024;

  let visibleServices = [];
  if (isWideScreen && total >= 3) {
    const prev = (currentIndex - 1 + total) % total;
    const next = (currentIndex + 1) % total;
    visibleServices = [
      { ...services[prev], position: 'left' },
      { ...services[currentIndex], position: 'center' },
      { ...services[next], position: 'right' }
    ];
  } else {
    // Tablet & mobile: show only center card
    visibleServices = [{ ...services[currentIndex], position: 'center' }];
  }

  return (
    <main className="services-page">
      <section className="services-hero">
        <div className="container">
          <h1 className="hero-title">Our Services</h1>
          <p className="hero-subtitle">Professional solutions tailored to your needs</p>
        </div>
      </section>

      <section className="services-carousel">
        <div className="container">
          <div className="carousel-container">
            <button className="carousel-nav prev" onClick={prevSlide} aria-label="Previous">
              ‹
            </button>

            <div className="carousel-track">
              {visibleServices.map((service, idx) => (
                <div
                  key={`${service._id}-${service.position}`}
                  className={`carousel-item ${service.position}`}
                >
                  <ServiceCard
                    title={service.name}
                    description={service.description}
                    image={service.image}
                  />
                </div>
              ))}
            </div>

            <button className="carousel-nav next" onClick={nextSlide} aria-label="Next">
              ›
            </button>
          </div>

          <div className="carousel-indicators">
            {services.map((_, idx) => (
              <button
                key={idx}
                className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to service ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Services;