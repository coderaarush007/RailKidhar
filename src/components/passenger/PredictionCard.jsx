import ConfidenceRange from "../common/ConfidenceRange";
import { formatDelay, to12Hour } from "../../utils/format";
import "./PredictionCard.css";

export default function PredictionCard({ prediction, destinationName }) {
  const { predictedFinalDelay, predictedETA, range, confidence } = prediction;
  return (
    <div className="rk-card rk-prediction-card">
      <p className="rk-section-title">Delay Prediction</p>
      <p className="rk-prediction-sub">Predicted arrival at {destinationName}</p>
      <div className="rk-prediction-eta-row">
        <span className="rk-prediction-eta">{to12Hour(predictedETA)}</span>
        <span className={`rk-prediction-delay ${predictedFinalDelay > 0 ? "late" : "ontime"}`}>
          {formatDelay(predictedFinalDelay)}
        </span>
      </div>
      <ConfidenceRange range={range} confidence={confidence} />
    </div>
  );
}
