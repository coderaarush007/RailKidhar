import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { simulationScenarios } from "../data/mockPredictions";

// Global simulation state shared by the passenger app and the admin ops
// panel, so triggering a scenario from the admin Simulation Control Panel is
// visible on the passenger train page too (see demo flow in the project
// brief). Only one "focus" train carries the full scenario model — every
// other train just shows its own baseline prediction.
// ponytail: a single global focus train (not a per-train event graph) keeps
// this a frontend demo, not a network simulation engine. Widen to
// multi-train focus if a future demo needs two trains reacting at once.
const SimulationContext = createContext(null);

const FOCUS_TRAIN_NUMBER = "12951";
const TICK_MS = 4000;
const STORAGE_KEY = "rk-simulation-state";

// Demo presenters typically run the admin panel and the passenger app in two
// separate tabs side by side, so scenario state is mirrored through
// localStorage + the `storage` event (native browser cross-tab sync — no
// backend, no new dependency) in addition to React context for same-tab use.
function readStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage unavailable (private browsing) — state just stays tab-local
  }
}

export function SimulationProvider({ children }) {
  const stored = readStoredState();
  const [activeScenarios, setActiveScenarios] = useState(stored?.activeScenarios || []);
  const [isRunning, setIsRunning] = useState(stored?.isRunning ?? true);
  const [tickCount, setTickCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  useEffect(() => {
    if (!isRunning) return undefined;
    const id = setInterval(() => {
      setTickCount((c) => c + 1);
      setLastUpdated(Date.now());
    }, TICK_MS);
    return () => clearInterval(id);
  }, [isRunning]);

  useEffect(() => {
    writeStoredState({ activeScenarios, isRunning });
  }, [activeScenarios, isRunning]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      const next = JSON.parse(e.newValue);
      setActiveScenarios(next.activeScenarios || []);
      setIsRunning(next.isRunning ?? true);
      setLastUpdated(Date.now());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleScenario = (key) => {
    setActiveScenarios((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
    setLastUpdated(Date.now());
  };

  const reset = () => {
    setActiveScenarios([]);
    setTickCount(0);
    setLastUpdated(Date.now());
    setIsRunning(true);
  };

  // Small continuous wobble so the ETA visibly "rolls" even with no
  // scenario active, demonstrating rolling re-forecasting on a live feed.
  const jitterMinutes = Math.round(Math.sin(tickCount * 0.6));

  const liveAlerts = useMemo(
    () =>
      activeScenarios.map((key) => ({
        id: `live-${key}`,
        severity: key === "recovery" ? "info" : "warning",
        title: simulationScenarios[key].label.replace("Simulate ", ""),
        detail: `Train ${FOCUS_TRAIN_NUMBER} · ${simulationScenarios[key].factor.label}`,
        minutesAgo: 0,
      })),
    [activeScenarios]
  );

  const value = {
    focusTrainNumber: FOCUS_TRAIN_NUMBER,
    activeScenarios,
    isRunning,
    lastUpdated,
    jitterMinutes,
    liveAlerts,
    start: () => setIsRunning(true),
    pause: () => setIsRunning(false),
    reset,
    toggleScenario,
  };

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>;
}

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error("useSimulation must be used within SimulationProvider");
  return ctx;
}
