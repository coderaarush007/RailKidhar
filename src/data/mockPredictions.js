// Baseline ETA-explanation data. Curated per-train overrides make the demo
// trains match the reference walkthrough exactly; other trains fall back to
// a factor set chosen by their congestionRisk tier so every train in the
// prototype still gets a plausible "why is my ETA changing" breakdown.
// SIMULATION DATA — a stand-in for the ML explanation service (e.g. SHAP-style
// feature contributions) the backend/ML team will provide.

export const curatedPredictions = {
  12951: {
    factors: [
      { label: "Heavy congestion ahead", minutes: 4 },
      { label: "Speed restrictions", minutes: 2 },
      { label: "Signal & operations", minutes: 2 },
      { label: "Expected recovery", minutes: -2 },
    ],
    confidence: 92,
  },
  22436: {
    factors: [
      { label: "Junction congestion ahead", minutes: 5 },
      { label: "Signal & operations", minutes: 2 },
      { label: "Expected recovery", minutes: -3 },
    ],
    confidence: 78,
  },
  12952: {
    factors: [
      { label: "Extended station dwell", minutes: 6 },
      { label: "Junction congestion ahead", minutes: 6 },
      { label: "Expected recovery", minutes: -2 },
    ],
    confidence: 71,
  },
};

export const riskFactorPresets = {
  low: [
    { label: "Signal & operations", minutes: 2 },
    { label: "Expected recovery", minutes: -1 },
  ],
  medium: [
    { label: "Section congestion", minutes: 5 },
    { label: "Speed restrictions", minutes: 2 },
    { label: "Expected recovery", minutes: -2 },
  ],
  high: [
    { label: "Heavy congestion ahead", minutes: 7 },
    { label: "Previous delay carried forward", minutes: 4 },
    { label: "Speed restrictions", minutes: 3 },
    { label: "Expected recovery", minutes: -3 },
  ],
};

// Simulation scenario definitions used by SimulationContext to perturb the
// demo train's prediction live. Deltas apply on top of the baseline above.
export const simulationScenarios = {
  congestion: {
    label: "Simulate Congestion",
    factor: { label: "Junction congestion ahead", minutes: 8 },
    confidenceDelta: -14,
    rangeWidenMin: 6,
    section: "BRC-RTM",
    trainsAffectedDelta: 3,
    impactMinDelta: 5,
  },
  dwell: {
    label: "Simulate Extended Dwell",
    factor: { label: "Extended station dwell", minutes: 6 },
    confidenceDelta: -6,
    rangeWidenMin: 3,
    section: "KOTA-NDLS",
    trainsAffectedDelta: 2,
    impactMinDelta: 4,
  },
  restriction: {
    label: "Simulate Speed Restriction",
    factor: { label: "Temporary speed restriction", minutes: 4 },
    confidenceDelta: -8,
    rangeWidenMin: 4,
    section: "ST-BRC",
    trainsAffectedDelta: 2,
    impactMinDelta: 3,
  },
  recovery: {
    label: "Simulate Recovery",
    factor: { label: "Historical recovery pattern", minutes: -4 },
    confidenceDelta: 5,
    rangeWidenMin: -3,
    section: "BRC-RTM",
    trainsAffectedDelta: -2,
    impactMinDelta: -4,
  },
};

export default curatedPredictions;
