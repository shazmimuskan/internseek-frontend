import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Resume", path: "/resume" },
    { name: "Interview", path: "/questions" },
  ];

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <div className="brand-icon">
          <Sparkles size={18} />
        </div>

        <div>
          <span className="brand-name">InternSeek</span>
          <span className="brand-ai">AI</span>
        </div>
      </NavLink>

      <div className="navbar-links">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `navbar-link ${isActive ? "navbar-link-active" : ""}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;