import { useState } from "react";
import Icon from "../../components/common/Icon";
import "./HelpSupport.css";

const FAQS = [
  {
    q: "How is the predicted ETA different from the current delay?",
    a: "Current delay is how late the train is right now. Predicted ETA also accounts for what's likely to happen ahead — congestion, dwell time, speed restrictions, and historical recovery — before the train arrives.",
  },
  {
    q: "What does the confidence percentage mean?",
    a: "It's a demo estimate of how certain the prediction is, shown alongside a likely time range. It is not the same as model accuracy, and isn't a validated figure in this prototype.",
  },
  {
    q: "Why did my train's ETA suddenly change?",
    a: "Open the train's \"Why is my ETA changing?\" section — it lists the specific factors (e.g. junction congestion, speed restrictions, expected recovery) and how many minutes each contributes.",
  },
  {
    q: "Is this connected to live railway data?",
    a: "No — this prototype runs on public timetable patterns and simulated movement/events, clearly marked SIMULATION MODE throughout. It's built to demonstrate the prediction concept, not to replace official railway information.",
  },
  {
    q: "Where do I check my booking (PNR) status?",
    a: "Use PNR Check in the sidebar. It's an illustrative demo only — it does not query a real reservation system.",
  },
];

export default function HelpSupport() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="rk-help-page">
      <div className="rk-card rk-help-faq">
        <p className="rk-section-title">Frequently asked questions</p>
        <div className="rk-help-list">
          {FAQS.map((item, i) => (
            <div key={item.q} className="rk-help-item">
              <button
                type="button"
                className="rk-help-question"
                aria-expanded={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <span>{item.q}</span>
                <Icon name={openIndex === i ? "chevronDown" : "chevronRight"} size={16} />
              </button>
              {openIndex === i && <p className="rk-help-answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="rk-card rk-help-contact">
        <p className="rk-section-title">Still need help?</p>
        <p className="rk-section-subtitle">
          This is a hackathon prototype (SIH26028) without a live support desk. In production this panel would
          route to the operator's passenger helpline.
        </p>
      </div>
    </div>
  );
}
