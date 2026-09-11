import AlertRow from "../../components/common/AlertRow";
import { EmptyState } from "../../components/common/States";
import { useSimulation } from "../../context/SimulationContext";
import { getAlerts } from "../../services/alertService";
import "./Alerts.css";

export default function Alerts() {
  const { liveAlerts } = useSimulation();
  const alerts = getAlerts(liveAlerts);

  return (
    <div className="rk-card rk-alerts-page">
      <p className="rk-section-title">Alerts</p>
      <p className="rk-section-subtitle">Network and journey alerts, simulated for this prototype.</p>
      {alerts.length === 0 ? (
        <EmptyState title="No alerts" detail="You're all caught up." />
      ) : (
        <div className="rk-alerts-page-list">
          {alerts.map((a) => (
            <AlertRow key={a.id} alert={a} />
          ))}
        </div>
      )}
    </div>
  );
}
