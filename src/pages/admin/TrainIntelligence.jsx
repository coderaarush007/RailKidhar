import { useParams, Link } from "react-router-dom";
import useLiveTrainUpdates from "../../hooks/useLiveTrainUpdates";
import { EmptyState } from "../../components/common/States";
import TrainHeaderCard from "../../components/passenger/TrainHeaderCard";
import RouteMap from "../../components/passenger/RouteMap";
import DelayReasonList from "../../components/common/DelayReasonList";
import ConfidenceRange from "../../components/common/ConfidenceRange";
import NetworkInsightRow from "../../components/common/NetworkInsightRow";
import SimulationControls from "../../components/admin/SimulationControls";
import DelayPropagationView from "../../components/admin/DelayPropagationView";
import { useSimulation } from "../../context/SimulationContext";
import { getCongestion } from "../../services/networkService";
import { getTrains } from "../../services/trainService";
import { to12Hour } from "../../utils/format";
import "./TrainIntelligence.css";

export default function TrainIntelligence() {
  const { trainNumber } = useParams();
  const { focusTrainNumber, activeScenarios } = useSimulation();
  const { train, prediction, route } = useLiveTrainUpdates(trainNumber);

  if (!train) {
    return <EmptyState title="Train not found" detail={`No train matches ${trainNumber}.`} />;
  }

  const congestion = getCongestion(activeScenarios);
  const isFocus = train.number === focusTrainNumber;
  const risks = congestion.filter((s) => s.status !== "normal");

  const propagationSection = congestion.find((s) => s.id === "BRC-RTM");
  const allTrains = getTrains();
  const affectedTrains = isFocus
    ? allTrains.filter(
        (t) =>
          t.number !== train.number &&
          (t.currentStationCode === propagationSection?.fromCode || t.currentStationCode === propagationSection?.toCode)
      ).slice(0, 2)
    : [];

  return (
    <div className="rk-train-intel">
      <Link to="/admin/live-trains" className="rk-link">
        ← Back to Live Trains
      </Link>

      <TrainHeaderCard train={train} currentDelay={prediction.currentDelay} />

      {isFocus ? (
        <SimulationControls />
      ) : (
        <p className="rk-intel-note">
          The interactive simulation demo runs on train {focusTrainNumber}. Open it from Live Trains to trigger
          congestion, dwell, restriction and recovery scenarios.
        </p>
      )}

      <div className="rk-intel-grid">
        <div className="rk-card rk-intel-map">
          <p className="rk-section-title">Live Map</p>
          <RouteMap
            train={train}
            stops={route.stops}
            hasFullRoute={route.hasFullRoute}
            congestionSections={congestion}
            prediction={prediction}
          />
        </div>

        <div className="rk-card rk-intel-summary">
          <p className="rk-section-title">Predicted ETA</p>
          <p className="rk-intel-eta">{to12Hour(prediction.predictedETA)}</p>
          <p className="rk-intel-eta-sub">Predicted final delay {prediction.predictedFinalDelay >= 0 ? "+" : ""}{prediction.predictedFinalDelay} min</p>
          <ConfidenceRange range={prediction.range} confidence={prediction.confidence} />
        </div>
      </div>

      <div className="rk-intel-grid">
        <div className="rk-card rk-intel-reason">
          <p className="rk-section-title">Why is ETA changing?</p>
          <DelayReasonList
            factors={prediction.factors}
            currentDelay={prediction.currentDelay}
            predictedFinalDelay={prediction.predictedFinalDelay}
          />
        </div>

        <div className="rk-card rk-intel-risk">
          <p className="rk-section-title">Upcoming Network Risk</p>
          {risks.length === 0 ? (
            <p className="rk-section-subtitle">No active risk sections on the corridor.</p>
          ) : (
            risks.map((s) => <NetworkInsightRow key={s.id} section={s} />)
          )}
        </div>
      </div>

      <DelayPropagationView focusTrain={train} section={propagationSection} affectedTrains={affectedTrains} />
    </div>
  );
}
