import "./MetricCard.css";

// Used for admin KPI tiles and passenger "Delay Prediction" style stat blocks.
export default function MetricCard({ icon, label, value, trend, trendTone = "neutral", tone = "default" }) {
  return (
    <div className={`rk-metric-card rk-metric-${tone}`}>
      {icon && <div className="rk-metric-icon">{icon}</div>}
      <div className="rk-metric-body">
        <p className="rk-metric-label">{label}</p>
        <p className="rk-metric-value">{value}</p>
        {trend && <p className={`rk-metric-trend rk-trend-${trendTone}`}>{trend}</p>}
      </div>
    </div>
  );
}
