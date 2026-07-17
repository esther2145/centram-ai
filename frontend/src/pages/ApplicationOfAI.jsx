import { Link } from "react-router-dom";

function ApplicationOfAI() {
  return (
    <main>
      <section className="course-detail-header">
        <div className="container">
          <span className="eyebrow light">
            CENTRAM AI PROFESSIONAL TRAINING
          </span>

          <h1>Application of Artificial Intelligence</h1>

          <p>
            This professional course provides practical training in applying
            artificial intelligence, machine learning, natural language
            processing, generative AI and predictive analytics across major
            organisational functions.
          </p>

          <div className="course-detail-meta">
            <span>
              <strong>Level:</strong> Professional
            </span>

            <span>
              <strong>Format:</strong> Intensive Training
            </span>

            <span>
              <strong>Delivery:</strong> Physical, Online or Hybrid
            </span>
          </div>

          <Link to="/apply" className="button primary">
            Apply for this course
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container course-detail-layout">
          <div>
            <span className="eyebrow">COURSE OUTLINE</span>
            <h2>Professional Application Areas</h2>

            <p>
              Participants may study how AI is applied in different
              professional and organisational areas.
            </p>

            <div className="module-list">
              <CourseArea
                number="01"
                title="AI in Human Resource & Administration"
                description="Apply generative AI, machine learning and predictive analytics to recruitment, onboarding, employee development, workforce planning and administrative automation."
                topics={[
                  "Foundations of AI in HR and Administration",
                  "AI-powered talent acquisition and onboarding",
                  "Learning, development and performance management",
                  "Employee engagement and people analytics",
                  "Office administration and workflow automation",
                  "Ethics, bias mitigation and AI governance"
                ]}
              />

              <CourseArea
                number="02"
                title="AI in Finance & Accounting"
                description="Use AI to automate financial operations, improve forecasting, detect fraud, support auditing and strengthen strategic financial decision-making."
                topics={[
                  "The AI revolution in finance and accounting",
                  "Financial accounting and accounts automation",
                  "Financial planning and predictive analysis",
                  "Auditing, tax compliance and fraud detection",
                  "Investment and corporate finance",
                  "Governance, explainable AI and ethics"
                ]}
              />

              <CourseArea
                number="03"
                title="AI for Economic Planning and Modeling"
                description="Apply machine learning, NLP and computational modelling to economic forecasting, public policy, market analysis and risk assessment."
                topics={[
                  "Macroeconomic forecasting",
                  "Causal inference and policy evaluation",
                  "Economic NLP and system simulation",
                  "Strategic policy, risk and explainable AI"
                ]}
              />

              <CourseArea
                number="04"
                title="AI in Procurement & Logistics Management"
                description="Use AI to improve sourcing, supplier management, inventory forecasting, logistics planning and supply-chain resilience."
                topics={[
                  "Intelligent procurement and automated sourcing",
                  "Demand planning and inventory optimisation",
                  "Autonomous logistics and network optimisation"
                ]}
              />

              <CourseArea
                number="05"
                title="AI in Library & Information Management"
                description="Apply AI to cataloguing, metadata creation, digital preservation, semantic search and conversational information services."
                topics={[
                  "Intelligent cataloguing and knowledge graphs",
                  "Digital preservation, OCR and computer vision",
                  "Conversational discovery and AI governance"
                ]}
              />
            </div>
          </div>

          <aside className="course-sidebar">
            <div className="course-info-card">
              <h3>Who should attend?</h3>

              <p>
                Professionals, managers, analysts, administrators, finance
                officers, economists, procurement teams, librarians and
                organisational leaders interested in practical AI adoption.
              </p>

              <h3>What participants gain</h3>

              <ul>
                <li>Practical AI application skills</li>
                <li>Hands-on experience with AI tools</li>
                <li>AI governance and ethical awareness</li>
                <li>A completed applied AI project</li>
              </ul>

              <Link to="/apply" className="button primary">
                Apply Now
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function CourseArea({ number, title, description, topics }) {
  return (
    <article className="module-card">
      <span className="module-number">
        Application Area {number}
      </span>

      <h3>{title}</h3>

      <p>{description}</p>

      <h4>Topics covered</h4>

      <ul>
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </article>
  );
}

export default ApplicationOfAI;