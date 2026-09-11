import { useState } from "react";
import Icon from "../../components/common/Icon";
import mockStations from "../../data/mockStations";
import "./Stations.css";

export default function Stations() {
  const [query, setQuery] = useState("");
  const filtered = mockStations.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="rk-card rk-stations-page">
      <p className="rk-section-title">Stations</p>
      <p className="rk-section-subtitle">Corridor stations covered by this prototype.</p>
      <div className="rk-stations-search">
        <Icon name="search" size={15} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search station name or code"
        />
      </div>
      <div className="rk-stations-list">
        {filtered.map((s) => (
          <div key={s.code} className="rk-station-row">
            <span className="rk-station-icon">
              <Icon name="mappin" size={16} />
            </span>
            <div>
              <p className="rk-station-name">{s.name}</p>
              <p className="rk-station-zone">{s.zone}</p>
            </div>
            <span className="rk-station-code">{s.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
