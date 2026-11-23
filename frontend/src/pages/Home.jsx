import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import CourseCard from "../components/CourseCard";

const initialEvaluation = {
  session_name: "",
  name: "",
  email: "",
  objectives_clarity: "",
  content_relevance: "",
  session_pace: "",
  facilitator_engagement: "",
  registration_experience: "",
  learning_environment: "",
  learning_resources: "",
  overall_satisfaction: "",
  recommendation_score: "",
  comments: "",
};

const ratingDescriptions = ["Poor", "Fair", "Good", "Very good", "Excellent"];

function RatingField({ name, label, value, onChange }) {
  return (
    <fieldset className="evaluation-rating">
      <legend>{label}<span className="required-mark" aria-hidden="true">*</span></legend>
      <div className="rating-options">
        {ratingDescriptions.map((description, index) => {
          const rating = index + 1;
          return (
            <label className="rating-option" key={rating}>
              <input
                type="radio"
                name={name}
                value={rating}
                checked={value === String(rating)}
                onChange={onChange}
                required
              />
              <span className="rating-number">{rating}</span>
              <span className="rating-description">{description}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [evaluation, setEvaluation] = useState(initialEvaluation);
  const [evaluationStatus, setEvaluationStatus] = useState("");
  const [isSubmittingEvaluation, setIsSubmittingEvaluation] = useState(false);

  useEffect(() => {
    api.getCourses().then(setCourses).catch(console.error);
  }, []);

  const updateEvaluation = (event) => {
    setEvaluation({ ...evaluation, [event.target.name]: event.target.value });
  };

  const submitEvaluation = async (event) => {
    event.preventDefault();
    setIsSubmittingEvaluation(true);
    setEvaluationStatus("");
    try {
      await api.submitEvaluation({
        ...evaluation,
        name: evaluation.name || null,
        email: evaluation.email || null,
        comments: evaluation.comments || null,
        objectives_clarity: Number(evaluation.objectives_clarity),
        content_relevance: Number(evaluation.content_relevance),
        session_pace: Number(evaluation.session_pace),
        facilitator_engagement: Number(evaluation.facilitator_engagement),
        registration_experience: Number(evaluation.registration_experience),
        learning_environment: Number(evaluation.learning_environment),
        learning_resources: Number(evaluation.learning_resources),
        overall_satisfaction: Number(evaluation.overall_satisfaction),
        recommendation_score: Number(evaluation.recommendation_score),
      });
      setEvaluation(initialEvaluation);
      setEvaluationStatus("Thank you — your feedback has been submitted.");
    } catch (error) {
      setEvaluationStatus(`We couldn't submit your feedback: ${error.message}`);
    } finally {
      setIsSubmittingEvaluation(false);
    }
  };

  return (
    <>
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex="-1"
        >
          <source src="/assets/video2.mp4" type="video/mp4" />
        </video>
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow">LEARN • BUILD • INNOVATE</span>
            <h1>Centram Centre for Applied Artificial Intelligence</h1>
            <p>Practical, domain-specific artificial intelligence training for professionals. Centram equips people and organisations with industry-relevant AI, machine learning and data skills.</p>
            <div className="hero-actions">
              <Link className="button primary" to="/courses">Explore Courses</Link>
              <Link className="button secondary" to="/about">Discover Centram</Link>
            </div>
            <div className="stats">
              <div><strong>20+</strong><span>Expert-led modules</span></div>
              <div><strong>500+</strong><span>Learners targeted</span></div>
              <div><strong>3</strong><span>Learning modes</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">FEATURED PROGRAMMES</span><h2>Learn skills that solve real world problems.</h2></div>
            <Link className="text-link featured-courses-link" to="/courses">View all courses →</Link>
          </div>
          <div className="card-grid">{courses.slice(0, 3).map((course) => <CourseCard key={course.id} course={course} />)}</div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container feature-grid">
          <div><span className="icon-box">01</span><h3>Practical Learning</h3><p>Build real projects and graduate with demonstrable skills.</p></div>
          <div><span className="icon-box">02</span><h3>Industry Mentors</h3><p>Learn from professionals with experience solving real business challenges.</p></div>
          <div><span className="icon-box">03</span><h3>Career Support</h3><p>Receive guidance on portfolios, interviews and career pathways.</p></div>
        </div>
      </section>

      <section className="section evaluation-section" id="session-evaluation">
        <div className="container evaluation-layout">
          <div className="evaluation-intro">
            <span className="eyebrow">YOUR FEEDBACK MATTERS</span>
            <h2>Help us make every learning experience better.</h2>
            <p>Tell us what worked in your session and where we can improve. Your feedback helps Centram shape more useful, engaging training.</p>
            <div className="evaluation-note">
              <span aria-hidden="true">↗</span>
              <p>It takes about 3 minutes. Your name and email are optional.</p>
            </div>
          </div>
          <form className="form-card evaluation-form" onSubmit={submitEvaluation}>
            <div className="evaluation-form-heading">
              <h3>Session evaluation</h3>
              <p className="required-note"><span>*</span> Required</p>
            </div>
            <label>
              Session or programme
              <input
                required
                minLength="2"
                maxLength="180"
                name="session_name"
                value={evaluation.session_name}
                onChange={updateEvaluation}
                placeholder="e.g. Introduction to Generative AI"
              />
            </label>

            <div className="evaluation-group">
              <h4>About the session</h4>
              <RatingField name="objectives_clarity" label="The session objectives were clear." value={evaluation.objectives_clarity} onChange={updateEvaluation} />
              <RatingField name="content_relevance" label="The content was relevant and useful." value={evaluation.content_relevance} onChange={updateEvaluation} />
              <RatingField name="session_pace" label="The session pace and structure worked well." value={evaluation.session_pace} onChange={updateEvaluation} />
              <RatingField name="facilitator_engagement" label="The facilitator encouraged questions and participation." value={evaluation.facilitator_engagement} onChange={updateEvaluation} />
            </div>

            <div className="evaluation-group">
              <h4>Your experience</h4>
              <RatingField name="registration_experience" label="Registration and pre-session communication were clear." value={evaluation.registration_experience} onChange={updateEvaluation} />
              <RatingField name="learning_environment" label="The learning environment helped me focus and participate." value={evaluation.learning_environment} onChange={updateEvaluation} />
              <RatingField name="learning_resources" label="The learning materials and resources supported my learning." value={evaluation.learning_resources} onChange={updateEvaluation} />
            </div>

            <div className="evaluation-group">
              <h4>Overall</h4>
              <RatingField name="overall_satisfaction" label="Overall, how would you rate this learning experience?" value={evaluation.overall_satisfaction} onChange={updateEvaluation} />
              <fieldset className="evaluation-rating recommendation-rating">
                <legend>How likely are you to recommend a Centram session to a colleague?<span className="required-mark" aria-hidden="true">*</span></legend>
                <div className="recommendation-options">
                  {Array.from({ length: 11 }, (_, score) => (
                    <label className="recommendation-option" key={score}>
                      <input
                        type="radio"
                        name="recommendation_score"
                        value={score}
                        checked={evaluation.recommendation_score === String(score)}
                        onChange={updateEvaluation}
                        required
                      />
                      <span>{score}</span>
                    </label>
                  ))}
                </div>
                <div className="rating-endpoints"><span>Not likely</span><span>Extremely likely</span></div>
              </fieldset>
            </div>

            <label>
              What is one thing we could improve?
              <textarea name="comments" maxLength="2000" value={evaluation.comments} onChange={updateEvaluation} placeholder="Share any suggestions, highlights, or other comments." />
            </label>

            <div className="form-grid evaluation-contact-fields">
              <label>
                Name <span className="optional-label">Optional</span>
                <input name="name" maxLength="150" value={evaluation.name} onChange={updateEvaluation} autoComplete="name" />
              </label>
              <label>
                Email <span className="optional-label">Optional</span>
                <input type="email" name="email" maxLength="254" value={evaluation.email} onChange={updateEvaluation} autoComplete="email" />
              </label>
            </div>

            <button className="button primary" type="submit" disabled={isSubmittingEvaluation}>
              {isSubmittingEvaluation ? "Submitting…" : "Submit feedback"}
            </button>
            {evaluationStatus && <p className="form-message" role="status">{evaluationStatus}</p>}
          </form>
        </div>
      </section>

      <section className="section callout">
        <div className="container callout-inner">
          <div><span className="eyebrow light">CORPORATE TRAINING</span><h2>Prepare your organisation for an AI-powered future.</h2></div>
          <Link className="button light-button" to="/contact">Request Training</Link>
        </div>
      </section>
    </>
  );
}
