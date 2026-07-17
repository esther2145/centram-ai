import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";

export default function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getCourse(id)
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("The course could not be loaded.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="page-section container">
        <p>Loading course...</p>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="page-section container">
        <h1>Course not found</h1>
        <p>{error}</p>

        <Link to="/courses" className="text-link">
          Return to courses
        </Link>
      </main>
    );
  }

  return (
    <main>
      <section className="course-detail-header">
        <div className="container">
          <span className="eyebrow light">
            CENTRAM AI PROGRAMME
          </span>

          <h1>{course.title}</h1>

          <p>{course.description}</p>

          <div className="course-detail-meta">
            <span>
              <strong>Duration:</strong> {course.duration}
            </span>

            <span>
              <strong>Level:</strong> {course.level}
            </span>

            <span>
              <strong>Delivery:</strong> {course.delivery_mode}
            </span>
          </div>

          <Link
            to={`/apply?course=${course.id}`}
            className="button primary"
          >
            Apply for this course
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Course overview</h2>

          <p>{course.overview || course.description}</p>

          <h2>Course outline</h2>

          {course.modules?.length > 0 ? (
            <div className="module-list">
              {course.modules.map((module, index) => (
                <article
                  className="module-card"
                  key={module.id || index}
                >
                  <span className="module-number">
                    Module {index + 1}
                  </span>

                  <h3>{module.title}</h3>

                  {module.objective && (
                    <p>
                      <strong>Objective:</strong> {module.objective}
                    </p>
                  )}

                  {module.topics?.length > 0 && (
                    <ol>
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topic.id || topicIndex}>
                          {typeof topic === "string"
                            ? topic
                            : topic.title}
                        </li>
                      ))}
                    </ol>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p>
              The full course outline will be available soon.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}