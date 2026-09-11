import { useSimulation } from "../../context/SimulationContext";
import { simulationScenarios } from "../../data/mockPredictions";
import Icon from "../common/Icon";
import "./SimulationControls.css";

const SCENARIO_ICON = { congestion: "alertTriangle", dwell: "clock", restriction: "gauge", recovery: "zap" };

export default function SimulationControls() {
  const { activeScenarios, isRunning, start, pause, reset, toggleScenario, focusTrainNumber } = useSimulation();

  return (
    <div className="rk-card rk-sim-controls">
      <div className="rk-sim-header">
        <div>
          <p className="rk-section-title">Simulation Control Panel</p>
          <p className="rk-section-subtitle">Live demo on train {focusTrainNumber} · Mumbai Rajdhani Express</p>
        </div>
        <div className="rk-sim-transport">
          <button type="button" className="rk-btn" onClick={start} disabled={isRunning} aria-label="Start simulation">
            ▶ Start
          </button>
          <button type="button" className="rk-btn" onClick={pause} disabled={!isRunning} aria-label="Pause simulation">
            ⏸ Pause
          </button>
          <button type="button" className="rk-btn" onClick={reset} aria-label="Reset simulation">
            ↻ Reset
          </button>
        </div>
      </div>

      <div className="rk-sim-scenarios">
        {Object.entries(simulationScenarios).map(([key, scenario]) => {
          const active = activeScenarios.includes(key);
          return (
            <button
              key={key}
              type="button"
              className={`rk-scenario-btn ${active ? "rk-scenario-active" : ""}`}
              onClick={() => toggleScenario(key)}
              aria-pressed={active}
            >
              <Icon name={SCENARIO_ICON[key]} size={16} />
              {scenario.label}
              {active && <span className="rk-scenario-on">ON</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
