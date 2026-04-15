import "./Navbar.css";
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────────────────────────
   Navbar Component
   
   Props:
     activeNav  — string, currently active nav label (controlled from parent)
     onNavChange — (label: string) => void, called when a nav item is clicked
   
   Usage:
     <Navbar activeNav={activeNav} onNavChange={setActiveNav} />
───────────────────────────────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: "Browse",      icon: "🍽️" },
  { label: "Ingredients", icon: "🥦" },
  { label: "Meal Plan",   icon: "📅" },
  { label: "Favorites",   icon: "❤️" },
];

export default function Navbar({ activeNav = "Browse", onNavChange = () => {} }) {
  return (
    <aside className="navbar">

        {/* Brand */}
        <div className="navbar-brand">
          <span className="navbar-brand-icon">🥘</span>
          <div>
            <Link to={'/'} className="navbar-brand-name">Recipe<br />Dashboard</Link>
          </div>
        </div>

        {/* Nav items */}
        <nav className="navbar-nav">
          {NAV_ITEMS.map(({ label, icon }) => (
            <button
              key={label}
              className={`navbar-item ${activeNav === label ? "navbar-active" : ""}`}
              onClick={() => onNavChange(label)}
            >
              <span className="navbar-item-icon">{icon}</span>
              {label}
            </button>
          ))}
        </nav>

      </aside>
  );
}