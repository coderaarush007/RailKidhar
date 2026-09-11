import { useSimulation } from "../context/SimulationContext";
import { getTrains } from "../services/trainService";
import { getPrediction } from "../services/predictionService";

// Shared by every admin page that needs the whole fleet with live
// predictions attached (Dashboard, Live Trains, Network, Analytics).
export default function useAllTrainRows() {
  const { focusTrainNumber, activeScenarios, jitterMinutes } = useSimulation();
  return getTrains().map((train) => {
    const isFocus = train.number === focusTrainNumber;
    return {
      train,
      prediction: getPrediction(train.number, isFocus ? activeScenarios : [], isFocus ? jitterMinutes : 0),
    };
  });
}
