import Icon from "../common/Icon";
import "./DelayPropagationView.css";

// Illustrates network-aware delay propagation for the demo: one occupied
// section can ripple into other trains sharing it. This is a visual
// simulation of the concept, not a real conflict-graph model.
export default function DelayPropagationView({ focusTrain, section, affectedTrains }) {
  if (!section || section.status === "normal" || affectedTrains.length === 0) return null;

  return (
    <div className="rk-card rk-propagation">
      <p className="rk-section-title">Potential Delay Cascade Detected</p>
      <p className="rk-section-subtitle">
        {section.fromCode} → {section.toCode} is at capacity — effects can ripple to nearby trains.
      </p>

      <div className="rk-propagation-flow">
        <div className="rk-propagation-node rk-propagation-focus">
          <span>{focusTrain.number}</span>
          <p>{focusTrain.name}</p>
        </div>
        <Icon name="chevronRight" size={16} />
        <div className="rk-propagation-node">Shared section occupied</div>
        <Icon name="chevronRight" size={16} />
        {affectedTrains.map((t, i) => (
          <span key={t.id} className="rk-propagation-chain">
            <div className="rk-propagation-node rk-propagation-warn">
              <span>{t.number}</span>
              <p>delayed</p>
            </div>
            {i < affectedTrains.length - 1 && <Icon name="chevronRight" size={16} />}
          </span>
        ))}
        <Icon name="chevronRight" size={16} />
        <div className="rk-propagation-node rk-propagation-danger">Secondary delay</div>
      </div>
    </div>
  );
}
