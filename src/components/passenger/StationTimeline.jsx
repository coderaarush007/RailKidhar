import { addMinutesToTime, formatDelay, to12Hour } from "../../utils/format";
import "./StationTimeline.css";

// Interpolates a plausible per-stop delay curve between "on time at origin"
// and "predicted final delay at destination" — the backend will eventually
// supply true per-stop predictions; this keeps the timeline internally
// consistent with the headline ETA card in the meantime.
function interpolateDelay(index, lastIndex, currentIndex, currentDelay, finalDelay) {
  if (index === 0) return 0;
  if (index <= currentIndex) {
    return Math.round((currentDelay * index) / Math.max(currentIndex, 1));
  }
  const progress = (index - currentIndex) / Math.max(lastIndex - currentIndex, 1);
  return Math.round(currentDelay + (finalDelay - currentDelay) * progress);
}

export default function StationTimeline({ stops, currentStationCode, currentDelay, predictedFinalDelay }) {
  const currentIndex = stops.findIndex((s) => s.code === currentStationCode);
  const lastIndex = stops.length - 1;

  return (
    <ol className="rk-timeline">
      {stops.map((stop, i) => {
        const delay = interpolateDelay(i, lastIndex, currentIndex, currentDelay, predictedFinalDelay);
        const isPast = i < currentIndex;
        const isCurrent = i === currentIndex;
        const scheduled = stop.scheduledArrival || stop.scheduledDeparture;
        const predictedTime = scheduled ? addMinutesToTime(scheduled, delay) : null;

        return (
          <li key={stop.code} className={`rk-timeline-item ${isCurrent ? "rk-timeline-current" : ""}`}>
            <span className="rk-timeline-marker" aria-hidden="true">
              {isPast ? "✓" : isCurrent ? "●" : "○"}
            </span>
            <div className="rk-timeline-content">
              <div className="rk-timeline-heading">
                <p className="rk-timeline-station">
                  {stop.name} {stop.platform && <span className="rk-timeline-pf">{stop.platform}</span>}
                </p>
                {predictedTime && <p className="rk-timeline-time">{to12Hour(predictedTime)}</p>}
              </div>
              <div className="rk-timeline-sub">
                <span>{stop.km ? `${stop.km} km` : ""}{isCurrent ? " · Current location" : ""}</span>
                <span className={delay > 0 ? "rk-timeline-delay-late" : "rk-timeline-delay-ontime"}>
                  {formatDelay(delay)}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
