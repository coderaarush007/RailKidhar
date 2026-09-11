import { useState } from "react";
import Icon from "./Icon";
import LiveIndicator from "./LiveIndicator";
import "./TopBar.css";

// Shared top bar: search + live status on the left, arbitrary actions
// (notifications, profile, theme toggle) passed in as children.
export default function TopBar({ searchPlaceholder, onSearchSubmit, isRunning, secondsAgo, children }) {
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit(query);
  };

  return (
    <header className="rk-topbar">
      <form className="rk-topbar-search" onSubmit={submit} role="search">
        <Icon name="search" size={16} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label="Search"
        />
      </form>

      <div className="rk-topbar-right">
        <LiveIndicator isRunning={isRunning} secondsAgo={secondsAgo} />
        {children}
      </div>
    </header>
  );
}
