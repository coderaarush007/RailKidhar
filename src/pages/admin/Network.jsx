import NetworkMap from "../../components/admin/NetworkMap";
import NetworkInsightRow from "../../components/common/NetworkInsightRow";
import DelayPropagationView from "../../components/admin/DelayPropagationView";
import StatusBadge from "../../components/common/StatusBadge";
import useAllTrainRows from "../../hooks/useAllTrainRows";
import { useSimulation } from "../../context/SimulationContext";
import { getCongestion, getNetworkStatus } from "../../services/networkService";
import { getTrainByNumber } from "../../services/trainService";
import "./Network.css";

export default function Network() {
  const rows = useAllTrainRows();
  const { activeScenarios, focusTrainNumber } = useSimulation();
  const sections = getCongestion(activeScenarios);
  const zones = getNetworkStatus();
  const risks = sections.filter((s) => s.status !== "normal");

  const propagationSection = sections.find((s) => s.id === "BRC-RTM");
  const focusTrain = getTrainByNumber(focusTrainNumber);
  const affectedTrains = rows
    .map((r) => r.train)
    .filter(
      (t) =>
        t.number !== focusTrainNumber &&
        (t.currentStationCode === propagationSection?.fromCode || t.currentStationCode === propagationSection?.toCode)
    )
    .slice(0, 2);

  return (
    <div className="rk-network-page">
      <div className="rk-card rk-network-map-card">
        <p className="rk-section-title">Live Railway Network</p>
        <p className="rk-section-subtitle">Stations as nodes, track sections as edges — corridor MVP</p>
        <NetworkMap sections={sections} trains={rows.map((r) => r.train)} />
      </div>

      <div className="rk-network-grid">
        <div className="rk-card">
          <p className="rk-section-title">Network Insights</p>
          {risks.length === 0 ? (
            <p className="rk-section-subtitle">All sections normal.</p>
          ) : (
            risks.map((s) => <NetworkInsightRow key={s.id} section={s} />)
          )}
        </div>

        <div className="rk-card">
          <p className="rk-section-title">Zone Status</p>
          <div className="rk-network-zones">
            {zones.map((z) => (
              <div key={z.name} className="rk-network-zone-row">
                <span>{z.name}</span>
                <StatusBadge status={z.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {focusTrain && (
        <DelayPropagationView focusTrain={focusTrain} section={propagationSection} affectedTrains={affectedTrains} />
      )}
    </div>
  );
}
