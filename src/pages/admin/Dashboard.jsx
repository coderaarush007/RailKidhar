import { Link } from "react-router-dom";
import MetricCard from "../../components/common/MetricCard";
import Icon from "../../components/common/Icon";
import AlertRow from "../../components/common/AlertRow";
import NetworkInsightRow from "../../components/common/NetworkInsightRow";
import StatusBadge from "../../components/common/StatusBadge";
import NetworkMap from "../../components/admin/NetworkMap";
import TrainTable from "../../components/admin/TrainTable";
import BrandPromoCard from "../../components/common/BrandPromoCard";
import useAllTrainRows from "../../hooks/useAllTrainRows";
import { useSimulation } from "../../context/SimulationContext";
import { getCongestion, getNetworkStatus } from "../../services/networkService";
import { getAlerts } from "../../services/alertService";
import { formatTimeAgo } from "../../utils/format";
import "./Dashboard.css";

export default function Dashboard() {
  const rows = useAllTrainRows();
  const { liveAlerts, lastUpdated, activeScenarios } = useSimulation();
  const congestion = getCongestion(activeScenarios);
  const zones = getNetworkStatus();
  const alerts = getAlerts(liveAlerts).slice(0, 5);
  const secondsAgo = Math.floor((Date.now() - lastUpdated) / 1000);

  const delayed = rows.filter((r) => r.train.status === "delayed").length;
  const critical = rows.filter((r) => r.train.status === "critical").length;
  const avgDelay = Math.round(rows.reduce((sum, r) => sum + r.prediction.currentDelay, 0) / rows.length);
  const insights = congestion.filter((s) => s.status !== "normal");

  return (
    <div className="rk-dashboard">
      <div className="rk-dashboard-heading">
        <div>
          <h1>Good Morning, Admin</h1>
          <p>Here's the latest status of the railway network.</p>
        </div>
        <div className="rk-dashboard-updated">
          <Icon name="refresh" size={14} />
          Last updated {formatTimeAgo(secondsAgo)}
        </div>
      </div>

      <div className="rk-dashboard-kpis">
        <MetricCard icon={<Icon name="train" size={18} />} label="Active Trains" value={rows.length} />
        <MetricCard icon={<Icon name="clock" size={18} />} label="Delayed Trains" value={delayed} trend={`${Math.round((delayed / rows.length) * 100)}% of fleet`} trendTone="up" />
        <MetricCard icon={<Icon name="alertTriangle" size={18} />} label="Critical Trains" value={critical} trendTone="up" />
        <MetricCard icon={<Icon name="barChart" size={18} />} label="Average Delay" value={`+${avgDelay} min`} trendTone="up" />
      </div>

      <div className="rk-dashboard-grid">
        <div className="rk-card rk-dashboard-map">
          <div className="rk-dashboard-map-head">
            <div>
              <p className="rk-section-title">Live Railway Network</p>
              <p className="rk-section-subtitle">Real-time train positions and network status</p>
            </div>
          </div>
          <NetworkMap sections={congestion} trains={rows.map((r) => r.train)} />
        </div>

        <div className="rk-card rk-dashboard-insights">
          <p className="rk-section-title">Network Insights</p>
          {insights.length === 0 ? (
            <p className="rk-section-subtitle">No active congestion or restrictions right now.</p>
          ) : (
            insights.map((s) => <NetworkInsightRow key={s.id} section={s} />)
          )}
          <Link to="/admin/network" className="rk-link rk-dashboard-view-all">
            View full network analysis →
          </Link>
        </div>
      </div>

      <div className="rk-dashboard-grid rk-dashboard-grid-secondary">
        <div className="rk-card">
          <div className="rk-dashboard-map-head">
            <p className="rk-section-title">Live Trains</p>
            <Link to="/admin/live-trains" className="rk-link">
              View all
            </Link>
          </div>
          <TrainTable rows={rows.slice(0, 5)} />
        </div>

        <div className="rk-dashboard-side">
          <div className="rk-card">
            <div className="rk-dashboard-map-head">
              <p className="rk-section-title">Recent Alerts</p>
              <Link to="/admin/alerts" className="rk-link">
                View all
              </Link>
            </div>
            {alerts.map((a) => (
              <AlertRow key={a.id} alert={a} />
            ))}
          </div>

          <div className="rk-card">
            <p className="rk-section-title">Network Status</p>
            <div className="rk-zone-list">
              {zones.map((z) => (
                <div key={z.name} className="rk-zone-row">
                  <span>{z.name}</span>
                  <span className="rk-zone-right">
                    <StatusBadge status={z.status} />
                    <span className="rk-zone-count">{z.trainsDelayed} delayed</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <BrandPromoCard icon="flag" title="Indian Railways" subtitle="Connecting a Stronger India" arrow />
        </div>
      </div>
    </div>
  );
}
