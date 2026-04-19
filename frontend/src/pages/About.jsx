// src/pages/About.jsx
import aboutVideo from '../assets/About.mp4';
import '../styles/About.css';

function About() {
  return (
    <main className="about-page">
      <section className="about-section">
        <div className="container">
          <div className="about-layout">
            {/* Text column – left side */}
            <div className="about-content about-glass">
              <h1 className="about-heading">About Us</h1>

              <p className="about-lead">
                We are a forward-thinking digital agency dedicated to helping businesses thrive in the modern world.
              </p>

              <p>
                Our expertise spans high-quality <strong>content writing</strong> that ranks and converts, custom <strong>web development</strong> that delivers seamless user experiences, and cutting-edge <strong>AI solutions</strong> — from intelligent agents and automation to custom model training and deployment.
              </p>

              {/* <p>
                With a passion for innovation and a commitment to excellence, we transform ideas into powerful digital realities — whether you're launching a new brand, scaling your online presence, or integrating intelligent systems into your operations.
              </p> */}

              <p className="about-mission">
                Our mission is simple: empower your business with tools, content, and technology that drive real growth and lasting impact.
              </p>
            </div>

            {/* Video column – right side */}
            <div className="about-video-area">
              <video
                className="about-video-player"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src={aboutVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="team-area">
        <div className="container">
          <h2 className="team-heading">Our Team</h2>
          <p className="team-description">
            A small but highly skilled team passionate about digital excellence.  
            (Team member cards coming soon)
          </p>
        </div>
      </section> */}
    </main>
  );
}

export default About;