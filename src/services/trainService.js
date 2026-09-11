// MOCK IMPLEMENTATION
// Replace with FastAPI requests when the backend is ready:
//   getTrains()            -> GET /api/trains
//   getTrainByNumber(n)    -> GET /api/trains/:trainNumber
//   getRouteForTrain(n)    -> GET /api/trains/:trainNumber/route
// See API_INTEGRATION.md for the full contract.

import mockTrains, { getTrainByNumber as findTrain } from "../data/mockTrains";
import { getRouteForTrain as findRoute } from "../data/mockRoutes";
import { getStationByCode } from "../data/mockStations";

export function getTrains() {
  return [...mockTrains];
}

export function getTrainByNumber(number) {
  return findTrain(number) || null;
}

export function searchTrains(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return mockTrains.filter(
    (t) => t.number.includes(q) || t.name.toLowerCase().includes(q)
  );
}

// Returns { stops, hasFullRoute }. When a train has no curated timeline yet,
// we still return current/next station so the UI can degrade gracefully
// instead of showing nothing.
export function getRouteForTrain(number) {
  const train = findTrain(number);
  if (!train) return { stops: [], hasFullRoute: false };
  const stops = findRoute(number);
  if (stops.length > 0) return { stops, hasFullRoute: true };
  return {
    stops: [
      { code: train.currentStationCode, name: getStationByCode(train.currentStationCode)?.name, isCurrent: true },
      { code: train.nextStationCode, name: getStationByCode(train.nextStationCode)?.name, isCurrent: false },
    ],
    hasFullRoute: false,
  };
}

export function getLiveTrainPosition(number) {
  const train = findTrain(number);
  if (!train) return null;
  return {
    currentStationCode: train.currentStationCode,
    nextStationCode: train.nextStationCode,
    speedKmh: train.baseSpeedKmh,
  };
}
