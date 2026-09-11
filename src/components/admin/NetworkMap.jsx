import { useState } from "react";
import mockStations, { contextCities, getStationByCode } from "../../data/mockStations";
import mockNetwork from "../../data/mockNetwork";
import { project, MAP_VIEWBOX } from "../../utils/mapProjection";
import { formatDelay } from "../../utils/format";
import "../common/MapTooltip.css";
import "./NetworkMap.css";

const CORRIDOR = ["MMCT", "BVI", "ST", "BRC", "RTM", "KOTA", "NDLS"];
const BRANCH_STATIONS = ["BPL", "AGC", "NGP", "KZJ", "BZA", "VNS"];

const SECTION_COLOR = {
  normal: "var(--rk-border)",
  restricted: "var(--rk-warning)",
  congested: "var(--rk-danger)",
  cascade_risk: "var(--rk-danger)",
};

const TRAIN_DOT = { running: "var(--rk-success)", delayed: "var(--rk-warning)", critical: "var(--rk-danger)" };

const TABS = [
  { key: "trains", label: "Trains" },
  { key: "congestion", label: "Congestion" },
  { key: "delays", label: "Delays" },
  { key: "weather", label: "Weather" },
];

const ZONES = ["All Zones", ...mockNetwork.zones.map((z) => z.name)];

