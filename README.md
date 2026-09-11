# RailKidhar

**Track Smarter. Travel Safer.**

Frontend prototype for **SIH26028 — Dynamic Forecast of ETA for Coaching Trains**.

This is the **frontend only**. It runs entirely on mock/simulated data today and is structured so
the backend team (FastAPI + PostgreSQL/PostGIS + ML service) can plug in real endpoints later
without touching any component — see [`API_INTEGRATION.md`](./API_INTEGRATION.md).

## What this demonstrates

Not just "where is the train" (tracking) — **"when will it arrive, and what's likely to happen
before then"**: a rolling ETA that reacts to network conditions (congestion, dwell, speed
restrictions), explains *why* it changed in plain language, and shows a likely range with a
clearly-labelled demo confidence instead of a false-precision single number.

The MVP corridor is **Mumbai Central ↔ New Delhi** (via Surat, Vadodara, Ratlam, Kota), with 14
trains in the mock fleet — within the project's 10–30 train prototype scope.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

No environment variables or backend are required — everything is mock data in `src/data/`.

## Project structure

```
src/
├── assets/            static images/icons
├── components/
│   ├── common/         shared by both apps (StatusBadge, MetricCard, Sidebar, TopBar, ...)
│   ├── passenger/       passenger-only UI (RouteMap, StationTimeline, PredictionCard, ...)
│   └── admin/            admin-only UI (NetworkMap, TrainTable, SimulationControls, ...)
├── pages/
│   ├── passenger/       Home, LiveTracking, MyTrains, Alerts, Stations, Settings
│   └── admin/            Dashboard, LiveTrains, TrainIntelligence, Network, AdminAlerts, Analytics
├── layouts/            PassengerLayout / AdminLayout (sidebar + top bar shell)
├── data/               mockTrains, mockStations, mockRoutes, mockAlerts, mockPredictions, mockNetwork
├── services/            trainService, predictionService, networkService, alertService — MOCK
│                         IMPLEMENTATION today, see API_INTEGRATION.md for the swap-in contract
├── hooks/               useLiveTrainUpdates, useAllTrainRows
├── context/             SimulationContext — the live "what-if" demo engine (see below)
├── utils/               format.js, trainCalc.js (pure prediction math)
└── styles/              variables.css (design tokens), global.css, responsive.css
```

## Routes

**Passenger app** (`/`): `/`, `/live-tracking?train=<number>`, `/my-trains`, `/alerts`,
`/pnr-check`, `/stations`, `/settings`, `/help`.

**Admin ops panel** (`/admin`): `/admin`, `/admin/live-trains`,
`/admin/live-trains/:trainNumber`, `/admin/network`, `/admin/alerts`, `/admin/stations`,
`/admin/analytics`, `/admin/settings`.

## The simulation

`src/context/SimulationContext.jsx` is the heart of the live demo. It holds:

- `activeScenarios` — which of the 4 demo scenarios (congestion / extended dwell / speed
  restriction / recovery) are currently toggled on, defined in `src/data/mockPredictions.js`.
- A small continuous "jitter" so the ETA visibly rolls even with no scenario active.
- State is mirrored to `localStorage` and synced across browser tabs via the native `storage`
  event, so triggering **Simulate Congestion** in the admin panel (one tab) updates the
  passenger train page (another tab) live — this is how the demo is meant to be run: two tabs
  side by side.

All scenarios currently apply to one **focus train (12951, Mumbai Rajdhani Express)** —
deliberately, to keep this a frontend demo rather than a full network-simulation engine. Every
other train still gets its own baseline prediction from `utils/trainCalc.js`.

To add a fifth scenario: add an entry to `simulationScenarios` in `mockPredictions.js`
(factor label/minutes, confidence delta, range widen, affected network section) and a button in
`components/admin/SimulationControls.jsx` — the prediction math picks it up automatically.

## Modifying mock data

Everything under `src/data/` is plain JS — edit directly, no build step needed beyond the normal
dev server hot reload:

- `mockTrains.js` — the fleet. Add a train with `hasFullRoute: false` if you don't want to write
  a full station timeline for it (the UI degrades gracefully to "current position only").
- `mockRoutes.js` — full station-by-station timelines, keyed by train number.
- `mockStations.js` — station master data incl. schematic map coordinates.
- `mockNetwork.js` — baseline section (track segment) congestion state.
- `mockAlerts.js` — baseline alert feed.
- `mockPredictions.js` — curated ETA-explanation factors per train, plus the simulation
  scenario definitions.

## Known simplifications (by design, not oversights)

- One focus train carries the full interactive simulation model, not the whole fleet.
- Per-stop delay along a station timeline is linearly interpolated between "on time at origin"
  and "predicted final delay at destination" — the backend will supply true per-stop
  predictions.
- The railway map is a schematic SVG (`utils/mapProjection.js` rotates the corridor's real
  relative geography into a landscape layout, with context city labels for texture), not a real
  GIS map — this is explicitly acceptable per the project brief and keeps the bundle tiny
  (~100 KB gzipped JS) for low-end devices.
- PNR Check and the language switcher are visual-parity features with the reference design, not
  functional ones: PNR Check returns one illustrative mock result per lookup (clearly labelled,
  no real reservation system behind it), and switching away from English surfaces an honest
  "not available in this prototype" notice instead of silently doing nothing.
- Analytics (MAE/RMSE/±5/±10min) shows "Evaluation pending" — no real model evaluation exists yet,
  and the prototype deliberately does not invent accuracy numbers.

## Design system

`src/styles/variables.css` — railway blue primary, navy text, green/amber/red status colors,
light background by default with a working dark mode (toggle in Settings, persisted per-browser).
See `.rk-card`, `.rk-btn`, `StatusBadge`, `MetricCard` etc. in `components/common/` for the base
component vocabulary shared by both apps.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
