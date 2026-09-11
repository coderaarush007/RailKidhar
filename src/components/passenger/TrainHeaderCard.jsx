import StatusBadge from "../common/StatusBadge";
import { formatDelay } from "../../utils/format";
import "./TrainHeaderCard.css";

export default function TrainHeaderCard({ train, currentDelay }) {
  return (
    <div className="rk-card rk-train-header">
      <div className="rk-train-header-left">
        <span className="rk-train-number">{train.number}</span>
        <div>
          <p className="rk-train-name">{train.name}</p>
          <p className="rk-train-route">
            {train.origin} → {train.destination}
          </p>
        </div>
      </div>
      <div className="rk-train-header-right">
        <StatusBadge status={train.status} />
        <div className="rk-train-delay-chip">
          <span>Current delay</span>
          <strong className={currentDelay > 0 ? "late" : "ontime"}>{formatDelay(currentDelay)}</strong>
        </div>
      </div>
    </div>
  );
}
