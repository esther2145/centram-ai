import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <NavLink className="brand" to="/">
          <span className="brand-mark">C</span>
          <span>Centram <strong>AI</strong></span>
        </NavLink>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/about">About</NavLink>
          
          <NavLink to="/contact">Contact</NavLink>
          <NavLink className="nav-button" to="/apply">Apply Now</NavLink>
        </nav>
      </div>
    </header>
  );
}
