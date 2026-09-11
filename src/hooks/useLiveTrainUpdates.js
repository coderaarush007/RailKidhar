import { useEffect, useState } from "react";
import { useSimulation } from "../context/SimulationContext";
import { getTrainByNumber, getRouteForTrain } from "../services/trainService";
import { getPrediction } from "../services/predictionService";

// Combines static train/route data with the live simulation state into one
// ready-to-render bundle, and re-renders once a second so "Last updated Xs
// ago" ticks even between simulation events.
export default function useLiveTrainUpdates(trainNumber) {
  const { focusTrainNumber, activeScenarios, jitterMinutes, lastUpdated } = useSimulation();
  const [, forceTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const train = getTrainByNumber(trainNumber);
  if (!train) {
    return { train: null, prediction: null, route: { stops: [], hasFullRoute: false }, lastUpdated, secondsAgo: 0 };
  }

  const isFocus = trainNumber === focusTrainNumber;
  const prediction = getPrediction(trainNumber, isFocus ? activeScenarios : [], isFocus ? jitterMinutes : 0);
  const route = getRouteForTrain(trainNumber);
  const secondsAgo = Math.floor((Date.now() - lastUpdated) / 1000);

  return { train, prediction, route, lastUpdated, secondsAgo, isFocus };
}
