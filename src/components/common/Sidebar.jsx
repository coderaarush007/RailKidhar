import { NavLink } from "react-router-dom";
import Icon from "./Icon";
import "./Sidebar.css";

// Shared left navigation shell for both the passenger app and the admin
// ops panel — same component, different nav items/branding, per the
// "same product, different density" requirement.
export default function Sidebar({ subtitle, navItems, footer }) {
  return (
    <aside className="rk-sidebar">
      <div className="rk-sidebar-brand">
        <span className="rk-logo-mark">
          <Icon name="train" size={20} />
        </span>
        <div>
          <p className="rk-logo-name">RailKidhar</p>
          {subtitle && <p className="rk-logo-subtitle">{subtitle}</p>}
        </div>
      </div>

      <nav className="rk-sidebar-nav" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `rk-sidebar-link${isActive ? " rk-sidebar-link-active" : ""}`}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
            {item.badge ? <span className="rk-sidebar-badge">{item.badge}</span> : null}
          </NavLink>
        ))}
      </nav>

      <div className="rk-sidebar-footer">{footer}</div>
    </aside>
  );
}
