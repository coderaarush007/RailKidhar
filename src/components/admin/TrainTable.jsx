import { useNavigate } from "react-router-dom";
import StatusBadge from "../common/StatusBadge";
import Icon from "../common/Icon";
import { getStationByCode } from "../../data/mockStations";
import { formatDelay, to12Hour } from "../../utils/format";
import "./TrainTable.css";

export default function TrainTable({ rows }) {
  const navigate = useNavigate();

  return (
    <div className="rk-train-table-wrap">
      <table className="rk-train-table">
        <thead>
          <tr>
            <th>Train</th>
            <th className="rk-hide-tablet">Route</th>
            <th>Current Location</th>
            <th>Delay</th>
            <th>Predicted ETA</th>
            <th className="rk-hide-tablet">Confidence / Range</th>
            <th>Status</th>
            <th aria-label="Action" />
          </tr>
        </thead>
        <tbody>
          {rows.map(({ train, prediction }) => (
            <tr key={train.id} onClick={() => navigate(`/admin/live-trains/${train.number}`)}>
              <td className="rk-train-cell">
                <strong>{train.number}</strong>
                <span>{train.name}</span>
              </td>
              <td className="rk-hide-tablet">
                {train.origin} → {train.destination}
              </td>
              <td>{getStationByCode(train.currentStationCode)?.name}</td>
              <td className={prediction.currentDelay > 0 ? "rk-delay-late" : "rk-delay-ontime"}>
                {formatDelay(prediction.currentDelay)}
              </td>
              <td>{to12Hour(prediction.predictedETA)}</td>
              <td className="rk-hide-tablet">
                {prediction.confidence}% · {to12Hour(prediction.range[0])}–{to12Hour(prediction.range[1])}
              </td>
              <td>
                <StatusBadge status={train.status} />
              </td>
              <td>
                <Icon name="chevronRight" size={16} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
