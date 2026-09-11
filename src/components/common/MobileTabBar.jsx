import { NavLink } from "react-router-dom";
import Icon from "./Icon";
import "./MobileTabBar.css";

// Sidebar hides below 860px; this bottom tab bar keeps navigation reachable
// on phones (360-412px target widths).
export default function MobileTabBar({ navItems }) {
  return (
    <nav className="rk-tabbar" aria-label="Primary">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `rk-tabbar-link${isActive ? " rk-tabbar-link-active" : ""}`}
        >
          <Icon name={item.icon} size={19} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
