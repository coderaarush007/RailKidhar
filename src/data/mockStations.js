// Centralized station master data for the MVP corridor (Mumbai <-> New Delhi)
// plus a few branch stations used by cross-corridor demo trains.
// SIMULATION DATA: coordinates are approximate, laid out for the lightweight
// SVG map (not true GPS), not for real navigation.

const mockStations = [
  { code: "MMCT", name: "Mumbai Central", zone: "Western Railway", x: 60, y: 640 },
  { code: "BVI", name: "Borivali", zone: "Western Railway", x: 80, y: 560 },
  { code: "ST", name: "Surat", zone: "Western Railway", x: 130, y: 420 },
  { code: "BRC", name: "Vadodara Junction", zone: "Western Railway", x: 165, y: 330 },
  { code: "RTM", name: "Ratlam Junction", zone: "Western Railway", x: 260, y: 250 },
  { code: "KOTA", name: "Kota Junction", zone: "West Central Railway", x: 340, y: 160 },
  { code: "NDLS", name: "New Delhi", zone: "Northern Railway", x: 400, y: 40 },

  // branch / cross-corridor stations
  { code: "BPL", name: "Bhopal", zone: "West Central Railway", x: 300, y: 300 },
  { code: "AGC", name: "Agra Cantt", zone: "North Central Railway", x: 380, y: 100 },
  { code: "NGP", name: "Nagpur", zone: "South East Central Railway", x: 300, y: 480 },
  { code: "KZJ", name: "Kazipet Junction", zone: "South Central Railway", x: 320, y: 560 },
  { code: "BZA", name: "Vijayawada Junction", zone: "South Central Railway", x: 300, y: 640 },
  { code: "TVC", name: "Thiruvananthapuram Central", zone: "Southern Railway", x: 260, y: 760 },
  { code: "VNS", name: "Varanasi Junction", zone: "North Eastern Railway", x: 470, y: 160 },
];

export function getStationByCode(code) {
  return mockStations.find((s) => s.code === code);
}

// Map-texture-only cities: not real stops, no trains reference these codes.
// Purely so the schematic map reads as a populated region instead of a bare
// line, matching the reference design's background city labels.
export const contextCities = [
  { name: "Ahmedabad", x: 110, y: 300 },
  { name: "Indore", x: 255, y: 335 },
  { name: "Ujjain", x: 225, y: 295 },
  { name: "Dahod", x: 185, y: 375 },
  { name: "Godhra", x: 165, y: 355 },
  { name: "Ankleshwar", x: 105, y: 440 },
  { name: "Navsari", x: 95, y: 460 },
  { name: "Dewas", x: 265, y: 315 },
  { name: "Khargone", x: 215, y: 415 },
];

export default mockStations;
