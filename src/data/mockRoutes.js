// Station-by-station scheduled timeline per train, keyed by train number.
// scheduledArrival/Departure are "HH:MM" on the train's own running clock
// (day rollover is implied by the corridor, not modelled minute-exact here).
// SIMULATION DATA — built from public timetable patterns, not a live feed.

const mockRoutes = {
  12951: [
    { code: "MMCT", name: "Mumbai Central", platform: "PF 1", km: 0, scheduledArrival: null, scheduledDeparture: "17:00" },
    { code: "BVI", name: "Borivali", platform: "PF 6", km: 30, scheduledArrival: "17:39", scheduledDeparture: "17:41" },
    { code: "ST", name: "Surat", platform: "PF 1", km: 263, scheduledArrival: "20:14", scheduledDeparture: "20:19" },
    { code: "BRC", name: "Vadodara Junction", platform: "PF 2", km: 393, scheduledArrival: "21:54", scheduledDeparture: "21:59" },
    { code: "RTM", name: "Ratlam Junction", platform: "PF 2", km: 653, scheduledArrival: "00:12", scheduledDeparture: "00:14" },
    { code: "KOTA", name: "Kota Junction", platform: "PF 1", km: 920, scheduledArrival: "03:23", scheduledDeparture: "03:25" },
    { code: "NDLS", name: "New Delhi", platform: "PF 3", km: 1384, scheduledArrival: "08:40", scheduledDeparture: null },
  ],
  12002: [
    { code: "BPL", name: "Bhopal", platform: "PF 1", km: 0, scheduledArrival: null, scheduledDeparture: "06:10" },
    { code: "RTM", name: "Ratlam Junction", platform: "PF 3", km: 190, scheduledArrival: "08:05", scheduledDeparture: "08:07" },
    { code: "KOTA", name: "Kota Junction", platform: "PF 1", km: 460, scheduledArrival: "10:58", scheduledDeparture: "11:00" },
    { code: "AGC", name: "Agra Cantt", platform: "PF 2", km: 700, scheduledArrival: "13:20", scheduledDeparture: "13:22" },
    { code: "NDLS", name: "New Delhi", platform: "PF 2", km: 830, scheduledArrival: "15:15", scheduledDeparture: null },
  ],
  22436: [
    { code: "NDLS", name: "New Delhi", platform: "PF 5", km: 0, scheduledArrival: null, scheduledDeparture: "06:00" },
    { code: "AGC", name: "Agra Cantt", platform: "PF 1", km: 195, scheduledArrival: "07:52", scheduledDeparture: "07:54" },
    { code: "KOTA", name: "Kota Junction", platform: "PF 3", km: 495, scheduledArrival: "10:35", scheduledDeparture: "10:37" },
    { code: "VNS", name: "Varanasi Junction", platform: "PF 1", km: 800, scheduledArrival: "14:40", scheduledDeparture: null },
  ],
  12952: [
    { code: "MMCT", name: "Mumbai Central", platform: "PF 2", km: 0, scheduledArrival: null, scheduledDeparture: "23:00" },
    { code: "ST", name: "Surat", platform: "PF 3", km: 263, scheduledArrival: "01:38", scheduledDeparture: "01:40" },
    { code: "BRC", name: "Vadodara Junction", platform: "PF 1", km: 393, scheduledArrival: "03:05", scheduledDeparture: "03:10" },
    { code: "RTM", name: "Ratlam Junction", platform: "PF 2", km: 653, scheduledArrival: "05:20", scheduledDeparture: "05:22" },
    { code: "KOTA", name: "Kota Junction", platform: "PF 4", km: 920, scheduledArrival: "08:15", scheduledDeparture: "08:17" },
    { code: "NDLS", name: "New Delhi", platform: "PF 1", km: 1384, scheduledArrival: "13:05", scheduledDeparture: null },
  ],
  12626: [
    { code: "NDLS", name: "New Delhi", platform: "PF 6", km: 0, scheduledArrival: null, scheduledDeparture: "11:30" },
    { code: "BPL", name: "Bhopal", platform: "PF 2", km: 700, scheduledArrival: "20:10", scheduledDeparture: "20:15" },
    { code: "NGP", name: "Nagpur", platform: "PF 1", km: 1040, scheduledArrival: "23:55", scheduledDeparture: "00:05" },
    { code: "KZJ", name: "Kazipet Junction", platform: "PF 3", km: 1420, scheduledArrival: "06:20", scheduledDeparture: "06:22" },
    { code: "BZA", name: "Vijayawada Junction", platform: "PF 2", km: 1580, scheduledArrival: "09:10", scheduledDeparture: "09:20" },
    { code: "TVC", name: "Thiruvananthapuram Central", platform: "PF 1", km: 2400, scheduledArrival: "08:15", scheduledDeparture: null },
  ],
};

export function getRouteForTrain(trainNumber) {
  return mockRoutes[trainNumber] || [];
}

export default mockRoutes;
