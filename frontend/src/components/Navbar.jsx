import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <NavLink className="brand" to="/" aria-label="Centram home">
          <span className="brand-logo-frame">
            <img className="brand-logo" src="/assets/centram-logo-cropped.png" alt="Centram Centre for Applied Artificial Intelligence" />
          </span>
        </NavLink>

        <button
          className={`nav-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="site-navigation" className={`site-nav${menuOpen ? " is-open" : ""}`}>
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
