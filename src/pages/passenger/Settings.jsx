import { useEffect, useState } from "react";
import "./Settings.css";

function getStoredTheme() {
  try {
    return localStorage.getItem("rk-theme") || "system";
  } catch {
    return "system";
  }
}

export default function Settings() {
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    try {
      localStorage.setItem("rk-theme", theme);
    } catch {
      // storage unavailable (private browsing) — theme just won't persist
    }
  }, [theme]);

  return (
    <div className="rk-card rk-settings-page">
      <p className="rk-section-title">Settings</p>

      <div className="rk-settings-row">
        <div>
          <p className="rk-settings-label">Dark mode</p>
          <p className="rk-settings-hint">Applies across RailKidhar.</p>
        </div>
        <button
          type="button"
          className={`rk-toggle ${theme === "dark" ? "rk-toggle-on" : ""}`}
          role="switch"
          aria-checked={theme === "dark"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span />
        </button>
      </div>

      <div className="rk-settings-divider" />

      <div className="rk-settings-note">
        <p className="rk-settings-label">About this prototype</p>
        <p className="rk-settings-hint">
          RailKidhar (SIH26028) runs on simulated and public timetable data for this demo. Predictions and
          confidence values shown throughout the app are illustrative, not calibrated model output.
        </p>
      </div>
    </div>
  );
}
