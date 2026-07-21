import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api";

const EDUCATION_LEVELS = ["Certificate", "Diploma", "Undergraduate", "Postgraduate"];

const COUNTRIES = [
  { name: "Uganda", code: "+256", min: 9, max: 9, example: "7XXXXXXXX" },
  { name: "Kenya", code: "+254", min: 9, max: 9, example: "7XXXXXXXX" },
  { name: "Tanzania", code: "+255", min: 9, max: 9, example: "7XXXXXXXX" },
  { name: "Rwanda", code: "+250", min: 9, max: 9, example: "7XXXXXXXX" },
  { name: "Burundi", code: "+257", min: 8, max: 8, example: "XXXXXXXX" },
  { name: "South Sudan", code: "+211", min: 9, max: 9, example: "9XXXXXXXX" },
  { name: "DR Congo", code: "+243", min: 9, max: 9, example: "8XXXXXXXX" },
  { name: "Ethiopia", code: "+251", min: 9, max: 9, example: "9XXXXXXXX" },
  { name: "Somalia", code: "+252", min: 8, max: 9, example: "XXXXXXXX" },
  { name: "Zambia", code: "+260", min: 9, max: 9, example: "9XXXXXXXX" },
  { name: "Zimbabwe", code: "+263", min: 9, max: 9, example: "7XXXXXXXX" },
  { name: "Malawi", code: "+265", min: 9, max: 9, example: "8XXXXXXXX" },
  { name: "Nigeria", code: "+234", min: 10, max: 10, example: "8XXXXXXXXX" },
  { name: "Ghana", code: "+233", min: 9, max: 9, example: "2XXXXXXXX" },
  { name: "South Africa", code: "+27", min: 9, max: 9, example: "8XXXXXXXX" },
  { name: "United Kingdom", code: "+44", min: 10, max: 10, example: "7XXXXXXXXX" },
  { name: "United States / Canada", code: "+1", min: 10, max: 10, example: "XXXXXXXXXX" },
];

export default function Apply() {
  const [params] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState("+256");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    education_level: "",
    course_id: params.get("course") || "",
    motivation: "",
  });

  const selectedCountry = COUNTRIES.find((country) => country.code === countryCode) || COUNTRIES[0];

  useEffect(() => {
    api.getCourses().then(setCourses).catch((error) => setMessage(error.message));
  }, []);

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const updatePhone = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, "");
    setPhoneNumber(digitsOnly.slice(0, selectedCountry.max));
  };

  const changeCountry = (event) => {
    setCountryCode(event.target.value);
    setPhoneNumber("");
  };

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("Submitting...");

    try {
      await api.apply({
        ...form,
        phone: `${countryCode}${phoneNumber}`,
        course_id: Number(form.course_id),
      });
      setMessage("Application submitted successfully. Our admissions team will contact you.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-section container narrow">
      <div className="page-header">
        <span className="eyebrow">ADMISSIONS</span>
        <h1>Apply to Centram AI.</h1>
        <p>Complete the required information below and our admissions team will contact you.</p>
      </div>

      <form className="form-card" onSubmit={submit}>
        <p className="required-note"><span aria-hidden="true">*</span> Required field</p>

        <div className="form-grid">
          <label>
            <span className="field-label">Full name <span className="required-mark" aria-hidden="true">*</span></span>
            <input required name="full_name" autoComplete="name" value={form.full_name} onChange={update} />
          </label>

          <label>
            <span className="field-label">Email <span className="required-mark" aria-hidden="true">*</span></span>
            <input required type="email" name="email" autoComplete="email" value={form.email} onChange={update} />
          </label>

          <label>
            <span className="field-label">Education level <span className="required-mark" aria-hidden="true">*</span></span>
            <select required name="education_level" value={form.education_level} onChange={update}>
              <option value="">Select education level</option>
              {EDUCATION_LEVELS.map((level) => <option value={level} key={level}>{level}</option>)}
            </select>
          </label>

          <label>
            <span className="field-label">Country code <span className="required-mark" aria-hidden="true">*</span></span>
            <select required value={countryCode} onChange={changeCountry} aria-label="Phone country code">
              {COUNTRIES.map((country) => (
                <option value={country.code} key={`${country.name}-${country.code}`}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          <span className="field-label">Phone number <span className="required-mark" aria-hidden="true">*</span></span>
          <div className="phone-input-group">
            <span>{countryCode}</span>
            <input
              required
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              value={phoneNumber}
              onChange={updatePhone}
              minLength={selectedCountry.min}
              maxLength={selectedCountry.max}
              pattern={`[0-9]{${selectedCountry.min},${selectedCountry.max}}`}
              placeholder={selectedCountry.example}
              aria-describedby="phone-help"
            />
          </div>
          <small id="phone-help" className="field-help">
            Enter {selectedCountry.min === selectedCountry.max ? selectedCountry.min : `${selectedCountry.min}–${selectedCountry.max}`} digits without the leading zero.
          </small>
        </label>

        <label>
          <span className="field-label">Course <span className="required-mark" aria-hidden="true">*</span></span>
          <select required name="course_id" value={form.course_id} onChange={update}>
            <option value="">Select a course</option>
            {courses.map((course) => <option value={course.id} key={course.id}>{course.title}</option>)}
          </select>
        </label>

        <label>
          <span className="field-label">Why do you want to join this programme? <span className="optional-label">Optional</span></span>
          <textarea name="motivation" maxLength="1000" value={form.motivation} onChange={update} />
        </label>

        <button className="button primary" type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
        {message && <p className="form-message" role="status">{message}</p>}
      </form>
    </main>
  );
}
