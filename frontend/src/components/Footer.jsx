export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-logo-frame">
            <img className="footer-logo" src="/assets/centram-logo-cropped.png" alt="Centram Centre for Applied Artificial Intelligence" />
          </div>
          <p>Practical artificial intelligence education for professionals and organisations.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Kampala, Uganda</p>
          <p>Lab@centram.ai</p>
          <p>+256 772 431 290</p>
        </div>
        <div>
          <h4>Programmes</h4>
          <p>AI Foundations</p>
          <p>Machine Learning</p>
          <p>Generative AI</p>
        </div>
      </div>
      <div className="container copyright">© {new Date().getFullYear()} Centram AI. All rights reserved.</div>
    </footer>
  );
}
