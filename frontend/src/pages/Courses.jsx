import { useEffect, useState } from "react";
import { api } from "../api";
import CourseCard from "../components/CourseCard";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All");

  useEffect(() => {
  api.getCourses()
    .then((data) => {
      console.log("Courses from API:", data);
      setCourses(data);
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}, []);
  
  const filtered = courses.filter((course) =>
    course.title.toLowerCase().includes(query.toLowerCase()) &&
    (level === "All" || course.level === level)
  );

  return (
    <main className="page-section container">
      <div className="page-header"><span className="eyebrow">PROGRAMMES</span><h1>Find your next AI course.</h1><p>Choose a programme based on your experience, goals and preferred learning mode.</p></div>
      <div className="filters">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses..." />
      </div>
      <div className="card-grid">{filtered.map((course) => <CourseCard key={course.id} course={course} />)}</div>
    </main>
  );
}
