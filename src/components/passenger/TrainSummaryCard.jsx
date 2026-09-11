import { useNavigate } from "react-router-dom";
import Icon from "../common/Icon";
import StatusBadge from "../common/StatusBadge";
import { formatDelay } from "../../utils/format";
import "./TrainSummaryCard.css";

export default function TrainSummaryCard({ train }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="rk-train-summary"
      onClick={() => navigate(`/live-tracking?train=${train.number}`)}
    >
      <span className="rk-train-summary-icon">
        <Icon name="train" size={16} />
      </span>
      <div className="rk-train-summary-body">
        <p className="rk-train-summary-title">
          {train.number} {train.name}
        </p>
        <p className="rk-train-summary-route">
          {train.origin} → {train.destination}
        </p>
      </div>
      <div className="rk-train-summary-right">
        <StatusBadge status={train.status} />
        <span className={train.baseDelayMin > 0 ? "rk-train-summary-late" : "rk-train-summary-ontime"}>
          {formatDelay(train.baseDelayMin)}
        </span>
      </div>
    </button>
  );
}
