import { useState } from "react";
import { api } from "../api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => { e.preventDefault(); try { await api.contact(form); setStatus("Message sent successfully."); setForm({ name: "", email: "", subject: "", message: "" }); } catch (error) { setStatus(error.message); } };
  return <main className="page-section container contact-grid"><div><span className="eyebrow">CONTACT US</span><h1>Let’s discuss your learning goals.</h1><p>Contact us for course guidance, partnerships, corporate training or general enquiries.</p><div className="contact-details"><p><strong>Email:</strong> hello@centram.ai</p><p><strong>Phone:</strong> +256 700 000 000</p><p><strong>Location:</strong> Kampala, Uganda</p></div></div><form className="form-card" onSubmit={submit}><label>Name<input required name="name" value={form.name} onChange={update} /></label><label>Email<input required type="email" name="email" value={form.email} onChange={update} /></label><label>Subject<input required name="subject" value={form.subject} onChange={update} /></label><label>Message<textarea required minLength="10" name="message" value={form.message} onChange={update} /></label><button className="button primary">Send Message</button>{status && <p className="form-message">{status}</p>}</form></main>;
}
