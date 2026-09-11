// MOCK IMPLEMENTATION
// Replace with FastAPI requests when the backend is ready:
//   getNetworkStatus()      -> GET /api/network/status
//   getCongestion()         -> GET /api/network/congestion
// See API_INTEGRATION.md for the full contract.

import mockNetwork from "../data/mockNetwork";
import { simulationScenarios } from "../data/mockPredictions";

export function getNetworkStatus() {
  return mockNetwork.zones;
}

// Applies live simulation deltas on top of the baseline sections so the
// admin network view and passenger "upcoming risk" card visibly react to
// SimulationControls without a real congestion-modelling engine.
export function getCongestion(activeScenarioKeys = []) {
  const sections = mockNetwork.sections.map((s) => ({ ...s, impactRangeMin: [...s.impactRangeMin] }));

  activeScenarioKeys.forEach((key) => {
    const scenario = simulationScenarios[key];
    if (!scenario || !scenario.section) return;
    const section = sections.find((s) => s.id === scenario.section);
    if (!section) return;
    section.trainsAffected = Math.max(0, section.trainsAffected + scenario.trainsAffectedDelta);
    section.impactRangeMin = [
      Math.max(0, section.impactRangeMin[0] + scenario.impactMinDelta),
      Math.max(0, section.impactRangeMin[1] + scenario.impactMinDelta),
    ];
  });

  return sections;
}

export function getAffectedTrains(sectionId, allTrains) {
  const section = getCongestion().find((s) => s.id === sectionId);
  if (!section) return [];
  return allTrains.filter(
    (t) => t.currentStationCode === section.fromCode || t.nextStationCode === section.toCode
  );
}
