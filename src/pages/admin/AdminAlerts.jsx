import AlertRow from "../../components/common/AlertRow";
import { EmptyState } from "../../components/common/States";
import { useSimulation } from "../../context/SimulationContext";
import { getAlerts } from "../../services/alertService";
import "./AdminAlerts.css";

export default function AdminAlerts() {
  const { liveAlerts } = useSimulation();
  const alerts = getAlerts(liveAlerts);

  return (
    <div className="rk-card rk-admin-alerts">
      <p className="rk-section-title">Alerts</p>
      <p className="rk-section-subtitle">Operational alerts across the corridor, including live simulation events.</p>
      {alerts.length === 0 ? (
        <EmptyState title="No alerts" detail="Network is quiet." />
      ) : (
        <div className="rk-admin-alerts-list">
          {alerts.map((a) => (
            <AlertRow key={a.id} alert={a} />
          ))}
        </div>
      )}
    </div>
  );
}
