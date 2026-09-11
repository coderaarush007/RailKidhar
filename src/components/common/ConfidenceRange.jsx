import { to12Hour } from "../../utils/format";
import "./ConfidenceRange.css";

// Communicates uncertainty explicitly — a range plus a labelled demo
// confidence figure, never presented as validated accuracy.
export default function ConfidenceRange({ range, confidence }) {
  return (
    <div className="rk-confidence">
      <div>
        <p className="rk-confidence-label">Likely range</p>
        <p className="rk-confidence-range">
          {to12Hour(range[0])} – {to12Hour(range[1])}
        </p>
      </div>
      <div className="rk-confidence-meter">
        <p className="rk-confidence-label">Confidence (demo estimate)</p>
        <div className="rk-confidence-bar">
          <div className="rk-confidence-fill" style={{ width: `${confidence}%` }} />
        </div>
        <p className="rk-confidence-pct">{confidence}%</p>
      </div>
    </div>
  );
}
