// src/pages/Home.jsx
import heroVideo from '../assets/Hero.mp4';   // ← this line is important

import '../styles/Home.css';

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* remove overlay if you want pure video look like in the reference */}
        {/* <div className="hero-overlay"></div> */}

        <div className="hero-content glass-card fade-in-scale">
          <div className="container">
            <h1 className="hero-title">
              Empower Your Digital Future
            </h1>
            <p className="hero-subtitle">
              Professional Content Writing • Custom Web Development • Advanced AI Solutions & Automation
            </p>
            <p className="hero-tagline">
              Transforming ideas into high-impact digital experiences
            </p>

            <button className="cta-button">
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;