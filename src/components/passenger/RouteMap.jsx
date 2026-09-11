import { useState } from "react";
import Icon from "../common/Icon";
import { DegradedNotice } from "../common/States";
import { getStationByCode, contextCities } from "../../data/mockStations";
import { project, MAP_VIEWBOX } from "../../utils/mapProjection";
import { formatDelay, formatTimeAgo } from "../../utils/format";
import "../common/MapTooltip.css";
import "./RouteMap.css";

const SECTION_COLOR = {
  normal: "var(--rk-success)",
  restricted: "var(--rk-warning)",
  congested: "var(--rk-danger)",
  cascade_risk: "var(--rk-danger)",
};

function sectionBetween(sections, fromCode, toCode) {
  return sections.find(
    (s) => (s.fromCode === fromCode && s.toCode === toCode) || (s.fromCode === toCode && s.toCode === fromCode)
  );
}

// Map-like schematic (real relative geography via mapProjection, not a GIS
// library) of a train's route: stations placed by true position, current
// stop marked with a floating info card, congested sections colored.
export default function RouteMap({ train, stops, hasFullRoute, congestionSections = [], prediction, secondsAgo }) {
  const [scale, setScale] = useState(1);

  if (!hasFullRoute) {
    return (
      <div className="rk-route-map rk-route-map-degraded">
        <DegradedNotice text="Limited route data for this train — showing current position and next station only." />
        <div className="rk-route-map-mini">
          <span className="rk-route-node rk-route-node-current">
            <Icon name="train" size={14} /> {stops[0]?.name}
          </span>
          <span className="rk-route-mini-line" />
          <span className="rk-route-node">{stops[1]?.name}</span>
        </div>
      </div>
    );
  }

  const projectedStops = stops.map((s) => ({ ...s, pt: project(getStationByCode(s.code)) }));
  const currentIndex = projectedStops.findIndex((s) => s.code === train.currentStationCode);
  const current = projectedStops[currentIndex];
  // The corridor always runs upper-left -> lower-right in this projection,
  // so anchoring the card to the upper-left of the marker keeps it clear of
  // the next station's dot/label without needing per-case collision checks.
  const tooltipX = current ? Math.max(6, Math.min(current.pt.x - 198, 900 - 206)) : 0;
  const tooltipY = current ? Math.max(6, current.pt.y - 78) : 0;

  return (
    <div className="rk-route-map">
      <div className="rk-route-map-zoom">
        <button type="button" aria-label="Zoom in" onClick={() => setScale((s) => Math.min(1.6, s + 0.2))}>
          <Icon name="plus" size={14} />
        </button>
        <button type="button" aria-label="Zoom out" onClick={() => setScale((s) => Math.max(0.8, s - 0.2))}>
          <Icon name="minus" size={14} />
        </button>
      </div>

      <div className="rk-route-map-scroll">
        <div className="rk-route-map-inner" style={{ width: `${100 * scale}%` }}>
          <svg
            className="rk-route-map-svg"
            viewBox={MAP_VIEWBOX}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label={`Route map for train ${train.number} from ${train.origin} to ${train.destination}`}
          >
            <defs>
              <pattern id="rk-map-dots" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="1.2" cy="1.2" r="1.2" fill="var(--rk-border)" opacity="0.55" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rk-map-dots)" />

            {contextCities.map((c) => {
              const pt = project(c);
              return (
                <g key={c.name} className="rk-map-context-city">
                  <circle cx={pt.x} cy={pt.y} r="2" fill="var(--rk-text-faint)" />
                  <text x={pt.x + 6} y={pt.y + 3} fontSize="9.5" fill="var(--rk-text-faint)">
                    {c.name}
                  </text>
                </g>
              );
            })}

            {projectedStops.slice(0, -1).map((stop, i) => {
              const next = projectedStops[i + 1];
              const section = sectionBetween(congestionSections, stop.code, next.code);
              const color = section ? SECTION_COLOR[section.status] : SECTION_COLOR.normal;
              return (
                <line
                  key={stop.code}
                  x1={stop.pt.x}
                  y1={stop.pt.y}
                  x2={next.pt.x}
                  y2={next.pt.y}
                  stroke={color}
                  strokeWidth={section && section.status !== "normal" ? 4 : 3}
                  strokeLinecap="round"
                />
              );
            })}

            {projectedStops.map((stop, i) => {
              const isCurrent = i === currentIndex;
              const isPast = i < currentIndex;
              const above = i % 2 === 0;
              return (
                <g key={stop.code}>
                  {isCurrent && <circle cx={stop.pt.x} cy={stop.pt.y} r="12" fill="var(--rk-blue)" opacity="0.18" />}
                  <circle
                    cx={stop.pt.x}
                    cy={stop.pt.y}
                    r={isCurrent ? 6.5 : 4.5}
                    fill={isCurrent ? "var(--rk-blue)" : isPast ? "var(--rk-success)" : "var(--rk-surface)"}
                    stroke={isPast || isCurrent ? "none" : "var(--rk-text-faint)"}
                    strokeWidth="1.5"
                  />
                  <text
                    x={stop.pt.x}
                    y={above ? stop.pt.y - 12 : stop.pt.y + 18}
                    textAnchor="middle"
                    fontSize="11.5"
                    fontWeight={isCurrent ? "700" : "600"}
                    fill={isCurrent ? "var(--rk-blue)" : "var(--rk-navy-soft)"}
                  >
                    {stop.name}
                  </text>
                </g>
              );
            })}

            {current && (
              <g>
                <foreignObject x={tooltipX} y={tooltipY} width="192" height="60">
                  <div className="rk-map-tooltip" xmlns="http://www.w3.org/1999/xhtml">
                    <p className="rk-map-tooltip-title">
                      {train.number} {train.name}
                    </p>
                    <p className="rk-map-tooltip-line">
                      {current.name} · {train.baseSpeedKmh} km/h
                      {prediction ? ` · ${formatDelay(prediction.currentDelay)}` : ""}
                    </p>
                    <p className="rk-map-tooltip-updated">
                      ● {typeof secondsAgo === "number" ? `Updated ${formatTimeAgo(secondsAgo)}` : "Updated just now"}
                    </p>
                  </div>
                </foreignObject>
              </g>
            )}
          </svg>
        </div>
      </div>

      <div className="rk-route-map-legend">
        <span><i style={{ background: "var(--rk-success)" }} /> On time</span>
        <span><i style={{ background: "var(--rk-warning)" }} /> Delayed (1-30m)</span>
        <span><i style={{ background: "var(--rk-danger)" }} /> Major delay (&gt;30m)</span>
      </div>
    </div>
  );
}
