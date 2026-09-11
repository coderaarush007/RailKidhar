import Icon from "../common/Icon";
import NetworkInsightRow from "../common/NetworkInsightRow";
import { getStationByCode } from "../../data/mockStations";
import "./RouteRiskCard.css";

// Finds the sections ahead of the train's current stop that are not
// "normal", in order, so the passenger sees what's coming before it hits.
function sectionsAhead(stops, currentStationCode, congestionSections) {
  const currentIndex = stops.findIndex((s) => s.code === currentStationCode);
  if (currentIndex < 0) return [];
  const upcomingCodes = stops.slice(currentIndex).map((s) => s.code);
  return congestionSections.filter(
    (sec) => sec.status !== "normal" && upcomingCodes.includes(sec.fromCode) && upcomingCodes.includes(sec.toCode)
  );
}

export default function RouteRiskCard({ stops, currentStationCode, congestionSections }) {
  const risks = sectionsAhead(stops, currentStationCode, congestionSections);

  return (
    <div className="rk-card rk-risk-card">
      <p className="rk-section-title">Upcoming Route Conditions</p>
      <p className="rk-section-subtitle">Predicted before it happens — not just where the train is now.</p>

      <div className="rk-risk-flow">
        <span><Icon name="train" size={14} /> Train</span>
        <Icon name="chevronRight" size={14} />
        <span>Current section</span>
        <Icon name="chevronRight" size={14} />
        <span className={risks.length ? "rk-risk-flow-warn" : ""}>
          {risks.length ? "⚠ Congestion ahead" : "Clear ahead"}
        </span>
        <Icon name="chevronRight" size={14} />
        <span>Updated ETA</span>
      </div>

      {risks.length === 0 ? (
        <p className="rk-risk-empty">No congestion or restrictions reported on the remaining route.</p>
      ) : (
        <div className="rk-risk-list">
          {risks.map((section) => (
            <NetworkInsightRow
              key={section.id}
              section={section}
              stationName={`${getStationByCode(section.fromCode)?.name} → ${getStationByCode(section.toCode)?.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
