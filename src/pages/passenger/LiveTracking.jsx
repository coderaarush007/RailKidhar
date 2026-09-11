import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useLiveTrainUpdates from "../../hooks/useLiveTrainUpdates";
import { EmptyState } from "../../components/common/States";
import StatusBadge from "../../components/common/StatusBadge";
import DelayReasonList from "../../components/common/DelayReasonList";
import TrainHeaderCard from "../../components/passenger/TrainHeaderCard";
import RouteMap from "../../components/passenger/RouteMap";
import StationTimeline from "../../components/passenger/StationTimeline";
import CoachPosition from "../../components/passenger/CoachPosition";
import PredictionCard from "../../components/passenger/PredictionCard";
import RouteRiskCard from "../../components/passenger/RouteRiskCard";
import { getStationByCode } from "../../data/mockStations";
import { getCongestion } from "../../services/networkService";
import { formatTimeAgo, to12Hour } from "../../utils/format";
import "./LiveTracking.css";

const TABS = [
  { key: "map", label: "Live Map" },
  { key: "timeline", label: "Route Timeline" },
  { key: "coach", label: "Coach Position" },
  { key: "info", label: "Train Info" },
];

export default function LiveTracking() {
  const [params] = useSearchParams();
  const trainNumber = (params.get("train") || "12951").match(/\d+/)?.[0] || "12951";
  const [tab, setTab] = useState("map");

  const { train, prediction, route, secondsAgo } = useLiveTrainUpdates(trainNumber);
  const congestionSections = getCongestion();

  if (!train) {
    return (
      <EmptyState
        title="No train found"
        detail={`We couldn't find a train matching "${trainNumber}". Try a train number like 12951.`}
      />
    );
  }

  const nextStation = getStationByCode(train.nextStationCode);
  const currentStation = getStationByCode(train.currentStationCode);
  const destinationStation = getStationByCode(train.destinationCode);

  return (
    <div className="rk-live-tracking">
      <TrainHeaderCard train={train} currentDelay={prediction.currentDelay} />

      <div className="rk-lt-strip">
        <div>
          <p>Current location</p>
          <strong>{currentStation?.name}</strong>
        </div>
        <div>
          <p>Next station</p>
          <strong>{nextStation?.name}</strong>
        </div>
        <div>
          <p>Expected at next</p>
          <strong>{route.stops.find((s) => s.code === train.nextStationCode)?.scheduledArrival ? to12Hour(route.stops.find((s) => s.code === train.nextStationCode).scheduledArrival) : "—"}</strong>
        </div>
        <div>
          <p>Speed</p>
          <strong>{train.baseSpeedKmh} km/h</strong>
          <span className="rk-lt-strip-updated">Updated {formatTimeAgo(secondsAgo)}</span>
        </div>
      </div>

      <div className="rk-lt-grid">
        <div className="rk-card rk-lt-main">
          <div className="rk-tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                className={`rk-tab ${tab === t.key ? "rk-tab-active" : ""}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "map" && (
            <RouteMap
              train={train}
              stops={route.stops}
              hasFullRoute={route.hasFullRoute}
              congestionSections={congestionSections}
              prediction={prediction}
              secondsAgo={secondsAgo}
            />
          )}
          {tab === "timeline" && (
            <StationTimeline
              stops={route.stops}
              currentStationCode={train.currentStationCode}
              currentDelay={prediction.currentDelay}
              predictedFinalDelay={prediction.predictedFinalDelay}
            />
          )}
          {tab === "coach" && (
            <CoachPosition platform={route.stops.find((s) => s.code === train.currentStationCode)?.platform || "—"} direction={`Towards ${train.destination}`} />
          )}
          {tab === "info" && (
            <dl className="rk-train-info-grid">
              <div><dt>Train number</dt><dd>{train.number}</dd></div>
              <div><dt>Train name</dt><dd>{train.name}</dd></div>
              <div><dt>Origin</dt><dd>{train.origin}</dd></div>
              <div><dt>Destination</dt><dd>{train.destination}</dd></div>
              <div><dt>Status</dt><dd><StatusBadge status={train.status} /></dd></div>
              <div><dt>Trains ahead (this section)</dt><dd>{train.trainsAhead}</dd></div>
              <div><dt>Congestion risk</dt><dd><StatusBadge status={train.congestionRisk} /></dd></div>
              <div><dt>Route data</dt><dd>{route.hasFullRoute ? "Full timeline" : "Current position only"}</dd></div>
            </dl>
          )}
        </div>

        <div className="rk-card rk-lt-timeline-panel">
          <p className="rk-section-title">Station Route Timeline</p>
          <div className="rk-lt-timeline-scroll">
            <StationTimeline
              stops={route.stops}
              currentStationCode={train.currentStationCode}
              currentDelay={prediction.currentDelay}
              predictedFinalDelay={prediction.predictedFinalDelay}
            />
          </div>
        </div>
      </div>

      <div className="rk-lt-bottom-grid">
        <PredictionCard prediction={prediction} destinationName={destinationStation?.name || train.destination} />
        <div className="rk-card rk-lt-reason-card">
          <p className="rk-section-title">Why is my ETA changing?</p>
          <DelayReasonList
            factors={prediction.factors}
            currentDelay={prediction.currentDelay}
            predictedFinalDelay={prediction.predictedFinalDelay}
          />
        </div>
        <GetAlertsCard />
      </div>

      <RouteRiskCard
        stops={route.stops}
        currentStationCode={train.currentStationCode}
        congestionSections={congestionSections}
      />
    </div>
  );
}

function GetAlertsCard() {
  const [set15, setSet15] = useState(false);
  const [setApproach, setSetApproach] = useState(false);
  return (
    <div className="rk-card rk-alerts-card">
      <p className="rk-section-title">Get Alerts</p>
      <p className="rk-section-subtitle">Never miss your stop. Alerts before your station.</p>
      <button type="button" className="rk-btn" onClick={() => setSet15((v) => !v)}>
        {set15 ? "✓ Alert set — 15 min before" : "Alert me 15 min before"}
      </button>
      <button type="button" className="rk-btn" onClick={() => setSetApproach((v) => !v)}>
        {setApproach ? "✓ Alert set — on approach" : "Alert me on approach"}
      </button>
    </div>
  );
}
