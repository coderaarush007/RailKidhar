export function formatDelay(minutes) {
  if (minutes === 0) return "On time";
  return minutes > 0 ? `+${minutes} min` : `${minutes} min`;
}

// "HH:MM" + delta minutes -> "HH:MM" (wraps across midnight)
export function addMinutesToTime(hhmm, deltaMinutes) {
  const [h, m] = hhmm.split(":").map(Number);
  let total = (h * 60 + m + deltaMinutes) % 1440;
  if (total < 0) total += 1440;
  const outH = Math.floor(total / 60);
  const outM = total % 60;
  return `${String(outH).padStart(2, "0")}:${String(outM).padStart(2, "0")}`;
}

export function formatTimeAgo(seconds) {
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${Math.floor(seconds)} sec ago`;
  const min = Math.floor(seconds / 60);
  return `${min} min ago`;
}

export function to12Hour(hhmm) {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export function statusLabel(status) {
  switch (status) {
    case "running":
      return "Running";
    case "delayed":
      return "Delayed";
    case "critical":
      return "Critical";
    case "scheduled":
      return "Scheduled";
    default:
      return status;
  }
}
