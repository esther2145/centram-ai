import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand-column">
          <Link className="footer-logo-frame" to="/" aria-label="Centram home">
            <img className="footer-logo" src="/assets/centram-logo-cropped.png" alt="Centram Centre for Applied Artificial Intelligence" />
          </Link>
          <p>Practical, domain-specific artificial intelligence education for professionals and organisations.</p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <span>Kampala, Uganda</span>
          <a href="mailto:Lab@centram.ai">Lab@centram.ai</a>
          <a href="tel:+256772431290">+256 772 431 290</a>
        </div>

        <div className="footer-action-column">
          <h3>Ready to get started?</h3>
          <p>Choose a practical AI programme designed for your professional field.</p>
          <Link className="footer-button" to="/apply">Apply now <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Centram AI. All rights reserved.</span>
        <span>Centre for Applied Artificial Intelligence</span>
      </div>
    </footer>
  );
}
