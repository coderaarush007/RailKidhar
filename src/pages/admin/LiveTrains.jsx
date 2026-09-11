import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TrainTable from "../../components/admin/TrainTable";
import { EmptyState } from "../../components/common/States";
import useAllTrainRows from "../../hooks/useAllTrainRows";
import "./LiveTrains.css";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "running", label: "On Time" },
  { key: "delayed", label: "Delayed" },
  { key: "critical", label: "Critical" },
];

export default function LiveTrains() {
  const [params] = useSearchParams();
  const [filter, setFilter] = useState("all");
  const q = (params.get("q") || "").toLowerCase();
  const rows = useAllTrainRows();

  const filtered = rows
    .filter((r) => filter === "all" || r.train.status === filter)
    .filter(
      (r) =>
        !q ||
        r.train.number.includes(q) ||
        r.train.name.toLowerCase().includes(q) ||
        r.train.currentStationCode.toLowerCase().includes(q)
    );

  return (
    <div className="rk-card rk-live-trains-page">
      <div className="rk-live-trains-head">
        <div>
          <p className="rk-section-title">Live Trains</p>
          <p className="rk-section-subtitle">Real-time train status and predicted arrivals</p>
        </div>
        <div className="rk-live-trains-filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`rk-filter-btn ${filter === f.key ? "rk-filter-active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No trains found" detail="Try a different filter or search term." />
      ) : (
        <TrainTable rows={filtered} />
      )}
    </div>
  );
}
