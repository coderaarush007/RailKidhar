// Baseline alert feed shown in Recent Alerts (admin) and passenger Alerts.
// SIMULATION DATA. SimulationContext prepends live entries as scenarios fire.

const mockAlerts = [
  {
    id: "al-1",
    severity: "critical",
    title: "Delay Cascade Risk",
    detail: "6 trains affected near Vadodara",
    minutesAgo: 8,
  },
  {
    id: "al-2",
    severity: "warning",
    title: "Congestion Detected",
    detail: "High occupancy near Surat",
    minutesAgo: 14,
  },
  {
    id: "al-3",
    severity: "info",
    title: "ETA Confidence Drop",
    detail: "12951 confidence 92% → 64%",
    minutesAgo: 21,
  },
  {
    id: "al-4",
    severity: "info",
    title: "Weather Impact",
    detail: "Heavy rainfall expected (IMD)",
    minutesAgo: 32,
  },
  {
    id: "al-5",
    severity: "warning",
    title: "Train Stopped",
    detail: "Unscheduled halt near Anand",
    minutesAgo: 41,
  },
];

export default mockAlerts;
