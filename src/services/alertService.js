// MOCK IMPLEMENTATION
// Replace with a FastAPI request when the backend is ready:
//   getAlerts() -> GET /api/alerts
// See API_INTEGRATION.md for the full contract.

import mockAlerts from "../data/mockAlerts";

export function getAlerts(liveAlerts = []) {
  return [...liveAlerts, ...mockAlerts];
}
