import { formatDelay } from "../../utils/format";
import "./DelayReasonList.css";

// The passenger-facing "Why is my ETA changing?" breakdown — plain-language
// factor labels, never raw model/SHAP terminology.
export default function DelayReasonList({ factors, currentDelay, predictedFinalDelay }) {
  return (
    <div className="rk-reason-list">
      <div className="rk-reason-row rk-reason-current">
        <span>Current delay</span>
        <span>{formatDelay(currentDelay)}</span>
      </div>
      {factors.map((f) => (
        <div className="rk-reason-row" key={f.label}>
          <span>{f.label}</span>
          <span className={f.minutes < 0 ? "rk-reason-good" : "rk-reason-bad"}>
            {f.minutes > 0 ? "+" : ""}
            {f.minutes} min
          </span>
        </div>
      ))}
      <div className="rk-reason-row rk-reason-total">
        <span>Predicted final delay</span>
        <span>{formatDelay(predictedFinalDelay)}</span>
      </div>
    </div>
  );
}
