import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <article className="course-card">
      <img src={course.image_url} alt={course.title} />

      <div className="course-card-body">
        <div className="tags">
          <span>{course.level}</span>
          <span>{course.delivery_mode}</span>
        </div>

        <h3>{course.title}</h3>

        <p>{course.description}</p>

        <div className="course-meta">
          <span>{course.duration}</span>

          <strong>
            {Number(course.price) === 0
              ? "Contact for pricing"
              : `UGX ${Number(course.price).toLocaleString()}`}
          </strong>
        </div>

        <div className="course-card-links">
          <Link
            className="text-link"
            to={`/courses/${course.id}`}
          >
            View course outline →
          </Link>

          <Link
            className="text-link"
            to={`/apply?course=${course.id}`}
          >
            Apply for this course →
          </Link>
        </div>
      </div>
    </article>
  );
}