// Baseline ambient network state for the corridor: sections (edges between
// stations) with an occupancy/congestion condition. Simulation events in
// SimulationContext layer additional deltas on top of this at runtime.
// SIMULATION DATA — illustrates network-aware prediction, not a live feed.

const mockNetwork = {
  sections: [
    {
      id: "MMCT-BVI",
      fromCode: "MMCT",
      toCode: "BVI",
      status: "normal",
      trainsAffected: 0,
      impactRangeMin: [0, 0],
    },
    {
      id: "BVI-ST",
      fromCode: "BVI",
      toCode: "ST",
      status: "normal",
      trainsAffected: 0,
      impactRangeMin: [0, 0],
    },
    {
      id: "ST-BRC",
      fromCode: "ST",
      toCode: "BRC",
      status: "restricted",
      type: "speed_restriction",
      label: "Speed Restriction",
      trainsAffected: 3,
      impactRangeMin: [3, 8],
    },
    {
      id: "BRC-RTM",
      fromCode: "BRC",
      toCode: "RTM",
      status: "congested",
      type: "congestion",
      label: "High Congestion",
      trainsAffected: 6,
      impactRangeMin: [8, 17],
    },
    {
      id: "RTM-KOTA",
      fromCode: "RTM",
      toCode: "KOTA",
      status: "normal",
      trainsAffected: 0,
      impactRangeMin: [0, 0],
    },
    {
      id: "KOTA-NDLS",
      fromCode: "KOTA",
      toCode: "NDLS",
      status: "cascade_risk",
      type: "cascade_risk",
      label: "Delay Cascade Risk",
      trainsAffected: 9,
      impactRangeMin: [12, 25],
    },
  ],
  zones: [
    { name: "Western Railway", status: "normal", trainsDelayed: 18 },
    { name: "Central Railway", status: "moderate", trainsDelayed: 12 },
    { name: "Northern Railway", status: "high", trainsDelayed: 27 },
    { name: "Southern Railway", status: "normal", trainsDelayed: 5 },
    { name: "Eastern Railway", status: "moderate", trainsDelayed: 9 },
  ],
};

export default mockNetwork;
