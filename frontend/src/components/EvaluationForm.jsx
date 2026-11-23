import { useState } from "react";
import { api } from "../api";

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

export default function EvaluationForm() {
  const [evaluation, setEvaluation] = useState(initialEvaluation);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateEvaluation = (event) => {
    setEvaluation({ ...evaluation, [event.target.name]: event.target.value });
  };

  const submitEvaluation = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");
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
      setStatus("Thank you — your feedback has been submitted.");
    } catch (error) {
      setStatus(`We couldn't submit your feedback: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form-card evaluation-form" onSubmit={submitEvaluation}>
      <div className="evaluation-form-heading">
        <h2>Session evaluation</h2>
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
        <h3>About the session</h3>
        <RatingField name="objectives_clarity" label="The session objectives were clear." value={evaluation.objectives_clarity} onChange={updateEvaluation} />
        <RatingField name="content_relevance" label="The content was relevant and useful." value={evaluation.content_relevance} onChange={updateEvaluation} />
        <RatingField name="session_pace" label="The session pace and structure worked well." value={evaluation.session_pace} onChange={updateEvaluation} />
        <RatingField name="facilitator_engagement" label="The facilitator encouraged questions and participation." value={evaluation.facilitator_engagement} onChange={updateEvaluation} />
      </div>

      <div className="evaluation-group">
        <h3>Your experience</h3>
        <RatingField name="registration_experience" label="Registration and pre-session communication were clear." value={evaluation.registration_experience} onChange={updateEvaluation} />
        <RatingField name="learning_environment" label="The learning environment helped me focus and participate." value={evaluation.learning_environment} onChange={updateEvaluation} />
        <RatingField name="learning_resources" label="The learning materials and resources supported my learning." value={evaluation.learning_resources} onChange={updateEvaluation} />
      </div>

      <div className="evaluation-group">
        <h3>Overall</h3>
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

      <button className="button primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Submit feedback"}
      </button>
      {status && <p className="form-message" role="status">{status}</p>}
    </form>
  );
}
