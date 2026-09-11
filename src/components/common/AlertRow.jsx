import Icon from "./Icon";
import "./AlertRow.css";

const ICON_BY_SEVERITY = { critical: "alertTriangle", warning: "alertTriangle", info: "zap" };

export default function AlertRow({ alert }) {
  return (
    <div className={`rk-alert-row rk-alert-${alert.severity}`}>
      <span className="rk-alert-icon">
        <Icon name={ICON_BY_SEVERITY[alert.severity] || "zap"} size={15} />
      </span>
      <div className="rk-alert-body">
        <p className="rk-alert-title">{alert.title}</p>
        <p className="rk-alert-detail">{alert.detail}</p>
      </div>
      <span className="rk-alert-time">{alert.minutesAgo === 0 ? "now" : `${alert.minutesAgo} min ago`}</span>
    </div>
  );
}
