import "./SimModeBadge.css";

// Keeps prototype data honestly labelled — always visible, never hidden in
// a tooltip — per the "no fake claims about live railway data" requirement.
export default function SimModeBadge() {
  return <span className="rk-sim-badge">SIMULATION MODE · Demo data</span>;
}
