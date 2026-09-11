import Icon from "./Icon";
import { getStationByCode } from "../../data/mockStations";
import "./NetworkInsightRow.css";

const SEVERITY_BY_STATUS = { congested: "danger", cascade_risk: "danger", restricted: "warning" };

export default function NetworkInsightRow({ section, stationName }) {
  const severity = SEVERITY_BY_STATUS[section.status] || "warning";
  const label =
    stationName ||
    `${getStationByCode(section.fromCode)?.name || section.fromCode} → ${getStationByCode(section.toCode)?.name || section.toCode}`;
  return (
    <div className={`rk-insight-row rk-insight-${severity}`}>
      <span className="rk-insight-icon">
        <Icon name="alertTriangle" size={15} />
      </span>
      <div className="rk-insight-body">
        <p className="rk-insight-title">{section.label}</p>
        <p className="rk-insight-route">{label}</p>
        <p className="rk-insight-meta">{section.trainsAffected} trains affected</p>
      </div>
      <span className="rk-insight-impact">
        +{section.impactRangeMin[0]} to +{section.impactRangeMin[1]} min
      </span>
    </div>
  );
}
