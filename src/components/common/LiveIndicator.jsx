import { formatTimeAgo } from "../../utils/format";
import "./LiveIndicator.css";

export default function LiveIndicator({ isRunning = true, secondsAgo }) {
  return (
    <div className="rk-live-indicator">
      <span className={`rk-live-dot ${isRunning ? "rk-live-on" : "rk-live-paused"}`} aria-hidden="true" />
      <span>{isRunning ? "Live" : "Paused"}</span>
      {typeof secondsAgo === "number" && (
        <span className="rk-live-updated">· Updated {formatTimeAgo(secondsAgo)}</span>
      )}
    </div>
  );
}