// Map-like schematic (real relative geography via mapProjection, not a GIS
// library — see README for why) of the corridor: stations as nodes, track
// sections as edges, trains plotted at their current station.
export default function NetworkMap({ sections, trains }) {
  const [tab, setTab] = useState("trains");
  const [zone, setZone] = useState("All Zones");
  const [activeTrainId, setActiveTrainId] = useState(null);

  const stationByCode = Object.fromEntries(mockStations.map((s) => [s.code, s]));
  const corridorPts = CORRIDOR.map((c) => ({ code: c, ...stationByCode[c], pt: project(stationByCode[c]) }));

  const visibleTrains = trains.filter((t) => {
    if (zone === "All Zones") return true;
    return getStationByCode(t.currentStationCode)?.zone === zone;
  });

  const activeTrain = visibleTrains.find((t) => t.id === activeTrainId);
  const activeTrainStation = activeTrain && stationByCode[activeTrain.currentStationCode];

  return (
    <div className="rk-network-map">
      <div className="rk-network-map-toolbar">
        <div className="rk-network-map-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`rk-network-tab ${tab === t.key ? "rk-network-tab-active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <select className="rk-network-zone-select" value={zone} onChange={(e) => setZone(e.target.value)} aria-label="Filter by zone">
          {ZONES.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>
      </div>

      <div className="rk-network-map-canvas">
        {tab === "weather" ? (
          <div className="rk-network-weather-empty">
            <p>No live weather feed connected.</p>
            <p>IMD integration is planned but not wired into this prototype.</p>
          </div>
        ) : (
          <svg viewBox={MAP_VIEWBOX} className="rk-network-map-svg" role="img" aria-label="Live railway network map">
            <defs>
              <pattern id="rk-network-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1.2" cy="1.2" r="1.2" fill="var(--rk-border)" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rk-network-dots)" />

            {contextCities.map((c) => {
              const pt = project(c);
              return (
                <g key={c.name}>
                  <circle cx={pt.x} cy={pt.y} r="2" fill="var(--rk-text-faint)" />
                  <text x={pt.x + 6} y={pt.y + 3} fontSize="9.5" fill="var(--rk-text-faint)">
                    {c.name}
                  </text>
                </g>
              );
            })}

            {BRANCH_STATIONS.map((code) => {
              const pt = project(stationByCode[code]);
              return (
                <g key={code}>
                  <circle cx={pt.x} cy={pt.y} r="3" fill="var(--rk-surface)" stroke="var(--rk-text-faint)" strokeWidth="1.2" />
                  <text x={pt.x + 7} y={pt.y + 3} fontSize="10" fill="var(--rk-text-muted)" fontWeight="600">
                    {stationByCode[code].name}
                  </text>
                </g>
              );
            })}

            {corridorPts.slice(0, -1).map((s, i) => {
              const next = corridorPts[i + 1];
              const section = sections.find(
                (sec) => (sec.fromCode === s.code && sec.toCode === next.code) || (sec.fromCode === next.code && sec.toCode === s.code)
              );
              const isRisk = section && section.status !== "normal";
              const dimmed = tab === "delays" && !isRisk;
              return (
                <line
                  key={s.code}
                  x1={s.pt.x}
                  y1={s.pt.y}
                  x2={next.pt.x}
                  y2={next.pt.y}
                  stroke={section ? SECTION_COLOR[section.status] : SECTION_COLOR.normal}
                  strokeWidth={isRisk ? (tab === "congestion" ? 6 : 4) : 3}
                  strokeLinecap="round"
                  opacity={dimmed ? 0.35 : 1}
                />
              );
            })}

            {corridorPts.map((s) => (
              <g key={s.code}>
                <circle cx={s.pt.x} cy={s.pt.y} r="5.5" fill="var(--rk-surface)" stroke="var(--rk-navy-soft)" strokeWidth="1.5" />
                <text x={s.pt.x} y={s.pt.y - 11} textAnchor="middle" fontSize="11" fill="var(--rk-text)" fontWeight="700">
                  {s.name}
                </text>
              </g>
            ))}

            {tab !== "congestion" &&
              visibleTrains
                .filter((t) => stationByCode[t.currentStationCode])
                .map((t, i) => {
                  const pt = project(stationByCode[t.currentStationCode]);
                  const laneAngle = (i % 6) * 60 * (Math.PI / 180);
                  const laneR = 13 + (i % 3) * 5;
                  const cx = pt.x + Math.cos(laneAngle) * laneR;
                  const cy = pt.y + Math.sin(laneAngle) * laneR;
                  const radius = tab === "delays" ? 3.5 + Math.min(t.baseDelayMin / 6, 5) : 4.5;
                  return (
                    <circle
                      key={t.id}
                      cx={cx}
                      cy={cy}
                      r={radius}
                      fill={TRAIN_DOT[t.status] || TRAIN_DOT.running}
                      stroke="var(--rk-surface)"
                      strokeWidth="1.2"
                      style={{ cursor: "pointer" }}
                      onClick={() => setActiveTrainId(t.id === activeTrainId ? null : t.id)}
                    >
                      <title>{`${t.number} ${t.name} · ${stationByCode[t.currentStationCode].name} · ${formatDelay(t.baseDelayMin)}`}</title>
                    </circle>
                  );
                })}

            {activeTrain && activeTrainStation && (
              <g>
                <foreignObject
                  x={Math.max(6, Math.min(project(activeTrainStation).x - 202, 900 - 206))}
                  y={Math.max(6, project(activeTrainStation).y - 78)}
                  width="196"
                  height="60"
                >
                  <div className="rk-map-tooltip" xmlns="http://www.w3.org/1999/xhtml">
                    <p className="rk-map-tooltip-title">
                      {activeTrain.number} {activeTrain.name}
                    </p>
                    <p className="rk-map-tooltip-line">
                      {activeTrainStation.name} · {activeTrain.baseSpeedKmh} km/h · {formatDelay(activeTrain.baseDelayMin)}
                    </p>
                  </div>
                </foreignObject>
              </g>
            )}
          </svg>
        )}
      </div>

      <div className="rk-network-map-legend">
        {tab === "delays" ? (
          <>
            <span><i style={{ background: "var(--rk-success)" }} /> Low delay</span>
            <span><i style={{ background: "var(--rk-warning)" }} /> Moderate delay</span>
            <span><i style={{ background: "var(--rk-danger)" }} /> High delay</span>
          </>
        ) : (
          <>
            <span><i style={{ background: "var(--rk-success)" }} /> On-time train</span>
            <span><i style={{ background: "var(--rk-warning)" }} /> Delayed train</span>
            <span><i style={{ background: "var(--rk-danger)" }} /> Congested section</span>
          </>
        )}
      </div>
    </div>
  );
}
