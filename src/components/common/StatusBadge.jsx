import "./StatusBadge.css";

const STATUS_META = {
  running: { label: "Running", cls: "success", symbol: "✓" },
  "on-time": { label: "On Time", cls: "success", symbol: "✓" },
  delayed: { label: "Delayed", cls: "warning", symbol: "!" },
  critical: { label: "Critical", cls: "danger", symbol: "!" },
  scheduled: { label: "Scheduled", cls: "info", symbol: "○" },
  normal: { label: "Normal", cls: "success", symbol: "✓" },
  moderate: { label: "Moderate", cls: "warning", symbol: "!" },
  high: { label: "High", cls: "danger", symbol: "!" },
};

// Status is always paired with a symbol + label, never color alone.
export default function StatusBadge({ status, label }) {
  const meta = STATUS_META[status] || { label: label || status, cls: "info", symbol: "•" };
  return (
    <span className={`rk-status-badge rk-status-${meta.cls}`}>
      <span aria-hidden="true">{meta.symbol}</span>
      {label || meta.label}
    </span>
  );
}
