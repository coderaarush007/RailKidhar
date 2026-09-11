// MOCK IMPLEMENTATION
// Replace with a FastAPI request when the backend/ML service is ready:
//   getPrediction(trainNumber) -> GET /api/trains/:trainNumber/prediction
// Response shape documented in API_INTEGRATION.md.

import { getTrainByNumber } from "../data/mockTrains";
import { computePrediction } from "../utils/trainCalc";

// activeScenarioKeys only apply to the train currently focused by the
// simulation control panel (see SimulationContext) — every other train gets
// its own baseline/preset prediction.
export function getPrediction(trainNumber, activeScenarioKeys = [], jitterMinutes = 0) {
  const train = getTrainByNumber(trainNumber);
  if (!train) return null;
  return computePrediction(train, activeScenarioKeys, jitterMinutes);
}

export function getPredictionExplanation(trainNumber, activeScenarioKeys = []) {
  const prediction = getPrediction(trainNumber, activeScenarioKeys);
  return prediction ? prediction.factors : [];
}
