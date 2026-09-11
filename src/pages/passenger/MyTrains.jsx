import TrainSummaryCard from "../../components/passenger/TrainSummaryCard";
import { EmptyState } from "../../components/common/States";
import { getTrains } from "../../services/trainService";
import "./MyTrains.css";

const TRACKED_NUMBERS = ["12951", "22436", "12626"];

export default function MyTrains() {
  const tracked = getTrains().filter((t) => TRACKED_NUMBERS.includes(t.number));

  return (
    <div className="rk-my-trains">
      <p className="rk-section-title">My Trains</p>
      <p className="rk-section-subtitle">Trains you're tracking. Search any train and it will appear here.</p>

      {tracked.length === 0 ? (
        <EmptyState title="No trains tracked yet" detail="Search a train number to start tracking it." />
      ) : (
        <div className="rk-my-trains-list">
          {tracked.map((t) => (
            <TrainSummaryCard key={t.id} train={t} />
          ))}
        </div>
      )}
    </div>
  );
}
