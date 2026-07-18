import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";

function CourseDetails() {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getCourseDetails(id)
      .then((data) => {
        setCourseData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="page-section">
        <div className="container">
          <p>Loading course...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-section">
        <div className="container">
          <p>{error}</p>
        </div>
      </main>
    );
  }

  const { course, modules } = courseData;

  return (
    <main>
      <section className="course-detail-header">
        <div className="container">
          <span className="eyebrow">CENTRAM AI TRAINING</span>

          <h1>{course.title}</h1>

          <p>{course.description}</p>

          <div className="course-detail-meta">
            <span>
              <strong>Duration:</strong> {course.duration}
            </span>

            <span>
              <strong>Format:</strong> {course.delivery_mode}
            </span>

            <span>
              <strong>Level:</strong> {course.level}
            </span>
          </div>

          <Link to={`/apply?course=${course.id}`} className="button primary">
            Apply for this course
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container course-detail-layout">
          <div>
            <h2>Course Outline</h2>

            <div className="module-list">
              {modules.map((module, index) => (
                <article className="module-card" key={module.id}>
                  <span className="module-number">
                    Module {index + 1}
                  </span>

                  <h3>{module.title}</h3>

                  {module.objective && (
                    <p className="module-objective">
                      <strong>Objective:</strong> {module.objective}
                    </p>
                  )}

                  <ol>
                    {module.topics.map((topic) => (
                      <li key={topic.id}>
                        <strong>{topic.title}</strong>

                        {topic.description && (
                          <p>{topic.description}</p>
                        )}
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>

          <aside className="course-sidebar">
            <div className="course-info-card">
              <h3>Who should attend?</h3>
              <p>
                Professionals and organisational teams seeking practical,
                responsible applications of AI in this field.
              </p>

              <Link to={`/apply?course=${course.id}`} className="button primary">
                Apply Now
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default CourseDetails;
