import { useState } from "react";
import "./LanguageSwitcher.css";

// Visual parity with the reference design's language picker. Honest about
// scope: this prototype has no i18n layer, so switching away from English
// surfaces a plain notice instead of silently doing nothing.
export default function LanguageSwitcher() {
  const [lang, setLang] = useState("en");
  const [notice, setNotice] = useState(false);

  const onChange = (e) => {
    const value = e.target.value;
    setLang(value);
    setNotice(value !== "en");
  };

  return (
    <div className="rk-lang-switcher">
      <select className="rk-lang-select" value={lang} onChange={onChange} aria-label="Language">
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
      {notice && (
        <div className="rk-lang-notice" role="status">
          हिंदी translation isn't available in this prototype yet.
          <button type="button" aria-label="Dismiss" onClick={() => setNotice(false)}>
            ×
          </button>
        </div>
      )}
    </div>
  );
}
