import { Link } from "react-router-dom";

const strengths = [
  ["01", "Domain-Specific Learning", "We tailor AI concepts and tools to your profession instead of offering a generic, one-size-fits-all coding boot camp."],
  ["02", "Proven Track Record", "Since 2007, public institutions and private-sector organisations have trusted Centram to strengthen professional capabilities."],
  ["03", "Immediate Practical Value", "Our programmes focus on real workflows, giving participants skills they can apply in their organisations from day one."],
  ["04", "Expert-Led Mentorship", "Learn from practitioners who actively design, build, and deploy data science and artificial intelligence solutions."],
];

const sectors = [
  ["Finance & Accounting", "Financial modelling, risk analysis, automation, and intelligent budgeting."],
  ["Financial & Forensic Audit", "Anomaly detection, fraud prevention, continuous auditing, and compliance."],
  ["Human Resource Management", "Predictive talent acquisition, people analytics, and workforce planning."],
  ["Communication & Utility Regulation", "Algorithmic oversight, spectrum management, service quality, and digital inclusion."],
  ["Public-Sector Policy", "Data-driven governance, economic modelling, and administrative automation."],
  ["Information Technology", "AI-assisted software engineering, cloud architecture, and cybersecurity."],
  ["Library & Information Sciences", "Intelligent indexing, knowledge discovery, and digital preservation."],
  ["Healthcare", "Patient-data analysis, predictive care workflows, and clinical operations."],
  ["Legal Services", "Natural-language processing for contract analysis and legal research."],
  ["Oil & Gas", "Predictive maintenance, seismic-data imaging, and supply-chain intelligence."],
];

const formats = [
  ["3 weeks", "Intensive Boot Camp", "High-intensity, immersive training designed to rapidly build domain-specific practical skills."],
  ["3 months", "Online Self-Paced", "Flexible on-demand modules supported by weekend mentor sessions for busy professionals."],
  ["Custom", "Corporate On-Site Workshops", "Tailored team training delivered at your workplace to address organisation-specific challenges."],
];

export default function About() {
  return (
    <main>
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div><span className="eyebrow">ABOUT CENTRAM AI</span><h1>Bridging the gap to the future of work.</h1></div>
          <div className="about-intro">
            <p>Welcome to the Centram Centre for Applied Artificial Intelligence, a destination for domain-specific AI training, upskilling, and reskilling.</p>
            <p>Artificial intelligence is no longer a technology of the future—it is a defining tool of the present. We help public servants, private-sector professionals, and organisational leaders use it confidently and responsibly.</p>
            <Link className="button primary" to="/courses">Explore our programmes</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-story-grid">
          <div className="about-year"><span>Founded</span><strong>2007</strong><p>Nearly two decades of professional learning and transformation.</p></div>
          <div className="about-story-copy">
            <span className="eyebrow">OUR JOURNEY</span><h2>Evolution meets innovation.</h2>
            <p>Centram began with a clear mission: to equip professionals in the public and private sectors with the critical data skills required to navigate an evolving digital landscape.</p>
            <p>As technology advanced, so did we. Recognising the impact of automation and machine learning across industries, Centram evolved into a dedicated applied-AI training centre. Today, we combine deep institutional experience with current technology to help professionals transition successfully into an AI-powered world.</p>
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container">
          <div className="about-section-heading"><div><span className="eyebrow">WHY CHOOSE CENTRAM?</span><h2>Built on real-world expertise.</h2></div><p>Founded by a recognised data science and AI subject-matter expert, Centram teaches applied AI through curricula built by practitioners, for practitioners.</p></div>
          <div className="about-strength-grid">{strengths.map(([number, title, text]) => <article className="about-strength-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-section-heading"><div><span className="eyebrow">TAILORED FOR YOUR DOMAIN</span><h2>Practical AI for the work you do.</h2></div><p>Our focused programmes show participants how to introduce useful AI tools, automation, and predictive workflows into specific industries and professional functions.</p></div>
          <div className="sector-grid">{sectors.map(([title, text]) => <article className="sector-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="section about-formats-section">
        <div className="container">
          <div className="about-section-heading light-heading"><div><span className="eyebrow light">FLEXIBLE LEARNING</span><h2>Choose your learning speed.</h2></div><p>Our training formats fit demanding schedules while keeping the emphasis on practical execution.</p></div>
          <div className="about-format-grid">{formats.map(([duration, title, text]) => <article className="about-format-card" key={title}><span>{duration}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="section"><div className="container about-credentials"><div><span className="eyebrow">GLOBAL CREDENTIALS</span><h2>Credibility for the modern workforce.</h2></div><p>Centram collaborates with universities and institutions of higher learning around the world. Our certifications reflect rigorous academic standards and industry-relevant learning, strengthening the value of your skills in a global job market.</p></div></section>

      <section className="section about-cta"><div className="container about-cta-inner"><div><span className="eyebrow light">OWN THE FUTURE</span><h2>Adapt, upskill, and lead.</h2><p>The future belongs to professionals who can use AI effectively. Build the practical capabilities you need to remain relevant and create greater impact in your field.</p></div><div className="about-cta-actions"><Link className="button primary" to="/courses">Find a course</Link><Link className="button secondary" to="/contact">Talk to our team</Link></div></div></section>
    </main>
  );
}
