import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api";

export default function Apply() {
  const [params] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", education_level: "", course_id: params.get("course") || "", motivation: "" });
  useEffect(() => { api.getCourses().then(setCourses).catch(console.error); }, []);
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault(); setMessage("Submitting...");
    try { await api.apply({ ...form, course_id: Number(form.course_id) }); setMessage("Application submitted successfully. Our admissions team will contact you."); }
    catch (error) { setMessage(error.message); }
  };
  return <main className="page-section container narrow"><div className="page-header"><span className="eyebrow">ADMISSIONS</span><h1>Apply to Centram AI.</h1></div><form className="form-card" onSubmit={submit}><div className="form-grid"><label>Full name<input required name="full_name" value={form.full_name} onChange={update} /></label><label>Email<input required type="email" name="email" value={form.email} onChange={update} /></label><label>Phone<input required name="phone" value={form.phone} onChange={update} /></label><label>Education level<input required name="education_level" value={form.education_level} onChange={update} /></label></div><label>Course<select required name="course_id" value={form.course_id} onChange={update}><option value="">Select a course</option>{courses.map(c => <option value={c.id} key={c.id}>{c.title}</option>)}</select></label><label>Why do you want to join this programme?<textarea required minLength="20" name="motivation" value={form.motivation} onChange={update} /></label><button className="button primary" type="submit">Submit Application</button>{message && <p className="form-message">{message}</p>}</form></main>;
}
