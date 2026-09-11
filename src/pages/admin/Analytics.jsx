import MetricCard from "../../components/common/MetricCard";
import Icon from "../../components/common/Icon";
import "./Analytics.css";

const METRICS = [
  { label: "MAE (primary metric)", value: "—" },
  { label: "RMSE", value: "—" },
  { label: "Within ±5 min", value: "—" },
  { label: "Within ±10 min", value: "—" },
];

export default function Analytics() {
  return (
    <div className="rk-analytics">
      <div className="rk-card rk-analytics-banner">
        <Icon name="barChart" size={18} />
        <div>
          <p className="rk-section-title">Evaluation pending</p>
          <p className="rk-section-subtitle">
            No backend/ML evaluation has run against this prototype yet. These tiles are wired to accept real
            metrics from the ML service — MAE as the primary ETA error metric, RMSE and ±5/±10 min hit rates as
            supporting measures — the moment they're available.
          </p>
        </div>
      </div>

      <div className="rk-analytics-grid">
        {METRICS.map((m) => (
          <MetricCard key={m.label} icon={<Icon name="gauge" size={18} />} label={m.label} value={m.value} />
        ))}
      </div>

      <div className="rk-card rk-analytics-baseline">
        <p className="rk-section-title">Baseline vs ML</p>
        <p className="rk-section-subtitle">Schedule + current delay vs. historical median vs. ML prediction</p>
        <div className="rk-baseline-rows">
          {["Schedule + Current Delay", "Historical Median", "ML Prediction"].map((label) => (
            <div key={label} className="rk-baseline-row">
              <span>{label}</span>
              <span className="rk-baseline-pending">Evaluation pending</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
