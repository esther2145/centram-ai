import { Link } from "react-router-dom";
import EvaluationForm from "../components/EvaluationForm";

export default function Evaluation() {
  return (
    <main>
      <section className="evaluation-page-header">
        <div className="container">
          <Link className="evaluation-back-link" to="/">← Centram home</Link>
          <span className="eyebrow">YOUR FEEDBACK MATTERS</span>
          <h1>Help us make every learning experience better.</h1>
          <p>Share your thoughts about the session, your experience, and the programme overall. Your feedback helps us improve.</p>
        </div>
      </section>
      <section className="evaluation-page-form">
        <div className="container evaluation-form-container">
          <p className="evaluation-time-note">About 3 minutes · Name and email are optional</p>
          <EvaluationForm />
        </div>
      </section>
    </main>
  );
}
