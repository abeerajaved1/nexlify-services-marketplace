import Home from './Home.jsx';
import About from './About.jsx';
import Services from './Services.jsx';
import Portfolio from './Portfolio.jsx';
import Blog from './Blog.jsx';
import Contact from './Contact.jsx';

import '../styles/LandingPage.css';

function LandingPage() {
  return (
    <main className="landing-page">
      <section id="home" className="landing-section">
        <Home />
      </section>

      <section id="about" className="landing-section">
        <About />
      </section>

      <section id="services" className="landing-section">
        <Services />
      </section>

      <section id="portfolio" className="landing-section">
        <Portfolio />
      </section>

      <section id="blog" className="landing-section">
        <Blog />
      </section>

      <section id="contact" className="landing-section">
        <Contact />
      </section>
    </main>
  );
}

export default LandingPage;