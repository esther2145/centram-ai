import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import CourseCard from "../components/CourseCard";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.getCourses().then(setCourses).catch(console.error);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">LEARN • BUILD • INNOVATE</span>
            <h1>Domain Specific artificial intelligence application for professionals</h1>
            <p>Centram AI equips professionals and organisations with industry-relevant artificial intelligence, machine learning and data skills.</p>
            <div className="hero-actions">
              <Link className="button primary" to="/courses">Explore Courses</Link>
              <Link className="button secondary" to="/about">Discover Centram AI</Link>
            </div>
            <div className="stats">
              <div><strong>20+</strong><span>Expert-led modules</span></div>
              <div><strong>500+</strong><span>Learners targeted</span></div>
              <div><strong>3</strong><span>Learning modes</span></div>
            </div>
          </div>
          <div className="hero-panel">
            <div className="floating-card card-one">Machine Learning</div>
            <div className="floating-card card-two">Generative AI</div>
            <div className="ai-orb">AI</div>
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

      <section className="section callout">
        <div className="container callout-inner">
          <div><span className="eyebrow light">CORPORATE TRAINING</span><h2>Prepare your organisation for an AI-powered future.</h2></div>
          <Link className="button light-button" to="/contact">Request Training</Link>
        </div>
      </section>
    </>
  );
}
