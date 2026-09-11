import { curatedPredictions, riskFactorPresets, simulationScenarios } from "../data/mockPredictions";
import { addMinutesToTime } from "./format";

const DEFAULT_CONFIDENCE_BY_RISK = { low: 90, medium: 82, high: 74 };

// Pure function: derive a train's live prediction from its baseline data plus
// whichever simulation scenarios are currently active on it. Deterministic
// given the same inputs, so the UI re-renders consistently every tick.
export function computePrediction(train, activeScenarioKeys = [], jitterMinutes = 0) {
  const preset = curatedPredictions[train.number];
  const baseFactors = preset ? preset.factors : riskFactorPresets[train.congestionRisk] || riskFactorPresets.low;
  const baseConfidence = preset ? preset.confidence : DEFAULT_CONFIDENCE_BY_RISK[train.congestionRisk] || 85;

  const factors = [...baseFactors];
  let confidence = baseConfidence;
  let rangeHalf = 6;

  activeScenarioKeys.forEach((key) => {
    const scenario = simulationScenarios[key];
    if (!scenario) return;
    factors.push(scenario.factor);
    confidence += scenario.confidenceDelta;
    rangeHalf += scenario.rangeWidenMin;
  });

  confidence = Math.max(50, Math.min(97, confidence));
  rangeHalf = Math.max(2, rangeHalf);

  const factorTotal = factors.reduce((sum, f) => sum + f.minutes, 0);
  const predictedFinalDelay = Math.max(0, train.baseDelayMin + factorTotal + jitterMinutes);
  const predictedETA = addMinutesToTime(train.scheduledArrival, predictedFinalDelay);
  const range = [
    addMinutesToTime(train.scheduledArrival, predictedFinalDelay - rangeHalf),
    addMinutesToTime(train.scheduledArrival, predictedFinalDelay + rangeHalf),
  ];

  return {
    currentDelay: train.baseDelayMin,
    predictedFinalDelay,
    predictedETA,
    range,
    confidence,
    factors,
  };
}

export function deriveStatus(currentDelayMin) {
  if (currentDelayMin >= 20) return "critical";
  if (currentDelayMin >= 5) return "delayed";
  return "running";
}
