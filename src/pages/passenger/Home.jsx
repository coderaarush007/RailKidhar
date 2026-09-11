import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/common/Icon";
import TrainSummaryCard from "../../components/passenger/TrainSummaryCard";
import AlertRow from "../../components/common/AlertRow";
import { getTrains } from "../../services/trainService";
import { getAlerts } from "../../services/alertService";
import "./Home.css";

const RECENT_SEARCHES = ["12951 Mumbai Rajdhani", "22436 Vande Bharat", "12626 Kerala Express"];

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const trains = getTrains();
  const popular = trains.slice(0, 5);
  const alerts = getAlerts().slice(0, 3);

  const submit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/live-tracking?train=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="rk-home">
      <section className="rk-home-hero">
        <h1>RailKidhar</h1>
        <p className="rk-home-tagline">Track Smarter. Travel Safer.</p>
        <form className="rk-home-search" onSubmit={submit}>
          <Icon name="search" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search train number or name — e.g. 12951 Mumbai Rajdhani"
            aria-label="Search train number or name"
          />
          <button type="submit" className="rk-btn rk-btn-primary">
            Search
          </button>
        </form>
        <div className="rk-home-recent">
          <span>Recent:</span>
          {RECENT_SEARCHES.map((r) => (
            <button key={r} type="button" onClick={() => navigate(`/live-tracking?train=${r.split(" ")[0]}`)}>
              {r}
            </button>
          ))}
        </div>
      </section>

      <div className="rk-home-grid">
        <section className="rk-card rk-home-panel">
          <p className="rk-section-title">Popular trains</p>
          <p className="rk-section-subtitle">MVP corridor: Mumbai Central ↔ New Delhi</p>
          <div className="rk-home-list">
            {popular.map((t) => (
              <TrainSummaryCard key={t.id} train={t} />
            ))}
          </div>
        </section>

        <section className="rk-card rk-home-panel">
          <p className="rk-section-title">Live updates</p>
          <p className="rk-section-subtitle">Simulated network activity</p>
          {alerts.map((a) => (
            <AlertRow key={a.id} alert={a} />
          ))}
        </section>
      </div>
    </div>
  );
}
