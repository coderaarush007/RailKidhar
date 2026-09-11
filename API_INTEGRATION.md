# API Integration Contract

This is the contract the frontend expects from the FastAPI backend. Every function below is
implemented today in `src/services/*.js` as a **MOCK IMPLEMENTATION** reading from
`src/data/*.js` — swap the function body for a `fetch()` call with the same return shape and no
component needs to change.

All services are plain functions, not a class or SDK — call them directly from a component or
hook, same as today.

## trainService.js

| Function | Backend endpoint | Consumed by |
|---|---|---|
| `getTrains()` | `GET /api/trains` | `pages/passenger/Home.jsx`, `pages/admin/*` via `useAllTrainRows` |
| `getTrainByNumber(number)` | `GET /api/trains/:trainNumber` | `hooks/useLiveTrainUpdates.js` |
| `getRouteForTrain(number)` | `GET /api/trains/:trainNumber/route` | `useLiveTrainUpdates.js` → `RouteMap`, `StationTimeline` |
| `searchTrains(query)` | `GET /api/trains?q=` | (available for a future search-results view) |
| `getLiveTrainPosition(number)` | part of `GET /api/trains/:trainNumber` | — |

**Train object** (`GET /api/trains/:trainNumber`):

```json
{
  "id": "12951",
  "number": "12951",
  "name": "Mumbai Rajdhani Express",
  "origin": "Mumbai Central",
  "originCode": "MMCT",
  "destination": "New Delhi",
  "destinationCode": "NDLS",
  "currentStationCode": "ST",
  "nextStationCode": "BRC",
  "baseSpeedKmh": 108,
  "scheduledArrival": "08:40",
  "baseDelayMin": 6,
  "status": "running",
  "trainsAhead": 2,
  "congestionRisk": "high"
}
```

`status` ∈ `running | delayed | critical | scheduled`. `congestionRisk` ∈ `low | medium | high`.

**Route response** (`GET /api/trains/:trainNumber/route`):

```json
{
  "hasFullRoute": true,
  "stops": [
    { "code": "MMCT", "name": "Mumbai Central", "platform": "PF 1", "km": 0, "scheduledArrival": null, "scheduledDeparture": "17:00" },
    { "code": "NDLS", "name": "New Delhi", "platform": "PF 3", "km": 1384, "scheduledArrival": "08:40", "scheduledDeparture": null }
  ]
}
```

When the backend has no full timeline for a train yet, return `hasFullRoute: false` with just
`stops: [currentStation, nextStation]` — `RouteMap` and the passenger detail page already render
a graceful-degradation state for this (see `components/common/States.jsx` → `DegradedNotice`).

## predictionService.js

| Function | Backend endpoint | Consumed by |
|---|---|---|
| `getPrediction(trainNumber)` | `GET /api/trains/:trainNumber/prediction` | `useLiveTrainUpdates.js` → `PredictionCard`, `ConfidenceRange`, `DelayReasonList` |
| `getPredictionExplanation(trainNumber)` | same response, `factors` field | `DelayReasonList` |

**Prediction response:**

```json
{
  "trainNumber": "12951",
  "station": "NDLS",
  "currentDelay": 6,
  "scheduledArrival": "08:40",
  "predictedArrival": "08:52",
  "predictedFinalDelay": 12,
  "range": ["08:46", "08:58"],
  "confidence": 92,
  "factors": [
    { "label": "Heavy congestion ahead", "minutes": 4 },
    { "label": "Expected recovery", "minutes": -2 }
  ],
  "lastUpdated": "2026-09-11T09:24:00Z"
}
```

`factors` must already be **plain-language labels** — the passenger UI never shows raw
SHAP/feature names. `confidence` is a 0–100 integer; the frontend labels it "demo estimate" until
the backend confirms it's a calibrated figure, at which point that label can be dropped in
`components/common/ConfidenceRange.jsx`.

## networkService.js

| Function | Backend endpoint | Consumed by |
|---|---|---|
| `getNetworkStatus()` | `GET /api/network/status` | `pages/admin/Dashboard.jsx`, `pages/admin/Network.jsx` (zone list) |
| `getCongestion()` | `GET /api/network/congestion` | `NetworkMap`, `RouteMap`, `RouteRiskCard`, `NetworkInsightRow`, `DelayPropagationView` |

**Congestion section:**

```json
{
  "id": "BRC-RTM",
  "fromCode": "BRC",
  "toCode": "RTM",
  "status": "congested",
  "label": "High Congestion",
  "trainsAffected": 6,
  "impactRangeMin": [8, 17]
}
```

`status` ∈ `normal | restricted | congested | cascade_risk`.

**Zone status:**

```json
{ "name": "Western Railway", "status": "normal", "trainsDelayed": 18 }
```

## alertService.js

| Function | Backend endpoint | Consumed by |
|---|---|---|
| `getAlerts()` | `GET /api/alerts` | `AlertRow` on `pages/passenger/Alerts.jsx`, `pages/admin/AdminAlerts.jsx`, `pages/admin/Dashboard.jsx`, `pages/passenger/Home.jsx` |

```json
{ "id": "al-1", "severity": "critical", "title": "Delay Cascade Risk", "detail": "6 trains affected near Vadodara", "minutesAgo": 8 }
```

`severity` ∈ `critical | warning | info`.

## WebSocket: `/ws/trains`

The frontend currently simulates "live" updates with an in-memory ticking interval
(`context/SimulationContext.jsx`, every 4s) instead of a real socket. When the backend WebSocket
is ready, the natural integration point is `hooks/useLiveTrainUpdates.js`: replace its polling
read of `predictionService.getPrediction()` with a subscription that pushes the same prediction
JSON shape shown above on each message, keyed by `trainNumber`. `SimulationContext`'s
`lastUpdated`/"Live · updated Xs ago" UI (`LiveIndicator`) is already wired to any timestamp
source, so no visual change is needed.

Suggested message shape:

```json
{ "type": "prediction_update", "trainNumber": "12951", "payload": { /* same as GET .../prediction */ } }
```

## What stays frontend-only

`SimulationContext`'s 4 demo scenarios (congestion / dwell / restriction / recovery) are a
**frontend-only presentation layer** for live demos — they perturb the mock prediction math in
`utils/trainCalc.js`. They should not be ported to the backend; once real predictions arrive over
the WebSocket above, the scenario buttons become unnecessary and `SimulationControls` can be
removed or repurposed as an admin override/test tool.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
