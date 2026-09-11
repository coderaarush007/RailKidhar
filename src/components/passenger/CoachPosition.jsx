import "./CoachPosition.css";

const COACHES = ["E", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// Coach layout is illustrative only — the prototype has no per-coach GPS
// feed, so the highlighted coach is fixed rather than backend-driven.
export default function CoachPosition({ platform, direction, highlightedCoach = 6 }) {
  return (
    <div className="rk-card rk-coach-card">
      <div className="rk-coach-heading">
        <p className="rk-section-title">Coach Position (Live)</p>
      </div>
      <div className="rk-coach-row">
        {COACHES.map((c) => (
          <span key={c} className={`rk-coach ${c === highlightedCoach ? "rk-coach-active" : ""}`}>
            {c}
          </span>
        ))}
      </div>
      <p className="rk-coach-note">● You are here</p>
      <div className="rk-coach-footer">
        <span>
          Platform: <strong>{platform}</strong>
        </span>
        <span>
          Direction: <strong>{direction}</strong>
        </span>
      </div>
    </div>
  );
}
